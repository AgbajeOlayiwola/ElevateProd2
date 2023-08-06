import { getCookie } from 'cookies-next';
import { getAllComplaintType } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
export const getAllComplaintStart = () => ({
    type: getAllComplaintType.GET_ALL_COMPLAINT_LOAD_START
});

export const getAllComplaintSuccess = (getAllComplaintSuccess) => ({
    type: getAllComplaintType.GET_ALL_COMPLAINT_LOAD_SUCCESS,
    payload: getAllComplaintSuccess
});

export const getAllComplaintError = (getAllComplaintErrorMessage) => ({
    type: getAllComplaintType.GET_ALL_COMPLAINT_LOAD_ERROR,
    payload: getAllComplaintErrorMessage
});
export const getAllComplaintGet = (data) => (dispatch) => {
    dispatch(getAllComplaintStart());
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .get(`${apiRoutes.getAllComplaint}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(getAllComplaintSuccess(response?.data));
        })
        .catch((error) => {
            dispatch(getAllComplaintError(error?.response));
        });
};
