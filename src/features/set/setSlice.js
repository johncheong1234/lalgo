import { createSlice } from '@reduxjs/toolkit';

export const setSlice = createSlice({
    name: 'set',
    initialState: {
        setNames: [
        ],
        setData: {
        },
        setSelected: 'default',
        trainingStarted: false,
        currentQuestionData:{
        }
    },
    reducers: {
        setSetData: (state, action) => {
            state.setData = action.payload.setData;
        },
        setSetSelected: (state, action) => {
            state.setSelected = action.payload.setSelected;
        },
        setSetNames: (state, action) => {
            state.setNames = action.payload.setNames;
        },
        setTrainingStarted: (state, action) => {
            state.trainingStarted = action.payload.trainingStarted;
        },
        setCurrentQuestionData: (state, action) => {
            state.currentQuestionData = action.payload.currentQuestionData;
        }
    }
});

export const {
    setSetData,
    setSetSelected,
    setSetNames,
    setTrainingStarted,
    setCurrentQuestionData
} = setSlice.actions;
export default setSlice.reducer;