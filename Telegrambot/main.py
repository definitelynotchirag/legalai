import os
import logging
from pyrogram import Client, filters
from pyrogram.types import Message
from dotenv import load_dotenv
from langflow_api import LangflowAPI

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("bot.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Get API keys and tokens from environment variables
API_ID = 13822678
API_HASH = "58307222e0ed42dc114fb9369511a100" 
BOT_TOKEN = "5961058553:AAEysdZ4BOjp23e-KitQ7f7qhw4nL1MEzoA"

# Initialize the Langflow API client
langflow = LangflowAPI()

# Initialize Pyrogram client
app = Client(
    "legal_document_analyzer_bot",
    api_id=API_ID,
    api_hash=API_HASH,
    bot_token=BOT_TOKEN
)

@app.on_message(filters.command("start"))
async def start_command(client: Client, message: Message):
    """Handle the /start command."""
    await message.reply(
        "👋 Welcome to the Legal Document Analyzer Bot!\n\n"
        "Send me a PDF file of a legal document, and I'll analyze it for you.\n\n"
        "Type /help for more information."
    )

@app.on_message(filters.command("help"))
async def help_command(client: Client, message: Message):
    """Handle the /help command."""
    await message.reply(
        "📚 **How to use this bot:**\n\n"
        "1. Send me a PDF file of the legal document you want to analyze\n"
        "2. Wait for the analysis to complete\n"
        "3. I'll send you a detailed summary and analysis\n\n"
        "**Available commands:**\n"
        "/start - Start the bot\n"
        "/help - Show this help message"
    )

@app.on_message(filters.document)
async def handle_document(client: Client, message: Message):
    """Handle PDF document uploads."""
    if not message.document:
        await message.reply("Please send a valid document.")
        return
    
    # Check if the document is a PDF
    if not message.document.mime_type == "application/pdf":
        await message.reply("Please send a PDF file for analysis.")
        return
    
    # Inform user we're processing the document
    processing_msg = await message.reply("⏳ Processing your legal document. This may take a minute...")
    
    try:
        # Download the file
        file_path = await client.download_media(message.document)
        logger.info(f"Downloaded file to {file_path}")
        
        # Process the file with Langflow API
        await processing_msg.edit_text("📄 Document downloaded. Analyzing the legal content...")
        
        # First try with normal upload method
        logger.info("Trying normal upload method")
        result = await langflow.process_pdf(file_path)
        
        # If that fails, try direct method
        if result.startswith("Failed to upload") or result.startswith("Error"):
            logger.info("Falling back to direct processing method")
            await processing_msg.edit_text("📄 Trying alternative processing method...")
            result = await langflow.process_pdf_direct(file_path)
        
        # Clean up the downloaded file
        if os.path.exists(file_path):
            os.remove(file_path)
            logger.info(f"Deleted temporary file {file_path}")
        
        # Send the analysis result
        if len(result) > 4096:
            # If the result is too long, split it into multiple messages
            parts = [result[i:i+4096] for i in range(0, len(result), 4096)]
            await processing_msg.edit_text("📊 Analysis complete! Results:")
            for part in parts:
                await message.reply(part)
        else:
            await processing_msg.edit_text(f"📊 Analysis complete!\n\n{result}")
            
    except Exception as e:
        logger.exception(f"Error processing document: {str(e)}")
        await processing_msg.edit_text("❌ An error occurred while processing your document. Please try again later.")

if __name__ == "__main__":
    logger.info("Starting bot...")
    app.run()
