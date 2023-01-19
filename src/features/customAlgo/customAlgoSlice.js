import { createSlice } from '@reduxjs/toolkit';

export const customAlgoSlice = createSlice({
    name: 'customAlgo',
    initialState: {
        customAlgoInput: [],
        typedAlgoOutput: [],
        algoLineState: 'semi',
        codeInput: ''
    },
    reducers: {
        setCustomAlgoInput: (state, action) => {
            state.customAlgoInput = action.payload.customAlgoInput;
        },
        setAlgoLineState(state, action) {
            state.algoLineState = action.payload.algoLineState;
        },
        setCodeInput(state, action) {
            state.codeInput = action.payload.codeInput;
        },
        addCodeInputToTypedAlgoOutput(state) {
            state.typedAlgoOutput.push(state.codeInput);
            state.codeInput = '';
        }
    }
});

export const { setCustomAlgoInput, setAlgoLineState, setCodeInput, addCodeInputToTypedAlgoOutput } = customAlgoSlice.actions;
export default customAlgoSlice.reducer;