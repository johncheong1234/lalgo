import { createSlice } from '@reduxjs/toolkit';

export const setSlice = createSlice({
    name: 'set',
    initialState: {
        setNames: [
        ],
        setData: {
        },
        setSelected: '',
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
        }
    }
});

export const {
    setSetData,
    setSetSelected,
    setSetNames
} = setSlice.actions;
export default setSlice.reducer;