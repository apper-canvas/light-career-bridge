import getApperClient from './apperClient';

const TABLE_NAME = 'skill';

/**
 * Fetch skills for a specific profile
 */
export const fetchSkillsByProfile = async (profileId) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      Fields: [
        { Field: { Name: "Id" } },
        { Field: { Name: "Name" } },
        { Field: { Name: "profile_id" } }
      ],
      where: [
        {
          fieldName: "profile_id",
          operator: "ExactMatch",
          values: [profileId.toString()]
        }
      ]
    };
    
    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    return response?.data || [];
  } catch (error) {
    console.error(`Error fetching skills for profile ${profileId}:`, error);
    throw error;
  }
};

/**
 * Create a new skill
 */
export const createSkill = async (skillData) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      records: [skillData]
    };
    
    const response = await apperClient.createRecord(TABLE_NAME, params);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to create skill');
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error('Error creating skill:', error);
    throw error;
  }
};

/**
 * Create multiple skills at once
 */
export const createMultipleSkills = async (skillsArray) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      records: skillsArray
    };
    
    const response = await apperClient.createRecord(TABLE_NAME, params);
    
    return response.results.filter(result => result.success).map(result => result.data);
  } catch (error) {
    console.error('Error creating multiple skills:', error);
    throw error;
  }
};

/**
 * Delete a skill
 */
export const deleteSkill = async (skillId) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      RecordIds: [skillId]
    };
    
    const response = await apperClient.deleteRecord(TABLE_NAME, params);
    return response.success;
  } catch (error) {
    console.error(`Error deleting skill ${skillId}:`, error);
    throw error;
  }
};