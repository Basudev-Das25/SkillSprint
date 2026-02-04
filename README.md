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

## 📄 License
© 2026 AI Resume Intelligence. All rights reserved.
