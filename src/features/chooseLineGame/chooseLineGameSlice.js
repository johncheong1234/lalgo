import { createSlice } from '@reduxjs/toolkit';

export const chooseLineGameSlice = createSlice({
    name: 'chooseLineGame',
    initialState: {
        gameRows: [],
        rowAttempting: 0,
        uniqueCodeLineAt:[],
        codeLineAtAnswer: 'default',
        mistakeCount: 0,
        arguments: [],
        code: '',
    },
    reducers: {
        setGameRows: (state, action) => {
            state.gameRows = action.payload.gameRows;
        },
        setRowAttempting: (state, action) => {
            state.rowAttempting = action.payload.rowAttempting;
        },
        setUniqueCodeLineAt: (state, action) => {
            state.uniqueCodeLineAt = action.payload.uniqueCodeLineAt;
        },
        setCodeLineAtAnswer: (state, action) => {
            state.codeLineAtAnswer = action.payload.codeLineAtAnswer;
        },
        setMistakeCount: (state, action) => {
            state.mistakeCount = action.payload.mistakeCount;
        },
        setGameArguments: (state, action) => {
            state.arguments = action.payload.arguments;
        },
        setGameCode: (state, action) => {
            state.code = action.payload.code;
        }
    }
});

export const {
    setGameRows,
    setRowAttempting,
    setUniqueCodeLineAt,
    setCodeLineAtAnswer,
    setMistakeCount,
    setGameArguments,
    setGameCode
} = chooseLineGameSlice.actions;
export default chooseLineGameSlice.reducer;