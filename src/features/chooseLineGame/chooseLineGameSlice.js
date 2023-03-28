import { createSlice } from '@reduxjs/toolkit';

export const chooseLineGameSlice = createSlice({
    name: 'chooseLineGame',
    initialState: {
        gameRows: [],
        rowAttempting: 0,
        uniqueCodeLineAt:[],
        codeLineAtAnswer: 'default',
        mistakeCount: 0
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
        }
    }
});

export const {
    setGameRows,
    setRowAttempting,
    setUniqueCodeLineAt,
    setCodeLineAtAnswer,
    setMistakeCount
} = chooseLineGameSlice.actions;
export default chooseLineGameSlice.reducer;