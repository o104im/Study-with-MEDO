import { motion } from 'framer-motion';

const HowToUsePage = () => {
  const steps = [
    {
      title: 'اختر الملف',
      description: 'قم بتحميل ملف PDF أو Word أو PowerPoint أو TXT من جهازك. يمكنك سحب وإفلات الملف أو النقر على زر "تصفح الملفات".',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: 'اختر نوع المعالجة',
      description: 'حدد ما إذا كنت تريد تلخيص الملف، إنشاء أسئلة، أو إنشاء خريطة ذهنية. يمكنك اختيار واحدة من هذه الخيارات في كل مرة.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      )
    },
    {
      title: 'انتظر المعالجة',
      description: 'سيقوم النظام بمعالجة الملف وتحليل محتواه. قد يستغرق هذا بضع ثوانٍ اعتمادًا على حجم الملف وتعقيده.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'استعرض النتائج',
      description: 'بعد اكتمال المعالجة، ستظهر النتائج على الشاشة. يمكنك تخصيص النتائج حسب احتياجاتك، مثل ضبط طول التلخيص أو نوع الأسئلة.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: 'تنزيل أو مشاركة',
      description: 'يمكنك تنزيل النتائج بتنسيقات مختلفة مثل PDF أو DOCX أو PNG. كما يمكنك مشاركة النتائج مع الآخرين.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      )
    }
  ];

  const faqs = [
    {
      question: 'ما هي أنواع الملفات المدعومة؟',
      answer: 'يدعم الموقع ملفات PDF وWord (DOCX) وPowerPoint (PPTX) وملفات النصوص العادية (TXT).'
    },
    {
      question: 'هل هناك حد لحجم الملف؟',
      answer: 'نعم، الحد الأقصى لحجم الملف هو 10 ميجابايت. إذا كان لديك ملف أكبر، يمكنك تقسيمه إلى أجزاء أصغر.'
    },
    {
      question: 'كم من الوقت تستغرق معالجة الملف؟',
      answer: 'تعتمد مدة المعالجة على حجم الملف وتعقيده ونوع المعالجة المطلوبة. عادةً ما تستغرق بضع ثوانٍ إلى دقيقة واحدة.'
    },
    {
      question: 'هل يمكنني معالجة أكثر من ملف في نفس الوقت؟',
      answer: 'حاليًا، يمكنك معالجة ملف واحد فقط في كل مرة. نخطط لإضافة دعم المعالجة المتعددة في المستقبل.'
    },
    {
      question: 'هل يمكنني تخصيص نتائج المعالجة؟',
      answer: 'نعم، يمكنك تخصيص النتائج بعدة طرق. على سبيل المثال، يمكنك ضبط طول التلخيص (موجز، متوسط، مفصل) أو نوع الأسئلة (اختيار من متعدد، إجابات قصيرة، صح/خطأ) أو ألوان الخريطة الذهنية.'
    },
    {
      question: 'هل يمكنني استخدام الموقع على الهاتف المحمول؟',
      answer: 'نعم، الموقع متوافق مع جميع الأجهزة بما في ذلك الهواتف المحمولة والأجهزة اللوحية وأجهزة الكمبيوتر.'
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
          <h1 className="text-4xl font-bold mb-4">كيفية استخدام الموقع</h1>
          <p className="text-xl text-gray-600">
            دليل بسيط لمساعدتك في استخدام موقعنا بكفاءة.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">خطوات الاستخدام</h2>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className="flex flex-col md:flex-row items-start md:items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center">
                      {step.icon}
                    </div>
                    <div className="absolute top-0 right-0 -mr-2 -mt-2 bg-accent text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">الأسئلة الشائعة</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          className="bg-gray-50 p-8 rounded-lg text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h2 className="text-2xl font-bold mb-4">هل أنت مستعد للبدء؟</h2>
          <p className="text-lg mb-6">
            جرب الموقع الآن وشاهد كيف يمكنه مساعدتك في دراستك.
          </p>
          <a 
            href="/upload" 
            className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            ابدأ الآن
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HowToUsePage;

