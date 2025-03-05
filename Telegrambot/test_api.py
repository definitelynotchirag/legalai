import asyncio
import sys
import logging
from langflow_api import LangflowAPI

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

async def test_api():
    """Test the Langflow API with a PDF file."""
    if len(sys.argv) < 2:
        print("Usage: python test_api.py <pdf_file_path>")
        return
        
    pdf_path = sys.argv[1]
    print(f"Testing with file: {pdf_path}")
    
    langflow = LangflowAPI()
    
    # First try uploading and processing
    print("\n=== Testing with upload method ===")
    result = await langflow.process_pdf(pdf_path)
    print(f"Result: {result}")
    
    # Then try direct processing
    print("\n=== Testing with direct method ===")
    result = await langflow.process_pdf_direct(pdf_path)
    print(f"Result: {result}")

if __name__ == "__main__":
    asyncio.run(test_api())
