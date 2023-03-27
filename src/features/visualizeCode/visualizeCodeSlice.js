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
        questions: []
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
        }
    }
});

export const {
    setFunctionName,
    setFunctionArguments,
    setFunctionCode,
    setQuestions
} = visualizeCodeSlice.actions;
export default visualizeCodeSlice.reducer;