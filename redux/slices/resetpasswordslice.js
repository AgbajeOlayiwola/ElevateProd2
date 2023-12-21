import { createSlice } from '@reduxjs/toolkit';
const initialState = {};
const resetPasswordSlice = createSlice({
    name: 'resetPasswordslice',
    initialState,
    reducers: {
        setResetPassword: (state, { payload }) => {
            return payload;
        },
        clearResetPassword: () => {
            return {};
        }
    }
});

const { reducer, actions } = resetPasswordSlice;
export const { setResetPassword, clearResetPassword } = actions;
export default reducer;
