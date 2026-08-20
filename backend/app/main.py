from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from app.services.ai_service import get_ai_response_stream

app = FastAPI(title="AI for Public Good API")

# Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    text: str
    language: str = "en"

@app.get("/")
def health_check():
    return {"status": "ok"}

# New Streaming Endpoint
@app.post("/api/ask/stream")
def process_query_stream(request: QueryRequest):
    return StreamingResponse(
        get_ai_response_stream(request.text), 
        media_type="text/plain"
    )
