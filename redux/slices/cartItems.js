import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        setCartItem: (state, { payload }) => {
            return payload;
        },
        clearCartItem: () => {
            return '';
        }
    }
});

const { reducer, actions } = cartItemsSlice;
export const { setCartItem, clearCartItem } = actions;
export default reducer;
