import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const viewinventorySliceData = createSlice({
    name: 'viewInventory',
    initialState,
    reducers: {
        setViewInventory: (state, { payload }) => {
            return payload;
        },
        clearViewInventory: () => {
            return '';
        }
    }
});

const { reducer, actions } = viewinventorySliceData;
export const { setViewInventory, clearViewInventory } = actions;
export default reducer;
