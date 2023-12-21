import { createSlice } from '@reduxjs/toolkit';
const initialState = {};
const storeSliceData = createSlice({
    name: 'storeSlice',
    initialState,
    reducers: {
        setStoreSlice: (state, { payload }) => {
            return payload;
        },
        clearStoreSlice: () => {
            return {};
        }
    }
});

const { reducer, actions } = storeSliceData;
export const { setStoreSlice, clearStoreSlice } = actions;
export default reducer;
