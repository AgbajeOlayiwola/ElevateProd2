import { Paylink_Type, ussdGen } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    paylikSuccess: null,
    payLinkerrorMessage: null
};

const payLinkGenReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Paylink_Type.PAYLINK_START:
            return {
                ...state,
                isLoading: true,
                paylikSuccess: null,
                payLinkerrorMessage: null
            };
        case Paylink_Type.PAYLINK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                paylikSuccess: payload
            };
        case Paylink_Type.PAYLINK_ERROR:
            return {
                ...state,
                isLoading: false,
                payLinkerrorMessage: payload
            };

        default:
            return state;
    }
};

export default payLinkGenReducer;
