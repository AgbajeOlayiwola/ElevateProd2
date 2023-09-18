import { getCookie } from 'cookies-next';
import { disputCategoryType } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
export const getDisputCategoryStart = () => ({
    type: disputCategoryType.DISPUTCATEGORY_LOAD_START
});

export const getDisputCategorySuccess = (getDisputCategorySuccess) => ({
    type: disputCategoryType.DISPUTCATEGORY_LOAD_SUCCESS,
    payload: getDisputCategorySuccess
});

export const getDisputCategoryError = (getDisputCategoryErrorMessage) => ({
    type: disputCategoryType.DISPUTCATEGORY_LOAD_ERROR,
    payload: getDisputCategoryErrorMessage
});
export const getDisputCategoryGen = (disputeType) => (dispatch) => {
    dispatch(getDisputCategoryStart());
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .get(`${apiRoutes.complaintCategories}?caseType=${disputeType}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) => {
            dispatch(getDisputCategorySuccess(response?.data?.data));
        })
        .catch((error) => dispatch(getDisputCategoryError(error)));
};
//Get Dispute Type Info actions end
