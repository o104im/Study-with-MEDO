from flask import Blueprint, request, jsonify, current_app
import os
from src.utils.file_processor import FileProcessor

mindmap_bp = Blueprint('mindmap', __name__)

@mindmap_bp.route('/generate-mindmap', methods=['POST'])
def generate_mindmap():
    # التحقق من وجود البيانات المطلوبة
    if not request.json or 'filename' not in request.json:
        return jsonify({'error': 'Missing filename parameter'}), 400
    
    filename = request.json['filename']
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    
    # التحقق من وجود الملف
    if not os.path.exists(file_path):
        return jsonify({'error': 'File not found'}), 404
    
    try:
        # معالجة الملف وتوليد بيانات الخريطة الذهنية
        mindmap_data = FileProcessor.process_file(file_path, 'generate_mindmap')
        
        return jsonify({
            'mindmap_data': mindmap_data,
            'original_filename': filename.split('_', 1)[1] if '_' in filename else filename
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

