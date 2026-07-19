# DevPilot - AI Developer Toolkit

DevPilot is a full-stack MERN application that helps developers automate common development tasks using Google's Gemini AI.

The application provides AI-powered code reviews, README generation, unit test generation, and keeps a history of all generated results for authenticated users.

---

## Features

- User authentication using JWT
- AI-powered code review
- Automatic README generation
- AI-generated unit tests
- Dashboard with user statistics
- History of previous AI requests
- Protected routes
- Responsive dashboard interface

---

## Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS v4
- React Router
- Axios
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Google Gemini API

---

## Project Structure

```
DevPilot/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── config/
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/your-username/devpilot.git

cd devpilot
```

---

### Install dependencies

Backend

```bash
cd server
npm install
```

Frontend

```bash
cd client
npm install
```

---

## Environment Variables

### Backend (.env)

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Running the Project

### Start Backend

```bash
cd server

npm run dev
```

### Start Frontend

```bash
cd client

npm run dev
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/profile | Get profile |

### AI

| Method | Endpoint |
|---------|----------|
| POST | /api/ai/review |
| POST | /api/ai/readme |
| POST | /api/ai/tests |

### Dashboard

| Method | Endpoint |
|---------|----------|
| GET | /api/dashboard/stats |

### History

| Method | Endpoint |
|---------|----------|
| GET | /api/history |
| GET | /api/history/:id |
| DELETE | /api/history/:id |

---

## Authentication Flow

1. User logs in.
2. Backend verifies credentials.
3. JWT token is generated.
4. Token is stored in localStorage.
5. Axios interceptor attaches the token to protected requests.
6. Express middleware validates the token before granting access.

---

## Screenshots

Add screenshots of:

- Login
- Register
- Dashboard
- Code Review
- README Generator
- Unit Test Generator
- History

---

## Future Improvements

- Refresh token authentication
- Markdown editor with live preview
- Export history as PDF
- Role-based authorization
- AI conversation history
- Better error handling
- Request caching

---

## License

This project is licensed under the MIT License.