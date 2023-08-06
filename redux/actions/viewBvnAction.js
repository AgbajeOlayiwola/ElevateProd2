import apiRoutes from '../helper/apiRoutes';
import { viewBvn } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//viewBvn actions
export const viewBvnLoadStart = () => ({
    type: viewBvn.VIEWBVN_LOAD_START
});

export const viewBvnLoadSuccess = (billers) => ({
    type: viewBvn.VIEWBVN_LOAD_SUCCESS,
    payload: billers
});

export const viewBvnLoadError = (errorMessage) => ({
    type: viewBvn.VIEWBVN_LOAD_ERROR,
    payload: errorMessage
});
export const loadViewBvn = (code) => (dispatch) => {
    dispatch(viewBvnLoadStart());
    axiosInstance
        .post(`${apiRoutes.viewBvn}`, code)
        .then((response) => dispatch(viewBvnLoadSuccess(response?.data)))
        .catch((error) =>
            dispatch(viewBvnLoadError(error?.response?.data?.message))
        );
};
//viewBvn actions end
