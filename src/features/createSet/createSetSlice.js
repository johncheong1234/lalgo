import { createSlice } from '@reduxjs/toolkit';

export const createSetSlice = createSlice({
    name: 'createSet',
    initialState: {
        questions: {},
        createSetData: [],
        setName:''
    },
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload.questions;
        },
        setCreateSetData: (state, action) => {
            state.createSetData = action.payload.createSetData;
        },
        setSetName: (state, action) => {
            state.setName = action.payload.setName;
        }
    }
});

export const {
    setQuestions,
    setCreateSetData,
    setSetName
} = createSetSlice.actions;
export default createSetSlice.reducer;