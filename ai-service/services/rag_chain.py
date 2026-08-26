from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

from services.gemini_service import GeminiService


class RAGChain:

    def __init__(self):
        self.gemini = GeminiService()

        # --------------------------------------------------
        # Query Rewriting Chain
        # --------------------------------------------------

        self.query_rewrite_prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    """You rewrite a developer's current question into a standalone search query
for retrieving relevant code from the repository.

Use the previous conversation ONLY to understand what the current question refers to.

Rules:
- If the current question is already clear and standalone, return it unchanged.
- If it contains words like "it", "this", "that", "they", or "the previous one",
  resolve those references using the conversation.
- Preserve the user's actual intent.
- Do not turn the question into a list of technical keywords.
- Do not mention the conversation, RAG, chains, prompts, or retrieval.
- Return ONLY one natural-language search query.
- Do not use Markdown, backticks, quotes, or explanations.

Examples:

Previous conversation:
USER: Why is RAGPipeline using a chain?
ASSISTANT: RAGPipeline uses RAGChain to handle query rewriting and answer generation.

Current question:
how it is helping

Output:
How does RAGChain help RAGPipeline?

Previous conversation:
USER: Where is authentication implemented?
ASSISTANT: Authentication is handled by auth middleware.

Current question:
Which middleware handles it?

Output:
Which middleware handles authentication?

Previous conversation:
USER: What database does this project use?
ASSISTANT: The project uses MongoDB.

Current question:
Where is it connected?

Output:
Where is MongoDB connected in the project?
""",
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

        # --------------------------------------------------
        # Answer Generation Chain
        # --------------------------------------------------

        self.answer_prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    """You are DevPilot, an expert software engineer helping a developer understand their code repository.
        
        Use ONLY the provided repository context and conversation history.
        
        Rules:
        - Answer the user's question directly.
        - Use conversation history to understand follow-up questions.
        - Use the repository context as the source of truth for code-related facts.
        - Never invent files, functions, classes, APIs, or implementation details.
        - If the repository context does not contain enough information, clearly say so.
        - Explain code in a practical and developer-friendly way.
        - When referring to code, mention the relevant file path when useful.
        - If multiple files are involved, explain how they are connected.
        - Do not mention RAG, embeddings, vector databases, retrieval, prompts, or internal AI processing.
        - Do not generate a Sources section. Sources are provided separately by the application.
        - Use Markdown when useful.
        - Keep the answer focused on the user's question.
        
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

        self.answer_chain = (
            self.answer_prompt
            | self.gemini.model
            | StrOutputParser()
        )

    # --------------------------------------------------
    # Conversation History
    # --------------------------------------------------

    @staticmethod
    def _history_to_text(history=None) -> str:
        if not history:
            return "No previous conversation."

        # Keep only the most recent messages to avoid sending
        # unnecessarily large conversation history to Gemini.
        history = history[-6:]

        lines = []

        for message in history:
            role = getattr(message, "role", None)
            content = getattr(message, "content", None)

            if role is None and isinstance(message, dict):
                role = message.get("role", "user")

            if content is None and isinstance(message, dict):
                content = message.get("content", "")

            if content:
                lines.append(f"{str(role).upper()}: {content}")

        return "\n".join(lines)

    # --------------------------------------------------
    # Retrieved Context Formatting
    # --------------------------------------------------

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

    # --------------------------------------------------
    # Query Rewriting
    # --------------------------------------------------

    def rewrite_query(self, question: str, history=None) -> str:
        history_text = self._history_to_text(history)

        rewritten = self.query_rewrite_chain.invoke(
            {
                "history": history_text,
                "question": question,
            }
        ).strip()

        return rewritten or question

    # --------------------------------------------------
    # Answer Generation
    # --------------------------------------------------

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