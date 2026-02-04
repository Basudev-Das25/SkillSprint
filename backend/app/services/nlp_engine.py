import numpy as np

# Lazy loading for models to ensure fast startup on Render
_nlp = None
_sbert_model = None

def get_nlp():
    global _nlp
    if _nlp is None:
        import spacy
        _nlp = spacy.load("en_core_web_sm")
    return _nlp

def get_sbert_model():
    global _sbert_model
    if _sbert_model is None:
        from sentence_transformers import SentenceTransformer
        _sbert_model = SentenceTransformer('all-MiniLM-L6-v2')
    return _sbert_model

def get_util():
    from sentence_transformers import util
    return util

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
    nlp = get_nlp()
    doc = nlp(text)
    potential_skills = [ent.text.lower() for ent in doc.ents if ent.label_ in ["ORG", "PRODUCT"]]
    found_skills.extend(potential_skills)
    
    return list(set(found_skills))

def calculate_similarity(resume_text: str, jd_text: str):
    """Calculate cosine similarity between resume and JD."""
    model = get_sbert_model()
    util = get_util()
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
