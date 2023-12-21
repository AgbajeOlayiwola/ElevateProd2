import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const faceMatchDetailsSlice = createSlice({
    name: 'faceMatchDetails',
    initialState,
    reducers: {
        setfaceMatchDetails: (state, { payload }) => {
            return payload;
        },
        clearfaceMatchDetails: () => {
            return '';
        }
    }
});

const { reducer, actions } = faceMatchDetailsSlice;
export const { setfaceMatchDetails, clearfaceMatchDetails } = actions;
export default reducer;
