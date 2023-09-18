import { getCookie } from 'cookies-next';
import { bulkTransfer } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//transactionHistory action
export const bulkTransferLoadStart = () => ({
    type: bulkTransfer.BULKTRANSFER_LOAD_START
});

export const bulkTransferLoadSuccess = (bill) => ({
    type: bulkTransfer.BULKTRANSFER_LOAD_SUCCESS,
    payload: bill
});

export const bulkTransferLoadError = (bulkTransfererror) => ({
    type: bulkTransfer.BULKTRANSFER_LOAD_ERROR,
    payload: bulkTransfererror
});
export const getBulkTransfer = (data) => (dispatch) => {
    const cookie = getCookie('cookieToken');
    dispatch(bulkTransferLoadStart());
    axiosInstance
        .post(`${apiRoutes.bulkTransfer}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) =>
            dispatch(bulkTransferLoadSuccess(response?.data?.data))
        )
        .catch((error) =>
            dispatch(bulkTransferLoadError(error?.response?.data?.message))
        );
};

//transactionHistory action end
