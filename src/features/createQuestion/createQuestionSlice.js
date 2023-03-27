import { createSlice } from '@reduxjs/toolkit';

export const createQuestionSlice = createSlice({
    name: 'createQuestion',
    initialState: {
        questionName: '',
        questionDescription: ''
    },
    reducers: {
        setQuestionName: (state, action) => {
            state.questionName = action.payload.questionName;
        },
        setQuestionDescription: (state, action) => {
            state.questionDescription = action.payload.questionDescription;
        }
    }
});

export const {
    setQuestionName,
    setQuestionDescription
} = createQuestionSlice.actions;
export default createQuestionSlice.reducer;