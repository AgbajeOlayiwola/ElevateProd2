import { getCookie } from 'cookies-next';
import { disputSubCategoryType } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
export const getDisputCategorySubStart = () => ({
    type: disputSubCategoryType.DISPUTCATEGORYSUB_LOAD_START
});

export const getDisputCategorySubSuccess = (getDisputCategorySubSuccess) => ({
    type: disputSubCategoryType.DISPUTCATEGORYSUB_LOAD_SUCCESS,
    payload: getDisputCategorySubSuccess
});

export const getDisputCategorySubError = (
    getDisputCategoryErrorSubMessage
) => ({
    type: disputSubCategoryType.DISPUTCATEGORYSUB_LOAD_ERROR,
    payload: getDisputCategoryErrorSubMessage
});
export const getDisputCategorySubGen = (categoryType, disputeSubCategory) => (
    dispatch
) => {
    dispatch(getDisputCategorySubStart(disputeSubCategory));
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    axiosInstance
        .get(
            `${apiRoutes.subComplaintCategories}?caseType=${disputeSubCategory}&caseCategory=${categoryType}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Client-Type': 'web',
                    Authorization: `Bearer ${cookie}`
                }
            }
        )
        .then((response) => {
            dispatch(getDisputCategorySubSuccess(response?.data?.data));
        })
        .catch((error) => dispatch(getDisputCategorySubError(error)));
};
