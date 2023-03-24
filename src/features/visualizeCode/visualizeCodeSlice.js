import { createSlice } from '@reduxjs/toolkit';

export const visualizeCodeSlice = createSlice({
    name: 'visualizeCode',
    initialState: {
        functionName: '',
        arguments: [
            {
                input: ''
            }
        ],
        code: ''
    },
    reducers: {
        setFunctionName: (state, action) => {
            state.functionName = action.payload.functionName;
        },
        setFunctionArguments: (state, action) => {
            state.arguments = action.payload.arguments;

        },
        setFunctionCode: (state, action) => {
            state.code = action.payload.code;
        }
    }
});

export const {
    setFunctionName,
    setFunctionArguments,
    setFunctionCode
} = visualizeCodeSlice.actions;
export default visualizeCodeSlice.reducer;