import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const customerCategorySlice = createSlice({
    name: 'customerCategory',
    initialState,
    reducers: {
        setCustomerCategory: (state, { payload }) => {
            return payload;
        },
        clearCustomerCategory: () => {
            return '';
        }
    }
});

const { reducer, actions } = customerCategorySlice;
export const { setCustomerCategory, clearCustomerCategory } = actions;
export default reducer;
