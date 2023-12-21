import { getCookie } from 'cookies-next';
import apiRoutes from '../helper/apiRoutes';
import { getMiniStatement_Type } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
export const getMiniStatementStart = () => ({
    type: getMiniStatement_Type.GET_MINI_STATEMENT_START
});

export const getMiniStatementSuccess = (getMiniStatementSuccess) => ({
    type: getMiniStatement_Type.GET_MINI_STATEMENT_SUCCESS,
    payload: getMiniStatementSuccess
});

export const getMiniStatementError = (getMiniStatementerrorMessage) => ({
    type: getMiniStatement_Type.GET_MINI_STATEMENT_ERROR,
    payload: getMiniStatementerrorMessage
});
export const getMiniStatementGen = (code) => (dispatch) => {
    dispatch(getMiniStatementStart());
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .post(`${apiRoutes.getMiniStatemnt}`, code, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(getMiniStatementSuccess(response?.data?.data));
        })
        .catch((error) => dispatch(getMiniStatementError(error)));
};
//Get Mini Statement actions end
