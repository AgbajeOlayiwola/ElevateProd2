import { getCookie } from 'cookies-next';
import apiRoutes from '../helper/apiRoutes';
import { shareRefFormtype } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//upload share reffernce form start
export const shareRefFormStart = () => ({
    type: shareRefFormtype.GET_SHARE_REFFERENCE_START
});

export const shareRefFormSuccess = (shareRefForm) => ({
    type: shareRefFormtype.GET_SHARE_REFFERENCE_SUCCESS,
    payload: shareRefForm
});

export const shareRefFormError = (shareRefFormErrorMessages) => ({
    type: shareRefFormtype.GET_SHARE_REFFERENCE_ERROR,
    payload: shareRefFormErrorMessages
});
export const shareRefFormData = (sharerefformdata) => (dispatch) => {
    let cookie;
    r;
    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axios
        .post(
            `https://mysmeapp.ecobank.com:8443${apiRoutes.shareRefForm}`,
            sharerefformdata,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Client-Type': 'web',
                    Authorization: `Bearer ${cookie}`
                }
            }
        )
        .then((response) => {
            dispatch(shareRefFormSuccess(response?.data[0]?.accountNumber));
            // //console.logresponse.data.accountNumber);
        })
        .catch((error) =>
            dispatch(shareRefFormError(error?.response?.data?.message))
        );
};
//upload hare reffernce formt end
