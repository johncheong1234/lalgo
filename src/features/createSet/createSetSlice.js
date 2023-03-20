import { createSlice } from '@reduxjs/toolkit';

export const createSetSlice = createSlice({
    name: 'createSet',
    initialState: {
        questions: {},
        createSetData: []
    },
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload.questions;
        },
        setCreateSetData: (state, action) => {
            state.createSetData = action.payload.createSetData;
        }
    }
});

export const {
    setQuestions,
    setCreateSetData
} = createSetSlice.actions;
export default createSetSlice.reducer;