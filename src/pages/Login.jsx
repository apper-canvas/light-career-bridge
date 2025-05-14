import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { login } from '../features/auth/authSlice';
import getIcon from '../utils/iconUtils';
import { validateEmail } from '../utils/authUtils';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector(state => state.auth);
  
  const UserIcon = getIcon('User');
  const LockIcon = getIcon('Lock');
  const AtSignIcon = getIcon('AtSign');
  const EyeIcon = getIcon('Eye');
  const EyeOffIcon = getIcon('EyeOff');
  
  const [showPassword, setShowPassword] = useState(false);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      setTimeout(() => {
        dispatch(login({ email, password }))
          .unwrap()
          .then(() => {
            toast.success("Login successful!");
            navigate('/');
          })
          .catch((err) => {
            toast.error(err || "Login failed. Please check your credentials.");
          })
          .finally(() => {
            setIsSubmitting(false);
          });
      }, 1000);
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-8"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserIcon size={32} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-surface-600 dark:text-surface-400">Log in to your CareerBridge account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="form-label">Email</label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-surface-500">
                <AtSignIcon size={20} />
              </div>
              <input id="email" type="email" className={`form-input pl-10 ${errors.email ? 'border-red-500' : ''}`} 
                placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="password" className="form-label flex justify-between">
              <span>Password</span>
              <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark">Forgot password?</a>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-surface-500">
                <LockIcon size={20} />
              </div>
              <input id="password" type={showPassword ? "text" : "password"} 
                className={`form-input pl-10 ${errors.password ? 'border-red-500' : ''}`} 
                placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="absolute right-3 top-3 text-surface-500" 
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          
          <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Logging in...</span>
              </div>
            ) : 'Log In'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-surface-600 dark:text-surface-400">
            Don't have an account? <Link to="/register" className="text-primary font-medium">Sign up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;