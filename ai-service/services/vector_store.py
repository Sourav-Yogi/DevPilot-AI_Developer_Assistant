import chromadb


class VectorStore:

    def __init__(self):
        self.client = chromadb.PersistentClient(
            path="./data/chroma_db"
        )

    def get_collection(self, project_id: str):
        return self.client.get_or_create_collection(
            name=project_id
        )

    

    def store_embeddings(
        self,
        project_id: str,
        embedded_chunks: list,
    ):

        

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

        collection.add(
            ids=ids,
            documents=documents,
            embeddings=embeddings,
            metadatas=metadatas,
        )

        return len(ids)

    def search(
        self,
        project_id: str,
        query_embedding: list,
        top_k: int = 8,
    ):

        collection = self.get_collection(project_id)

        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k,
        )

        return results