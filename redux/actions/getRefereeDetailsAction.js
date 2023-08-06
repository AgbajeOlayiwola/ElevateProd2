import { getCookie } from 'cookies-next';
import { reffereeType } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
export const getRefereeLoad = () => ({
    type: reffereeType.REFEREE_START
});
export const getReffereeSuccess = (reffereeSuccess) => ({
    type: reffereeType.REFEREE_SUCCESS,
    payload: reffereeSuccess
});
export const getReffereeError = (reffereeError) => ({
    type: reffereeType.REFEREE_ERROR,
    payload: reffereeError
});
export const getReffereeDetails = (refereeData) => (dispatch) => {
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }

    axios
        .post(
            `https://mysmeapp.ecobank.com:8443${apiRoutes.reffernceFormShare}`,
            refereeData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Client-Type': 'web',
                    Authorization: `Bearer ${cookie}`
                }
            }
        )
        .then((response) => {
            // //console.logresponse.data.data);
            dispatch(getReffereeSuccess(response));
        })
        .catch((error) => dispatch(getReffereeError(error?.response)));
};
