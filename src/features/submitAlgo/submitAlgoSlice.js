import { createSlice } from '@reduxjs/toolkit';

export const submitAlgoSlice = createSlice({
    name: 'submitAlgo',
    initialState: {
        algoName: '',
        description: '',
        algoCode: [],
    },
    reducers: {
        setAlgoName: (state, action) => {
            state.algoName = action.payload;
        },
        setDescription: (state, action) => {
            state.description = action.payload;
        },
        setAlgoCode: (state, action) => {
            state.algoCode = action.payload;
        }
    }
});

export const {
    setAlgoName,
    setDescription,
    setAlgoCode
} = submitAlgoSlice.actions;
export default submitAlgoSlice.reducer;