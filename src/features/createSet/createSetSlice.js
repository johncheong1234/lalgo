import { createSlice } from '@reduxjs/toolkit';

export const createSetSlice = createSlice({
    name: 'createSet',
    initialState: {
        questions: {}
    },
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload.questions;
        }
    }
});

export const {
    setQuestions
} = createSetSlice.actions;
export default createSetSlice.reducer;