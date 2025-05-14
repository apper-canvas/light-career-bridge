import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { register } from '../features/auth/authSlice';
import getIcon from '../utils/iconUtils';
import { validateEmail, validatePassword, calculatePasswordStrength, getPasswordStrengthInfo } from '../utils/authUtils';
import JobSeekerRegistrationForm from '../components/JobSeekerRegistrationForm';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('jobseeker');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobSeekerInfo, setJobSeekerInfo] = useState({ education: '', experience: '', skills: [] });
  
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
  const CheckIcon = getIcon('Check');
  const XIcon = getIcon('X');
  const AlertCircleIcon = getIcon('AlertCircle');
  
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  
  const passwordStrength = useMemo(() => calculatePasswordStrength(password), [password]);
  const strengthInfo = useMemo(() => getPasswordStrengthInfo(passwordStrength), [passwordStrength]);
  
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
      newErrors.password = 'Password must meet all requirements below';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Validate job seeker specific fields if user is a job seeker
    if (userType === 'jobseeker') {
      if (!jobSeekerInfo.education) {
        newErrors.education = 'Education level is required';
      }
      if (!jobSeekerInfo.experience) {
        newErrors.experience = 'Experience level is required';
      }
      // Skills are optional, so no validation required
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle field blur to mark fields as touched
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };
  
  // Validate email on change if it's been touched
  const validateEmailOnChange = (value) => {
    setEmail(value);
    if (touched.email) {
      if (!value) {
        setErrors(prev => ({ ...prev, email: 'Email is required' }));
      } else if (!validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      } else {
        setErrors(prev => ({ ...prev, email: undefined }));
      }
    }
  };
  
  // Validate password on change if it's been touched
  const validatePasswordOnChange = (value) => {
    setPassword(value);
    if (touched.password) {
      if (!value) {
        setErrors(prev => ({ ...prev, password: 'Password is required' }));
      } else if (!validatePassword(value)) {
        setErrors(prev => ({ ...prev, password: 'Password must meet all requirements below' }));
      } else {
        setErrors(prev => ({ ...prev, password: undefined }));
      }
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Prepare registration data
      const registrationData = { 
        name, 
        email, 
        password, 
        userType 
      };
      
      setTimeout(() => {
        dispatch(register(userType === 'jobseeker' ? { ...registrationData, jobSeekerInfo } : registrationData))
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
            {errors.email && (
              <div className="validation-item text-red-500">
                <AlertCircleIcon size={16} />
                <span>{errors.email}</span>
              </div>
            )}
          </div>
          
          <div>
            <label htmlFor="password" className="form-label">Password</label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-surface-500">
                <LockIcon size={20} />
              </div>
              <input id="password" type={showPassword ? "text" : "password"} 
                className={`form-input pl-10 ${errors.password ? 'border-red-500' : ''}`} 
                placeholder="••••••••" value={password} 
                onChange={(e) => validatePasswordOnChange(e.target.value)}
                onBlur={() => handleBlur('password')} />
              <button type="button" className="absolute right-3 top-3 text-surface-500" 
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
            
            <div className="password-strength-meter">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className={`flex-1 ${i < passwordStrength ? `bg-${strengthInfo.color}-500` : ''}`}
                  style={{backgroundColor: i < passwordStrength ? 
                    (strengthInfo.color === 'red' ? '#ef4444' : 
                     strengthInfo.color === 'orange' ? '#f97316' : 
                     strengthInfo.color === 'yellow' ? '#eab308' : 
                     strengthInfo.color === 'green' ? '#22c55e' : '#94a3b8') : ''}}
                ></div>
              ))}
            </div>
            <div className="password-strength-label" style={{color: 
              strengthInfo.color === 'red' ? '#ef4444' : 
              strengthInfo.color === 'orange' ? '#f97316' : 
              strengthInfo.color === 'yellow' ? '#eab308' : 
              strengthInfo.color === 'green' ? '#22c55e' : '#94a3b8'
            }}>
              {password && `Password strength: ${strengthInfo.label}`}
            </div>
            
            {errors.password && (
              <div className="validation-item text-red-500">
                <AlertCircleIcon size={16} />
                <span>{errors.password}</span>
              </div>
            )}
            
            <div className="validation-list">
              <div className="validation-item" style={{color: /^.{8,}$/.test(password) ? '#22c55e' : '#94a3b8'}}>
                {/^.{8,}$/.test(password) ? <CheckIcon size={16} /> : <XIcon size={16} />}
                <span>At least 8 characters</span>
              </div>
              
              <div className="validation-item" style={{color: /[A-Z]/.test(password) ? '#22c55e' : '#94a3b8'}}>
                {/[A-Z]/.test(password) ? <CheckIcon size={16} /> : <XIcon size={16} />}
                <span>At least one uppercase letter</span>
              </div>
              
              <div className="validation-item" style={{color: /[a-z]/.test(password) ? '#22c55e' : '#94a3b8'}}>
                {/[a-z]/.test(password) ? <CheckIcon size={16} /> : <XIcon size={16} />}
                <span>At least one lowercase letter</span>
              </div>
              
              <div className="validation-item" style={{color: /[0-9]/.test(password) ? '#22c55e' : '#94a3b8'}}>
                {/[0-9]/.test(password) ? <CheckIcon size={16} /> : <XIcon size={16} />}
                <span>At least one number</span>
              </div>
              
              <div className="validation-item" style={{color: /[@$!%*?&=#_-]/.test(password) ? '#22c55e' : '#94a3b8'}}>
                {/[@$!%*?&=#_-]/.test(password) ? <CheckIcon size={16} /> : <XIcon size={16} />}
                <span>At least one special character</span>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-surface-500">
                <LockIcon size={20} />
              </div>
              <input id="confirmPassword" type={showPassword ? "text" : "password"} 
                className={`form-input pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`} 
                placeholder="••••••••" value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => handleBlur('confirmPassword')} />
            </div>
            {errors.confirmPassword && (
              <div className="validation-item text-red-500">
                <AlertCircleIcon size={16} />
                <span>{errors.confirmPassword}</span>
              </div>
            )}
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

          {/* Show job seeker specific form if user type is job seeker */}
          {userType === 'jobseeker' && (
            <JobSeekerRegistrationForm 
              jobSeekerInfo={jobSeekerInfo}
              setJobSeekerInfo={setJobSeekerInfo}
              errors={errors}
              handleBlur={handleBlur}
            />
          )}
          
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