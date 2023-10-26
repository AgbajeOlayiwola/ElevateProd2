import { createSlice } from '@reduxjs/toolkit';
const initialState = {};
const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, { payload }) => {
            return payload;
        },
        clearToken: () => {
            return {};
        }
    }
});

const { reducer, actions } = tokenSlice;
export const { setToken, clearToken } = actions;
export default reducer;
