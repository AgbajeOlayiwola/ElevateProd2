import apiRoutes from '../helper/apiRoutes';
import { ecobankOnline } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//ecobankOnline action
export const ecobankOnlineLoadStart = () => ({
    type: ecobankOnline.ECOBANKONLINE_LOAD_START
});

export const ecobankOnlineLoadSuccess = (bill) => ({
    type: ecobankOnline.ECOBANKONLINE_LOAD_SUCCESS,
    payload: bill
});

export const ecobankOnlineLoadError = (ecoOnlineErrorMessage) => ({
    type: ecobankOnline.ECOBANKONLINE_LOAD_ERROR,
    payload: ecoOnlineErrorMessage
});
export const ecobankOnlineData = (data) => (dispatch) => {
    dispatch(ecobankOnlineLoadStart());
    axiosInstance
        .post(`${apiRoutes.ecobankOnline}`, data)
        .then((response) => dispatch(ecobankOnlineLoadSuccess(response?.data)))
        .catch((error) =>
            dispatch(ecobankOnlineLoadError(error?.response?.data?.message))
        );
};

//ecobankOnline action end
