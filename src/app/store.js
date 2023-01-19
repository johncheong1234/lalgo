import { configureStore } from '@reduxjs/toolkit';
import customAlgoReducer from '../features/customAlgo/customAlgoSlice';

export const store = configureStore({
  reducer: {
    customAlgo: customAlgoReducer,
  },
});
