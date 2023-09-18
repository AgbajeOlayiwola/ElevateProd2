import { accountPrimary, addecoOnlineType } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    addecoOnlineSuccess: null,
    addecoOnlineErrorMessage: null
};

const addEcoOnlineReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case addecoOnlineType.ECO_ONLINE_TYPE_START:
            return {
                ...state,
                isLoading: true,
                addecoOnlineSuccess: null,
                addecoOnlineErrorMessage: null
            };
        case addecoOnlineType.ECO_ONLINE_TYPE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                addecoOnlineSuccess: payload
            };
        case addecoOnlineType.ECO_ONLINE_TYPE_ERROR:
            return {
                ...state,
                isLoading: false,
                addecoOnlineErrorMessage: payload
            };

        default:
            return state;
    }
};

export default addEcoOnlineReducer;
