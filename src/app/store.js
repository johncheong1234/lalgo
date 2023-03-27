import { configureStore } from '@reduxjs/toolkit';
import customAlgoReducer from '../features/customAlgo/customAlgoSlice';
import submitAlgoReducer from '../features/submitAlgo/submitAlgoSlice';
import userReducer from '../features/user/userSlice';
import pastRecordsReducer from '../features/customAlgo/customAlgo/pastRecordsParent/pastRecordsSlice';
import setReducer from '../features/set/setSlice';
import createSetReducer from '../features/createSet/createSetSlice';
import visualizeCodeReducer from '../features/visualizeCode/visualizeCodeSlice';
import createQuestionReducer from '../features/createQuestion/createQuestionSlice';
import questionsReducer from '../features/questions/questionsSlice';

export const store = configureStore({
  reducer: {
    customAlgo: customAlgoReducer,
    submitAlgo: submitAlgoReducer,
    user: userReducer,
    pastRecords: pastRecordsReducer,
    set: setReducer,
    createSet: createSetReducer,
    visualizeCode: visualizeCodeReducer,
    createQuestion: createQuestionReducer,
    questions: questionsReducer
  },
});
