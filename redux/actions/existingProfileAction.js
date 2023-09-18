import { setCookie } from 'cookies-next';
import apiRoutes from '../helper/apiRoutes';
import { existingUserProfile } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//existingUserProfile action
export const existingUserProfileLoadStart = () => ({
    type: existingUserProfile.EXISTINGUSERPROFILE_LOAD_START
});

export const existingUserProfileLoadSuccess = (existingUserProfilee) => ({
    type: existingUserProfile.EXISTINGUSERPROFILE_LOAD_SUCCESS,
    payload: existingUserProfilee
});

export const existingUserProfileLoadError = (errorMessage) => ({
    type: existingUserProfile.EXISTINGUSERPROFILE_LOAD_ERROR,
    payload: errorMessage
});
export const existingUserProfileData = (data) => (dispatch) => {
    dispatch(existingUserProfileLoadStart());
    axiosInstance
        .post(`${apiRoutes.existingUserProfile}`, data)
        .then((response) => {
            setCookie('cookieToken', response?.data?.data?.token, {
                // httpOnly: 'true',
                // maxAge: 60 * 1,
                secure: 'true'
            });
            dispatch(existingUserProfileLoadSuccess(response));
            //console.log(response);
        })
        .catch((error) => dispatch(existingUserProfileLoadError(error)));
};

//accountNumber action end
