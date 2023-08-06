import apiRoutes from '../helper/apiRoutes';
import { internationalTransfer } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//internationalTransfer action
export const internationalTransferLoadStart = () => ({
    type: internationalTransfer.INTERNATIONALTRANSFER_LOAD_START
});

export const internationalTransferLoadSuccess = (bill) => ({
    type: internationalTransfer.INTERNATIONALTRANSFER_LOAD_SUCCESS,
    payload: bill
});

export const internationalTransferLoadError = (internationalTransfererror) => ({
    type: internationalTransfer.INTERNATIONALTRANSFER_LOAD_ERROR,
    payload: internationalTransfererror
});
export const getInternationalTransfer = (data) => (dispatch) => {
    dispatch(internationalTransferLoadStart());
    axiosInstance
        .post(`${apiRoutes.internationalTransfer}`, data)
        .then((response) =>
            dispatch(internationalTransferLoadSuccess(response?.data?.data))
        )
        .catch((error) =>
            dispatch(internationalTransferLoadError(error?.message))
        );
};

//internationalTransfer action end
