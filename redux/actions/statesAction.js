import apiRoutes from '../helper/apiRoutes';
import { states } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//states actions
export const statesLoadStart = () => ({
    type: states.STATES_LOAD_START
});

export const statesLoadSuccess = (countries) => ({
    type: states.STATES_LOAD_SUCCESS,
    payload: countries
});

export const statesLoadError = (errorMessage) => ({
    type: states.STATES_LOAD_ERROR,
    payload: errorMessage
});

export const statesData = () => (dispatch) => {
    dispatch(statesLoadStart());
    axiosInstance
        .get(`${apiRoutes.states}`)
        .then((response) => dispatch(statesLoadSuccess(response?.data?.data)))
        .catch((error) =>
            dispatch(statesLoadError(error?.response?.data?.message))
        );
};
//states actions end
