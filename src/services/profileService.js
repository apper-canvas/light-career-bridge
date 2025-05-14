import getApperClient from './apperClient';

const TABLE_NAME = 'user_profile';

/**
 * Fetch all profiles with optional filtering
 */
export const fetchProfiles = async (options = {}) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      Fields: [
        { Field: { Name: "Id" } },
        { Field: { Name: "Name" } },
        { Field: { Name: "title" } },
        { Field: { Name: "first_name" } },
        { Field: { Name: "last_name" } },
        { Field: { Name: "phone" } },
        { Field: { Name: "location" } },
        { Field: { Name: "bio" } },
        { Field: { Name: "resume" } },
        { Field: { Name: "completed" } },
        { Field: { Name: "user_id" } }
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
    
    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    return response?.data || [];
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
};

/**
 * Fetch a profile by user ID
 */
export const getProfileByUserId = async (userId) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      Fields: [
        { Field: { Name: "Id" } },
        { Field: { Name: "Name" } },
        { Field: { Name: "title" } },
        { Field: { Name: "first_name" } },
        { Field: { Name: "last_name" } },
        { Field: { Name: "phone" } },
        { Field: { Name: "location" } },
        { Field: { Name: "bio" } },
        { Field: { Name: "resume" } },
        { Field: { Name: "completed" } },
        { Field: { Name: "user_id" } }
      ],
      where: [
        {
          fieldName: "user_id",
          operator: "ExactMatch",
          values: [userId.toString()]
        }
      ]
    };
    
    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    return response?.data?.[0];
  } catch (error) {
    console.error(`Error fetching profile for user ${userId}:`, error);
    throw error;
  }
};

/**
 * Create a new profile
 */
export const createProfile = async (profileData) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      records: [profileData]
    };
    
    const response = await apperClient.createRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to create profile');
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
};

/**
 * Update a profile
 */
export const updateProfile = async (profileData) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      records: [profileData]
    };
    
    const response = await apperClient.updateRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to update profile');
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};