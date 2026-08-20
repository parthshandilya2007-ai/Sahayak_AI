import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
print("Gemini Key starts with:", os.getenv("GEMINI_API_KEY")[:5] if os.getenv("GEMINI_API_KEY") else "None")

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    system_instruction="You are a helpful assistant."
)

print("Starting chat...")
chat = model.start_chat()
print("Sending message...")
response = chat.send_message("Hello")
print("Response:", response.text)
