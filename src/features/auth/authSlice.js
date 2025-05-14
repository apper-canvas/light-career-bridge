import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setToken, removeToken, getToken, hashPassword } from '../../utils/authUtils';

// Sample user database for demo purposes
const sampleUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123', userType: 'jobseeker' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password123', userType: 'employer' }
];

// Async thunk for user login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user with matching credentials
      const user = sampleUsers.find(
        user => user.email === email && user.password === password
      );
      
      if (!user) {
        return rejectWithValue('Invalid email or password');
      }
      
      // Create a safe user object without the password
      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType
      };
      
      // Generate a demo token
      const token = `demo-token-${Date.now()}`;
      setToken(token);
      
      return { user: safeUser, token };
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Async thunk for user registration
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password, userType, jobSeekerInfo }, { rejectWithValue }) => {
    try {
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Check if email already exists
      const existingUser = sampleUsers.find(user => user.email === email);
      if (existingUser) {
        return rejectWithValue('Email already in use');
      }
      
      // Hash the password before storing
      const hashedPassword = hashPassword(password);
      
      // In a real app, we would send data to a server to create an account
      const newUser = {
        id: sampleUsers.length + 1,
        name,
        email,
        password, // This was missing, causing login failures after registration
        userType
      };
      
      // Add job seeker specific info if the user is a job seeker
      if (userType === 'jobseeker' && jobSeekerInfo) {
        newUser.jobSeekerInfo = jobSeekerInfo;
      }
      
      // Add to our sample database
      sampleUsers.push(newUser);
      
      return { success: true };
      
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

const initialState = {
  user: null,
  token: getToken(),
  isAuthenticated: !!getToken(),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Register cases
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;