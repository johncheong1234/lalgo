import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import customAlgoReducer from '../features/customAlgo/customAlgoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    customAlgo: customAlgoReducer,
  },
});
