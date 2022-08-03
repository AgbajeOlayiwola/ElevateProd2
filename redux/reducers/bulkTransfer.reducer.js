import { bulkTransfer } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    bulkTransfer: null,
    errorMessagebulkTransfer: null
};

const bulkTransferReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case bulkTransfer.BULKTRANSFER_LOAD_START:
            return {
                ...state,
                isLoading: true,
                bulkTransfer: null,
                errorMessagebulkTransfer: null
            };
        case bulkTransfer.BULKTRANSFER_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                bulkTransfer: payload
            };
        case bulkTransfer.BULKTRANSFER_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessagebulkTransfer: payload
            };

        default:
            return state;
    }
};

export default bulkTransferReducer;
