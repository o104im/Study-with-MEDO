import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-8 md:mb-0"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                قم برفع ملفاتك الدراسية
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                واحصل على التلخيص والأسئلة والخرائط الذهنية.
              </p>
              <Link 
                to="/upload" 
                className="btn-primary inline-block"
              >
                ارفع الملف
              </Link>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="/src/assets/images/homepage_design.png" 
                alt="تلخيصك الدراسي" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            مميزات
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md text-center"
              variants={fadeIn}
            >
              <div className="feature-icon accent mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">التلخيص</h3>
              <p className="text-gray-600">
                لخص المستندات بسرعة وكفاءة لتوفير وقت المذاكرة.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md text-center"
              variants={fadeIn}
            >
              <div className="feature-icon primary mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">الأسئلة</h3>
              <p className="text-gray-600">
                إنشاء أسئلة متنوعة من المستندات لتعزيز الفهم والمراجعة.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md text-center"
              variants={fadeIn}
            >
              <div className="feature-icon secondary mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">الخرائط الذهنية</h3>
              <p className="text-gray-600">
                إنشاء خرائط ذهنية مفصلة ومنظمة لتسهيل فهم المعلومات.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            كيفية الاستخدام
          </motion.h2>
          
          <div className="max-w-3xl mx-auto">
            <motion.div 
              className="flex items-center mb-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">ارفع ملفك الدراسي</h3>
                <p className="text-gray-600">قم بتحميل ملف PDF أو Word أو PowerPoint أو TXT.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center mb-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">اختر نوع المعالجة</h3>
                <p className="text-gray-600">حدد ما إذا كنت تريد تلخيص الملف، إنشاء أسئلة، أو إنشاء خريطة ذهنية.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">استلم النتائج</h3>
                <p className="text-gray-600">احصل على نتائج عالية الجودة يمكنك تنزيلها أو مشاركتها.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-primary rounded-lg p-8 text-center text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">جاهز للبدء؟</h2>
            <p className="text-xl mb-6">ارفع ملفك الآن واحصل على نتائج فورية.</p>
            <Link 
              to="/upload" 
              className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              ابدأ الآن
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

