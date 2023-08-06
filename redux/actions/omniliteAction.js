import apiRoutes from '../helper/apiRoutes';
import { omnilite } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//omnilite action
export const omniliteLoadStart = () => ({
    type: omnilite.OMNILITE_LOAD_START
});

export const omniliteLoadSuccess = (omniliteData) => ({
    type: omnilite.OMNILITE_LOAD_SUCCESS,
    payload: omniliteData
});

export const omniliteLoadError = (errorMessage) => ({
    type: omnilite.OMNILITE_LOAD_ERROR,
    payload: errorMessage
});
export const omniliteDataa = (data) => (dispatch) => {
    dispatch(omniliteLoadStart());
    axiosInstance
        .post(`${apiRoutes.omnilite}`, data)
        .then((response) => dispatch(omniliteLoadSuccess(response?.data)))
        .catch((error) =>
            dispatch(omniliteLoadError(error?.response?.data?.message))
        );
};

//omnilite action end
