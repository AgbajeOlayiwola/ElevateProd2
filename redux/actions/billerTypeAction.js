import apiRoutes from '../helper/apiRoutes';
import { billerType } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//country actions
export const billerTypeLoadStart = () => ({
    type: billerType.BILLERTYPE_LOAD_START
});

export const billerTypeLoadSuccess = (billers) => ({
    type: billerType.BILLERTYPE_LOAD_SUCCESS,
    payload: billers
});

export const billerTypeLoadError = (errorMessage) => ({
    type: billerType.BILLERTYPE_LOAD_ERROR,
    payload: errorMessage
});
export const loadbillerType = (category) => (dispatch) => {
    dispatch(billerTypeLoadStart());
    axiosInstance
        .get(`${apiRoutes.getBillerType}?category=${category}`)
        .then((response) =>
            dispatch(billerTypeLoadSuccess(response?.data?.data))
        )
        .catch((error) => dispatch(billerTypeLoadError(error?.message)));
};
//country actions end
