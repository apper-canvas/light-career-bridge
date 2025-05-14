import { useState } from 'react';
import getIcon from '../utils/iconUtils';

function JobSeekerRegistrationForm({ jobSeekerInfo, setJobSeekerInfo, errors, handleBlur }) {
  const [skillInput, setSkillInput] = useState('');
  
  // Education options
  const educationOptions = [
    { value: 'high_school', label: 'High School' },
    { value: 'associates', label: 'Associate\'s Degree' },
    { value: 'bachelors', label: 'Bachelor\'s Degree' },
    { value: 'masters', label: 'Master\'s Degree' },
    { value: 'doctorate', label: 'Doctorate' },
    { value: 'vocational', label: 'Vocational Training' },
    { value: 'certification', label: 'Certification' },
    { value: 'other', label: 'Other' }
  ];
  
  // Experience options
  const experienceOptions = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6-10 years)' },
    { value: 'executive', label: 'Executive Level (10+ years)' }
  ];
  
  // Icons
  const GraduationCapIcon = getIcon('GraduationCap');
  const BriefcaseIcon = getIcon('Briefcase');
  const TagIcon = getIcon('Tag');
  const PlusIcon = getIcon('Plus');
  const XIcon = getIcon('X');
  const AlertCircleIcon = getIcon('AlertCircle');
  
  // Handle education change
  const handleEducationChange = (e) => {
    setJobSeekerInfo(prev => ({ ...prev, education: e.target.value }));
  };
  
  // Handle experience change
  const handleExperienceChange = (e) => {
    setJobSeekerInfo(prev => ({ ...prev, experience: e.target.value }));
  };
  
  // Add skill to the skills array
  const addSkill = () => {
    if (skillInput.trim() && !jobSeekerInfo.skills.includes(skillInput.trim())) {
      setJobSeekerInfo(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };
  
  // Remove skill from the skills array
  const removeSkill = (skillToRemove) => {
    setJobSeekerInfo(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };
  
  // Handle enter key press in skill input
  const handleSkillInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };
  
  return (
    <div className="space-y-6 border-t border-surface-200 dark:border-surface-700 pt-6 mt-6">
      <h3 className="text-lg font-medium text-center mb-4">Job Seeker Information</h3>
      
      {/* Education Level */}
      <div>
        <label htmlFor="education" className="form-label">Highest Education Level</label>
        <div className="relative">
          <div className="absolute left-3 top-3 text-surface-500">
            <GraduationCapIcon size={20} />
          </div>
          <select 
            id="education" 
            className={`form-input pl-10 ${errors.education ? 'border-red-500' : ''}`}
            value={jobSeekerInfo.education}
            onChange={handleEducationChange}
            onBlur={() => handleBlur('education')}
          >
            <option value="">Select education level</option>
            {educationOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {errors.education && (
          <div className="validation-item text-red-500">
            <AlertCircleIcon size={16} />
            <span>{errors.education}</span>
          </div>
        )}
      </div>
      
      {/* Experience Level */}
      <div>
        <label htmlFor="experience" className="form-label">Experience Level</label>
        <div className="relative">
          <div className="absolute left-3 top-3 text-surface-500">
            <BriefcaseIcon size={20} />
          </div>
          <select 
            id="experience" 
            className={`form-input pl-10 ${errors.experience ? 'border-red-500' : ''}`}
            value={jobSeekerInfo.experience}
            onChange={handleExperienceChange}
            onBlur={() => handleBlur('experience')}
          >
            <option value="">Select experience level</option>
            {experienceOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {errors.experience && (
          <div className="validation-item text-red-500">
            <AlertCircleIcon size={16} />
            <span>{errors.experience}</span>
          </div>
        )}
      </div>
      
      {/* Skills */}
      <div>
        <label htmlFor="skills" className="form-label">Skills (Optional)</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute left-3 top-3 text-surface-500">
              <TagIcon size={20} />
            </div>
            <input 
              id="skills" 
              type="text" 
              className="form-input pl-10"
              placeholder="Add a skill (e.g., JavaScript, Project Management)"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillInputKeyDown}
            />
          </div>
          <button 
            type="button"
            className="btn btn-primary px-3"
            onClick={addSkill}
          >
            <PlusIcon size={20} />
          </button>
        </div>
        
        {/* Display added skills as tags */}
        {jobSeekerInfo.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {jobSeekerInfo.skills.map((skill, index) => (
              <div key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-1">
                <span>{skill}</span>
                <button 
                  type="button" 
                  className="text-primary hover:text-primary-dark"
                  onClick={() => removeSkill(skill)}
                >
                  <XIcon size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
        <p className="text-surface-500 dark:text-surface-400 text-sm mt-2">
          Add skills that are relevant to the jobs you're seeking. Press Enter or click the + button to add each skill.
        </p>
      </div>
    </div>
  );
}

export default JobSeekerRegistrationForm;