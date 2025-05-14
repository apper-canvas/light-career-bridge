import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { logout } from '../features/auth/authSlice';
import getIcon from '../utils/iconUtils';

function UserMenu({ user, darkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const UserIcon = getIcon('User');
  const LogOutIcon = getIcon('LogOut');
  const SettingsIcon = getIcon('Settings');
  const BriefcaseIcon = getIcon('Briefcase');
  const BuildingIcon = getIcon('Building');
  const ChevronDownIcon = getIcon('ChevronDown');
  
  const handleLogout = () => {
    dispatch(logout());
    toast.success("You have been logged out successfully");
    navigate('/');
  };
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
      >
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
          {user?.userType === 'employer' ? <BuildingIcon size={16} className="text-primary" /> : <UserIcon size={16} className="text-primary" />}
        </div>
        <span className="text-sm font-medium hidden sm:block">{user?.name || 'User'}</span>
        <ChevronDownIcon size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-surface-800 rounded-lg shadow-lg border border-surface-200 dark:border-surface-700 z-10"
          >
            <div className="px-4 py-2 border-b border-surface-200 dark:border-surface-700">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-surface-500 dark:text-surface-400">{user?.email}</p>
              <div className="mt-1 flex items-center">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                  {user?.userType === 'employer' ? 'Employer' : 'Job Seeker'}
                </span>
              </div>
            </div>
            
            <div className="py-1">
              <a 
                href={user?.userType === 'jobseeker' ? "/profile/create" : "/profile"} 
                className="menu-item"
              >
                <UserIcon size={16} />
                <span>
                  {user?.userType === 'jobseeker' && !user?.hasProfile ? 'Create Profile' : 'Your Profile'}
                </span>
                
              </a>
              
              {user?.userType === 'employer' ? (
                <a href="/manage-jobs" className="menu-item">
                  <BuildingIcon size={16} />
                  <span>Manage Jobs</span>
                </a>
              ) : (
                <a href="/applications" className="menu-item">
                  <BriefcaseIcon size={16} />
                  <span>Your Applications</span>
                </a>
              )}
              
              <a href="/settings" className="menu-item">
                <SettingsIcon size={16} />
                <span>Settings</span>
              </a>
            </div>
            
            <div className="border-t border-surface-200 dark:border-surface-700 pt-1 mt-1">
              <button onClick={handleLogout} className="menu-item text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                <LogOutIcon size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserMenu;