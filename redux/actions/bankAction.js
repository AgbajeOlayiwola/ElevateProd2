import apiRoutes from '../helper/apiRoutes';
import { banks } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//banks actions
export const bankLoadStart = () => ({
    type: banks.BANK_LOAD_START
});

export const bankLoadSuccess = (countries) => ({
    type: banks.BANK_LOAD_SUCCESS,
    payload: countries
});

export const bankLoadError = (errorMessage) => ({
    type: banks.BANK_LOAD_ERROR,
    payload: errorMessage
});

export const loadbank = (code) => (dispatch) => {
    dispatch(bankLoadStart());
    axiosInstance
        .get(`${apiRoutes.getBanks}?affiliateCode=${code}`)
        .then((response) => dispatch(bankLoadSuccess(response?.data?.data)))
        .catch((error) => dispatch(bankLoadError(error?.message)));
};
//banks actions end
