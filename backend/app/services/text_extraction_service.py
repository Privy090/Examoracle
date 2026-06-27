class TextExtractionService:
    def extract(self, material_id: str) -> str:
        """Extract text from PDF, DOCX, TXT, or OCR-backed image material."""
        raise NotImplementedError
