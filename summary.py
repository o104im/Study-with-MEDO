from flask import Blueprint, request, jsonify, current_app
import os
from src.utils.file_processor import FileProcessor

summary_bp = Blueprint('summary', __name__)

@summary_bp.route('/summarize', methods=['POST'])
def summarize_file():
    # التحقق من وجود البيانات المطلوبة
    if not request.json or 'filename' not in request.json:
        return jsonify({'error': 'Missing filename parameter'}), 400
    
    filename = request.json['filename']
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    
    # التحقق من وجود الملف
    if not os.path.exists(file_path):
        return jsonify({'error': 'File not found'}), 404
    
    # الحصول على نسبة التلخيص (اختياري)
    ratio = request.json.get('ratio', 0.3)
    try:
        ratio = float(ratio)
        if ratio <= 0 or ratio > 1:
            ratio = 0.3
    except (ValueError, TypeError):
        ratio = 0.3
    
    try:
        # معالجة الملف وتلخيصه
        summary = FileProcessor.process_file(file_path, 'summarize', ratio=ratio)
        
        return jsonify({
            'summary': summary,
            'original_filename': filename.split('_', 1)[1] if '_' in filename else filename
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

