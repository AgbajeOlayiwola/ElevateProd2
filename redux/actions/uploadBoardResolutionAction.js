import { getCookie } from 'cookies-next';
import { uploadRefferenceFormType } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//upload  board resolution start
export const uploadBoardResStart = () => ({
    type: uploadRefferenceFormType.GET_REFFERENCE_FORM_START
});

export const uploadBoardResSuccess = (uploadBoardRes) => ({
    type: uploadRefferenceFormType.GET_REFFERENCE_FORM_SUCCESS,
    payload: uploadBoardRes
});

export const uploadBoardResError = (uploadBoardResErrorMessages) => ({
    type: uploadRefferenceFormType.GET_REFFERENCE_FORM_ERROR,
    payload: uploadBoardResErrorMessages
});
export const uploadBoardResData = (uploadboardresdata) => (dispatch) => {
    let cookie;
    r;
    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axios
        .post(
            `https://mysmeapp.ecobank.com:8443${apiRoutes.uploadBoardRes}`,
            uploadboardresdata,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Client-Type': 'web',
                    Authorization: `Bearer ${cookie}`
                }
            }
        )
        .then((response) => {
            dispatch(uploadBoardResSuccess(response?.data[0]?.accountNumber));
        })
        .catch((error) =>
            dispatch(uploadBoardResError(error?.response?.data?.message))
        );
};
//upload board resolution end
