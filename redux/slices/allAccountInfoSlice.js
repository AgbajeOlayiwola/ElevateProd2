import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const allAccountSlice = createSlice({
    name: 'allAccountInfo',
    initialState,
    reducers: {
        setAllAccountInfo: (state, { payload }) => {
            return payload;
        },
        clearAllAccountInfo: () => {
            return '';
        }
    }
});

const { reducer, actions } = allAccountSlice;
export const { setAllAccountInfo, clearAllAccountInfo } = actions;
export default reducer;
