class RAGPipelineError(Exception):
    """Base class for all RAG pipeline errors."""


class InvalidRequestError(RAGPipelineError):
    """Raised when the caller-supplied input is invalid (maps to HTTP 400)."""


class RepositoryLoadError(RAGPipelineError):
    """Raised when a repository can't be cloned or contains no usable files (HTTP 422)."""


class IndexingError(RAGPipelineError):
    """Raised when chunking or embedding produces no indexable content (HTTP 422)."""


class RepositoryNotIndexedError(RAGPipelineError):
    """Raised when chat is requested for a project with no index / no matching context (HTTP 404)."""


class GenerationError(RAGPipelineError):
    """Raised when the LLM call itself fails (HTTP 502 - upstream service failure)."""