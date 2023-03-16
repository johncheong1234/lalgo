import { configureStore } from '@reduxjs/toolkit';
import customAlgoReducer from '../features/customAlgo/customAlgoSlice';
import submitAlgoReducer from '../features/submitAlgo/submitAlgoSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    customAlgo: customAlgoReducer,
    submitAlgo: submitAlgoReducer,
    user: userReducer
  },
});
