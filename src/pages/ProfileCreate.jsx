import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import ResumeUpload from '../components/ResumeUpload';
import { 
  updatePersonalInfo, 
  addEducation, 
  updateEducation, 
  removeEducation,
  addExperience,
  updateExperience,
  removeExperience,
  updateSkills,
  saveProfile,
  uploadResume
} from '../features/profile/profileSlice';

function ProfileCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const profile = useSelector(state => state.profile);
  
  // Redirect if not a job seeker
  useEffect(() => {
    if (user && user.userType !== 'jobseeker') {
      toast.error('Profile creation is only available for job seekers');
      navigate('/');
    }
  }, [user, navigate]);

  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  
  // Form validation states
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Icons
  const UserIcon = getIcon('User');
  const BookIcon = getIcon('BookOpen');
  const BriefcaseIcon = getIcon('Briefcase');
  const TagIcon = getIcon('Tag');
  const FileIcon = getIcon('FileText');
  const PlusIcon = getIcon('Plus');
  const MinusIcon = getIcon('Minus');
  const ChevronRightIcon = getIcon('ChevronRight');
  const CheckIcon = getIcon('Check');
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const SaveIcon = getIcon('Save');
  
  // Handle field blur
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };
  
  // Personal info form validation
  const validatePersonalInfo = () => {
    const newErrors = {};
    
    if (!profile.personalInfo.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!profile.personalInfo.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!profile.personalInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s\-\(\)]{8,20}$/.test(profile.personalInfo.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!profile.personalInfo.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Education form validation
  const validateEducation = () => {
    const newErrors = {};
    
    profile.education.forEach((edu, index) => {
      if (!edu.institution.trim()) {
        newErrors[`education_${index}_institution`] = 'Institution is required';
      }
      
      if (!edu.degree.trim()) {
        newErrors[`education_${index}_degree`] = 'Degree is required';
      }
      
      if (!edu.startDate) {
        newErrors[`education_${index}_startDate`] = 'Start date is required';
      }
      
      if (!edu.current && !edu.endDate) {
        newErrors[`education_${index}_endDate`] = 'End date is required when not current';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Experience form validation
  const validateExperience = () => {
    const newErrors = {};
    
    profile.experience.forEach((exp, index) => {
      if (!exp.company.trim()) {
        newErrors[`experience_${index}_company`] = 'Company is required';
      }
      
      if (!exp.title.trim()) {
        newErrors[`experience_${index}_title`] = 'Job title is required';
      }
      
      if (!exp.startDate) {
        newErrors[`experience_${index}_startDate`] = 'Start date is required';
      }
      
      if (!exp.current && !exp.endDate) {
        newErrors[`experience_${index}_endDate`] = 'End date is required when not current';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Skills validation
  const validateSkills = () => {
    const newErrors = {};
    
    if (profile.skills.length === 0) {
      newErrors.skills = 'Please add at least one skill';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Resume validation
  const validateResume = () => {
    const newErrors = {};
    
    if (!profile.resume) {
      newErrors.resume = 'Please upload your resume';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Next step with validation
  const handleNextStep = () => {
    let isValid = false;
    
    switch (currentStep) {
      case 1:
        isValid = validatePersonalInfo();
        break;
      case 2:
        isValid = validateEducation();
        break;
      case 3:
        isValid = validateExperience();
        break;
      case 4:
        isValid = validateSkills();
        break;
      case 5:
        isValid = validateResume();
        if (isValid) {
          handleSubmit();
          return;
        }
        break;
      default:
        isValid = true;
    }
    
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Previous step
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Handle personal info changes
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    dispatch(updatePersonalInfo({ [name]: value }));
    
    // Clear error when typing if field was touched
    if (touched[name] && errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  // Handle education changes
  const handleEducationChange = (id, field, value) => {
    dispatch(updateEducation({ id, [field]: value }));
    
    // Clear error when typing
    const index = profile.education.findIndex(edu => edu.id === id);
    const errorKey = `education_${index}_${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: undefined }));
    }
  };
  
  // Handle experience changes
  const handleExperienceChange = (id, field, value) => {
    dispatch(updateExperience({ id, [field]: value }));
    
    // Clear error when typing
    const index = profile.experience.findIndex(exp => exp.id === id);
    const errorKey = `experience_${index}_${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: undefined }));
    }
  };
  
  // Handle skills input
  const [skillInput, setSkillInput] = useState('');
  
  const handleAddSkill = () => {
    if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
      dispatch(updateSkills([...profile.skills, skillInput.trim()]));
      setSkillInput('');
      
      // Clear error when adding skills
      if (errors.skills) {
        setErrors(prev => ({ ...prev, skills: undefined }));
      }
    }
  };
  
  const handleRemoveSkill = (skill) => {
    dispatch(updateSkills(profile.skills.filter(s => s !== skill)));
  };
  
  // Handle file upload
  const handleFileUpload = (file) => {
    dispatch(uploadResume(file));
    // Clear error when uploading
    if (errors.resume) {
      setErrors(prev => ({ ...prev, resume: undefined }));
    }
  };
  
  // Handle form submission
  const handleSubmit = () => {
    dispatch(saveProfile(profile))
      .unwrap()
      .then(() => {
        // Successfully saved
        navigate('/profile');
      })
      .catch(error => {
        toast.error(error || 'Failed to save profile');
      });
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Create Your Professional Profile</h1>
          <p className="text-surface-600 dark:text-surface-400">
            Complete your profile to get noticed by employers
          </p>
        </div>
        
        {/* Progress Steps */}
        <div className="flex justify-between mb-8 relative">
          <div className="absolute top-4 left-0 right-0 h-1 bg-surface-200 dark:bg-surface-700 -z-1"></div>
          
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep > index + 1 
                    ? 'bg-primary text-white' 
                    : currentStep === index + 1 
                      ? 'bg-primary text-white' 
                      : 'bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
                }`}
              >
                {currentStep > index + 1 ? (
                  <CheckIcon size={16} />
                ) : (
                  index + 1
                )}
              </div>
              <span className="text-xs mt-1 text-center">
                {index === 0 && 'Personal'}
                {index === 1 && 'Education'}
                {index === 2 && 'Experience'}
                {index === 3 && 'Skills'}
                {index === 4 && 'Resume'}
              </span>
            </div>
          ))}
        </div>
        
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <UserIcon size={20} className="text-primary" />
              <h2 className="text-xl font-semibold">Personal Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="form-label">Title</label>
                <select 
                  id="title" 
                  name="title" 
                  className="form-input"
                  value={profile.personalInfo.title}
                  onChange={handlePersonalInfoChange}
                >
                  <option value="">Select title</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Dr.">Dr.</option>
                  <option value="Prof.">Prof.</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="firstName" className="form-label">First Name*</label>
                <input 
                  id="firstName" 
                  name="firstName"
                  type="text" 
                  className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
                  placeholder="John"
                  value={profile.personalInfo.firstName}
                  onChange={handlePersonalInfoChange}
                  onBlur={() => handleBlur('firstName')}
                />
                {errors.firstName && <p className="form-error">{errors.firstName}</p>}
              </div>
              
              <div>
                <label htmlFor="lastName" className="form-label">Last Name*</label>
                <input 
                  id="lastName" 
                  name="lastName"
                  type="text" 
                  className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
                  placeholder="Doe"
                  value={profile.personalInfo.lastName}
                  onChange={handlePersonalInfoChange}
                  onBlur={() => handleBlur('lastName')}
                />
                {errors.lastName && <p className="form-error">{errors.lastName}</p>}
              </div>
              
              <div>
                <label htmlFor="phone" className="form-label">Phone*</label>
                <input 
                  id="phone" 
                  name="phone"
                  type="tel" 
                  className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder="+1 (555) 123-4567"
                  value={profile.personalInfo.phone}
                  onChange={handlePersonalInfoChange}
                  onBlur={() => handleBlur('phone')}
                />
                {errors.phone && <p className="form-error">{errors.phone}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="location" className="form-label">Location*</label>
                <input 
                  id="location" 
                  name="location"
                  type="text" 
                  className={`form-input ${errors.location ? 'border-red-500' : ''}`}
                  placeholder="City, State, Country"
                  value={profile.personalInfo.location}
                  onChange={handlePersonalInfoChange}
                  onBlur={() => handleBlur('location')}
                />
                {errors.location && <p className="form-error">{errors.location}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="bio" className="form-label">Professional Summary</label>
                <textarea 
                  id="bio" 
                  name="bio"
                  rows="4" 
                  className="form-input"
                  placeholder="A brief summary of your professional background, skills, and career goals"
                  value={profile.personalInfo.bio}
                  onChange={handlePersonalInfoChange}
                ></textarea>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Step 2: Education */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookIcon size={20} className="text-primary" />
                <h2 className="text-xl font-semibold">Education</h2>
              </div>
              <button 
                type="button"
                onClick={() => dispatch(addEducation())}
                className="btn bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600 p-2 rounded-lg"
              >
                <PlusIcon size={20} />
              </button>
            </div>
            
            {profile.education.map((edu, index) => (
              <div key={edu.id} className="card p-4 bg-surface-50 dark:bg-surface-800">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Education #{index + 1}</h3>
                  {profile.education.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => dispatch(removeEducation(edu.id))}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <MinusIcon size={18} />
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Institution*</label>
                    <input 
                      type="text" 
                      className={`form-input ${errors[`education_${index}_institution`] ? 'border-red-500' : ''}`}
                      placeholder="University Name"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(edu.id, 'institution', e.target.value)}
                    />
                    {errors[`education_${index}_institution`] && <p className="form-error">{errors[`education_${index}_institution`]}</p>}
                  </div>
                  
                  <div>
                    <label className="form-label">Degree*</label>
                    <input 
                      type="text" 
                      className={`form-input ${errors[`education_${index}_degree`] ? 'border-red-500' : ''}`}
                      placeholder="Bachelor's, Master's, etc."
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                    />
                    {errors[`education_${index}_degree`] && <p className="form-error">{errors[`education_${index}_degree`]}</p>}
                  </div>
                  
                  <div>
                    <label className="form-label">Field of Study</label>
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="Computer Science, Business, etc."
                      value={edu.fieldOfStudy}
                      onChange={(e) => handleEducationChange(edu.id, 'fieldOfStudy', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="form-label">Start Date*</label>
                    <input 
                      type="date" 
                      className={`form-input ${errors[`education_${index}_startDate`] ? 'border-red-500' : ''}`}
                      value={edu.startDate}
                      onChange={(e) => handleEducationChange(edu.id, 'startDate', e.target.value)}
                    />
                    {errors[`education_${index}_startDate`] && <p className="form-error">{errors[`education_${index}_startDate`]}</p>}
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <input 
                        type="checkbox" 
                        id={`edu-current-${edu.id}`}
                        className="mr-2"
                        checked={edu.current}
                        onChange={(e) => handleEducationChange(edu.id, 'current', e.target.checked)}
                      />
                      <label htmlFor={`edu-current-${edu.id}`} className="text-sm">Currently Studying</label>
                    </div>
                    
                    {!edu.current && (
                      <>
                        <label className="form-label">End Date*</label>
                        <input 
                          type="date" 
                          className={`form-input ${errors[`education_${index}_endDate`] ? 'border-red-500' : ''}`}
                          value={edu.endDate}
                          onChange={(e) => handleEducationChange(edu.id, 'endDate', e.target.value)}
                        />
                        {errors[`education_${index}_endDate`] && <p className="form-error">{errors[`education_${index}_endDate`]}</p>}
                      </>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="form-label">Description</label>
                    <textarea 
                      rows="3" 
                      className="form-input"
                      placeholder="Brief description of your studies, achievements, etc."
                      value={edu.description}
                      onChange={(e) => handleEducationChange(edu.id, 'description', e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
        
        {/* Step 3: Work Experience */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BriefcaseIcon size={20} className="text-primary" />
                <h2 className="text-xl font-semibold">Work Experience</h2>
              </div>
              <button 
                type="button"
                onClick={() => dispatch(addExperience())}
                className="btn bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600 p-2 rounded-lg"
              >
                <PlusIcon size={20} />
              </button>
            </div>
            
            {profile.experience.map((exp, index) => (
              <div key={exp.id} className="card p-4 bg-surface-50 dark:bg-surface-800">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Experience #{index + 1}</h3>
                  {profile.experience.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => dispatch(removeExperience(exp.id))}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <MinusIcon size={18} />
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Company*</label>
                    <input 
                      type="text" 
                      className={`form-input ${errors[`experience_${index}_company`] ? 'border-red-500' : ''}`}
                      placeholder="Company Name"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                    />
                    {errors[`experience_${index}_company`] && <p className="form-error">{errors[`experience_${index}_company`]}</p>}
                  </div>
                  
                  <div>
                    <label className="form-label">Job Title*</label>
                    <input 
                      type="text" 
                      className={`form-input ${errors[`experience_${index}_title`] ? 'border-red-500' : ''}`}
                      placeholder="Software Engineer, Project Manager, etc."
                      value={exp.title}
                      onChange={(e) => handleExperienceChange(exp.id, 'title', e.target.value)}
                    />
                    {errors[`experience_${index}_title`] && <p className="form-error">{errors[`experience_${index}_title`]}</p>}
                  </div>
                  
                  <div>
                    <label className="form-label">Location</label>
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="City, State, Country"
                      value={exp.location}
                      onChange={(e) => handleExperienceChange(exp.id, 'location', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="form-label">Start Date*</label>
                    <input 
                      type="date" 
                      className={`form-input ${errors[`experience_${index}_startDate`] ? 'border-red-500' : ''}`}
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)}
                    />
                    {errors[`experience_${index}_startDate`] && <p className="form-error">{errors[`experience_${index}_startDate`]}</p>}
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <input 
                        type="checkbox" 
                        id={`exp-current-${exp.id}`}
                        className="mr-2"
                        checked={exp.current}
                        onChange={(e) => handleExperienceChange(exp.id, 'current', e.target.checked)}
                      />
                      <label htmlFor={`exp-current-${exp.id}`} className="text-sm">Currently Working</label>
                    </div>
                    
                    {!exp.current && (
                      <>
                        <label className="form-label">End Date*</label>
                        <input 
                          type="date" 
                          className={`form-input ${errors[`experience_${index}_endDate`] ? 'border-red-500' : ''}`}
                          value={exp.endDate}
                          onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)}
                        />
                        {errors[`experience_${index}_endDate`] && <p className="form-error">{errors[`experience_${index}_endDate`]}</p>}
                      </>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="form-label">Job Description</label>
                    <textarea 
                      rows="3" 
                      className="form-input"
                      placeholder="Describe your responsibilities, achievements, and projects"
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
        
        {/* Step 4: Skills */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <TagIcon size={20} className="text-primary" />
              <h2 className="text-xl font-semibold">Skills</h2>
            </div>
            
            <div>
              <label className="form-label">Add Skills*</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  className={`form-input flex-grow ${errors.skills ? 'border-red-500' : ''}`}
                  placeholder="Enter a skill (e.g., JavaScript, Project Management)"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                />
                <button 
                  type="button"
                  onClick={handleAddSkill}
                  className="btn btn-primary px-3"
                >
                  Add
                </button>
              </div>
              {errors.skills && <p className="form-error">{errors.skills}</p>}
              
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center"
                  >
                    <span>{skill}</span>
                    <button 
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 text-primary hover:text-primary-dark"
                    >
                      <MinusIcon size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Step 5: Resume Upload */}
        {currentStep === 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <FileIcon size={20} className="text-primary" />
              <h2 className="text-xl font-semibold">Resume Upload</h2>
            </div>
            
            <p className="text-surface-600 dark:text-surface-400 mb-4">
              Upload your resume to make it easier for employers to learn about your qualifications.
              Supported formats: PDF, DOCX, DOC (Max size: 5MB)
            </p>
            
            <ResumeUpload 
              onFileSelect={handleFileUpload} 
              currentFile={profile.resume}
              error={errors.resume}
            />
            
            {profile.resume && (
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Uploaded Resume</h3>
                <div className="card p-4 bg-surface-50 dark:bg-surface-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileIcon size={24} className="text-primary" />
                    <div>
                      <p className="font-medium">{profile.resume.name}</p>
                      <p className="text-sm text-surface-500">
                        {(profile.resume.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-primary hover:text-primary-dark"
                    onClick={() => window.open(profile.resume.url, '_blank')}
                  >
                    View
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className={`btn flex items-center gap-2 ${
              currentStep === 1 
                ? 'bg-surface-200 dark:bg-surface-700 text-surface-400 cursor-not-allowed' 
                : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
            }`}
          >
            <ChevronLeftIcon size={18} />
            <span>Previous</span>
          </button>
          
          <button
            type="button"
            onClick={handleNextStep}
            disabled={profile.isLoading}
            className={`btn btn-primary flex items-center gap-2 ${profile.isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {profile.isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Processing...</span>
              </div>
            ) : currentStep === totalSteps ? (
              <>
                <SaveIcon size={18} />
                <span>Save Profile</span>
              </>
            ) : (
              <>
                <span>Next</span>
                <ChevronRightIcon size={18} />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default ProfileCreate;