# import logging
# import shutil

# from sentence_transformers import SentenceTransformer

# from services.github_loader import GitHubLoader
# from services.repository_loader import RepositoryLoader
# from services.chunker import CodeChunker
# from services.embedding_service import EmbeddingService
# from services.vector_store import VectorStore
# from services.retriever import Retriever
# from services.prompt_builder import PromptBuilder
# from services.gemini_service import GeminiService
# from services.exceptions import (
#     InvalidRequestError,
#     RepositoryLoadError,
#     IndexingError,
#     RepositoryNotIndexedError,
# )

# logger = logging.getLogger(__name__)

# EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"


# class RAGPipeline:

#     def __init__(self):
#         shared_model = SentenceTransformer(EMBEDDING_MODEL_NAME)

#         self.github_loader = GitHubLoader()
#         self.repository_loader = RepositoryLoader()
#         self.chunker = CodeChunker()
#         self.embedding_service = EmbeddingService(shared_model)
#         self.vector_store = VectorStore()
#         self.retriever = Retriever(self.embedding_service, self.vector_store)
#         self.prompt_builder = PromptBuilder()
#         self.gemini_service = GeminiService()

#     # --------------------------------------------------
#     # Repository Indexing
#     # --------------------------------------------------

#     def index_repository(
#         self,
#         project_id: str,
#         github_url: str = None,
#         local_path: str = None,
#     ) -> dict:
#         if not project_id or not project_id.strip():
#             raise InvalidRequestError("project_id is required.")

#         if not github_url and not local_path:
#             raise InvalidRequestError(
#                 "Either github_url or local_path is required."
#             )

#         repo_path = None
#         should_cleanup = False

#         try:
#             if github_url:
#                 logger.info(
#                     "Cloning repository for project '%s' from %s",
#                     project_id,
#                     github_url,
#                 )
#                 try:
#                     repo_path = self.github_loader.clone_repository(github_url)
#                 except Exception as exc:
#                     raise RepositoryLoadError(
#                         f"Could not clone repository: {exc}"
#                     ) from exc
#                 should_cleanup = True
#             else:
#                 repo_path = local_path

#             documents = self.repository_loader.load_repository(repo_path)

#             if not documents:
#                 raise RepositoryLoadError(
#                     "No supported source code files found in the repository."
#                 )

#             logger.info(
#                 "Loaded %d files for project '%s'", len(documents), project_id
#             )

#             chunks = self.chunker.chunk_documents(documents)

#             if not chunks:
#                 raise IndexingError("Repository contains no indexable content.")

#             embedded_chunks = self.embedding_service.generate_embeddings(chunks)

#             stored_vectors = self.vector_store.store_embeddings(
#                 project_id,
#                 embedded_chunks,
#             )

#             logger.info(
#                 "Indexed project '%s': %d files, %d chunks, %d vectors stored",
#                 project_id,
#                 len(documents),
#                 len(chunks),
#                 stored_vectors,
#             )

#             return {
#                 "project_id": project_id,
#                 "total_files": len(documents),
#                 "total_chunks": len(chunks),
#                 "stored_vectors": stored_vectors,
#             }

#         finally:
#             if should_cleanup and repo_path:
#                 shutil.rmtree(repo_path, ignore_errors=True)

#     # --------------------------------------------------
#     # Repository Chat
#     # --------------------------------------------------

#     def chat(
#         self,
#         project_id: str,
#         question: str,
#         history=None,
#         top_k: int = 8,
#     ) -> dict:
#         if not project_id or not project_id.strip():
#             raise InvalidRequestError("project_id is required.")

#         if not question or not question.strip():
#             raise InvalidRequestError("question is required.")

#         retrieved_chunks = self.retriever.retrieve(
#             project_id=project_id,
#             question=question,
#             top_k=top_k,
#         )

#         if not retrieved_chunks:
#             raise RepositoryNotIndexedError(
#                 "Repository is not indexed or no relevant context found."
#             )

#         prompt = self.prompt_builder.build_prompt(
#             question=question,
#             retrieved_chunks=retrieved_chunks,
#             history=history,
#         )

#         answer = self.gemini_service.ask(prompt)

#         return {
#             "answer": answer,
#             "sources": sorted(
#                 {chunk["metadata"]["path"] for chunk in retrieved_chunks}
#             ),
#         }

import shutil
import os
from sentence_transformers import SentenceTransformer

from services.github_loader import GitHubLoader
from services.repository_loader import RepositoryLoader
from services.chunker import CodeChunker
from services.embedding_service import EmbeddingService
from services.vector_store import VectorStore
from services.retriever import Retriever
from services.rag_chain import RAGChain


class RAGPipeline:

    def __init__(self):
        shared_model = SentenceTransformer("all-MiniLM-L6-v2")

        self.github_loader = GitHubLoader()
        self.repository_loader = RepositoryLoader()
        self.chunker = CodeChunker()
        self.embedding_service = EmbeddingService(shared_model)
        self.vector_store = VectorStore()
        self.retriever = Retriever(self.embedding_service,self.vector_store,)
        self.rag_chain = RAGChain()

    # --------------------------------------------------
    # Repository Indexing
    # --------------------------------------------------

    def index_repository(
        self,
        project_id: str,
        github_url: str = None,
        local_path: str = None,
    ):
        repo_path = None
        should_cleanup = False

        try:
            if github_url:
                repo_path = self.github_loader.clone_repository(github_url)
                should_cleanup = True

            elif local_path:
                repo_path = local_path

            else:
                raise ValueError(
                    "Either github_url or local_path is required."
                )

            print("=" * 80)
            print("Repository path:", repo_path)
            print("Exists:", os.path.exists(repo_path))
            print("Is Dir:", os.path.isdir(repo_path))

            if os.path.exists(repo_path):
                print("Files:", os.listdir(repo_path))

            print("=" * 80)

            documents = self.repository_loader.load_repository(repo_path)

            if not documents:
                raise ValueError(
                    "No supported source code files found in the repository."
                )

            chunks = self.chunker.chunk_documents(documents)

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
                "total_files": len(documents),
                "total_chunks": len(chunks),
                "stored_vectors": stored_vectors,
            }

        finally:
            if should_cleanup and repo_path:
                shutil.rmtree(repo_path, ignore_errors=True)

    # --------------------------------------------------
    # Repository Chat
    # --------------------------------------------------

    def chat(
        self,
        project_id: str,
        question: str,
        history=None,
    ):
        search_query = self.rag_chain.rewrite_query(
            question=question,
            history=history,
        )
        retrieved_chunks = self.retriever.retrieve(
            project_id=project_id,
            question=search_query,
        )

        if not retrieved_chunks:
            raise ValueError(
                "Repository is not indexed or no relevant context found."
            )

        answer = self.rag_chain.generate_answer(
            question=question,
            retrieved_chunks=retrieved_chunks,
            history=history,
        )

        return {
            "answer": answer,
            "sources": list(
                {
                    chunk["metadata"]["path"]
                    for chunk in retrieved_chunks
                    if chunk.get("metadata", {}).get("path")
                }
            ),
        }
