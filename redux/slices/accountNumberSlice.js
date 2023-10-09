import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const accountNumberSlice = createSlice({
    name: 'accountNumber',
    initialState,
    reducers: {
        setAccountNumber: (state, { payload }) => {
            return payload;
        },
        clearAccountNumber: () => {
            return '';
        }
    }
});

const { reducer, actions } = accountNumberSlice;
export const { setAccountNumber, clearAccountNumber } = actions;
export default reducer;
