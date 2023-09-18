import { getCookie } from 'cookies-next';
import { userProfile } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//profile actions
export const userProfileLoadStart = () => ({
    type: userProfile.USERPROFILE_LOAD_START
});

export const userProfileLoadSuccess = (userProfiles) => ({
    type: userProfile.USERPROFILE_LOAD_SUCCESS,
    payload: userProfiles
});

export const userProfileLoadError = (errorMessage) => ({
    type: userProfile.USERPROFILE_LOAD_ERROR,
    payload: errorMessage
});

export const loadUserProfile = () => (dispatch) => {
    dispatch(userProfileLoadStart());
    const cookie = getCookie('cookieToken');
    axiosInstance
        .get(`https://mysmeapp.ecobank.com:8443${apiRoutes.userProfile}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(userProfileLoadSuccess(response?.data));
        })
        .catch((error) =>
            dispatch(userProfileLoadError(error?.response?.message))
        );
};
//userprofile actions end
