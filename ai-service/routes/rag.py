import logging

from fastapi import APIRouter, HTTPException

from services.models import RepositoryRequest, ChatRequest, SearchRequest
from services.rag_pipeline import RAGPipeline
from services.exceptions import (
    InvalidRequestError,
    RepositoryLoadError,
    IndexingError,
    RepositoryNotIndexedError,
    GenerationError,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/rag", tags=["RAG"])

pipeline = RAGPipeline()


@router.get("/health")
def health():
    return {"success": True, "service": "RAG", "status": "Healthy"}


@router.post("/repository")
def import_repository(request: RepositoryRequest):
    try:
        result = pipeline.index_repository(
            project_id=request.project_id,
            github_url=str(request.github_url) if request.github_url else None,
            local_path=request.local_path,
        )

        return {
            "success": True,
            "message": "Repository indexed successfully.",
            **result,
        }

    except InvalidRequestError as e:
        raise HTTPException(status_code=400, detail=str(e))

    except (RepositoryLoadError, IndexingError) as e:
        raise HTTPException(status_code=422, detail=str(e))

    except Exception as e:
        logger.exception("Unexpected error indexing repository '%s'", request.project_id)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/chat")
def chat(request: ChatRequest):
    try:
        result = pipeline.chat(
            project_id=request.project_id,
            question=request.question,
            history=request.history,
        )

        return {"success": True, **result}

    except InvalidRequestError as e:
        raise HTTPException(status_code=400, detail=str(e))

    except RepositoryNotIndexedError as e:
        raise HTTPException(status_code=404, detail=str(e))

    except GenerationError as e:
        # Upstream (Gemini) failure, not our fault -> 502
        raise HTTPException(status_code=502, detail=str(e))

    except Exception as e:
        logger.exception("Unexpected error during chat for project '%s'", request.project_id)
        raise HTTPException(status_code=500, detail=str(e))