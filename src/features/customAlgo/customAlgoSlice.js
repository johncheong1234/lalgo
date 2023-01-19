import { createSlice } from '@reduxjs/toolkit';

export const customAlgoSlice = createSlice({
    name: 'customAlgo',
    initialState:{
        customAlgoInput: [],
        typedAlgoOutput: [],
        algoLineState: 'semi'
    },
    reducers:{
        setCustomAlgoInput: (state, action) => {
            state.customAlgoInput = action.payload.customAlgoInput;
        }
    }
});

export const { setCustomAlgoInput } = customAlgoSlice.actions;
export default customAlgoSlice.reducer;