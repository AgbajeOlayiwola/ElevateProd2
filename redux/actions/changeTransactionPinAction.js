import apiRoutes from '../helper/apiRoutes';
import { changeTransactionPin } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//changeTransactionPin actions
export const changeTransactionPinLoadStart = () => ({
    type: changeTransactionPin.CHANGETRANSACTIONPIN_LOAD_START
});

export const changeTransactionPinLoadSuccess = (billers) => ({
    type: changeTransactionPin.CHANGETRANSACTIONPIN_LOAD_SUCCESS,
    payload: billers
});

export const changeTransactionPinLoadError = (errorMessage) => ({
    type: changeTransactionPin.CHANGETRANSACTIONPIN_LOAD_ERROR,
    payload: errorMessage
});
export const loadchangeTransactionPin = (code) => (dispatch) => {
    dispatch(changeTransactionPinLoadStart());
    axiosInstance
        .post(`${apiRoutes.changeTransactionPin}`, code)
        .then((response) =>
            dispatch(changeTransactionPinLoadSuccess(response?.data))
        )
        .catch((error) =>
            dispatch(
                changeTransactionPinLoadError(error?.response?.data?.message)
            )
        );
};
//changeTransactionPin actions end
