from langchain_text_splitters import RecursiveCharacterTextSplitter


class CodeChunker:

    def __init__(
        self,
        chunk_size: int = 1000,
        chunk_overlap: int = 200,
    ):

        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=[
                "\nclass ",
                "\ndef ",
                "\nfunction ",
                "\n\n",
                "\n",
                " ",
                "",
            ],
        )

    def chunk_documents(self, documents):

        chunks = []

        for document in documents:

            split_chunks = self.text_splitter.split_text(
                document["content"]
            )

            for index, chunk in enumerate(split_chunks):

                chunks.append(
                    {
                        "content": chunk,
                        "path": document["path"],
                        "extension": document["extension"],
                        "chunk_index": index,
                    }
                )

        return chunks