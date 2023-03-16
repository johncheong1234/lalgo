import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userObject: {}
    },
    reducers: {
        setUserObject: (state, action) => {
            state.userObject = action.payload.userObject;
        }
    }
});

export const {
    setUserObject
} = userSlice.actions;
export default userSlice.reducer;