import { createSlice } from '@reduxjs/toolkit';

export const submitCpSlice = createSlice({
    name: 'submitCp',
    initialState: {
        testCase: '',
        code: '',
        questions: [],
        questionIdSelected: ''
    },
    reducers: {
        setTestCase: (state, action) => {
            state.testCase = action.payload.testCase;
        },
        setCode: (state, action) => {
            state.code = action.payload.code;
        },
        setQuestions: (state, action) => {
            state.questions = action.payload.questions;
        },
        setQuestionIdSelected: (state, action) => {
            state.questionIdSelected = action.payload.questionIdSelected;
        }
    }
});

export const {
    setTestCase,
    setCode,
    setQuestions,
    setQuestionIdSelected
} = submitCpSlice.actions;
export default submitCpSlice.reducer;