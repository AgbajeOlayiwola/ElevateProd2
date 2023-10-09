import { getCookie } from 'cookies-next';
import apiRoutes from '../helper/apiRoutes';
import { uploadreffereeType } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
export const getUploadRefereeLoad = () => ({
    type: uploadreffereeType.UPLOAD_REFEREE_START
});
export const getUploadReffereeSuccess = (UploadreffereeSuccess) => ({
    type: uploadreffereeType.UPLOAD_REFEREE_SUCCESS,
    payload: UploadreffereeSuccess
});
export const getUploadReffereeError = (UploadreffereeError) => ({
    type: uploadreffereeType.UPLOAD_REFEREE_ERROR,
    payload: UploadreffereeError
});
export const getUploadReffereeDetails = (uploadrefereeData) => (dispatch) => {
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }

    axiosInstance
        .post(`${apiRoutes.uploadrefferee}`, uploadrefereeData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            // //console.logresponse.data.data);
            dispatch(getUploadReffereeSuccess(response));
        })
        .catch((error) => dispatch(getUploadReffereeError(error?.response)));
};
