import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const loanRequestSlice = createSlice({
    name: 'loanRequest',
    initialState,
    reducers: {
        setLoanRequest: (state, { payload }) => {
            return payload;
        },
        clearLoanRequest: () => {
            return '';
        }
    }
});

const { reducer, actions } = loanRequestSlice;
export const { setLoanRequest, clearLoanRequest } = actions;
export default reducer;
