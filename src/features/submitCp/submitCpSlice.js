import { createSlice } from '@reduxjs/toolkit';

export const submitCpSlice = createSlice({
    name: 'submitCp',
    initialState: {
        testCase: '',
        code: '',
    },
    reducers: {
        setTestCase: (state, action) => {
            state.testCase = action.payload.testCase;
        },
        setCode: (state, action) => {
            state.code = action.payload.code;
        }
    }
});

export const {
  setTestCase,
  setCode
} = submitCpSlice.actions;
export default submitCpSlice.reducer;