import { createSlice } from '@reduxjs/toolkit';

export const customAlgoSlice = createSlice({
    name: 'customAlgo',
    initialState: {
        customAlgoInput: [],
        typedAlgoOutput: [],
        codeSubmitted: '',
        algoLineState: 'semi',
        codeInput: '',
        presetAlgos: {
            bubbleSort: [
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
            ], 
            mergeSort: [
                'function mergeSort(arr) {',
                '    if (arr.length <= 1) return arr;',
                '    let mid = Math.floor(arr.length / 2);',
                '    let left = mergeSort(arr.slice(0, mid));',
                '    let right = mergeSort(arr.slice(mid));',
                '    return merge(left, right);',
                '}',
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
            ],
            maxChunksToSorted: [
                'var maxChunksToSorted = function(arr) {',
                'const chunks = [];',
                'for(let i=0; i<arr.length; i++){',
                'const maxElem = Math.max(arr[i], chunks[chunks.length-1] ? chunks[chunks.length-1] : 0);',
                'while(chunks.length && chunks[chunks.length-1] > arr[i]){',
                'chunks.pop();',
                '}',

                'chunks.push(maxElem);',
                '}',
                'return chunks.length;',
                '}'
            ],
            testAlgo: [
                'test'  
            ],
            sudokuSolver: [
                'var solveSudoku = function(board) {',
                '    const rows = new Array(9).fill(0).map(() => new Array(9).fill(false));',
                '    const cols = new Array(9).fill(0).map(() => new Array(9).fill(false));',
                '    const boxes = new Array(9).fill(0).map(() => new Array(9).fill(false));',
                '    const emptyCells = [];',
                '    for (let i = 0; i < 9; i++) {',
                '        for (let j = 0; j < 9; j++) {',
                '            if (board[i][j] === \'.\') {',
                '                emptyCells.push([i, j]);',
                '            } else {',
                '                const num = board[i][j] - 1;',
                '                rows[i][num] = true;',
                '                cols[j][num] = true;',
                '                boxes[Math.floor(i / 3) * 3 + Math.floor(j / 3)][num] = true;',
                '            }',
                '        }',
                '    }',
                '    const dfs = (index) => {',
                '        if (index === emptyCells.length) {',
                '            return true;',
                '        }',
                '        const [i, j] = emptyCells[index];',
                '        for (let num = 0; num < 9; num++) {',
                '            if (!rows[i][num] && !cols[j][num] && !boxes[Math.floor(i / 3) * 3 + Math.floor(j / 3)][num]) {',
                '                rows[i][num] = true;',
                '                cols[j][num] = true;',
                '                boxes[Math.floor(i / 3) * 3 + Math.floor(j / 3)][num] = true;',
                '                board[i][j] = String(num + 1);',
                '                if (dfs(index + 1)) {',
                '                    return true;',
                '                }',
                '                rows[i][num] = false;',
                '                cols[j][num] = false;',
                '                boxes[Math.floor(i / 3) * 3 + Math.floor(j / 3)][num] = false;',
                '            }',
                '        }',
                '        return false;',
                '    }',
                '    dfs(0);',
                '};'
            ],
        },
        repeatObject:{
            repeatOn: false,
            repeatsLeft: 1,
            repeatsInitial: 1,
        },
        algoSelected: 'default',
        readCode: false,
        showAnswer: true,
        voiceEnabled: false,
        conceptErrorCount: 0,
        carelessErrorCount: 0,
        mistakeModalDisplay: false,
        startTime: 0,
        timeElapsed: 0,
        timedShowAnswers: [],
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
        },
        setRepeatsInitial(state, action){
            state.repeatObject.repeatsInitial = action.payload.repeatsInitial;
        },
        setRepeatOn(state, action){
            state.repeatObject.repeatOn = action.payload.repeatOn;
        },
        setRepeatsLeft(state, action){
            state.repeatObject.repeatsLeft = action.payload.repeatsLeft;
        },
        setAlgoSelected(state, action){
            state.algoSelected = action.payload.algoSelected;
        },
        setReadCode(state, action){
            state.readCode = action.payload.readCode;
        },
        setPresetAlgos(state, action){
            state.presetAlgos = action.payload.presetAlgos;
        },
        setShowAnswer(state, action){
            state.showAnswer = action.payload.showAnswer;
        },
        setVoiceEnabled(state, action){
            state.voiceEnabled = action.payload.voiceEnabled;
        },
        setConceptErrorCount(state, action){
            state.conceptErrorCount = action.payload.conceptErrorCount;
        },
        setCarelessErrorCount(state, action){
            state.carelessErrorCount = action.payload.carelessErrorCount;
        },
        setMistakeModalDisplay(state, action){
            state.mistakeModalDisplay = action.payload.mistakeModalDisplay;
        },
        setStartTime(state, action){
            state.startTime = action.payload.startTime;
        },
        setTimeElapsed(state, action){
            state.timeElapsed = action.payload.timeElapsed;
        },
        addShowAnswerTime(state, action){
            state.timedShowAnswers.push(action.payload.showAnswerTime);
        },
        emptyTimedShowAnswers(state){
            state.timedShowAnswers = [];
        }
    }
});

export const {
    setCustomAlgoInput,
    setAlgoLineState,
    setCodeInput,
    addCodeInputToTypedAlgoOutput,
    setTypedAlgoOutput,
    setCodeSubmitted,
    setRepeatsInitial,
    setRepeatOn,
    setRepeatsLeft,
    setAlgoSelected,
    setReadCode,
    setPresetAlgos,
    setShowAnswer,
    setVoiceEnabled,
    setConceptErrorCount,
    setCarelessErrorCount,
    setMistakeModalDisplay,
    setStartTime,
    setTimeElapsed,
    addShowAnswerTime,
    emptyTimedShowAnswers
} = customAlgoSlice.actions;
export default customAlgoSlice.reducer;