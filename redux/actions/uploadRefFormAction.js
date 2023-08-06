import { getCookie } from 'cookies-next';
import { uploadRefferenceFormType } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//upload  refference form start
export const uploadRefFormStart = () => ({
    type: uploadRefferenceFormType.GET_REFFERENCE_FORM_START
});

export const uploadRefFormSuccess = (uploadRefForm) => ({
    type: uploadRefferenceFormType.GET_REFFERENCE_FORM_SUCCESS,
    payload: uploadRefForm
});

export const uploadRefFormError = (uploadRefFormErrorMessages) => ({
    type: uploadRefferenceFormType.GET_REFFERENCE_FORM_ERROR,
    payload: uploadRefFormErrorMessages
});
export const uploadRefFormData = (uploadrefformdata) => (dispatch) => {
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    // dispatch(accountNumberLoadStart());
    axios
        .post(
            `https://mysmeapp.ecobank.com:8443${apiRoutes.uploadRefForm}`,
            uploadrefformdata,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Client-Type': 'web',
                    Authorization: `Bearer ${cookie}`
                }
            }
        )
        .then((response) => {
            dispatch(uploadRefFormSuccess(response));
            // //console.logresponse);
        })
        .catch((error) => dispatch(uploadRefFormError(error?.response)));
};
//upload refference form end
