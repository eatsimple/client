import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// * tempat menyimpan global state
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
