import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../authSlice';
// redux
export const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

