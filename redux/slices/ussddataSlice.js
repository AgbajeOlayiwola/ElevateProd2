import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const ussdData = createSlice({
    name: 'ussdData',
    initialState,
    reducers: {
        setUssdData: (state, { payload }) => {
            return payload;
        },
        clearUssdData: () => {
            return '';
        }
    }
});

const { reducer, actions } = ussdData;
export const { setUssdData, clearUssdData } = actions;
export default reducer;
