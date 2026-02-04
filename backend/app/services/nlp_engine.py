import spacy
from sentence_transformers import SentenceTransformer, util
import numpy as np

# Load Spacy model
# Note: We ensure en_core_web_sm is pre-downloaded in the build step
nlp = spacy.load("en_core_web_sm")

# Load SBERT model for embeddings (good for similarity)
model = SentenceTransformer('all-MiniLM-L6-v2')

# Common technical skills for AI/ML and Web Dev (Expandable)
SKILLS_DB = [
    "python", "javascript", "react", "node.js", "fastapi", "flask", "django", 
    "tensorflow", "pytorch", "keras", "scikit-learn", "pandas", "numpy", 
    "sql", "mongodb", "postgresql", "docker", "kubernetes", "aws", "azure", 
    "machine learning", "deep learning", "nlp", "computer vision", "data science"
]

def extract_skills(text: str):
    """
    Extract skills using keyword matching and SpaCy NER.
    """
    text_lower = text.lower()
    found_skills = []
    
    # 1. Keyword matching
    for skill in SKILLS_DB:
        if skill in text_lower:
            found_skills.append(skill)
            
    # 2. Add SpaCy NER as fallback for unknown entities
    doc = nlp(text)
    potential_skills = [ent.text.lower() for ent in doc.ents if ent.label_ in ["ORG", "PRODUCT"]]
    found_skills.extend(potential_skills)
    
    return list(set(found_skills))

def calculate_similarity(resume_text: str, jd_text: str):
    """Calculate cosine similarity between resume and JD."""
    resume_embedding = model.encode(resume_text, convert_to_tensor=True)
    jd_embedding = model.encode(jd_text, convert_to_tensor=True)
    
    cosine_score = util.cos_sim(resume_embedding, jd_embedding)
    return float(cosine_score[0][0])

def analyze_gap(resume_skills: list, jd_skills: list):
    """Identify missing and matching skills."""
    resume_skills_set = set([s.lower() for s in resume_skills])
    jd_skills_set = set([s.lower() for s in jd_skills])
    
    matching = list(resume_skills_set.intersection(jd_skills_set))
    missing = list(jd_skills_set - resume_skills_set)
    
    return {
        "matching": matching,
        "missing": missing
    }
