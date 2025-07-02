import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { summarizeFile } from '../utils/api';

const SummaryResultPage = () => {
  const [summaryLength, setSummaryLength] = useState('medium'); // 'short', 'medium', 'detailed'
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [documentInfo, setDocumentInfo] = useState({
    name: '',
    uploadDate: new Date().toLocaleDateString('ar-SA')
  });
  
  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        // الحصول على معلومات الملف المرفوع من localStorage
        const fileData = JSON.parse(localStorage.getItem('uploadedFile'));
        if (!fileData || !fileData.filename) {
          throw new Error('لم يتم العثور على معلومات الملف');
        }
        
        setDocumentInfo({
          name: fileData.originalFilename,
          uploadDate: new Date().toLocaleDateString('ar-SA')
        });
        
        // تحديد نسبة التلخيص بناءً على الطول المطلوب
        let ratio = 0.3; // متوسط افتراضي
        if (summaryLength === 'short') {
          ratio = 0.15;
        } else if (summaryLength === 'detailed') {
          ratio = 0.6;
        }
        
        // طلب التلخيص من الخادم
        const response = await summarizeFile(fileData.filename, ratio);
        setSummary(response.summary);
      } catch (err) {
        console.error('Error fetching summary:', err);
        setError('حدث خطأ أثناء جلب التلخيص. الرجاء المحاولة مرة أخرى.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSummary();
  }, [summaryLength]);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">نتائج التلخيص</h1>
          <Link 
            to="/upload" 
            className="text-primary hover:underline flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            العودة إلى التحميل
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-gray-50 p-4 border-b">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{documentInfo.name}</h2>
                <div className="text-gray-600 text-sm mt-1">
                  تم الرفع في {documentInfo.uploadDate}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">طول التلخيص:</h3>
              <div className="flex space-x-4 space-x-reverse">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md ${
                    summaryLength === 'short' 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setSummaryLength('short')}
                >
                  قصير
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md ${
                    summaryLength === 'medium' 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setSummaryLength('medium')}
                >
                  متوسط
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md ${
                    summaryLength === 'detailed' 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setSummaryLength('detailed')}
                >
                  مفصل
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">الملخص:</h3>
              
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : error ? (
                <div className="p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              ) : (
                <div className="text-gray-800 leading-relaxed">
                  {summary}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-3">تنزيل الملخص:</h3>
            <div className="flex space-x-3 space-x-reverse">
              <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                PDF
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                DOCX
              </button>
              <button className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                TXT
              </button>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <h3 className="text-lg font-semibold mb-3">معالجة أخرى:</h3>
            <div className="flex space-x-3 space-x-reverse">
              <Link 
                to="/questions-result" 
                className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                إنشاء أسئلة
              </Link>
              <Link 
                to="/mindmap-result" 
                className="px-4 py-2 bg-accent text-white rounded-md hover:bg-orange-600 transition-colors"
              >
                إنشاء خريطة ذهنية
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SummaryResultPage;

