import os
from src.utils.pdf_processor import PDFProcessor
from src.utils.docx_processor import DocxProcessor
from src.utils.pptx_processor import PPTXProcessor
from src.utils.txt_processor import TxtProcessor

class FileProcessor:
    @staticmethod
    def get_processor(file_path):
        """الحصول على معالج الملف المناسب بناءً على نوع الملف"""
        _, file_extension = os.path.splitext(file_path)
        file_extension = file_extension.lower()
        
        if file_extension == '.pdf':
            return PDFProcessor(file_path)
        elif file_extension in ['.docx', '.doc']:
            return DocxProcessor(file_path)
        elif file_extension in ['.pptx', '.ppt']:
            return PPTXProcessor(file_path)
        elif file_extension == '.txt':
            return TxtProcessor(file_path)
        else:
            raise ValueError(f"Unsupported file type: {file_extension}")
    
    @staticmethod
    def process_file(file_path, operation, **kwargs):
        """معالجة الملف وفقًا للعملية المطلوبة"""
        processor = FileProcessor.get_processor(file_path)
        
        if operation == 'summarize':
            ratio = kwargs.get('ratio', 0.3)
            return processor.summarize(ratio=ratio)
        elif operation == 'generate_questions':
            question_type = kwargs.get('question_type', 'multiple-choice')
            num_questions = kwargs.get('num_questions', 5)
            return processor.generate_questions(question_type=question_type, num_questions=num_questions)
        elif operation == 'generate_mindmap':
            return processor.generate_mindmap_data()
        elif operation == 'get_text':
            return processor.get_text()
        else:
            raise ValueError(f"Unsupported operation: {operation}")

