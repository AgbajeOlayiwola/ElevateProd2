import { getCookie } from 'cookies-next';
import { airtime } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//airtime action
export const airtimeLoadStart = () => ({
    type: airtime.AIRTIME_LOAD_START
});

export const airtimeLoadSuccess = (airtimes) => ({
    type: airtime.AIRTIME_LOAD_SUCCESS,
    payload: airtimes
});

export const airtimeLoadError = (errorMessageAirtime) => ({
    type: airtime.AIRTIME_LOAD_ERROR,
    payload: errorMessageAirtime
});
export const postAirtime = (data) => (dispatch) => {
    const cookie = getCookie('cookieToken');
    dispatch(airtimeLoadStart());
    axiosInstance
        .post(`${apiRoutes.airtime}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => dispatch(airtimeLoadSuccess(response?.data)))
        .catch((error) =>
            dispatch(airtimeLoadError(error?.response?.data?.message))
        );
};

//airtime action end
