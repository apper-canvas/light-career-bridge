import getApperClient from './apperClient';

const TABLE_NAME = 'experience';

/**
 * Fetch experience entries for a specific profile
 */
export const fetchExperienceByProfile = async (profileId) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      Fields: [
        { Field: { Name: "Id" } },
        { Field: { Name: "Name" } },
        { Field: { Name: "company" } },
        { Field: { Name: "title" } },
        { Field: { Name: "location" } },
        { Field: { Name: "start_date" } },
        { Field: { Name: "end_date" } },
        { Field: { Name: "current" } },
        { Field: { Name: "description" } },
        { Field: { Name: "profile_id" } }
      ],
      where: [
        {
          fieldName: "profile_id",
          operator: "ExactMatch",
          values: [profileId.toString()]
        }
      ],
      orderBy: [
        { field: "start_date", direction: "DESC" }
      ]
    };
    
    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    return response?.data || [];
  } catch (error) {
    console.error(`Error fetching experience for profile ${profileId}:`, error);
    throw error;
  }
};

/**
 * Create a new experience entry
 */
export const createExperience = async (experienceData) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      records: [experienceData]
    };
    
    const response = await apperClient.createRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to create experience entry');
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error('Error creating experience entry:', error);
    throw error;
  }
};

/**
 * Update an experience entry
 */
export const updateExperience = async (experienceData) => {
  try {
    if (!experienceData.Id) {
      throw new Error('Experience ID is required for update');
    }
    
    const apperClient = getApperClient();
    
    const params = {
      records: [experienceData]
    };
    
    const response = await apperClient.updateRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to update experience entry');
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error('Error updating experience entry:', error);
    throw error;
  }
};

/**
 * Delete an experience entry
 */
export const deleteExperience = async (experienceId) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      RecordIds: [experienceId]
    };
    
    const response = await apperClient.deleteRecord(TABLE_NAME, params);
    return response.success;
  } catch (error) {
    console.error(`Error deleting experience entry ${experienceId}:`, error);
    throw error;
  }
};