import { verifyID } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    verifyID: null,
    errorMessageverifyID: null
};

const verifyIDReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case verifyID.VERIFYID_LOAD_START:
            return {
                ...state,
                isLoading: true,
                verifyID: null,
                errorMessageverifyID: null
            };
        case verifyID.VERIFYID_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                verifyID: payload
            };
        case verifyID.VERIFYID_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessageverifyID: payload
            };

        default:
            return state;
    }
};

export default verifyIDReducer;
