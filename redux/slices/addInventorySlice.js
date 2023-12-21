import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const addInventorySlice = createSlice({
    name: 'addInventory',
    initialState,
    reducers: {
        setAddInventory: (state, { payload }) => {
            return payload;
        },
        clearAddInventory: () => {
            return '';
        }
    }
});

const { reducer, actions } = addInventorySlice;
export const { setAddInventory, clearAddInventory } = actions;
export default reducer;
