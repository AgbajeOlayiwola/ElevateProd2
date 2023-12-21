import { createSlice } from '@reduxjs/toolkit';
const initialState = 0;
const cartSlice = createSlice({
    name: 'cartSliceData',
    initialState,
    reducers: {
        setCart: (state, { payload }) => {
            return payload;
        },
        clearCart: () => {
            return '';
        }
    }
});

const { reducer, actions } = cartSlice;
export const { setCart, clearCart } = actions;
export default reducer;
