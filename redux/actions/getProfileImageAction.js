import { getCookie } from 'cookies-next';
import { getProfileImg } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
export const getProfileImgStart = () => ({
    type: getProfileImg.GETPROFILEIMG_LOAD_START
});

export const getProfileImgSuccess = (getProfileImgSuccess) => ({
    type: getProfileImg.GETPROFILEIMG_LOAD_SUCCESS,
    payload: getProfileImgSuccess
});

export const getProfileImgError = (getProfileImgErrorMessage) => ({
    type: getProfileImg.GETPROFILEIMG_LOAD_ERROR,
    payload: getProfileImgErrorMessage
});
export const getProfileImgAction = (data) => (dispatch) => {
    dispatch(getProfileImgStart());
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .get(`${apiRoutes.getProfileImg}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(getProfileImgSuccess(response?.data));
        })
        .catch((error) => {
            dispatch(getProfileImgError(error?.response?.data?.message));
        });
};
