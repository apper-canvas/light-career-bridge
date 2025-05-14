import getApperClient from './apperClient';

const TABLE_NAME = 'education';

/**
 * Fetch education entries for a specific profile
 */
export const fetchEducationByProfile = async (profileId) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      Fields: [
        { Field: { Name: "Id" } },
        { Field: { Name: "Name" } },
        { Field: { Name: "institution" } },
        { Field: { Name: "degree" } },
        { Field: { Name: "field_of_study" } },
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
    console.error(`Error fetching education for profile ${profileId}:`, error);
    throw error;
  }
};

/**
 * Create a new education entry
 */
export const createEducation = async (educationData) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      records: [educationData]
    };
    
    const response = await apperClient.createRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to create education entry');
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error('Error creating education entry:', error);
    throw error;
  }
};

/**
 * Update an education entry
 */
export const updateEducation = async (educationData) => {
  try {
    if (!educationData.Id) {
      throw new Error('Education ID is required for update');
    }
    
    const apperClient = getApperClient();
    
    const params = {
      records: [educationData]
    };
    
    const response = await apperClient.updateRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to update education entry');
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error('Error updating education entry:', error);
    throw error;
  }
};

/**
 * Delete an education entry
 */
export const deleteEducation = async (educationId) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      RecordIds: [educationId]
    };
    
    const response = await apperClient.deleteRecord(TABLE_NAME, params);
    return response.success;
  } catch (error) {
    console.error(`Error deleting education entry ${educationId}:`, error);
    throw error;
  }
};