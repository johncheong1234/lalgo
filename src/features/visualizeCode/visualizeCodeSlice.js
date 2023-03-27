import { createSlice } from '@reduxjs/toolkit';

export const visualizeCodeSlice = createSlice({
    name: 'visualizeCode',
    initialState: {
        functionName: '',
        arguments: [
            {
                input: ''
            }
        ],
        code: '',
        questions: [],
        questionIdSelected: ''
    },
    reducers: {
        setFunctionName: (state, action) => {
            state.functionName = action.payload.functionName;
        },
        setFunctionArguments: (state, action) => {
            state.arguments = action.payload.arguments;

        },
        setFunctionCode: (state, action) => {
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
    setFunctionName,
    setFunctionArguments,
    setFunctionCode,
    setQuestions,
    setQuestionIdSelected
} = visualizeCodeSlice.actions;
export default visualizeCodeSlice.reducer;