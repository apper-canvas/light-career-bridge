import getApperClient from './apperClient';

const TABLE_NAME = 'job_application';

/**
 * Fetch job applications with optional filtering
 */
export const fetchApplications = async (options = {}) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      Fields: [
        { Field: { Name: "Id" } },
        { Field: { Name: "Name" } },
        { Field: { Name: "job_id" } },
        { Field: { Name: "user_id" } },
        { Field: { Name: "email" } },
        { Field: { Name: "phone" } },
        { Field: { Name: "cover_letter" } },
        { Field: { Name: "resume" } },
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
    console.error('Error fetching applications:', error);
    throw error;
  }
};

/**
 * Fetch applications by user ID
 */
export const fetchApplicationsByUser = async (userId, options = {}) => {
  try {
    const filters = [
      {
        fieldName: "user_id",
        operator: "ExactMatch",
        values: [userId.toString()]
      }
    ];
    
    return await fetchApplications({ 
      ...options,
      filters
    });
  } catch (error) {
    console.error(`Error fetching applications for user ${userId}:`, error);
    throw error;
  }
};

/**
 * Fetch applications for a specific job
 */
export const fetchApplicationsByJob = async (jobId, options = {}) => {
  try {
    const filters = [
      {
        fieldName: "job_id",
        operator: "ExactMatch",
        values: [jobId.toString()]
      }
    ];
    
    return await fetchApplications({ 
      ...options,
      filters
    });
  } catch (error) {
    console.error(`Error fetching applications for job ${jobId}:`, error);
    throw error;
  }
};

/**
 * Create a new job application
 */
export const createApplication = async (applicationData) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      records: [applicationData]
    };
    
    const response = await apperClient.createRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to submit application');
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error('Error creating application:', error);
    throw error;
  }
};