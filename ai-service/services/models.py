from typing import List, Optional

from pydantic import BaseModel, HttpUrl


class RepositoryRequest(BaseModel):
    project_id: str
    github_url: Optional[HttpUrl] = None
    local_path: Optional[str] = None


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    project_id: str
    question: str
    history: Optional[List[ChatMessage]] = []

class SearchRequest(BaseModel):
    project_id: str
    question: str
    top_k: int = 8