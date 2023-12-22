import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const loanDataSlice = createSlice({
    name: 'loanData',
    initialState,
    reducers: {
        setLoanData: (state, { payload }) => {
            return payload;
        },
        clearLoanData: () => {
            return '';
        }
    }
});

const { reducer, actions } = loanDataSlice;
export const { setLoanData, clearLoanData } = actions;
export default reducer;
