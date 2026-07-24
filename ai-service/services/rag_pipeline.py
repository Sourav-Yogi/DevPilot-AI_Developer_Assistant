from sentence_transformers import SentenceTransformer

from services.github_loader import GitHubLoader
from services.repository_loader import RepositoryLoader
from services.chunker import CodeChunker
from services.embedding_service import EmbeddingService
from services.vector_store import VectorStore
from services.retriever import Retriever
from services.prompt_builder import PromptBuilder
from services.gemini_service import GeminiService


class RAGPipeline:

    def __init__(self):

        shared_model = SentenceTransformer(
            "all-MiniLM-L6-v2"
        )

        self.github_loader = GitHubLoader()

        self.repository_loader = RepositoryLoader()

        self.chunker = CodeChunker()

        self.embedding_service = EmbeddingService(
            shared_model
        )

        self.vector_store = VectorStore()

        self.retriever = Retriever(
            self.embedding_service
        )

        self.prompt_builder = PromptBuilder()

        self.gemini_service = GeminiService()

    # -----------------------------
    # Repository Indexing
    # -----------------------------
    def index_repository(
        self,
        project_id: str,
        github_url: str = None,
        local_path: str = None,
    ):

        if github_url:
            repo_path = self.github_loader.clone_repository(
                project_id,
                github_url,
            )
        elif local_path:
            repo_path = local_path
        else:
            raise ValueError("Either github_url or local_path is required.")

        documents = self.repository_loader.load_repository(
            repo_path
        )

        if not documents:
            raise ValueError(
                "No supported source code files found in the repository."
            )

        chunks = self.chunker.chunk_documents(
            documents
        )

        if not chunks:
            raise ValueError(
                "Repository contains no indexable content."
            )

        embedded_chunks = self.embedding_service.generate_embeddings(
            chunks
        )

        stored_vectors = self.vector_store.store_embeddings(
            project_id,
            embedded_chunks,
        )

        return {
            "project_id": project_id,
            "repository_path": repo_path,
            "total_files": len(documents),
            "total_chunks": len(chunks),
            "stored_vectors": stored_vectors,
        }

    # -----------------------------
    # Repository Chat
    # -----------------------------
    def chat(
        self,
        project_id: str,
        question: str,
        history=None,
    ):

        retrieved_chunks = self.retriever.retrieve(
            project_id=project_id,
            question=question,
        )

        if not retrieved_chunks:
            raise ValueError(
                "Repository is not indexed or no relevant context found."
            )

        prompt = self.prompt_builder.build_prompt(
            question=question,
            retrieved_chunks=retrieved_chunks,
            history=history,
        )

        answer = self.gemini_service.ask(prompt)

        return {
            "answer": answer,
            "sources": list(
                {
                    chunk["metadata"]["path"]
                    for chunk in retrieved_chunks
                }
            ),
        }
