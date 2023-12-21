import apiRoutes from '../helper/apiRoutes';
import { freezeTransactions } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//freezeTransactions actions
export const freezeTransactionsLoadStart = () => ({
    type: freezeTransactions.FREEZETRANSACTIONS_LOAD_START
});

export const freezeTransactionsLoadSuccess = (countries) => ({
    type: freezeTransactions.FREEZETRANSACTIONS_LOAD_SUCCESS,
    payload: countries
});

export const freezeTransactionsLoadError = (errorMessage) => ({
    type: freezeTransactions.FREEZETRANSACTIONS_LOAD_ERROR,
    payload: errorMessage
});

export const loadfreezeTransactions = () => (dispatch) => {
    dispatch(freezeTransactionsLoadStart());
    axiosInstance
        .get(`${apiRoutes.freezeTransactions}`)
        .then((response) =>
            dispatch(freezeTransactionsLoadSuccess(response?.data?.data))
        )
        .catch((error) =>
            dispatch(freezeTransactionsLoadError(error?.response?.message))
        );
};
//freezeTransactions actions end
