# 🚀 DevPilot — Repository-Aware AI Developer Assistant

DevPilot is a full-stack AI-powered developer assistant that enables developers to chat with any GitHub repository or uploaded ZIP project using Retrieval-Augmented Generation (RAG).

Instead of generating generic AI responses, DevPilot indexes the repository, creates vector embeddings, retrieves the most relevant source code, and uses Google Gemini to generate repository-grounded answers with contextual accuracy.

Whether you're onboarding to a new project, exploring an open-source repository, or understanding your own codebase, DevPilot acts like an AI teammate that understands the repository before answering.

---

## ✨ Features

- 🔐 JWT Authentication & Authorization
- 📂 Import repositories via GitHub URL
- 📦 Upload ZIP repositories
- 🤖 Repository-aware AI Chat
- 🧠 Retrieval-Augmented Generation (RAG)
- 🔍 Semantic Code Search
- 📄 Automatic Repository Indexing
- 💬 Context-aware Multi-turn Conversations
- 📚 Source File Attribution
- 📊 Repository Dashboard
- ⚡ FastAPI AI Microservice
- 🐳 Docker & Docker Compose Support
- 🌐 MERN Stack Architecture

---

# 🏗️ System Architecture

```text
                    +----------------------+
                    |      React App       |
                    +----------+-----------+
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
 GitHub Clone     ZIP Upload    Chunk Files      ChromaDB
 Repository       Extraction                    Vector Store
                             |
                             ▼
                 Sentence Transformer Embeddings
                             |
                             ▼
                    Semantic Similarity Search
                             |
                             ▼
                     Google Gemini 2.5 Flash
                             |
                             ▼
                 Repository-grounded AI Response
```

---

# 📂 Project Structure

```text
DevPilot
│
├── client/                    # React Frontend
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── nginx.conf
│
├── server/                    # Express Backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── Dockerfile
│
├── ai-service/                # FastAPI AI Service
│   ├── routes/
│   ├── services/
│   │   ├── github_loader.py
│   │   ├── repository_loader.py
│   │   ├── chunker.py
│   │   ├── embedding_service.py
│   │   ├── vector_store.py
│   │   ├── retriever.py
│   │   ├── prompt_builder.py
│   │   ├── gemini_service.py
│   │   └── rag_pipeline.py
│   ├── app.py
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

# ⚙️ Tech Stack

| Layer | Technologies |
|--------|--------------|
| Frontend | React.js, Vite, Tailwind CSS, React Router, Axios, React Markdown |
| Backend | Node.js, Express.js, MongoDB, Mongoose, JWT |
| AI Service | FastAPI, Python |
| LLM | Google Gemini 2.5 Flash |
| RAG | LangChain, Sentence Transformers, ChromaDB |
| Embedding Model | all-MiniLM-L6-v2 |
| DevOps | Docker, Docker Compose, Nginx |
| Tools | Git, GitHub, Postman |

---

# ⚙️ How It Works

## 1. User Adds Repository

Users can either:

- Import a public GitHub repository
- Upload a ZIP project

↓

## 2. Repository Loading

The AI service:

- Clones GitHub repositories
- Extracts uploaded ZIP files

↓

## 3. Repository Parsing

Only supported source code files are loaded.

↓

## 4. Intelligent Chunking

Large files are divided into semantic chunks.

↓

## 5. Embedding Generation

Each chunk is converted into dense vector embeddings using Sentence Transformers.

↓

## 6. Vector Storage

Embeddings are stored inside ChromaDB.

↓

## 7. AI Chat

When a user asks a question:

- The question is embedded.
- Similar repository chunks are retrieved.
- Relevant context is injected into the prompt.
- Google Gemini generates a repository-grounded response.

---

# 📸 Screenshots

## Landing Page
![Landing Page](assets/screenshots/landing-page.png)

## Register
![Register](assets/screenshots/register.png)

## Login
![Login](assets/screenshots/login.png)

## Dashboard
![Dashboard](assets/screenshots/dashboard.png)

## Add GitHub Repository
![Add GitHub Repository](assets/screenshots/add-repository.png)

## Repository Indexing
![Repository Indexing](assets/screenshots/repository-indexing.png)

## AI Chat
![AI Chat](assets/screenshots/ai-chat.png)

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/Sourav-Yogi/DevPilot-AI_Developer_Assistant.git

cd DevPilot-AI_Developer_Assistant
```

---

# 🐳 Run with Docker

```bash
docker compose up --build
```

The application will be available at:

- Frontend → http://localhost
- Backend → http://localhost:5000
- AI Service → http://localhost:8000

---

# 💻 Run Locally

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

## server/.env

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

AI_SERVICE_URL=http://127.0.0.1:8000
```

---

## ai-service/.env

```env
GEMINI_API_KEY=your_google_gemini_api_key

CHROMA_DB_PATH=/app/data/chroma_db
```

---

# 📈 Future Improvements

- Hybrid Search (Keyword + Semantic Search)
- Repository Visualization
- Repository Summarization
- Streaming AI Responses
- Pull Request Review Assistant
- Multi-Repository Chat
- Codebase Diff Analysis
- Reranking Pipeline
- File-aware Retrieval
- Agentic Repository Workflows

---

# 🧠 Key Learnings

This project helped me gain hands-on experience with:

- Retrieval-Augmented Generation (RAG)
- Vector Databases (ChromaDB)
- Semantic Search
- Embedding Models
- Prompt Engineering
- LangChain
- Google Gemini API
- FastAPI Microservices
- MERN Stack Architecture
- Docker & Docker Compose
- Repository Parsing
- AI System Design
- REST API Development

---

# 👨‍💻 Author

**Sourav Yogi**

- GitHub: https://github.com/Sourav-Yogi
- LinkedIn: https://www.linkedin.com/in/sourav-yogi

---

## ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub. It helps others discover the project and motivates further development.