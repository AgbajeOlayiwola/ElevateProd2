import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const viewProductSliceData = createSlice({
    name: 'viewProductSliceData',
    initialState,
    reducers: {
        setviewProductSliceData: (state, { payload }) => {
            return payload;
        },
        clearviewProductSliceData: () => {
            return '';
        }
    }
});

const { reducer, actions } = viewProductSliceData;
export const { setviewProductSliceData, clearviewProductSliceData } = actions;
export default reducer;
