import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Initial profile state
const initialState = {
  isLoading: false,
  error: null,
  personalInfo: {
    title: '',
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
    bio: ''
  },
  education: [
    {
      id: 1,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
  ],
  experience: [
    {
      id: 1,
      company: '',
      title: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
  ],
  skills: [],
  resume: null,
  completed: false
};

// Async thunk for saving profile
export const saveProfile = createAsyncThunk(
  'profile/save',
  async (profileData, { rejectWithValue }) => {
    try {
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send data to a server
      // For demo, we'll just return the profile data
      return profileData;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to save profile');
    }
  }
);

// Handle file upload
export const uploadResume = createAsyncThunk(
  'profile/uploadResume',
  async (fileData, { rejectWithValue }) => {
    try {
      // Simulate file upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would upload to a server/cloud storage
      // For demo, we'll just return file info
      return {
        name: fileData.name,
        size: fileData.size,
        type: fileData.type,
        url: URL.createObjectURL(fileData),
        lastModified: fileData.lastModified
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to upload resume');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updatePersonalInfo: (state, action) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    addEducation: (state) => {
      const newId = state.education.length > 0 
        ? Math.max(...state.education.map(e => e.id)) + 1 
        : 1;
      state.education.push({
        id: newId,
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      });
    },
    updateEducation: (state, action) => {
      const index = state.education.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.education[index] = { ...state.education[index], ...action.payload };
      }
    },
    removeEducation: (state, action) => {
      state.education = state.education.filter(e => e.id !== action.payload);
    },
    addExperience: (state) => {
      const newId = state.experience.length > 0 
        ? Math.max(...state.experience.map(e => e.id)) + 1 
        : 1;
      state.experience.push({
        id: newId,
        company: '',
        title: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      });
    },
    updateExperience: (state, action) => {
      const index = state.experience.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.experience[index] = { ...state.experience[index], ...action.payload };
      }
    },
    removeExperience: (state, action) => {
      state.experience = state.experience.filter(e => e.id !== action.payload);
    },
    updateSkills: (state, action) => {
      state.skills = action.payload;
    },
    resetProfile: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // Save profile reducers
      .addCase(saveProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveProfile.fulfilled, (state) => {
        state.isLoading = false;
        state.completed = true;
        toast.success('Profile created successfully!');
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || 'Failed to save profile');
      })
      // Resume upload reducers
      .addCase(uploadResume.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resume = action.payload;
        toast.success('Resume uploaded successfully!');
      })
      .addCase(uploadResume.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || 'Failed to upload resume');
      });
  }
});

export const { 
  updatePersonalInfo, 
  addEducation, 
  updateEducation, 
  removeEducation,
  addExperience,
  updateExperience,
  removeExperience, 
  updateSkills,
  resetProfile
} = profileSlice.actions;

export default profileSlice.reducer;