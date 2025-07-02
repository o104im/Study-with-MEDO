import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { generateMindmap } from '../utils/api';
import MindMapComponent from '../components/ui/MindMapComponent';

const MindMapResultPage = () => {
  const [mindmapData, setMindmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [documentInfo, setDocumentInfo] = useState({
    name: '',
    uploadDate: new Date().toLocaleDateString('ar-SA')
  });
  
  const mindmapRef = useRef(null);
  
  useEffect(() => {
    const fetchMindmap = async () => {
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
        
        // طلب بيانات الخريطة الذهنية من الخادم
        const response = await generateMindmap(fileData.filename);
        setMindmapData(response.mindmap_data);
      } catch (err) {
        console.error('Error fetching mindmap:', err);
        setError('حدث خطأ أثناء جلب الخريطة الذهنية. الرجاء المحاولة مرة أخرى.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMindmap();
  }, []);

  const downloadAsPng = () => {
    if (mindmapRef.current === null) {
      return;
    }
    
    toPng(mindmapRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `mindmap-${documentInfo.name}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Error exporting mindmap:', err);
      });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">الخريطة الذهنية</h1>
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
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <svg className="animate-spin h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : error ? (
              <div className="p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            ) : !mindmapData ? (
              <div className="text-center py-8 text-gray-500">
                لم يتم العثور على بيانات كافية لإنشاء خريطة ذهنية. الرجاء رفع ملف آخر.
              </div>
            ) : (
              <div ref={mindmapRef} className="border border-gray-200 rounded-lg overflow-hidden">
                <MindMapComponent data={mindmapData} />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-3">تنزيل الخريطة الذهنية:</h3>
            <div className="flex space-x-3 space-x-reverse">
              <button 
                onClick={downloadAsPng}
                disabled={loading || !mindmapData}
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                PNG
              </button>
              <button 
                disabled={loading || !mindmapData}
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                PDF
              </button>
              <button 
                disabled={loading || !mindmapData}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                SVG
              </button>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <h3 className="text-lg font-semibold mb-3">معالجة أخرى:</h3>
            <div className="flex space-x-3 space-x-reverse">
              <Link 
                to="/summary-result" 
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                تلخيص
              </Link>
              <Link 
                to="/questions-result" 
                className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                إنشاء أسئلة
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MindMapResultPage;

