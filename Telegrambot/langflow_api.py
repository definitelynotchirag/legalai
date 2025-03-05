import os
import json
import aiohttp
import asyncio
import logging
from typing import Optional, Dict, Any

# Configure logging
logger = logging.getLogger(__name__)

class LangflowAPI:
    """A class to handle interactions with the Langflow API."""
    
    def __init__(self):
        self.base_url = "http://127.0.0.1:7860"
        self.flow_id = "23c9a4a3-05de-497f-96b5-81515817f2df"
        self.endpoint = self.flow_id  # Can be customized with a specific endpoint name
        
        # Default tweaks for the API
        self.default_tweaks = {
            "File-Aaof5": {
                "concurrency_multithreading": 4,
                "delete_server_file_after_processing": True,
                "ignore_unspecified_files": False,
                "ignore_unsupported_extensions": True,
                "path": "", # Will be updated with the file path
                "silent_errors": False,
                "use_multithreading": False
            },
            "ParseData-pvCTI": {
                "sep": "\n",
                "template": "{text}"
            },
            "Prompt-lmgbZ": {
                "context": "",
                "question": "Please analyze this legal document and provide a summary of key points, obligations, rights of parties, important clauses, and any potential issues or concerns.",
                "template": "{context}\n\n---\n\nGiven the context above, answer the question as best as possible.\n\nQuestion: {question}\n\nAnswer: ",
                "tool_placeholder": ""
            },
            "ChatInput-vttpu": {
                "files": "",
                "background_color": "",
                "chat_icon": "",
                "input_value": "",
                "sender": "User",
                "sender_name": "User",
                "session_id": "",
                "should_store_message": True,
                "text_color": ""
            },
            "ChatOutput-kUcky": {
                "background_color": "",
                "chat_icon": "",
                "clean_data": True,
                "data_template": "{text}",
                "sender": "Machine",
                "sender_name": "AI",
                "session_id": "",
                "should_store_message": True,
                "text_color": ""
            },
            "OllamaModel-WkTvX": {
                "base_url": "http://localhost:11434/",
                "format": "",
                "input_value": "",
                "metadata": {},
                "mirostat": "Disabled",
                "mirostat_eta": None,
                "mirostat_tau": None,
                "model_name": "qwen2.5-coder:7b",
                "num_ctx": None,
                "num_gpu": None,
                "num_thread": None,
                "repeat_last_n": None,
                "repeat_penalty": None,
                "stop_tokens": "",
                "stream": False,
                "system": "",
                "system_message": "",
                "tags": "",
                "temperature": 0.1,
                "template": "",
                "tfs_z": None,
                "timeout": None,
                "tool_model_enabled": False,
                "top_k": None,
                "top_p": None,
                "verbose": False
            }
        }
    
    async def process_pdf(self, file_path: str) -> str:
        """Process a PDF file with the Langflow API."""
        try:
            logger.info(f"Processing PDF file: {file_path}")
            
            # First check if file exists
            if not os.path.exists(file_path):
                logger.error(f"File does not exist: {file_path}")
                return "Error: File does not exist."
                
            # Get file size for logging
            file_size = os.path.getsize(file_path)
            logger.info(f"File size: {file_size} bytes")
            
            # Update the tweaks with the file path - using the server path from upload
            tweaks = self.default_tweaks.copy()
            
            # Upload the file to the Langflow server
            server_file_path = await self._upload_file(file_path)
            
            if not server_file_path:
                logger.error("File upload failed")
                return "Failed to upload the file to the analysis server."
            
            logger.info(f"File uploaded successfully, server path: {server_file_path}")
            
            # Update tweaks with the server file path
            tweaks["File-Aaof5"]["path"] = server_file_path
            
            # Get the file name to use in the prompt
            file_name = os.path.basename(file_path)
            
            # Run the flow with the uploaded file
            result = await self._run_flow(
                message=f"Please analyze this legal document: {file_name}",
                tweaks=tweaks
            )
            
            # Extract the response text
            if result and "result" in result:
                return result["result"]
            else:
                logger.error(f"Analysis failed or returned no results. Full response: {result}")
                return "Analysis failed or returned no results."
                
        except Exception as e:
            logger.exception(f"Error in process_pdf: {str(e)}")
            return f"Error processing PDF: {str(e)}"
    
    async def _upload_file(self, file_path: str) -> Optional[str]:
        """Upload a file to the Langflow server."""
        try:
            url = f"{self.base_url}/api/v1/upload"
            logger.info(f"Uploading file to {url}")
            
            async with aiohttp.ClientSession() as session:
                with open(file_path, "rb") as f:
                    form = aiohttp.FormData()
                    form.add_field(
                        'file', 
                        f, 
                        filename=os.path.basename(file_path),
                        content_type='application/pdf'
                    )
                    
                    async with session.post(url, data=form) as response:
                        if response.status == 200:
                            response_json = await response.json()
                            logger.info(f"Upload response: {response_json}")
                            
                            if "file_path" in response_json:
                                return response_json["file_path"]
                            elif "filepath" in response_json:
                                return response_json["filepath"]
                            else:
                                logger.error(f"Unexpected response format: {response_json}")
                                return None
                        else:
                            error_text = await response.text()
                            logger.error(f"Error uploading file: status {response.status}, response: {error_text}")
                            return None
        except Exception as e:
            logger.exception(f"Exception during file upload: {str(e)}")
            return None
    
    async def _run_flow(self, message: str, tweaks: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Run a flow with the Langflow API."""
        try:
            api_url = f"{self.base_url}/api/v1/run/{self.endpoint}"
            logger.info(f"Running flow at {api_url} with message: {message}")
            
            payload = {
                "message": message,
                "output_type": "chat",
                "input_type": "chat",
                "tweaks": tweaks
            }
            
            logger.debug(f"Payload: {json.dumps(payload)}")
            
            async with aiohttp.ClientSession() as session:
                async with session.post(api_url, json=payload) as response:
                    if response.status == 200:
                        result = await response.json()
                        logger.info("Flow executed successfully")
                        return result
                    else:
                        error_text = await response.text()
                        logger.error(f"Error running flow: status {response.status}, response: {error_text}")
                        return None
        except Exception as e:
            logger.exception(f"Exception while running flow: {str(e)}")
            return None
            
    # Alternative method to try direct processing without upload
    async def process_pdf_direct(self, file_path: str) -> str:
        """Process a PDF file with the Langflow API without uploading first."""
        try:
            logger.info(f"Direct processing of PDF file: {file_path}")
            
            # Update the tweaks with the file path - using the local path directly
            tweaks = self.default_tweaks.copy()
            tweaks["File-Aaof5"]["path"] = file_path
            
            # Get the file name to use in the prompt
            file_name = os.path.basename(file_path)
            
            # Run the flow with the local file path
            result = await self._run_flow(
                message=f"Please analyze this legal document: {file_name}",
                tweaks=tweaks
            )
            
            # Extract the response text
                        # Extract the response text
            if result:
                # Check various possible response structures
                if "outputs" in result and len(result["outputs"]) > 0:
                    # Structure 1: outputs[0].results.message.text
                    if ("results" in result["outputs"][0] and
                        "message" in result["outputs"][0]["results"] and
                        "text" in result["outputs"][0]["results"]["message"]):
                        return result["outputs"][0]["results"]["message"]["text"]
                    
                    # Structure 2: Check outputs[0].outputs array
                    if "outputs" in result["outputs"][0] and len(result["outputs"][0]["outputs"]) > 0:
                        for output in result["outputs"][0]["outputs"]:
                            if "message" in output and "type" in output["message"] and output["message"]["type"] == "text":
                                return output["message"]["message"]
                    
                    # Structure 3: Check outputs[0].messages
                    if "messages" in result["outputs"][0] and len(result["outputs"][0]["messages"]) > 0:
                        for msg in result["outputs"][0]["messages"]:
                            if "message" in msg:
                                return msg["message"]
                
                # Structure 4: Check root level messages
                if "messages" in result and len(result["messages"]) > 0:
                    for msg in result["messages"]:
                        if "message" in msg:
                            return msg["message"]
                
                # Structure 5: Check session_id.outputs[].outputs[].artifacts.message
                if "session_id" in result and "outputs" in result:
                    for output_group in result["outputs"]:
                        if "outputs" in output_group:
                            for output in output_group["outputs"]:
                                if "artifacts" in output and "message" in output["artifacts"]:
                                    return output["artifacts"]["message"]
            
            # Log the full response to better understand the structure
            logger.error(f"Direct analysis failed or returned no results. Full response structure: {json.dumps(result, indent=2)}")
            return "Analysis failed or returned no results."
                
        except Exception as e:
            logger.exception(f"Error in direct process_pdf: {str(e)}")
            return f"Error processing PDF: {str(e)}"
