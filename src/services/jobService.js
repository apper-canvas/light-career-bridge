import getApperClient from './apperClient';

const TABLE_NAME = 'job';

/**
 * Fetch jobs with optional filtering
 */
export const fetchJobs = async (options = {}) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      Fields: [
        { Field: { Name: "Id" } },
        { Field: { Name: "Name" } },
        { Field: { Name: "title" } },
        { Field: { Name: "company" } },
        { Field: { Name: "location" } },
        { Field: { Name: "description" } },
        { Field: { Name: "requirements" } },
        { Field: { Name: "salary" } },
        { Field: { Name: "type" } },
        { Field: { Name: "experience_level" } },
        { Field: { Name: "posted_by" } },
        { Field: { Name: "CreatedOn" } }
      ],
      pagingInfo: {
        limit: options.limit || 20,
        offset: options.offset || 0
      }
    };
    
    // Add filters if provided
    if (options.filters) {
      params.where = options.filters;
    }
    
    // Add ordering if provided
    if (options.orderBy) {
      params.orderBy = options.orderBy;
    } else {
      // Default ordering by creation date
      params.orderBy = [{ field: "CreatedOn", direction: "DESC" }];
    }
    
    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    return response?.data || [];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

/**
 * Fetch a job by ID
 */
export const getJobById = async (jobId) => {
  try {
    const apperClient = getApperClient();
    const response = await apperClient.getRecordById(TABLE_NAME, jobId);
    return response?.data;
  } catch (error) {
    console.error(`Error fetching job with ID ${jobId}:`, error);
    throw error;
  }
};

/**
 * Create a new job
 */
export const createJob = async (jobData) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      records: [jobData]
    };
    
    const response = await apperClient.createRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to create job');
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

/**
 * Update a job
 */
export const updateJob = async (jobData) => {
  try {
    if (!jobData.Id) {
      throw new Error('Job ID is required for update');
    }
    
    const apperClient = getApperClient();
    
    const params = {
      records: [jobData]
    };
    
    const response = await apperClient.updateRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to update job');
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};