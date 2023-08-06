import { getCookie } from 'cookies-next';
import { getFullStatement_Type } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//GET Full Statement actions
export const getFullStatementStart = () => ({
    type: getFullStatement_Type.GET_FULL_STATEMENT_START
});

export const getFullStatementSuccess = (getFullStatementSuccess) => ({
    type: getFullStatement_Type.GET_FULL_STATEMENT_SUCCESS,
    payload: getFullStatementSuccess
});

export const getFullStatementError = (getFullStatementerrorMessage) => ({
    type: getFullStatement_Type.GET_FULL_STATEMENT_ERROR,
    payload: getFullStatementerrorMessage
});
export const getFullStatementGen = (data) => (dispatch) => {
    dispatch(getFullStatementStart());
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .post(`${apiRoutes.getFullStatement}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(getFullStatementSuccess(response?.data?.data));
        })
        .catch((error) => dispatch(getFullStatementError(error)));
};
//Get Full Statement actions end
