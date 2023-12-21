import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const moreAccountNumberDetailsSlice = createSlice({
    name: 'moreAccountNumberDetails',
    initialState,
    reducers: {
        setMoreAccountNumberDetails: (state, { payload }) => {
            return payload;
        },
        clearMoreAccountNumberDetails: () => {
            return '';
        }
    }
});

const { reducer, actions } = moreAccountNumberDetailsSlice;
export const {
    setMoreAccountNumberDetails,
    clearMoreAccountNumberDetails
} = actions;
export default reducer;
