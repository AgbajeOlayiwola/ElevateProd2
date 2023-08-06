import apiRoutes from '../helper/apiRoutes';
import { verifyCurrency } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//verifyCurrency action
export const verifyCurrencyLoadStart = () => ({
    type: verifyCurrency.VERIFYCURRENCY_LOAD_START
});

export const verifyCurrencyLoadSuccess = (bill) => ({
    type: verifyCurrency.VERIFYCURRENCY_LOAD_SUCCESS,
    payload: bill
});

export const verifyCurrencyLoadError = (verifyCurrencyerror) => ({
    type: verifyCurrency.VERIFYCURRENCY_LOAD_ERROR,
    payload: verifyCurrencyerror
});
export const getVerifyCurrency = (code) => (dispatch) => {
    dispatch(verifyCurrencyLoadStart());
    axiosInstance
        .get(`${apiRoutes.verifyCurrency}?country=${code}`)
        .then((response) =>
            dispatch(verifyCurrencyLoadSuccess(response?.data?.data))
        )
        .catch((error) => dispatch(verifyCurrencyLoadError(error?.message)));
};

//verifyCurrency action end
