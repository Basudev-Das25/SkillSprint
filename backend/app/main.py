from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import json
from dotenv import load_dotenv
from services.parser import parse_resume
from services.nlp_engine import extract_skills, calculate_similarity, analyze_gap
from services.gemini_service import generate_roadmap, get_recruiter_feedback

load_dotenv()

app = FastAPI(title="AI Resume Intelligence API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "AI Resume Intelligence & Skill Gap Analyzer API is running"}

@app.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    try:
        # 1. Parse Resume
        resume_content = await resume.read()
        print(f"DEBUG: File uploaded: {resume.filename}, size: {len(resume_content)} bytes")
        resume_text = parse_resume(resume_content, resume.filename)
        
        print(f"DEBUG: Extracted text length: {len(resume_text)}")
        if len(resume_text.strip()) < 50:
            print(f"DEBUG: Extracted text preview: '{resume_text[:100]}...'")
            # If text is very short or empty, we have a problem
            if len(resume_text.strip()) == 0:
                raise HTTPException(status_code=400, detail="Could not extract text from the PDF. It might be a scanned image or corrupted.")

        if "Unsupported" in resume_text:
            raise HTTPException(status_code=400, detail=resume_text)

        # 2. NLP Extraction & Analysis
        resume_skills = extract_skills(resume_text)
        jd_skills = extract_skills(job_description) # Simple extraction for now
        
        # 3. Gap Analysis
        gap_results = analyze_gap(resume_skills, jd_skills)
        match_score = calculate_similarity(resume_text, job_description)

        # 4. Gemini - Roadmap & Feedback
        roadmap_raw = await generate_roadmap(resume_text, job_description, gap_results["missing"])
        
        # Clean up Gemini JSON response if it has markdown formatting
        roadmap_json_str = roadmap_raw.replace('```json', '').replace('```', '').strip()
        try:
            roadmap = json.loads(roadmap_json_str)
        except:
            roadmap = {"error": "Failed to parse roadmap", "raw": roadmap_raw}

        feedback = await get_recruiter_feedback(resume_text, job_description)

        return {
            "filename": resume.filename,
            "match_score": round(match_score * 100, 2),
            "skills_analysis": gap_results,
            "roadmap": roadmap,
            "recruiter_feedback": feedback
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=int(os.getenv("PORT", 8000)), reload=True)
