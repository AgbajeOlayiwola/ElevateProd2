import { getCookie } from 'cookies-next';
import { addecoOnlineType } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
export const addecoOnlineStart = () => ({
    type: addecoOnlineType.ECO_ONLINE_TYPE_START
});

export const addecoOnlineSuccess = (addecoOnlineSuccess) => ({
    type: addecoOnlineType.ECO_ONLINE_TYPE_SUCCESS,
    payload: addecoOnlineSuccess
});
export const addecoOnlineSErrorMessage = (addecoOnlineErrorMessage) => ({
    type: addecoOnlineType.ECO_ONLINE_TYPE_ERROR,
    payload: addecoOnlineErrorMessage
});
export const addecoOnlineAction = (data) => (dispatch) => {
    dispatch(addecoOnlineStart());
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .post(`${apiRoutes.addOmnilite}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(addecoOnlineSuccess(response));
        })
        .catch((error) => {
            dispatch(addecoOnlineSErrorMessage(error?.response));
        });
};
