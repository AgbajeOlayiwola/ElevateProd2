import { existingBusnessSetup } from '../types/actionTypes';

const initialState = {
    existingProfileSetupPay: '',
    existingProfileSetupError: ''
};

const existReducer = (state = initialState, { type, payload }) => {
    //console.log(payload);÷ss
    switch (type) {
        case existingBusnessSetup.EXISTING_BUSINESS_START:
            return {
                ...state,
                isLoading: true,
                existingProfileSetupPay: [],
                existingProfileSetupError: ''
            };
        case existingBusnessSetup.EXISTING_BUSINESS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                existingProfileSetupPay: payload
            };
        case existingBusnessSetup.EXISTING_BUSINESS_ERROR:
            return {
                ...state,
                isLoading: false,
                existingProfileSetupError: payload
            };

        default:
            return state;
    }
};

export default existReducer;
