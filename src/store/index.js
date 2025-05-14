import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profile/profileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    // Add other reducers here as your application grows
  },
  devTools: import.meta.env.DEV
});

export default store;