import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const allStartsSlice = createSlice({
    name: 'allStoresData',
    initialState,
    reducers: {
        setAllStars: (state, { payload }) => {
            return payload;
        },
        clearAllStars: () => {
            return '';
        }
    }
});

const { reducer, actions } = allStartsSlice;
export const { setAllStars, clearAllStars } = actions;
export default reducer;
