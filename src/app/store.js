import { configureStore } from '@reduxjs/toolkit';
import customAlgoReducer from '../features/customAlgo/customAlgoSlice';
import submitAlgoReducer from '../features/submitAlgo/submitAlgoSlice';
import userReducer from '../features/user/userSlice';
import pastRecordsReducer from '../features/customAlgo/customAlgo/pastRecordsParent/pastRecordsSlice';
import setReducer from '../features/set/setSlice';
import createSetReducer from '../features/createSet/createSetSlice';
import visualizeCodeReducer from '../features/visualizeCode/visualizeCodeSlice';

export const store = configureStore({
  reducer: {
    customAlgo: customAlgoReducer,
    submitAlgo: submitAlgoReducer,
    user: userReducer,
    pastRecords: pastRecordsReducer,
    set: setReducer,
    createSet: createSetReducer,
    visualizeCode: visualizeCodeReducer,
  },
});
