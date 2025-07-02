from flask import Blueprint, request, jsonify, current_app
import os
from src.utils.file_processor import FileProcessor

questions_bp = Blueprint('questions', __name__)

@questions_bp.route('/generate-questions', methods=['POST'])
def generate_questions():
    # التحقق من وجود البيانات المطلوبة
    if not request.json or 'filename' not in request.json:
        return jsonify({'error': 'Missing filename parameter'}), 400
    
    filename = request.json['filename']
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    
    # التحقق من وجود الملف
    if not os.path.exists(file_path):
        return jsonify({'error': 'File not found'}), 404
    
    # الحصول على نوع الأسئلة وعددها (اختياري)
    question_type = request.json.get('question_type', 'multiple-choice')
    if question_type not in ['multiple-choice', 'short-answer', 'true-false']:
        question_type = 'multiple-choice'
    
    num_questions = request.json.get('num_questions', 5)
    try:
        num_questions = int(num_questions)
        if num_questions <= 0:
            num_questions = 5
    except (ValueError, TypeError):
        num_questions = 5
    
    try:
        # معالجة الملف وتوليد الأسئلة
        questions = FileProcessor.process_file(
            file_path, 
            'generate_questions', 
            question_type=question_type, 
            num_questions=num_questions
        )
        
        return jsonify({
            'questions': questions,
            'question_type': question_type,
            'original_filename': filename.split('_', 1)[1] if '_' in filename else filename
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

