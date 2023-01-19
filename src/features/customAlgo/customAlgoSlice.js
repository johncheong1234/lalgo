import { createSlice } from '@reduxjs/toolkit';

export const customAlgoSlice = createSlice({
    name: 'customAlgo',
    initialState:{
        customAlgoInput: [],
        typedAlgoOutput: [],
        algoLineState: 'semi'
    },
    reducers:{

    }
});

export default customAlgoSlice.reducer;