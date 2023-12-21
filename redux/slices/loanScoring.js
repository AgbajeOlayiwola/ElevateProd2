import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const loanScoringSlice = createSlice({
    name: 'loanScoring',
    initialState,
    reducers: {
        setLoanScoring: (state, { payload }) => {
            return payload;
        },
        clearLoanScoring: () => {
            return '';
        }
    }
});

const { reducer, actions } = loanScoringSlice;
export const { setLoanScoring, clearLoanScoring } = actions;
export default reducer;
