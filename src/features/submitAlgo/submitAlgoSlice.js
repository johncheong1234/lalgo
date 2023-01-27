import { createSlice } from '@reduxjs/toolkit';

export const submitAlgoSlice = createSlice({
    name: 'submitAlgo',
    initialState: {
        algoName: '',
        algoKey: '',
        algoCode: []
    },
    reducers: {
        setAlgoName: (state, action) => {
            state.algoName = action.payload;
        },
        setAlgoKey: (state, action) => {
            state.algoKey = action.payload;
        },
        setAlgoCode: (state, action) => {
            state.algoCode = action.payload;
        }
    }
});

export const {
    setAlgoName,
    setAlgoKey,
    setAlgoCode
} = submitAlgoSlice.actions;
export default submitAlgoSlice.reducer;