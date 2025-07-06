# 🧠 Smart Todo App (Next.js + Django + Supabase + LLaMA 7B)

An intelligent Plan Pilot todo app that combines a modern frontend, a powerful Django backend, local LLM-based AI, and a scalable cloud database. Built to demonstrate full-stack integration, backend API development, and local AI usage — all in one project.


## 🔧 Tech Stack

| Layer      | Tech Used                                 |
|------------|-------------------------------------------|
| Frontend   | Next.js, Tailwind CSS                     |
| Backend    | Django REST Framework                     |
| Database   | Supabase (PostgreSQL + Realtime)          |
| AI Layer   | LM Studio with LLaMA 7B Chat model        |
| Dev Tools  | Git, .env, REST APIs                      |


## ✨ Features

- ✅ Add, edit, delete, and complete tasks
- 🧠 AI-generated suggestions using LLaMA 7B (via LM Studio)
- 🧩 Supabase PostgreSQL used as database (accessed via Django ORM)
- 🔄 Backend APIs built using Django REST Framework
- 🎨 Fully responsive UI with Tailwind CSS
- 🔐 Environment secrets kept safe via `.env`

---

## 🗂️ Folder Structure
PlanPilot/
├── frontend/ # Next.js frontend (UI)
│ ├── app/ # Pages and components
│ └── utils/ai.js # LLM integration with LM Studio
├── backend/ # Django project
│ ├── smart_backend/ # Django settings and URLs
│ ├── todo/ # App logic, models, views, serializers
│ └── .env # Supabase credentials (ignored in git)
└── README.md


---

## 🧠 How AI Integration Works

- LM Studio runs locally at `http://localhost:1234`
- Frontend sends user task to this local server
- LLaMA 7B model (chat version) responds with suggestions, rewrites, etc.

> 💡 LM Studio eliminates the need for any external OpenAI API key or charges.

---

## 🧪 Setup Guide

### 1. Clone the Repo

```bash
git clone https://github.com/Diwasmishra/<repo-name>.git
cd PlanPilot
```

### 2. Backend (Django + Supabase)
📦 Backend Setup
```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # or source venv/bin/activate (Linux/Mac)
```
### 3. Install Requirements
```bash
pip install -r requirements.txt
```
### 3. 🔐 Configure Supabase
Go to https://supabase.com

Create a project and get:

SUPABASE_URL

SUPABASE_KEY

In .env file:
```bash
SUPABASE_URL=https://<your>.supabase.co
SUPABASE_KEY=your-supabase-key
```
### 3. Migrate & Run the Backend
```bash
python manage.py migrate
python manage.py runserver
```

### 4. Frontend (Next.js + Tailwind)
```bash
cd ../frontend
npm install
npm run dev
```

App runs at: http://localhost:3000

### 5. Run LM Studio
Download from https://lmstudio.ai

Load a chat-compatible GGUF model (like LLaMA 7B Chat)

Set LM Studio to listen at http://localhost:1234

Start the model — keep this running

  
### 🧹 Best Practices Followed  

1] .env never pushed 

2]AI model is self-hosted (no OpenAI key leakage)

3] Clear folder structure (frontend/backend)

4] Secrets managed securely

5] REST API properly modularized using Django

### 🔮 Future Roadmap  

🪪 Supabase Auth (email sign-in)

🔔 Email reminders

🧠 Prioritize tasks by urgency/effort

📱 PWA support

📦 Dockerize both frontend and backend

### 👨‍💻 About Me
Hi, I'm Diwas Mishra — a full-stack developer passionate about blending AI with robust backend systems.

🌐 https://www.linkedin.com/in/diwas-mishra-b2109a2a9

📧 mishradiwasbrijesh@gmail.com
