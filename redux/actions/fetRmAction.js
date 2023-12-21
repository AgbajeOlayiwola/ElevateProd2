import apiRoutes from '../helper/apiRoutes';
import { fetchRM } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
import { getCookie } from 'cookies-next';
//fetchRM actions
export const fetchRMLoadStart = () => ({
    type: fetchRM.FETCHRM_START
});

export const fetchRMLoadSuccess = (billers) => ({
    type: fetchRM.FETCHRM_SUCCESS,
    payload: billers
});

export const fetchRMLoadError = (errorMessage) => ({
    type: fetchRM.FETCHRM_ERROR,
    payload: errorMessage
});
export const loadfetchRM = (code) => (dispatch) => {
    dispatch(fetchRMLoadStart());

    const cookie = getCookie('cookieToken');
    axiosInstance
        .post(`${apiRoutes?.fetchRM}`, code, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => dispatch(fetchRMLoadSuccess(response?.data?.data)))
        .catch((error) =>
            dispatch(fetchRMLoadError(error?.response?.data?.message))
        );
};
//fetchRM actions end
