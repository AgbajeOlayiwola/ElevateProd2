import { login } from '../types/actionTypes';

const initialState = {
    requestPhysicalQrSuccess: null,
    requestPhysicalQrLoading: null,
    requestPhysicalQrErrorMessage: null
};

const requestPhysicalQrReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case login.REGISTER_START:
            return {
                ...state,
                requestPhysicalQrLoading: null,
                requestPhysicalQrErrorMessage: null
            };
        case login.REGISTER_SUCCESS:
            return {
                ...state,
                requestPhysicalQrSuccess: payload,
                requestPhysicalQrErrorMessage: null
            };
        case login.REGISTER_FAIL:
            return {
                ...state,
                requestPhysicalQrErrorMessage: payload
            };
        default:
            return state;
    }
};
export default requestPhysicalQrReducer;
