import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const loanRepaymentSlice = createSlice({
    name: 'loanRepayment',
    initialState,
    reducers: {
        setLoanRepayment: (state, { payload }) => {
            return payload;
        },
        clearLoanRepayment: () => {
            return '';
        }
    }
});

const { reducer, actions } = loanRepaymentSlice;
export const { setLoanRepayment, clearLoanRepayment } = actions;
export default reducer;
