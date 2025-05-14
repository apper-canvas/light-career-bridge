import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here as your application grows
  },
  devTools: import.meta.env.DEV
});

export default store;