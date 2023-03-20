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
        },
        typedAlgoOutput:[],
        algoLineState: 'semi',
        algoLine: '',
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
        },
        setTypedAlgoOutput: (state, action) => {
            state.typedAlgoOutput = action.payload.typedAlgoOutput;
        },
        setAlgoLineState: (state, action) => {
            state.algoLineState = action.payload.algoLineState;
        },
        setAlgoLine: (state, action) => {
            state.algoLine = action.payload.algoLine;
        }
    }
});

export const {
    setSetData,
    setSetSelected,
    setSetNames,
    setTrainingStarted,
    setCurrentQuestionData,
    setTypedAlgoOutput,
    setAlgoLineState,
    setAlgoLine
} = setSlice.actions;
export default setSlice.reducer;