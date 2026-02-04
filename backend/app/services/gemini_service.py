import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel('gemini-2.5-flash')

async def generate_roadmap(resume_text: str, jd_text: str, missing_skills: list):
    """Generate a personalized learning roadmap using Gemini."""
    prompt = f"""
    You are a career coach and technical mentor. 
    A candidate wants to apply for a job with the following description:
    ---
    {jd_text}
    ---
    Their current resume content is:
    ---
    {resume_text}
    ---
    Based on the analysis, they are missing these key skills: {', '.join(missing_skills)}
    
    Please generate a personalized 30/60/90-day learning and project roadmap to help them qualify for this role.
    
    Format the response as a JSON object with exactly these keys:
    - "thirty_day": An object with "learning_goals" (list), "project_focus" (object with "title", "description", "technologies"), and "expected_resume_bullets" (list).
    - "sixty_day": Same structure as thirty_day.
    - "ninety_day": Same structure as thirty_day.
    - "project_ideas": A separate list of additional long-term project ideas.
    - "resume_suggestions": A separate list of general ATS advice.

    Do not include markdown code blocks in your response, just the raw JSON.
    """
    
    response = await model.generate_content_async(prompt)
    return response.text

async def get_recruiter_feedback(resume_text: str, jd_text: str):
    """Generate recruiter-style feedback and ATS tips."""
    prompt = f"""
    Analyze this resume against the job description.
    Job Description: {jd_text}
    Resume: {resume_text}
    
    Give honest, recruiter-style feedback on:
    1. Why this resume might be rejected.
    2. ATS keyword gaps.
    3. Suggestions for bullet point improvements (use the X-Y-Z formula: Accomplished [X] as measured by [Y], by doing [Z]).
    
    Format the response in Markdown.
    """
    
    response = await model.generate_content_async(prompt)
    return response.text
