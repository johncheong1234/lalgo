import { createSlice } from '@reduxjs/toolkit';

export const chooseLineGameControllerSlice = createSlice({
    name: 'chooseLineGameController',
    initialState: {
        visualizeCodes: []
    },
    reducers: {
        setVisualizeCodes: (state, action) => {
            state.visualizeCodes = action.payload.visualizeCodes;
        }
    }
});

export const {
    setVisualizeCodes
} = chooseLineGameControllerSlice.actions;
export default chooseLineGameControllerSlice.reducer;