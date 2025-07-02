import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { uploadFile } from '../utils/api';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [processingType, setProcessingType] = useState('summary'); // 'summary', 'questions', 'mindmap'
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError(null);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'text/plain': ['.txt']
    },
    multiple: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('الرجاء اختيار ملف أولاً');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // رفع الملف إلى الخادم
      const uploadResponse = await uploadFile(file);
      
      // تخزين معلومات الملف في localStorage للاستخدام في الصفحات الأخرى
      localStorage.setItem('uploadedFile', JSON.stringify({
        filename: uploadResponse.filename,
        originalFilename: uploadResponse.original_filename
      }));
      
      // توجيه المستخدم إلى الصفحة المناسبة بناءً على نوع المعالجة
      if (processingType === 'summary') {
        navigate('/summary-result');
      } else if (processingType === 'questions') {
        navigate('/questions-result');
      } else if (processingType === 'mindmap') {
        navigate('/mindmap-result');
      }
    } catch (error) {
      console.error('Error processing file:', error);
      setError('حدث خطأ أثناء معالجة الملف. الرجاء المحاولة مرة أخرى.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-8">رفع الملفات التعليمية</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div 
            {...getRootProps()} 
            className={`dropzone border-2 border-dashed rounded-lg p-8 text-center cursor-pointer mb-6 ${
              isDragActive ? 'border-primary bg-blue-50' : 'border-gray-300'
            }`}
          >
            <input {...getInputProps()} />
            
            <div className="flex flex-col items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 text-secondary mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                />
              </svg>
              
              {file ? (
                <p className="text-lg">
                  تم اختيار: <span className="font-semibold">{file.name}</span>
                </p>
              ) : (
                <>
                  <p className="text-lg font-medium mb-1">اسحب وأفلت الملف هنا</p>
                  <p className="text-gray-500">أو</p>
                  <button className="mt-2 px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-600 transition-colors">
                    تصفح الملفات
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">أنواع الملفات المدعومة:</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center bg-gray-100 rounded-md px-4 py-2">
                <span className="text-red-500 font-bold mr-2">PDF</span>
                <span>.pdf</span>
              </div>
              <div className="flex items-center bg-gray-100 rounded-md px-4 py-2">
                <span className="text-orange-500 font-bold mr-2">PowerPoint</span>
                <span>.ppt, .pptx</span>
              </div>
              <div className="flex items-center bg-gray-100 rounded-md px-4 py-2">
                <span className="text-blue-500 font-bold mr-2">Word</span>
                <span>.doc, .docx</span>
              </div>
              <div className="flex items-center bg-gray-100 rounded-md px-4 py-2">
                <span className="text-gray-700 font-bold mr-2">Text</span>
                <span>.txt</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">اختر نوع المعالجة:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                className={`p-4 rounded-lg flex flex-col items-center ${
                  processingType === 'summary' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => setProcessingType('summary')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-medium">تلخيص</span>
              </button>
              
              <button
                type="button"
                className={`p-4 rounded-lg flex flex-col items-center ${
                  processingType === 'questions' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => setProcessingType('questions')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">إنشاء أسئلة</span>
              </button>
              
              <button
                type="button"
                className={`p-4 rounded-lg flex flex-col items-center ${
                  processingType === 'mindmap' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => setProcessingType('mindmap')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                <span className="font-medium">إنشاء خريطة ذهنية</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <div className="text-center">
            <button
              type="button"
              className="btn-primary w-full md:w-auto"
              onClick={handleSubmit}
              disabled={!file || processing}
            >
              {processing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري المعالجة...
                </span>
              ) : (
                'معالجة الملف'
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UploadPage;

