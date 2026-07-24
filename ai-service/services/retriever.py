from services.vector_store import VectorStore


class Retriever:

    def __init__(self, embedding_service):

        self.embedding_service = embedding_service
        self.vector_store = VectorStore()

    def retrieve(
        self,
        project_id: str,
        question: str,
        top_k: int = 8,
    ):

        query_embedding = self.embedding_service.generate_query_embedding(
            question
        )

        results = self.vector_store.search(
            project_id=project_id,
            query_embedding=query_embedding,
            top_k=top_k,
        )

        documents = results.get("documents", [[]])[0]
        metadatas = results.get("metadatas", [[]])[0]
        distances = results.get("distances", [[]])[0]

        retrieved_chunks = []

        for document, metadata, distance in zip(
            documents,
            metadatas,
            distances,
        ):

            retrieved_chunks.append(
                {
                    "content": document,
                    "metadata": metadata,
                    "distance": distance,
                }
            )

        return retrieved_chunks