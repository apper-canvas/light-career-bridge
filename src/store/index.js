import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import profileReducer from '../features/profile/profileSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    // Add other reducers here as your application grows
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export default store;