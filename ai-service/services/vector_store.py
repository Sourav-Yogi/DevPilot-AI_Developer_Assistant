import logging
import os

import chromadb

logger = logging.getLogger(__name__)


class VectorStore:

    def __init__(self, path: str = None):
        # Was previously hardcoded to "./data/chroma_db", silently ignoring
        # the CHROMA_DB_PATH env var defined in .env / docker-compose.
        self.path = path or os.getenv("CHROMA_DB_PATH", "./data/chroma_db")
        self.client = chromadb.PersistentClient(path=self.path)
        logger.info("Chroma persistent client initialized at %s", self.path)

    def get_collection(self, project_id: str):
        return self.client.get_or_create_collection(name=project_id)

    def store_embeddings(self, project_id: str, embedded_chunks: list) -> int:
        if not embedded_chunks:
            return 0

        collection = self.get_collection(project_id)

        ids = []
        documents = []
        embeddings = []
        metadatas = []

        for index, chunk in enumerate(embedded_chunks):
            ids.append(f"{project_id}_{index}")
            documents.append(chunk["content"])
            embeddings.append(chunk["embedding"])
            metadatas.append(
                {
                    "path": chunk["path"],
                    "extension": chunk["extension"],
                    "chunk_index": chunk["chunk_index"],
                }
            )

        # NOTE: Chroma's .add() raises on duplicate IDs. Re-indexing the same
        # project_id twice currently fails upstream. If you want re-indexing
        # to be supported, delete/recreate the collection here first, e.g.:
        #   self.client.delete_collection(name=project_id)
        #   collection = self.get_collection(project_id)
        collection.add(
            ids=ids,
            documents=documents,
            embeddings=embeddings,
            metadatas=metadatas,
        )

        logger.info("Stored %d chunks for project '%s'", len(ids), project_id)
        return len(ids)

    def search(self, project_id: str, query_embedding: list, top_k: int = 8):
        collection = self.get_collection(project_id)

        return collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k,
        )