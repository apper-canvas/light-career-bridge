import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function NotFound() {
  const HomeIcon = getIcon('Home');
  const AlertCircleIcon = getIcon('AlertCircle');

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <AlertCircleIcon className="mx-auto text-secondary w-16 h-16 sm:w-24 sm:h-24 mb-4" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 text-surface-800 dark:text-surface-100">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-surface-700 dark:text-surface-200">
          Page Not Found
        </h2>
        <p className="text-surface-600 dark:text-surface-400 max-w-md mx-auto text-base sm:text-lg">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
        >
          <HomeIcon size={18} />
          <span>Back to Home</span>
        </Link>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10 p-6 bg-surface-100 dark:bg-surface-800 rounded-xl max-w-md mx-auto"
      >
        <h3 className="text-lg font-medium mb-2 text-surface-800 dark:text-surface-200">Looking for a job or talent?</h3>
        <p className="text-surface-600 dark:text-surface-400 mb-4">
          CareerBridge connects talented individuals with opportunities that match their skills and passion.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn btn-outline">Find Jobs</Link>
          <Link to="/" className="btn btn-secondary">Post a Job</Link>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFound;