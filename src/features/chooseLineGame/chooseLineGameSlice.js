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
        showCode: false
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
        },
        setShowCode: (state, action) => {
            state.showCode = action.payload.showCode;
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
    setGameCode,
    setShowCode
} = chooseLineGameSlice.actions;
export default chooseLineGameSlice.reducer;