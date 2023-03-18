import { createSlice } from '@reduxjs/toolkit';

export const pastRecordsSlice = createSlice({
    name: 'pastRecordsSlice',
    initialState: {
        pastRecords: [],
    },
    reducers: {
        setPastRecords: (state, action) => {
            state.pastRecords = action.payload.pastRecords
        },
    }
});

export const {
    setPastRecords,
} = pastRecordsSlice.actions;
export default pastRecordsSlice.reducer;