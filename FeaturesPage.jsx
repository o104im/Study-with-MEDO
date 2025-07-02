import { motion } from 'framer-motion';

const FeaturesPage = () => {
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

  const features = [
    {
      title: 'تلخيص الملفات',
      description: 'قم بتلخيص الملفات التعليمية بسرعة وكفاءة. يمكنك اختيار مستوى التلخيص (موجز، متوسط، مفصل) حسب احتياجاتك.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'bg-accent'
    },
    {
      title: 'إنشاء الأسئلة',
      description: 'توليد أسئلة متنوعة من محتوى الملفات، بما في ذلك أسئلة الاختيار من متعدد، الإجابات القصيرة، وأسئلة صح/خطأ.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-primary'
    },
    {
      title: 'الخرائط الذهنية',
      description: 'إنشاء خرائط ذهنية تفاعلية لتنظيم المعلومات وتسهيل فهمها. يمكنك تخصيص الألوان وتنزيل الخرائط بتنسيقات مختلفة.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      color: 'bg-secondary'
    },
    {
      title: 'دعم تنسيقات متعددة',
      description: 'يدعم الموقع العديد من تنسيقات الملفات بما في ذلك PDF وWord وPowerPoint وملفات النصوص العادية.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      color: 'bg-gray-700'
    },
    {
      title: 'تنزيل النتائج',
      description: 'يمكنك تنزيل نتائج التلخيص والأسئلة والخرائط الذهنية بتنسيقات مختلفة مثل PDF وDOCX وPNG.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      ),
      color: 'bg-green-600'
    },
    {
      title: 'واجهة سهلة الاستخدام',
      description: 'تصميم عصري وبسيط يسهل على الطلاب استخدام الموقع والاستفادة من جميع ميزاته.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-purple-600'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">مميزات الموقع</h1>
          <p className="text-xl text-gray-600">
            اكتشف كيف يمكن لموقعنا مساعدتك في دراستك وتحسين فهمك للمواد التعليمية.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
              variants={fadeIn}
            >
              <div className={`${feature.color} text-white p-3 rounded-full inline-block mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 bg-primary text-white p-8 rounded-lg text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">جاهز لتجربة هذه المميزات؟</h2>
          <p className="text-lg mb-6">
            ابدأ الآن برفع ملفك التعليمي واستفد من جميع الميزات المتاحة.
          </p>
          <a 
            href="/upload" 
            className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            ارفع ملفك الآن
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeaturesPage;

