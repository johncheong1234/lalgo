import { createSlice } from '@reduxjs/toolkit';

export const customAlgoSlice = createSlice({
    name: 'customAlgo',
    initialState: {
        customAlgoInput: [],
        typedAlgoOutput: [],
        codeSubmitted: '',
        algoLineState: 'semi',
        codeInput: '',
        presetAlgos: [[
            'function bubbleSort(arr) {',
            '    for (let i = 0; i < arr.length; i++) {',
            '        for (let j = 0; j < arr.length; j++) {',
            '            if (arr[j] > arr[j + 1]) {',
            '                let temp = arr[j];',
            '                arr[j] = arr[j + 1];',
            '                arr[j + 1] = temp;',
            '            }',
            '        }',
            '    }',
            '    return arr;',
            '}'
        ], [
            'function mergeSort(arr) {',
            '    if (arr.length <= 1) return arr;',
            '    let mid = Math.floor(arr.length / 2);',
            '    let left = mergeSort(arr.slice(0, mid));',
            '    let right = mergeSort(arr.slice(mid));',
            '    return merge(left, right);',
            '}',
            '',
            'function merge(left, right) {',
            '    let merged = [];',
            '    while (left.length && right.length) {',
            '        if (left[0] < right[0]) {',
            '            merged.push(left.shift());',
            '        } else {',
            '            merged.push(right.shift());',
            '        }',
            '    }',
            '    return [...merged, ...left, ...right];',
            '}'
        ]]
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
        },
        setTypedAlgoOutput(state, action) {
            state.typedAlgoOutput = action.payload.typedAlgoOutput;
        },
        setCodeSubmitted(state, action) {
            state.codeSubmitted = action.payload.codeSubmitted;
        }
    }
});

export const {
    setCustomAlgoInput,
    setAlgoLineState,
    setCodeInput,
    addCodeInputToTypedAlgoOutput,
    setTypedAlgoOutput,
    setCodeSubmitted
} = customAlgoSlice.actions;
export default customAlgoSlice.reducer;