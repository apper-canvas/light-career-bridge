import { useState } from 'react';
import { motion } from 'framer-motion';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

function Home() {
  const [activeTab, setActiveTab] = useState('job-search'); // or 'post-job'
  
  const SearchIcon = getIcon('Search');
  const BriefcaseIcon = getIcon('Briefcase');
  const UserIcon = getIcon('User');
  const BuildingIcon = getIcon('Building');
  const ArrowRightIcon = getIcon('ArrowRight');

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="mb-10">
        <div className="card py-8 px-6 md:py-12 md:px-10 bg-gradient-to-br from-primary-light/10 to-secondary-light/10 dark:from-primary-dark/20 dark:to-secondary-dark/20 border-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-surface-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Connect With Your <span className="text-primary">Dream Career</span>
              </motion.h1>
              <motion.p 
                className="text-lg text-surface-700 dark:text-surface-300 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                CareerBridge connects talented professionals with the perfect opportunities, empowering career growth and business success.
              </motion.p>
              <motion.div 
                className="pt-4 flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <button 
                  onClick={() => setActiveTab('job-search')}
                  className="btn btn-primary flex items-center justify-center gap-2"
                >
                  <SearchIcon size={20} />
                  <span>Find Jobs</span>
                </button>
                <button 
                  onClick={() => setActiveTab('post-job')}
                  className="btn btn-outline flex items-center justify-center gap-2"
                >
                  <BriefcaseIcon size={20} />
                  <span>Post a Job</span>
                </button>
              </motion.div>
            </div>
            <div className="hidden md:block relative">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Career professionals collaborating" 
                className="rounded-xl shadow-xl object-cover h-96 w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-surface-800 p-4 rounded-lg shadow-xl border border-surface-200 dark:border-surface-700">
                <div className="text-primary text-lg font-semibold flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  1,250+ Active Jobs
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Section */}
      <section className="mb-6">
        <div className="flex border-b border-surface-200 dark:border-surface-700 mb-6">
          <button
            onClick={() => setActiveTab('job-search')}
            className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-all ${
              activeTab === 'job-search'
                ? 'text-primary border-b-2 border-primary'
                : 'text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary'
            }`}
          >
            <SearchIcon size={18} />
            <span>Search Jobs</span>
          </button>
          <button
            onClick={() => setActiveTab('post-job')}
            className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-all ${
              activeTab === 'post-job'
                ? 'text-primary border-b-2 border-primary'
                : 'text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary'
            }`}
          >
            <BriefcaseIcon size={18} />
            <span>Post a Job</span>
          </button>
        </div>

        <div className="transition-all duration-300">
          <MainFeature activeTab={activeTab} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">How CareerBridge Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <UserIcon className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
            <p className="text-surface-600 dark:text-surface-400 mb-4">
              Build a detailed profile highlighting your skills, experience, and career aspirations.
            </p>
            <div className="flex items-center text-primary font-medium">
              <span>Learn more</span>
              <ArrowRightIcon size={16} className="ml-1" />
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
              <SearchIcon className="text-secondary" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Discover Opportunities</h3>
            <p className="text-surface-600 dark:text-surface-400 mb-4">
              Search and filter through thousands of job listings to find your perfect match.
            </p>
            <div className="flex items-center text-primary font-medium">
              <span>Learn more</span>
              <ArrowRightIcon size={16} className="ml-1" />
            </div>
          </div>
          
          {/* Feature 3 */}
          <div className="card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
              <BuildingIcon className="text-accent" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect with Employers</h3>
            <p className="text-surface-600 dark:text-surface-400 mb-4">
              Apply to positions and communicate directly with hiring managers.
            </p>
            <div className="flex items-center text-primary font-medium">
              <span>Learn more</span>
              <ArrowRightIcon size={16} className="ml-1" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;