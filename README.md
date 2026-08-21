# 🤖 Sahayak AI

Sahayak AI is an **AI-powered intelligent assistant** designed to help users interact with AI, access useful information, and receive intelligent responses through a modern and user-friendly web interface.

The project combines a **Next.js frontend**, **Python FastAPI backend**, and AI-powered services to create a practical full-stack AI assistant.

---

## 🚀 Project Overview

Sahayak AI is a full-stack AI application built with separate frontend and backend services.

The platform allows users to interact with an intelligent assistant through a modern web dashboard. The backend processes user requests and integrates AI services to generate responses and retrieve relevant information.

### Main Components

- 🌐 Modern web-based user interface
- 🤖 AI-powered conversational assistant
- ⚡ FastAPI backend
- 🧠 Generative AI integration
- 🔍 Web information retrieval
- 🔄 Streaming AI responses
- ☁️ Cloud deployment support
- 📱 Responsive user interface

---

# ✨ Features

- 🤖 AI-powered conversational assistant
- 💬 Natural language interaction
- ⚡ Fast and scalable FastAPI backend
- 🌐 Web information retrieval
- 🧠 Google Gemini AI integration
- 🔄 Streaming AI responses
- 📱 Responsive and modern user interface
- 🔐 Secure environment variable support
- ☁️ Cloud deployment using Render and Vercel
- 🔗 Separate frontend and backend architecture

---

# 🛠️ Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- HTML
- CSS

## Backend

- Python
- FastAPI
- Uvicorn
- Gunicorn
- Pydantic

## AI & APIs

- Google Gemini API
- Firecrawl API

## Deployment

- Render
- Vercel

## Version Control

- Git
- GitHub

---

# 📁 Project Structure

```text
Sahayak_AI/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   │
│   │   └── services/
│   │       └── ai_service.py
│   │
│   └── requirements.txt
│
├── frontend_template/
│
├── package.json
├── render.yaml
└── README.md
```

---

# ⚙️ Installation and Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/parthshandilya2007-ai/Sahayak_AI.git
```

Move into the project directory:

```bash
cd Sahayak_AI
```

---

# 🐍 Backend Setup

Move to the backend directory:

```bash
cd backend
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

Run the FastAPI application:

```bash
uvicorn app.main:app --reload
```

---

# 🌐 Frontend Setup

Open a new terminal and move to the frontend directory:

```bash
cd frontend_template
```

Install dependencies:

```bash
npm install --legacy-peer-deps
```

Run the development server:

```bash
npm run dev
```

---

# 🔐 Environment Variables

The project uses API keys for AI and web information services.

Create environment variables:

```env
GEMINI_API_KEY=your_gemini_api_key
FIRECRAWL_API_KEY=your_firecrawl_api_key
```

⚠️ **Important:** Never upload your API keys directly to GitHub.

Add these securely in:

- Render Environment Variables
- Vercel Environment Variables
- Local `.env` file

Add `.env` to your `.gitignore`:

```text
.env
```

---

# 🔌 API Endpoints

## Health Check

```http
GET /
```

This endpoint can be used to check whether the backend service is running properly.

## Ask the AI Assistant

```http
POST /api/ask/stream
Content-Type: application/json
```

Example request:

```json
{
  "text": "What are the major challenges in public healthcare?",
  "language": "en"
}
```

---

# ☁️ Deployment

Sahayak AI supports cloud deployment with separate frontend and backend services.

## Backend Deployment on Render

Use the following configuration:

```text
Environment: Python

Root Directory:
backend

Build Command:
pip install -r requirements.txt

Start Command:
gunicorn -w 1 -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:$PORT
```

### Required Environment Variables

Add these variables in Render:

```text
GEMINI_API_KEY
FIRECRAWL_API_KEY
```

---

## Frontend Deployment

The frontend is built using Next.js.

### Build Command

```bash
npm install --legacy-peer-deps && npm run build
```

### Start Command

```bash
npm start
```

---

# 🧠 How It Works

```text
User
  │
  ▼
Next.js Frontend
  │
  ▼
FastAPI Backend
  │
  ├──────────────► Google Gemini AI
  │
  └──────────────► Firecrawl API
                        │
                        ▼
                  AI Generated Response
                        │
                        ▼
                      User
```

The user enters a query through the frontend dashboard. The request is sent to the FastAPI backend, which processes the request and communicates with AI and web information services.

The generated response is then sent back to the user interface.

---

# 👥 Contributors

This project was developed collaboratively by the ** Team Codelith **.

| Name | Contribution |
|------|-------------|
| **Parth Shandilya** | Project development, frontend development, deployment, and overall project contribution |
| **Mohit Bajiya** | Backend development, API integration, AI integration, and deployment support |
| **Nishtha** | Project development and contribution |

---

# 🤝 Contributing

Contributions are welcome!

If you would like to contribute:

### 1. Fork the repository

### 2. Create a new branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make your changes

### 4. Commit your changes

```bash
git commit -m "Add new feature"
```

### 5. Push your branch

```bash
git push origin feature/your-feature-name
```

### 6. Create a Pull Request

---

# 📌 Future Improvements

Some possible future improvements include:

- 🎙️ Voice-based AI interaction
- 🌍 Multi-language support
- 📄 Document upload and analysis
- 🧠 Conversation memory
- 🔐 User authentication
- 📊 User dashboard and analytics
- 📱 Mobile application
- 🤖 Multiple AI model support
- 🔎 Improved web search capabilities
- 💾 Database integration
- 👤 Personalized AI assistant

---

# 📊 Project Status

🚧 **Actively Under Development**

Sahayak AI is continuously being improved with new features, better AI capabilities, user interface enhancements, and deployment improvements.

---

# ⭐ Support

If you like this project, please consider giving the repository a **Star ⭐**.

Your support motivates the team to continue improving the project.

---

# 📄 License

This project currently does not have a license.

You can add an open-source license such as the **MIT License** in the future.

---

# ❤️ Built By

## Sahayak AI Team

Built with ❤️ using:

**Python • FastAPI • Next.js • React • TypeScript • Google Gemini • Firecrawl • Render • Vercel**

---

## 🔗 Repository

https://github.com/parthshandilya2007-ai/Sahayak_AI
