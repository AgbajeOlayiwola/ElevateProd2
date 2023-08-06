import apiRoutes from '../helper/apiRoutes';
import { bankStatement } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//bankStatement actions
export const bankStatementLoadStart = () => ({
    type: bankStatement.BANKSTATEMENT_LOAD_START
});

export const bankStatementLoadSuccess = (billers) => ({
    type: bankStatement.BANKSTATEMENT_LOAD_SUCCESS,
    payload: billers
});

export const bankStatementLoadError = (errorMessage) => ({
    type: bankStatement.BANKSTATEMENT_LOAD_ERROR,
    payload: errorMessage
});
export const loadbankStatement = (code) => (dispatch) => {
    dispatch(bankStatementLoadStart());
    axiosInstance
        .post(`${apiRoutes?.bankStatement}`, code)
        .then((response) =>
            dispatch(bankStatementLoadSuccess(response?.data?.data))
        )
        .catch((error) => dispatch(bankStatementLoadError(error?.message)));
};
//bankStatement actions end
