import { createSlice } from '@reduxjs/toolkit';

export const questionsSlice = createSlice({
    name: 'questions',
    initialState: {
        questions: []
    },
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload.questions;
        },
    }
});

export const {
    setQuestions
} = questionsSlice.actions;
export default questionsSlice.reducer;