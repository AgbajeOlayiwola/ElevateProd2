import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const existingUserDetailsSlice = createSlice({
    name: 'existingUserDetails',
    initialState,
    reducers: {
        setExistingUserDetails: (state, { payload }) => {
            return payload;
        },
        clearExistingUserDetails: () => {
            return '';
        }
    }
});

const { reducer, actions } = existingUserDetailsSlice;
export const { setExistingUserDetails, clearExistingUserDetails } = actions;
export default reducer;
