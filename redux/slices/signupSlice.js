import { login } from '../types/actionTypes';
import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../helper/apiClient';

const initialState = {
    user: null,
    loggedInUser: null,
    errorMessage: null
};
export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        createNewUserAccount: (accountData) => {
            return (dispatch) => {
                // dispatch(completeProfileLoadStart());
                axiosInstance
                    .post(`${apiRoutes.newCreateAccount}`, accountData)
                    .then((response) => {
                        console.log('create New Account', response.data);
                        user(response.data);
                    })
                    .catch((error) => {
                        console.log(
                            'create new account:',
                            error.response.data.message
                        );
                        errorMessage(error.response.data.message);
                    });
            };
        }
    }
});
// Action creators are generated for each case reducer function
export const { createNewUserAccount } = signupSlice.actions;

export default signupSlice.reducer;
