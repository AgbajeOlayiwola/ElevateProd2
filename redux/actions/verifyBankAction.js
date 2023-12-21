import apiRoutes from '../helper/apiRoutes';
import { verifyBank } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//verifyBank action
export const verifyBankLoadStart = () => ({
    type: verifyBank.VERIFYBANK_LOAD_START
});

export const verifyBankLoadSuccess = (bill) => ({
    type: verifyBank.VERIFYBANK_LOAD_SUCCESS,
    payload: bill
});

export const verifyBankLoadError = (verifyBankerror) => ({
    type: verifyBank.VERIFYBANK_LOAD_ERROR,
    payload: verifyBankerror
});
export const getverifyBank = (data) => (dispatch) => {
    dispatch(verifyBankLoadStart());
    axiosInstance
        .post(`${apiRoutes.verifyBank}`, data)
        .then((response) =>
            dispatch(verifyBankLoadSuccess(response?.data?.data))
        )
        .catch((error) => dispatch(verifyBankLoadError(error?.message)));
};

//verifyBank action end
