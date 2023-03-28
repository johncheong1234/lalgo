import { createSlice } from '@reduxjs/toolkit';

export const chooseLineGameSlice = createSlice({
    name: 'chooseLineGame',
    initialState: {
        gameRows: [],
        rowAttempting: 0,
        uniqueCodeLineAt:[],
        codeLineAtAnswer: 'default'
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
        }
    }
});

export const {
    setGameRows,
    setRowAttempting,
    setUniqueCodeLineAt,
    setCodeLineAtAnswer
} = chooseLineGameSlice.actions;
export default chooseLineGameSlice.reducer;