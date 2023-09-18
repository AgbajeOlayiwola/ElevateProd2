import { getCookie } from 'cookies-next';
import { disputeType } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//GET Dispute Type Info actions
export const getDisputCategOryTypeStart = () => ({
    type: disputeType.DISPUTETYPE_LOAD_START
});

export const getDisputCategOryTypeSuccess = (getDisputCategOryTypeSuccess) => ({
    type: disputeType.DISPUTETYPE_LOAD_SUCCESS,
    payload: getDisputCategOryTypeSuccess
});

export const getDisputCategOryTypeError = (
    getDisputCategOryTypeErrorMessage
) => ({
    type: disputeType.DISPUTETYPE_LOAD_ERROR,
    payload: getDisputCategOryTypeErrorMessage
});
export const getDisputCategOryTypeGen = () => (dispatch) => {
    dispatch(getDisputCategOryTypeStart());
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .get(`${apiRoutes.complaintTypes}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(getDisputCategOryTypeSuccess(response?.data?.data));
        })
        .catch((error) => dispatch(getDisputCategOryTypeError(error)));
};
//Get Dispute Type Info actions end
