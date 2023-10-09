import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const pinnedSlice = createSlice({
    name: 'pinned',
    initialState,
    reducers: {
        setPinned: (state, { payload }) => {
            return payload;
        },
        clearPinned: () => {
            return '';
        }
    }
});

const { reducer, actions } = pinnedSlice;
export const { setPinned, clearPinned } = actions;
export default reducer;
