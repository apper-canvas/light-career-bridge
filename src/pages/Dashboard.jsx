import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { fetchJobs } from '../services/jobService';
import { getProfileByUserId } from '../services/profileService';
import getIcon from '../utils/iconUtils';

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [profile, setProfile] = useState(null);
  const { user } = useSelector(state => state.user);
  
  // Icons
  const BriefcaseIcon = getIcon('Briefcase');
  const UserIcon = getIcon('User');
  const BuildingIcon = getIcon('Building');
  const MapPinIcon = getIcon('MapPin');
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Load recent jobs
        const recentJobs = await fetchJobs({ limit: 5 });
        setJobs(recentJobs);
        
        // If user is a job seeker, fetch their profile
        if (user && user.userType === 'jobseeker') {
          const userProfile = await getProfileByUserId(user.id);
          setProfile(userProfile);
        }
        
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user]);
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <h1 className="text-2xl font-bold mb-4">Welcome, {user?.firstName || user?.name || "User"}</h1>
        
        {isLoading ? (
          <div className="py-8 flex justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BriefcaseIcon className="text-primary" />
                <span>Recent Job Postings</span>
              </h2>
              
              <div className="space-y-4">
                {jobs.length > 0 ? jobs.map(job => (
                  <div key={job.Id} className="p-4 border border-surface-200 dark:border-surface-700 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                    <h3 className="font-medium text-lg">{job.title}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-surface-600 dark:text-surface-400">
                      <div className="flex items-center gap-1"><BuildingIcon size={14} /> {job.company}</div>
                      <div className="flex items-center gap-1"><MapPinIcon size={14} /> {job.location}</div>
                    </div>
                    <p className="mt-2 line-clamp-2">{job.description}</p>
                  </div>
                )) : (
                  <p className="text-surface-600 dark:text-surface-400">No job postings available yet.</p>
                )}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <UserIcon className="text-primary" />
                <span>Your Profile</span>
              </h2>
              
              {user?.userType === 'jobseeker' ? (
                profile ? (
                  <div className="p-4 border border-surface-200 dark:border-surface-700 rounded-lg">
                    <h3 className="font-medium">{profile.title} {profile.first_name} {profile.last_name}</h3>
                    <p className="text-surface-600 dark:text-surface-400 mt-1">{profile.location}</p>
                    <p className="mt-2">{profile.bio || "No bio provided"}</p>
                  </div>
                ) : (
                  <div className="p-6 border border-dashed border-primary/50 rounded-lg text-center">
                    <p className="mb-4">You haven't created your professional profile yet.</p>
                    <a href="/profile/create" className="btn btn-primary">Create Profile</a>
                  </div>
                )
              ) : (
                <p className="text-surface-600 dark:text-surface-400">Employer dashboard features coming soon.</p>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Dashboard;