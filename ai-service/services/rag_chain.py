from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

from services.gemini_service import GeminiService


class RAGChain:

    def __init__(self):
        self.gemini = GeminiService()

        self.query_rewrite_prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    (
                        "You rewrite a developer's follow-up question into a "
                        "standalone search query for a repository code search system. "
                        "Use the conversation history to resolve references such as "
                        "'it', 'this function', or 'that middleware'. "
                        "Do not answer the question. Return only the rewritten query."
                    ),
                ),
                (
                    "human",
                    "Conversation history:\n{history}\n\nCurrent question:\n{question}",
                ),
            ]
        )

        self.query_rewrite_chain = (
            self.query_rewrite_prompt
            | self.gemini.model
            | StrOutputParser()
        )

        self.answer_prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    """You are DevPilot, an expert software engineer helping a developer explore a code repository.

Your ONLY repository-specific knowledge comes from the supplied repository context.

Strict rules:
1. Never invent APIs, classes, functions, database tables, features, or technologies.
2. If the repository context does not contain enough information, say:
   "I couldn't find enough information in the indexed repository to answer this confidently."
   Then briefly explain what is missing.
3. Never mention retrieved chunks, embeddings, vector databases, RAG, prompts, or retrieval.
4. Synthesize information from multiple files instead of simply copying repository text.
5. Use Markdown with short paragraphs, headings, and bullets when useful.
6. Do not expose your reasoning process.
7. Always finish with a Sources section containing only files actually used.

Repository context:
{context}

Conversation history:
{history}
""",
                ),
                (
                    "human",
                    "User question: {question}",
                ),
            ]
        )

        self.answer_chain = self.answer_prompt | self.gemini.model | StrOutputParser()

    @staticmethod
    def _history_to_text(history=None) -> str:
        if not history:
            return "No previous conversation."

        lines = []

        for message in history:
            role = getattr(message, "role", None)
            content = getattr(message, "content", None)

            if role is None and isinstance(message, dict):
                role = message.get("role", "user")

            if content is None and isinstance(message, dict):
                content = message.get("content", "")

            lines.append(f"{str(role).upper()}: {content}")

        return "\n".join(lines)

    @staticmethod
    def _format_context(retrieved_chunks: list) -> str:
        sections = []

        for chunk in retrieved_chunks:
            metadata = chunk.get("metadata", {})
            path = metadata.get("path", "unknown")

            sections.append(
                f"==================================================\n"
                f"FILE: {path}\n"
                f"==================================================\n\n"
                f"{chunk.get('content', '')}"
            )

        return "\n\n".join(sections)

    def rewrite_query(self, question: str, history=None) -> str:
        history_text = self._history_to_text(history)

        rewritten = self.query_rewrite_chain.invoke(
            {
                "history": history_text,
                "question": question,
            }
        ).strip()

        return rewritten or question

    def generate_answer(
        self,
        question: str,
        retrieved_chunks: list,
        history=None,
    ) -> str:
        return self.answer_chain.invoke(
            {
                "context": self._format_context(retrieved_chunks),
                "history": self._history_to_text(history),
                "question": question,
            }
        ).strip()
