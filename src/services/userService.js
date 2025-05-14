import getApperClient from './apperClient';

const TABLE_NAME = 'User2';

/**
 * Fetch users with optional filtering, sorting and pagination
 * 
 * @param {Object} options - Query options
 * @returns {Promise<Array>} - Array of users
 */
export const fetchUsers = async (options = {}) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      Fields: [
        { Field: { Name: "Id" } },
        { Field: { Name: "Name" } },
        { Field: { Name: "email" } },
        { Field: { Name: "userType" } },
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
    }
    
    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    return response?.data || [];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

/**
 * Fetch a single user by ID
 * 
 * @param {number} userId - User ID
 * @returns {Promise<Object>} - User object
 */
export const getUserById = async (userId) => {
  try {
    const apperClient = getApperClient();
    const response = await apperClient.getRecordById(TABLE_NAME, userId);
    return response?.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
};

/**
 * Update a user record
 * 
 * @param {Object} userData - User data to update
 * @returns {Promise<Object>} - Updated user
 */
export const updateUser = async (userData) => {
  try {
    if (!userData.Id) {
      throw new Error('User ID is required for update');
    }
    
    const apperClient = getApperClient();
    const params = {
      records: [userData]
    };
    
    const response = await apperClient.updateRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to update user');
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};