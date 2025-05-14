import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

function MainFeature({ activeTab }) {
  // Icons
  const SearchIcon = getIcon('Search');
  const BriefcaseIcon = getIcon('Briefcase');
  const MapPinIcon = getIcon('MapPin');
  const SlackIcon = getIcon('Slack');
  const DollarSignIcon = getIcon('DollarSign');
  const BuildingIcon = getIcon('Building');
  const GraduationCapIcon = getIcon('GraduationCap');
  const ClockIcon = getIcon('Clock');
  const SendIcon = getIcon('Send');
  const PlusIcon = getIcon('Plus');
  const ListFilterIcon = getIcon('ListFilter');
  const XIcon = getIcon('X');
  const BookmarkIcon = getIcon('Bookmark');
  const FileTextIcon = getIcon('FileText');
  
  // Job Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [jobType, setJobType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [salary, setSalary] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Job Application States
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationData, setApplicationData] = useState({ name: '', email: '', phone: '', coverLetter: '' });
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  
  // Job Post States
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobRequirements, setJobRequirements] = useState('');
  const [jobSalary, setJobSalary] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  
  // Sample jobs data
  const sampleJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechFlow Solutions",
      location: "New York, NY",
      description: "We're looking for a skilled Frontend Developer to join our growing team.",
      salary: "$80,000 - $110,000",
      type: "Full-time",
      experience: "Mid-level",
      posted: "2 days ago",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=80&h=80&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Innovate Inc",
      location: "San Francisco, CA",
      description: "Lead product development and strategy for our SaaS platform.",
      salary: "$120,000 - $150,000",
      type: "Full-time",
      experience: "Senior",
      posted: "1 week ago",
      logo: "https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?q=80&w=80&h=80&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "DataViz Corp",
      location: "Chicago, IL (Remote)",
      description: "Analyze complex datasets and create meaningful visualizations.",
      salary: "$70,000 - $95,000",
      type: "Contract",
      experience: "Entry-level",
      posted: "3 days ago",
      logo: "https://images.unsplash.com/photo-1516876437184-593fda40c7ce?q=80&w=80&h=80&auto=format&fit=crop"
    }
  ];
  
  // Simulate search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const filtered = sampleJobs.filter(job => {
        const matchesQuery = !searchQuery || 
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesLocation = !location || 
          job.location.toLowerCase().includes(location.toLowerCase());
        
        const matchesJobType = !jobType || job.type === jobType;
        
        const matchesExperience = !experienceLevel || job.experience === experienceLevel;
        
        // Simple salary filtering
        const matchesSalary = !salary || job.salary.includes(salary);
        
        return matchesQuery && matchesLocation && matchesJobType && matchesExperience && matchesSalary;
      });
      
      setSearchResults(filtered);
      setIsSearching(false);
      
      toast.success(`Found ${filtered.length} job${filtered.length !== 1 ? 's' : ''} matching your criteria`, {
        icon: <SearchIcon className="text-primary" />
      });
    }, 800);
  };
  
  // Handle job posting
  const handlePostJob = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!jobTitle || !companyName || !jobLocation || !jobDescription || !employmentType) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    setIsPosting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsPosting(false);
      toast.success("Job posted successfully! It will be reviewed by our team.");
      
      // Reset form
      setJobTitle('');
      setCompanyName('');
      setJobLocation('');
      setJobDescription('');
      setJobRequirements('');
      setJobSalary('');
      setEmploymentType('');
    }, 1500);
  };
  
  // Handle Apply Now button click
  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setApplicationData({ name: '', email: '', phone: '', coverLetter: '' });
    setFileUploaded(false);
    setShowApplicationModal(true);
  };
  
  // Handle application form input changes
  const handleApplicationChange = (e) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle file upload for resume
  const handleFileUpload = () => {
    // In a real app, this would handle the actual file upload
    setFileUploaded(true);
    toast.info("Resume file selected. Will be uploaded with your application.");
  };
  
  // Submit job application
  const handleSubmitApplication = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!applicationData.name || !applicationData.email || !fileUploaded) {
      toast.error("Please fill all required fields and upload your resume");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setApplicationSuccess(true);
      
      toast.success(`Application for ${selectedJob.title} at ${selectedJob.company} submitted successfully!`);
      
      // Close modal after short delay
      setTimeout(() => {
        setShowApplicationModal(false);
        setApplicationSuccess(false);
      }, 2000);
    }, 1500);
  };
  
  // Close application modal
  const closeApplicationModal = () => {
    if (!isSubmitting) {
      setShowApplicationModal(false);
    }
  };
  
  // Reset search results when tab changes
  useEffect(() => {
    setSearchResults([]);
  }, [activeTab]);
  
  // Background scrolling prevention when modal is open
  useEffect(() => document.body.style.overflow = showApplicationModal ? 'hidden' : 'unset', [showApplicationModal]);
  
  return (
    <div className="mb-10">
      <AnimatePresence mode="wait">
        {activeTab === 'job-search' ? (
          <motion.div
            key="search"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              <div className="bg-white dark:bg-surface-800 rounded-xl p-4 sm:p-6 shadow-card border border-surface-200 dark:border-surface-700">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                    <div className="lg:col-span-3 relative">
                      <div className="absolute left-3 top-3 text-surface-500">
                        <SearchIcon size={20} />
                      </div>
                      <input
                        type="text"
                        placeholder="Job title, company, or keywords"
                        className="form-input pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <div className="lg:col-span-2 relative">
                      <div className="absolute left-3 top-3 text-surface-500">
                        <MapPinIcon size={20} />
                      </div>
                      <input
                        type="text"
                        placeholder="Location (city or remote)"
                        className="form-input pl-10"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    
                    <div className="lg:col-span-2 flex gap-2">
                      <button
                        type="submit"
                        className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                        disabled={isSearching}
                      >
                        {isSearching ? (
                          <>
                            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                            <span>Searching...</span>
                          </>
                        ) : (
                          <>
                            <SearchIcon size={20} />
                            <span>Search Jobs</span>
                          </>
                        )}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setShowFilters(!showFilters)}
                        className="btn bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-200 hover:bg-surface-200 dark:hover:bg-surface-600"
                        aria-label="Toggle filters"
                      >
                        <ListFilterIcon size={20} />
                      </button>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {showFilters && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-surface-200 dark:border-surface-700">
                          <div>
                            <label className="form-label">Job Type</label>
                            <select
                              className="form-input"
                              value={jobType}
                              onChange={(e) => setJobType(e.target.value)}
                            >
                              <option value="">Any Type</option>
                              <option value="Full-time">Full-time</option>
                              <option value="Part-time">Part-time</option>
                              <option value="Contract">Contract</option>
                              <option value="Internship">Internship</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="form-label">Experience Level</label>
                            <select
                              className="form-input"
                              value={experienceLevel}
                              onChange={(e) => setExperienceLevel(e.target.value)}
                            >
                              <option value="">Any Level</option>
                              <option value="Entry-level">Entry-level</option>
                              <option value="Mid-level">Mid-level</option>
                              <option value="Senior">Senior</option>
                              <option value="Executive">Executive</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="form-label">Salary Range</label>
                            <select
                              className="form-input"
                              value={salary}
                              onChange={(e) => setSalary(e.target.value)}
                            >
                              <option value="">Any Salary</option>
                              <option value="$50,000">$50,000+</option>
                              <option value="$75,000">$75,000+</option>
                              <option value="$100,000">$100,000+</option>
                              <option value="$150,000">$150,000+</option>
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
              
              {/* Search Results */}
              <div className="space-y-4">
                {searchResults.length > 0 ? (
                  <>
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Found {searchResults.length} jobs</h2>
                      <button 
                        onClick={() => setSearchResults([])} 
                        className="text-sm text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary flex items-center gap-1"
                      >
                        <XIcon size={16} />
                        <span>Clear results</span>
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {searchResults.map(job => (
                        <motion.div
                          key={job.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="card p-5 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-shrink-0">
                              <img 
                                src={job.logo} 
                                alt={job.company} 
                                className="w-16 h-16 rounded-lg object-cover shadow-sm"
                              />
                            </div>
                            <div className="flex-grow">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                <h3 className="text-xl font-semibold">{job.title}</h3>
                                <div className="flex items-center text-sm text-surface-500 dark:text-surface-400">
                                  <ClockIcon size={14} className="mr-1" />
                                  <span>{job.posted}</span>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-y-1 gap-x-4 mb-3">
                                <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                                  <BuildingIcon size={16} className="mr-1" />
                                  <span>{job.company}</span>
                                </div>
                                <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                                  <MapPinIcon size={16} className="mr-1" />
                                  <span>{job.location}</span>
                                </div>
                                <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                                  <DollarSignIcon size={16} className="mr-1" />
                                  <span>{job.salary}</span>
                                </div>
                              </div>
                              
                              <p className="text-surface-700 dark:text-surface-300 mb-4">
                                {job.description}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                                  {job.type}
                                </span>
                                <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
                                  {job.experience}
                                </span>
                              </div>
                              
                              <div className="flex flex-wrap gap-3">
                                <button className="btn btn-primary flex items-center gap-1" onClick={() => handleApplyNow(job)}>
                                  <SendIcon size={16} />
                                  <span>Apply Now</span>
                                </button>
                                <button className="btn btn-outline flex items-center gap-1">
                                  <BookmarkIcon size={16} />
                                  <span>Save</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : searchQuery || location || jobType || experienceLevel || salary ? (
                  <div className="text-center py-10">
                    <div className="inline-block p-4 bg-surface-100 dark:bg-surface-700 rounded-full mb-4">
                      <SearchIcon size={32} className="text-surface-500" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No jobs found</h3>
                    <p className="text-surface-600 dark:text-surface-400 max-w-md mx-auto">
                      Try adjusting your search criteria or location to find more job opportunities.
                    </p>
                  </div>
                ) : (
                  <div className="card p-6 bg-surface-50 dark:bg-surface-800 border border-dashed border-surface-300 dark:border-surface-700">
                    <div className="text-center">
                      <SearchIcon size={40} className="mx-auto text-surface-400 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Start Your Job Search</h3>
                      <p className="text-surface-600 dark:text-surface-400 max-w-md mx-auto mb-6">
                        Enter keywords, job titles, or company names to discover opportunities that match your skills and interests.
                      </p>
                      <div className="flex justify-center gap-4 flex-wrap">
                        <button 
                          className="px-3 py-2 bg-surface-200 dark:bg-surface-700 rounded-lg text-sm text-surface-800 dark:text-surface-200 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                          onClick={() => {
                            setSearchQuery('Developer');
                            document.querySelector('form button[type="submit"]').click();
                          }}
                        >
                          Developer Jobs
                        </button>
                        <button 
                          className="px-3 py-2 bg-surface-200 dark:bg-surface-700 rounded-lg text-sm text-surface-800 dark:text-surface-200 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                          onClick={() => {
                            setSearchQuery('Manager');
                            document.querySelector('form button[type="submit"]').click();
                          }}
                        >
                          Manager Jobs
                        </button>
                        <button 
                          className="px-3 py-2 bg-surface-200 dark:bg-surface-700 rounded-lg text-sm text-surface-800 dark:text-surface-200 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                          onClick={() => {
                            setLocation('Remote');
                            document.querySelector('form button[type="submit"]').click();
                          }}
                        >
                          Remote Jobs
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Job Application Modal */}
              {showApplicationModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white dark:bg-surface-800 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                  >
                    {applicationSuccess ? (
                      <div className="p-6 text-center">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Application Submitted!</h3>
                        <p className="text-surface-600 dark:text-surface-400 mb-4">
                          Your application for {selectedJob?.title} at {selectedJob?.company} has been submitted successfully.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-start border-b border-surface-200 dark:border-surface-700 p-6">
                          <div>
                            <h3 className="text-xl font-semibold">{selectedJob?.title}</h3>
                            <p className="text-surface-600 dark:text-surface-400">
                              {selectedJob?.company} • {selectedJob?.location}
                            </p>
                          </div>
                          <button 
                            onClick={closeApplicationModal}
                            className="text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
                          >
                            <XIcon size={20} />
                          </button>
                        </div>
                        
                        <form onSubmit={handleSubmitApplication} className="p-6">
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="name" className="form-label">
                                Full Name <span className="text-red-500">*</span>
                              </label>
                              <input
                                id="name"
                                name="name"
                                type="text"
                                className="form-input"
                                value={applicationData.name}
                                onChange={handleApplicationChange}
                                required
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="email" className="form-label">
                                Email Address <span className="text-red-500">*</span>
                              </label>
                              <input
                                id="email"
                                name="email"
                                type="email"
                                className="form-input"
                                value={applicationData.email}
                                onChange={handleApplicationChange}
                                required
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="phone" className="form-label">Phone Number</label>
                              <input
                                id="phone"
                                name="phone"
                                type="tel"
                                className="form-input"
                                value={applicationData.phone}
                                onChange={handleApplicationChange}
                              />
                            </div>
                            
                            <div className="p-4 border border-dashed border-surface-300 dark:border-surface-600 rounded-lg">
                              <div className="flex gap-3 items-center">
                                <FileTextIcon className="text-primary" size={20} />
                                <div className="flex-grow">
                                  <p className="font-medium text-sm">Upload Resume <span className="text-red-500">*</span></p>
                                  <p className="text-xs text-surface-500 dark:text-surface-400">PDF, DOCX or RTF (Max 5MB)</p>
                                </div>
                                <button 
                                  type="button" 
                                  onClick={handleFileUpload}
                                  className={`btn ${fileUploaded ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300'}`}
                                >
                                  {fileUploaded ? 'Uploaded' : 'Upload'}
                                </button>
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="coverLetter" className="form-label">Cover Letter</label>
                              <textarea
                                id="coverLetter"
                                name="coverLetter"
                                className="form-input min-h-[120px]"
                                placeholder="Why are you interested in this position and how does your experience align with the role?"
                                value={applicationData.coverLetter}
                                onChange={handleApplicationChange}
                              ></textarea>
                            </div>
                          </div>
                          
                          <div className="mt-6 flex justify-end">
                            <button
                              type="submit"
                              className="btn btn-primary px-6"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                                  <span>Submitting...</span>
                                </div>
                              ) : 'Submit Application'}
                            </button>
                          </div>
                        </form>
                      </>
                    )}
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="post-job"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="card p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <BriefcaseIcon className="text-primary" />
                <span>Post a New Job</span>
              </h2>
              
              <form onSubmit={handlePostJob} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="jobTitle" className="form-label">Job Title <span className="text-red-500">*</span></label>
                    <input
                      id="jobTitle"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Frontend Developer"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="companyName" className="form-label">Company Name <span className="text-red-500">*</span></label>
                    <input
                      id="companyName"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Acme Inc."
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="jobLocation" className="form-label">Location <span className="text-red-500">*</span></label>
                    <input
                      id="jobLocation"
                      type="text"
                      className="form-input"
                      placeholder="e.g. New York, NY or Remote"
                      value={jobLocation}
                      onChange={(e) => setJobLocation(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="employmentType" className="form-label">Employment Type <span className="text-red-500">*</span></label>
                    <select
                      id="employmentType"
                      className="form-input"
                      value={employmentType}
                      onChange={(e) => setEmploymentType(e.target.value)}
                      required
                    >
                      <option value="">Select employment type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                      <option value="Temporary">Temporary</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="jobSalary" className="form-label">Salary Range</label>
                    <input
                      id="jobSalary"
                      type="text"
                      className="form-input"
                      placeholder="e.g. $60,000 - $80,000 per year"
                      value={jobSalary}
                      onChange={(e) => setJobSalary(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-end gap-4">
                    <div className="flex-grow">
                      <label className="form-label">Company Logo</label>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-surface-100 dark:bg-surface-700 rounded-lg flex items-center justify-center border border-dashed border-surface-300 dark:border-surface-600">
                          <SlackIcon className="text-surface-500" />
                        </div>
                        <button type="button" className="btn bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600 flex items-center gap-2">
                          <PlusIcon size={16} />
                          <span>Upload</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="jobDescription" className="form-label">Job Description <span className="text-red-500">*</span></label>
                  <textarea
                    id="jobDescription"
                    className="form-input min-h-[120px]"
                    placeholder="Describe the role, responsibilities, and your company..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="jobRequirements" className="form-label">Requirements</label>
                  <textarea
                    id="jobRequirements"
                    className="form-input min-h-[120px]"
                    placeholder="List the required skills, experience, education, etc."
                    value={jobRequirements}
                    onChange={(e) => setJobRequirements(e.target.value)}
                  ></textarea>
                </div>
                
                <div className="pt-4 border-t border-surface-200 dark:border-surface-700 flex justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary px-8 flex items-center gap-2"
                    disabled={isPosting}
                  >
                    {isPosting ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Posting...</span>
                      </>
                    ) : (
                      <>
                        <PlusIcon size={20} />
                        <span>Post Job</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MainFeature;