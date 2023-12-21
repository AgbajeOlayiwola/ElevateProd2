import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const transferSlice = createSlice({
    name: 'transfer',
    initialState,
    reducers: {
        setTransfer: (state, { payload }) => {
            return payload;
        },
        clearTransfer: () => {
            return '';
        }
    }
});

const { reducer, actions } = transferSlice;
export const { setTransfer, clearTransfer } = actions;
export default reducer;
