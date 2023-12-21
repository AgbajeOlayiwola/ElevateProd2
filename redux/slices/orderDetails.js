import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState,
    reducers: {
        setOrderDetails: (state, { payload }) => {
            return payload;
        },
        clearOrderDetails: () => {
            return '';
        }
    }
});

const { reducer, actions } = orderDetailsSlice;
export const { setOrderDetails, clearOrderDetails } = actions;
export default reducer;
