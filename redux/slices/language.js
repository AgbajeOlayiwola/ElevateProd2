import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, { payload }) => {
            return payload;
        },
        clearLanguage: () => {
            return '';
        }
    }
});

const { reducer, actions } = languageSlice;
export const { setLanguage, clearLanguage } = actions;
export default reducer;
