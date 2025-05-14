import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { register } from '../features/auth/authSlice';
import getIcon from '../utils/iconUtils';
import { validateEmail, validatePassword } from '../utils/authUtils';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('jobseeker');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector(state => state.auth);
  
  const UserPlusIcon = getIcon('UserPlus');
  const UserIcon = getIcon('User');
  const AtSignIcon = getIcon('AtSign');
  const LockIcon = getIcon('Lock');
  const EyeIcon = getIcon('Eye');
  const EyeOffIcon = getIcon('EyeOff');
  const BriefcaseIcon = getIcon('Briefcase');
  const BuildingIcon = getIcon('Building');
  
  const [showPassword, setShowPassword] = useState(false);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 8 characters with a number and a special character';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      setTimeout(() => {
        dispatch(register({ name, email, password, userType }))
          .unwrap()
          .then(() => {
            toast.success("Registration successful! You can now log in.");
            navigate('/login');
          })
          .catch((err) => {
            toast.error(err || "Registration failed. Please try again.");
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
            <UserPlusIcon size={32} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Create Your Account</h1>
          <p className="text-surface-600 dark:text-surface-400">Join CareerBridge today</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="form-label">Full Name</label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-surface-500">
                <UserIcon size={20} />
              </div>
              <input id="name" type="text" className={`form-input pl-10 ${errors.name ? 'border-red-500' : ''}`} 
                placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
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
            <label htmlFor="password" className="form-label">Password</label>
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
          
          <div>
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-surface-500">
                <LockIcon size={20} />
              </div>
              <input id="confirmPassword" type={showPassword ? "text" : "password"} 
                className={`form-input pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`} 
                placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          
          <div>
            <label className="form-label">I am a:</label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <button 
                type="button"
                className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                  userType === 'jobseeker' 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300'
                } hover:border-primary transition-all`}
                onClick={() => setUserType('jobseeker')}
              >
                <BriefcaseIcon size={24} className="mb-2" />
                <span className="font-medium">Job Seeker</span>
              </button>
              
              <button 
                type="button"
                className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                  userType === 'employer' 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300'
                } hover:border-primary transition-all`}
                onClick={() => setUserType('employer')}
              >
                <BuildingIcon size={24} className="mb-2" />
                <span className="font-medium">Employer</span>
              </button>
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Creating account...</span>
              </div>
            ) : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-surface-600 dark:text-surface-400">
            Already have an account? <Link to="/login" className="text-primary font-medium">Log in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;