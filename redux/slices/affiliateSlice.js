import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const affiliateSlice = createSlice({
    name: 'affiliate',
    initialState,
    reducers: {
        setAffiliate: (state, { payload }) => {
            return payload;
        },
        clearAffiliate: () => {
            return '';
        }
    }
});

const { reducer, actions } = affiliateSlice;
export const { setAffiliate, clearAffiliate } = actions;
export default reducer;
