import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const createStoreSlice = createSlice({
    name: 'createStoreSliceData',
    initialState,
    reducers: {
        setCreateStore: (state, { payload }) => {
            return payload;
        },
        clearCreateStore: () => {
            return '';
        }
    }
});

const { reducer, actions } = createStoreSlice;
export const { setCreateStore, clearCreateStore } = actions;
export default reducer;
``;
