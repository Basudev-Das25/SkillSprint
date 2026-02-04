# AI Resume Intelligence & Skill Gap Analyzer

A powerful AI-driven platform that bridge the gap between your resume and your dream job. Upload your resume, paste a job description, and get instant skill-gap analysis, a personalized 30/60/90-day learning roadmap, and recruiter-style feedback.

![Screenshot](frontend/public/next.svg) <!-- Placeholder for actual screenshot if available -->

## 🚀 Features

- **Skill Intelligence**: Automated extraction of skills from your resume and comparison with JD requirements.
- **Match Score**: Precise calculation of how well your profile aligns with the role.
- **Personalized Roadmap**: Structured 30, 60, and 90-day learning plans including project ideas and resume highlights.
- **Recruiter Feedback**: Honest, AI-generated analysis of why your resume might be rejected and how to fix it.
- **ATS Optimization**: Direct suggestions on keywords and bullet point improvements.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: Vanilla CSS + TailwindCSS (for glassmorphism and layout)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Markdown Rendering**: [React Markdown](https://github.com/remarkjs/react-markdown)

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **AI Engine**: [Google Gemini 2.5 Flash](https://ai.google.dev/)
- **NLP**: [SpaCy](https://spacy.io/) & [Sentence-Transformers](https://www.sbert.net/)
- **PDF Parsing**: [pdfplumber](https://github.com/jsvine/pdfplumber)

## 📦 Setup & Installation

### Prerequisites
- Node.js (v18+)
- Python (3.9+)
- Google Gemini API Key

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables in `.env`:
   ```env
   GEMINI_API_KEY=your_api_key_here
   PORT=8000
   ```
5. Run the server:
   ```bash
   python app/main.py
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment Guide

This project is split into a **Frontend (Next.js)** and a **Backend (FastAPI)**.

### 1. Backend Deployment (Render / Railway / Docker)
Since the backend is a Python FastAPI server, it needs a host that supports long-running processes.

#### **Option A: Standard Deployment**
- **Service**: [Render](https://render.com/) or [Railway](https://railway.app/) are recommended.
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `python app/main.py` (or `uvicorn app.main:app --host 0.0.0.0 --port $PORT`)

#### **Option B: Docker Deployment**
If you prefer containerization:
- **Build**: `docker build -t resume-backend ./backend`
- **Run**: `docker run -p 8000:8000 -e GEMINI_API_KEY=your_key resume-backend`
- The Dockerfile is optimized to use the `$PORT` environment variable assigned by your cloud provider.
- **Environment Variables**:
    - `GEMINI_API_KEY`: Your Google AI API Key.
    - `PORT`: Usually set automatically by the host.

### 2. Frontend Deployment (Netlify)
The frontend is optimized for Netlify.
- **Link your repository** to Netlify.
- **Build Settings**:
    - **Base directory**: `frontend`
    - **Build command**: `npm run build`
    - **Publish directory**: `frontend/.next`
- **Environment Variables**:
    - `NEXT_PUBLIC_API_URL`: The full URL of your **deployed backend** (e.g., `https://your-backend.onrender.com`).

## 📄 License
© 2026 AI Resume Intelligence. All rights reserved.
