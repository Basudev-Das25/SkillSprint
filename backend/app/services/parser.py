import pdfplumber
import io

def extract_text_from_pdf(file_content: bytes) -> str:
    """Extract text from a PDF file byte stream."""
    text = ""
    with pdfplumber.open(io.BytesIO(file_content)) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text

def parse_resume(file_content: bytes, filename: str) -> str:
    """Determine file type and parse accordingly."""
    if filename.lower().endswith('.pdf'):
        return extract_text_from_pdf(file_content)
    # TODO: Implement DOCX parsing if needed using python-docx
    elif filename.lower().endswith('.docx'):
        return "DOCX parsing not yet implemented"
    else:
        return "Unsupported file format"
