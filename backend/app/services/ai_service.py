import os
import time
import google.generativeai as genai
from dotenv import load_dotenv
from firecrawl import FirecrawlApp

load_dotenv()

gemini_key = os.getenv("GEMINI_API_KEY")
if gemini_key:
    genai.configure(api_key=gemini_key)

firecrawl_key = os.getenv("FIRECRAWL_API_KEY")
firecrawl_app = FirecrawlApp(api_key=firecrawl_key) if firecrawl_key else None

def fetch_real_time_info(search_query: str) -> str:
    """ONLY use for current prices, news, or latest updates."""
    if not firecrawl_app:
        return "Live search is unavailable (FIRECRAWL_API_KEY not configured)."
    try:
        print(f"--> [Firecrawl] Searching web for: {search_query}")
        result = firecrawl_app.search(search_query, params={"limit": 1})
        
        context = ""
        for res in result.get('data', []):
            context += f"Info: {res.get('markdown', res.get('description', ''))[:800]}\n"
            
        return context if context else "No live info found."
    except Exception as e:
        return f"Could not fetch info: {str(e)}"

# Use valid Gemini 1.5 Flash model
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    tools=[fetch_real_time_info],
    system_instruction=(
        "You are 'Sahayak AI', an assistant for underserved communities in India. "
        "Keep your answers short, simple, and practical. "
        "CRITICAL RULE: DO NOT use 'fetch_real_time_info' for general questions, basic advice, or greetings. "
        "ONLY use it if asked for 'current market prices', 'latest news', 'today', or specific live data."
    )
)

def get_ai_response_stream(user_query: str):
    try:
        if not os.getenv("GEMINI_API_KEY") or os.getenv("GEMINI_API_KEY") == "your_gemini_api_key_here":
            yield "Error: GEMINI_API_KEY is missing in your Render environment variables."
            return
            
        # 1. Instantly send a "Thinking" message so the frontend doesn't freeze!
        yield "🔍 Processing your request...\n\n"
        
        # 2. Let Gemini do the hard work (and call Firecrawl if needed)
        chat = model.start_chat(enable_automatic_function_calling=True)
        response = chat.send_message(user_query) # Non-streaming to prevent SDK crashes
        
        # 3. Stream the final answer back to create the typing effect
        words = response.text.split(" ")
        for word in words:
            yield word + " "
            time.sleep(0.02) # Fast typing effect
            
    except Exception as e:
        yield f"\n\nSorry, I encountered an error: {str(e)}"
