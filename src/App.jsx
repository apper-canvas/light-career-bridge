import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthProtected from './components/AuthProtected';
import getIcon from './utils/iconUtils';
import UserMenu from './components/UserMenu';

function App() {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const MoonIcon = getIcon('Moon');
  const SunIcon = getIcon('Sun');
  const UserIcon = getIcon('User');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <header className="bg-white dark:bg-surface-800 shadow-sm py-3 px-4 sm:px-6 lg:px-8 border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-primary text-xl font-bold">Career<span className="text-secondary">Bridge</span></span>
          </a>
          
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <UserMenu user={user} darkMode={darkMode} />
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <a href="/login" className="px-4 py-2 text-sm font-medium text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition-colors">
                  Log In
                </a>
                <a href="/register" className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                  Sign Up
                </a>
              </div>
            )}
            
            <button
              aria-label="Toggle dark mode"
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-200 transition-all duration-300 hover:bg-surface-200 dark:hover:bg-surface-600">
              {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </button>
          </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <footer className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center text-surface-600 dark:text-surface-400 text-sm">
          &copy; {new Date().getFullYear()} CareerBridge. All rights reserved.
        </div>
      </footer>

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
}

export default App;