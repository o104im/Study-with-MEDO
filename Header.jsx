import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header 
      className="bg-white shadow-sm py-4"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          تلخيصك الدراسي
        </Link>
        <nav>
          <ul className="flex space-x-6 space-x-reverse">
            <li>
              <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link to="/upload" className="text-gray-700 hover:text-primary transition-colors">
                رفع ملف
              </Link>
            </li>
            <li>
              <Link to="/features" className="text-gray-700 hover:text-primary transition-colors">
                المميزات
              </Link>
            </li>
            <li>
              <Link to="/how-to-use" className="text-gray-700 hover:text-primary transition-colors">
                كيفية الاستخدام
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;

