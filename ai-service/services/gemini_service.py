# import logging
# import os

# import google.generativeai as genai

# from services.exceptions import GenerationError

# logger = logging.getLogger(__name__)


# class GeminiService:

#     def __init__(self, model_name: str = None):
#         api_key = os.getenv("GEMINI_API_KEY")

#         if not api_key:
#             raise ValueError("GEMINI_API_KEY not found in .env file")

#         genai.configure(api_key=api_key)

#         # Was hardcoded; now overridable via env/constructor without a code
#         # change (useful for swapping models per-environment or for tests).
#         self.model_name = model_name or os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
#         self.model = genai.GenerativeModel(model_name=self.model_name)

#     def ask(self, prompt: str) -> str:
#         try:
#             response = self.model.generate_content(
#                 prompt,
#                 generation_config={
#                     "temperature": 0.2,
#                     "max_output_tokens": 1024,
#                 },
#             )
#         except Exception as exc:
#             # SDK errors (rate limits, safety blocks, network issues) were
#             # previously unhandled and would bubble up as a bare 500 with
#             # whatever message the SDK happened to raise.
#             logger.exception("Gemini generation failed")
#             raise GenerationError(f"LLM generation failed: {exc}") from exc

#         if hasattr(response, "text") and response.text:
#             return response.text

#         # response.text raises internally if the response was blocked/empty;
#         # hasattr above guards that, but we still want a clear error rather
#         # than silently returning a placeholder string the caller can't
#         # distinguish from a real answer.
#         logger.warning("Gemini returned no text (possibly blocked or empty)")
#         raise GenerationError("The model returned no usable response.")

import os

from langchain_google_genai import ChatGoogleGenerativeAI


class GeminiService:

    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in .env file")

        self.model = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            google_api_key=api_key,
            temperature=0.2,
            max_output_tokens=1024,
        )

    def ask(self, messages) -> str:
        response = self.model.invoke(messages)
        content = response.content

        if isinstance(content, str):
            return content

        return "".join(
            block.get("text", "")
            for block in content
            if isinstance(block, dict)
        ) or "No response generated."
