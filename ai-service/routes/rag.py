from fastapi import APIRouter, HTTPException

from services.models import (
    RepositoryRequest,
    ChatRequest,
    SearchRequest,
)
from services.rag_pipeline import RAGPipeline

router = APIRouter(
    prefix="/api/rag",
    tags=["RAG"],
)

pipeline = RAGPipeline()


@router.get("/health")
def health():
    return {
        "success": True,
        "service": "RAG",
        "status": "Healthy",
    }


@router.post("/repository")
def import_repository(request: RepositoryRequest):
    try:
        result = pipeline.index_repository(
            project_id=request.project_id,
            github_url=str(request.github_url)
            if request.github_url
            else None,
            local_path=request.local_path,
        )

        return {
            "success": True,
            "message": "Repository indexed successfully.",
            **result,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.post("/chat")
def chat(request: ChatRequest):
    try:
        result = pipeline.chat(
            project_id=request.project_id,
            question=request.question,
            history=request.history,
        )

        return {
            "success": True,
            **result,
        }

    except Exception as e:
        import traceback

        print("=" * 80)
        traceback.print_exc()
        print("=" * 80)

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )

