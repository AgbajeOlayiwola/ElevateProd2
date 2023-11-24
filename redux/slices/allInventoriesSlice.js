import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const allInvntoriesSlice = createSlice({
    name: 'allInventories',
    initialState,
    reducers: {
        setAllInventories: (state, { payload }) => {
            return payload;
        },
        clearAllInventories: () => {
            return '';
        }
    }
});

const { reducer, actions } = allInvntoriesSlice;
export const { setAllInventories, clearAllInventories } = actions;
export default reducer;
