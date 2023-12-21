import { internationalTransfer } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    internationalTransfer: null,
    errorMessagebulkTransfer: null
};

const internationalTransferReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case internationalTransfer.INTERNATIONALTRANSFER_LOAD_START:
            return {
                ...state,
                isLoading: true,
                internationalTransfer: null,
                errorMessageinternationalTransfer: null
            };
        case internationalTransfer.INTERNATIONALTRANSFER_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                internationalTransfer: payload
            };
        case internationalTransfer.INTERNATIONALTRANSFER_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessageinternationalTransfer: payload
            };

        default:
            return state;
    }
};

export default internationalTransferReducer;
