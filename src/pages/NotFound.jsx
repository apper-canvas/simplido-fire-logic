import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const AlertCircleIcon = getIcon('AlertCircle');
const HomeIcon = getIcon('Home');

const NotFound = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center"
    >
      <div className="mb-8">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="w-24 h-24 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center mx-auto"
        >
          <AlertCircleIcon className="w-12 h-12 text-primary" />
        </motion.div>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          404
        </span>
      </h1>
      
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
      
      <p className="text-surface-600 dark:text-surface-400 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link 
          to="/" 
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-soft"
        >
          <HomeIcon className="w-5 h-5" />
          Back to Home
        </Link>
      </motion.div>
      
      <div className="mt-10">
        <div className="w-full max-w-lg h-px bg-gradient-to-r from-transparent via-surface-300 dark:via-surface-700 to-transparent"></div>
        <p className="mt-4 text-sm text-surface-500 dark:text-surface-400">
          If you think this is an error, please contact support.
        </p>
      </div>
    </motion.div>
  );
};

export default NotFound;