import { getCookie } from 'cookies-next';
import { lodgeComplaint_Type } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
export const lodgeDisputeStart = () => ({
    type: lodgeComplaint_Type.GET_LODGE_COMPLAINT_START
});

export const lodgeDisputeSuccess = (lodgeDisputeSuccess) => ({
    type: lodgeComplaint_Type.GET_LODGE_COMPLAINT_SUCCESS,
    payload: lodgeDisputeSuccess
});

export const lodgeDisputeError = (lodgeDisputeErrorSubMessage) => ({
    type: lodgeComplaint_Type.GET_LODGE_COMPLAINT_ERROR,
    payload: lodgeDisputeErrorSubMessage
});
export const lodgeDisputeSubGen = (data) => (dispatch) => {
    dispatch(lodgeDisputeStart(data));
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .post(`${apiRoutes.lodgeComplaint}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(lodgeDisputeSuccess(response?.data?.data));
        })
        .catch((error) => {
            dispatch(lodgeDisputeError(error?.response));
        });
};
