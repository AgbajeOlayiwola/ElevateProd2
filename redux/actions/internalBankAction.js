import apiRoutes from '../helper/apiRoutes';
import { internalBank } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//internalBank action
export const internalBankLoadStart = () => ({
    type: internalBank.INTERNALBANK_LOAD_START
});

export const internalBankLoadSuccess = (bill) => ({
    type: internalBank.INTERNALBANK_LOAD_SUCCESS,
    payload: bill
});

export const internalBankLoadError = (internalBankerror) => ({
    type: internalBank.INTERNALBANK_LOAD_ERROR,
    payload: internalBankerror
});
export const postInternalBank = (data) => (dispatch) => {
    dispatch(internalBankLoadStart());
    axiosInstance
        .post(`${apiRoutes.internalBank}`, data)
        .then((response) =>
            dispatch(internalBankLoadSuccess(response?.data?.data))
        )
        .catch((error) => dispatch(internalBankLoadError(error?.message)));
};

//internalBank action end
