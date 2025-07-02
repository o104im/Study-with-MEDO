from flask import Blueprint, request, jsonify, current_app
import os
import uuid
from werkzeug.utils import secure_filename

file_upload_bp = Blueprint('file_upload', __name__)

ALLOWED_EXTENSIONS = {'pdf', 'docx', 'doc', 'pptx', 'ppt', 'txt'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@file_upload_bp.route('/upload', methods=['POST'])
def upload_file():
    # التحقق من وجود ملف في الطلب
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    # التحقق من أن المستخدم قد اختار ملفًا
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    # التحقق من أن الملف من النوع المسموح به
    if file and allowed_file(file.filename):
        # إنشاء اسم ملف آمن وفريد
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4()}_{filename}"
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], unique_filename)
        
        # حفظ الملف
        file.save(file_path)
        
        return jsonify({
            'message': 'File uploaded successfully',
            'filename': unique_filename,
            'original_filename': filename,
            'file_path': file_path
        }), 200
    
    return jsonify({'error': 'File type not allowed'}), 400

