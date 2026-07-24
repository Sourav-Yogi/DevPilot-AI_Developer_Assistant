from sentence_transformers import SentenceTransformer


class EmbeddingService:

    def __init__(self, model=None):

        if model is None:
            self.model = SentenceTransformer("all-MiniLM-L6-v2")
        else:
            self.model = model

    def generate_embeddings(self, chunks):

        embedded_chunks = []

        for chunk in chunks:

            embedding = self.model.encode(
                chunk["content"],
                convert_to_numpy=False,
            )

            embedded_chunk = chunk.copy()
            embedded_chunk["embedding"] = embedding.tolist()

            embedded_chunks.append(embedded_chunk)

        return embedded_chunks

    def generate_query_embedding(self, text: str):

        embedding = self.model.encode(
            text,
            convert_to_numpy=False,
        )

        return embedding.tolist()