import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { generateQuestions } from '../utils/api';

const QuestionsResultPage = () => {
  const [questionType, setQuestionType] = useState('multiple-choice'); // 'multiple-choice', 'short-answer', 'true-false'
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [documentInfo, setDocumentInfo] = useState({
    name: '',
    uploadDate: new Date().toLocaleDateString('ar-SA')
  });
  
  useEffect(() => {
    const fetchQuestions = async () => {
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
        
        // طلب الأسئلة من الخادم
        const response = await generateQuestions(fileData.filename, questionType, 5);
        setQuestions(response.questions || []);
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('حدث خطأ أثناء جلب الأسئلة. الرجاء المحاولة مرة أخرى.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuestions();
  }, [questionType]);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">الأسئلة المولدة</h1>
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
              <h3 className="text-lg font-semibold mb-3">نوع الأسئلة:</h3>
              <div className="flex space-x-4 space-x-reverse">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md ${
                    questionType === 'multiple-choice' 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setQuestionType('multiple-choice')}
                >
                  اختيار من متعدد
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md ${
                    questionType === 'short-answer' 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setQuestionType('short-answer')}
                >
                  إجابات قصيرة
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md ${
                    questionType === 'true-false' 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setQuestionType('true-false')}
                >
                  صح/خطأ
                </button>
              </div>
            </div>
            
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">الأسئلة:</h3>
              <button
                type="button"
                className="text-primary hover:underline flex items-center"
                onClick={() => setShowAnswers(!showAnswers)}
              >
                {showAnswers ? 'إخفاء الإجابات' : 'إظهار الإجابات'}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  {showAnswers ? (
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                  ) : (
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  )}
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
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
            ) : questions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                لم يتم العثور على أسئلة. حاول تغيير نوع الأسئلة أو رفع ملف آخر.
              </div>
            ) : (
              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div key={question.id} className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-medium mb-4">
                      {index + 1}. {question.question}
                    </h4>
                    
                    {questionType === 'multiple-choice' && (
                      <div className="space-y-3">
                        {question.options.map((option, optionIndex) => (
                          <div 
                            key={optionIndex}
                            className={`p-3 rounded-md ${
                              showAnswers && option === question.correctAnswer
                                ? 'bg-green-100 border border-green-300'
                                : 'bg-white border border-gray-200'
                            }`}
                          >
                            <label className="flex items-start">
                              <input 
                                type="radio" 
                                name={`question-${question.id}`} 
                                className="mt-1 ml-2" 
                                disabled={showAnswers}
                              />
                              <span>{option}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {questionType === 'short-answer' && (
                      <div>
                        <textarea 
                          className="w-full p-3 border border-gray-300 rounded-md" 
                          rows="3"
                          placeholder="اكتب إجابتك هنا..."
                          disabled={showAnswers}
                        ></textarea>
                        
                        {showAnswers && (
                          <div className="mt-3 p-3 bg-green-100 border border-green-300 rounded-md">
                            <p className="font-semibold">الإجابة المقترحة:</p>
                            <p>{question.answer}</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {questionType === 'true-false' && (
                      <div className="space-y-3">
                        <div className={`p-3 rounded-md ${
                          showAnswers && question.answer === true
                            ? 'bg-green-100 border border-green-300'
                            : 'bg-white border border-gray-200'
                        }`}>
                          <label className="flex items-center">
                            <input 
                              type="radio" 
                              name={`question-${question.id}`} 
                              className="ml-2" 
                              disabled={showAnswers}
                            />
                            <span>صحيح</span>
                          </label>
                        </div>
                        <div className={`p-3 rounded-md ${
                          showAnswers && question.answer === false
                            ? 'bg-green-100 border border-green-300'
                            : 'bg-white border border-gray-200'
                        }`}>
                          <label className="flex items-center">
                            <input 
                              type="radio" 
                              name={`question-${question.id}`} 
                              className="ml-2" 
                              disabled={showAnswers}
                            />
                            <span>خطأ</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-3">تنزيل الأسئلة:</h3>
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

export default QuestionsResultPage;

