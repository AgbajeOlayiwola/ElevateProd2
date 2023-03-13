import { getAirtimeBeneficiaries } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    getAirtimeBeneficiaries: null,
    errorMessagegetAirtimeBeneficiaries: null
};

const getAirtimeBeneficiariesReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case getAirtimeBeneficiaries.GETAIRTIMEBENEFICIARIES_LOAD_START:
            return {
                ...state,
                isLoading: true,
                getAirtimeBeneficiaries: null,
                errorMessagegetAirtimeBeneficiaries: null
            };
        case getAirtimeBeneficiaries.GETAIRTIMEBENEFICIARIES_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                getAirtimeBeneficiaries: payload
            };
        case getAirtimeBeneficiaries.GETAIRTIMEBENEFICIARIES_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessagegetAirtimeBeneficiaries: payload
            };

        default:
            return state;
    }
};

export default getAirtimeBeneficiariesReducer;
