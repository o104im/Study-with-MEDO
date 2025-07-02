import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 py-8 mt-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">تلخيصك الدراسي</h3>
            <p className="text-gray-600">
              منصة تعليمية لمساعدة الطلاب في تلخيص الملفات وإنشاء أسئلة وخرائط ذهنية.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/upload" className="text-gray-600 hover:text-primary transition-colors">
                  رفع ملف
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-600 hover:text-primary transition-colors">
                  المميزات
                </Link>
              </li>
              <li>
                <Link to="/how-to-use" className="text-gray-600 hover:text-primary transition-colors">
                  كيفية الاستخدام
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
            <p className="text-gray-600">
              لديك أسئلة أو اقتراحات؟ لا تتردد في التواصل معنا.
            </p>
            <Link 
              to="/contact" 
              className="inline-block mt-2 text-primary hover:underline"
            >
              اتصل بنا
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500">
          <p>© {currentYear} تلخيصك الدراسي. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

