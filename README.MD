# 🚀 DevPilot - Repository-Aware AI Developer Assistant

DevPilot is a full-stack AI-powered developer assistant that enables users to chat with any GitHub repository using Retrieval-Augmented Generation (RAG). It indexes the repository, generates vector embeddings, retrieves relevant source code, and uses Google Gemini to answer repository-specific questions with contextual accuracy.

Unlike a generic AI chatbot, DevPilot grounds every response in the indexed repository, helping developers understand unfamiliar codebases, architecture, APIs, workflows, and implementation details.

---

## ✨ Features

- 🔐 User Authentication (JWT)
- 📂 GitHub Repository Indexing
- 🤖 Repository-Aware AI Chat
- 🧠 Retrieval-Augmented Generation (RAG)
- 🔍 Semantic Code Search using Vector Embeddings
- 💬 Context-Aware Multi-turn Conversations
- 📄 Markdown Response Rendering
- 📚 Source File Attribution
- 📊 Repository Dashboard
- ⚡ FastAPI AI Microservice
- 🌐 MERN Stack Frontend & Backend

---

# 🏗️ System Architecture

```
                    +----------------------+
                    |      React App       |
                    +----------+-----------+
                               |
                               |
                     REST API (JWT)
                               |
                               ▼
                 +-------------------------+
                 | Node.js + Express Server |
                 +-----------+-------------+
                             |
                             |
                    AI Service Requests
                             |
                             ▼
               +---------------------------+
               |      FastAPI RAG Server    |
               +-------------+-------------+
                             |
         -----------------------------------------------
         |             |             |                  |
         ▼             ▼             ▼                  ▼
 GitHub Clone   Chunk Documents   Generate        ChromaDB
 Repository      Repository      Embeddings      Vector Store
                             |
                             ▼
                    Semantic Retrieval
                             |
                             ▼
                     Google Gemini API
                             |
                             ▼
                      Repository Answer
```

---

# 📂 Project Structure

```
DevPilot
│
├── client/                 # React Frontend
│
├── server/                 # Node.js Backend
│
└── ai-service/             # FastAPI RAG Service
    │
    ├── routes/
    ├── services/
    │   ├── github_loader.py
    │   ├── repository_loader.py
    │   ├── chunker.py
    │   ├── embedding_service.py
    │   ├── vector_store.py
    │   ├── retriever.py
    │   ├── prompt_builder.py
    │   ├── gemini_service.py
    │   └── rag_pipeline.py
    │
    └── app.py
```

---

# ⚙️ Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- React Markdown

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## AI Service

- FastAPI
- Python
- Google Gemini 2.5 Flash

---

## RAG Stack

- Sentence Transformers
- all-MiniLM-L6-v2
- ChromaDB
- Semantic Retrieval
- Repository Chunking

---

## Dev Tools

- Git
- GitHub
- Postman

---

# ⚙️ How It Works

## 1. User Adds Repository

The user submits a public GitHub repository URL.

↓

## 2. Repository Cloning

The AI service clones the repository locally.

↓

## 3. Repository Parsing

Supported source files are loaded.

↓

## 4. Chunking

Large files are split into meaningful chunks.

↓

## 5. Embedding Generation

Each chunk is converted into a dense vector using Sentence Transformers.

↓

## 6. Vector Storage

Embeddings are stored inside ChromaDB.

↓

## 7. User Chat

When a user asks a question:

- The question is embedded.
- Similar repository chunks are retrieved.
- Context is sent to Gemini.
- Gemini generates a repository-grounded response.

---

# 💬 Example Questions

- What does this repository do?
- Explain the project architecture.
- Explain authentication flow.
- How does the database work?
- Explain this API.
- Explain this function.
- How is JWT implemented?
- Which technologies are used?
- Explain the folder structure.
- Suggest improvements.

---

# 📸 Screenshots

> Add screenshots here

- Landing Page
- Dashboard
- Repository Indexing
- AI Chat
- Repository Details

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/yourusername/devpilot.git
```

---

## Frontend

```bash
cd client
npm install
npm run dev
```

---

## Backend

```bash
cd server
npm install
npm run dev
```

---

## AI Service

```bash
cd ai-service

uv sync

uv run uvicorn app:app --reload
```

---

# 🔑 Environment Variables

## Backend (.env)

```env
PORT=5000

MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_secret

AI_SERVICE_URL=http://127.0.0.1:8000
```

---

## AI Service (.env)

```env
GEMINI_API_KEY=your_google_gemini_api_key
```

---

# 🎯 Future Improvements

- Hybrid Search (BM25 + Vector Search)
- Response Streaming
- Clickable Source Files
- Repository Visualization
- Multi-Repository Chat
- Repository Diff Analysis
- Codebase Summarization
- GitHub Pull Request Review
- File-aware Retrieval
- Reranking Pipeline

---

# 🧠 Key Learnings

Through this project I learned:

- Retrieval-Augmented Generation (RAG)
- Vector Databases (ChromaDB)
- Semantic Search
- Embedding Models
- Prompt Engineering
- FastAPI Microservices
- MERN Stack Integration
- Repository Parsing
- AI System Design
- REST API Development

---

# 👨‍💻 Author

**Sourav Yogi**

- GitHub: https://github.com/Sourav-Yogi
- LinkedIn: https://linkedin.com/in/sourav-yogi

---

## ⭐ If you found this project helpful, consider giving it a star!