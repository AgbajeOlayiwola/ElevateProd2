import apiRoutes from '../helper/apiRoutes';
import { airtimeNetwork } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//airtimeNetwork action
export const airtimeNetworkLoadStart = () => ({
    type: airtimeNetwork.AIRTIMENETWORK_LOAD_START
});

export const airtimeNetworkLoadSuccess = (airtimeNetworks) => ({
    type: airtimeNetwork.AIRTIMENETWORK_LOAD_SUCCESS,
    payload: airtimeNetworks
});

export const airtimeNetworkLoadError = (errorMessageAirtimeNetwork) => ({
    type: airtimeNetwork.AIRTIMENETWORK_LOAD_ERROR,
    payload: errorMessageAirtimeNetwork
});
export const postAirtimeNetwork = () => (dispatch) => {
    dispatch(airtimeNetworkLoadStart());
    axiosInstance
        .get(`${apiRoutes.airtimeNetwork}?affiliateCode=ENG`)
        .then((response) =>
            dispatch(airtimeNetworkLoadSuccess(response?.data?.data))
        )
        .catch((error) =>
            dispatch(airtimeNetworkLoadError(error?.response?.data?.message))
        );
};

//airtimeNetwork action end
