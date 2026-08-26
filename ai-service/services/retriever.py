class Retriever:

    def __init__(self, embedding_service, vector_store):
        # vector_store is now injected instead of instantiated here.
        # Previously this created its OWN VectorStore() (a second
        # PersistentClient onto the same Chroma path), duplicating the one
        # already held by RAGPipeline for no reason.
        self.embedding_service = embedding_service
        self.vector_store = vector_store

    def retrieve(self, project_id: str, question: str, top_k: int = 8):
        query_embedding = self.embedding_service.generate_query_embedding(question)

        results = self.vector_store.search(
            project_id=project_id,
            query_embedding=query_embedding,
            top_k=top_k,
        )

        documents = results.get("documents", [[]])[0]
        metadatas = results.get("metadatas", [[]])[0]
        distances = results.get("distances", [[]])[0]

        return [
            {"content": document, "metadata": metadata, "distance": distance}
            for document, metadata, distance in zip(documents, metadatas, distances)
        ]