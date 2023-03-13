import { postAirtimeBeneficiaries } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    postAirtimeBeneficiaries: null,
    errorMessagepostAirtimeBeneficiaries: null
};

const postAirtimeBeneficiariesReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case postAirtimeBeneficiaries.POSTAIRTIMEBENEFICIARIES_LOAD_START:
            return {
                ...state,
                isLoading: true,
                postAirtimeBeneficiaries: null,
                errorMessagepostAirtimeBeneficiaries: null
            };
        case postAirtimeBeneficiaries.POSTAIRTIMEBENEFICIARIES_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                postAirtimeBeneficiaries: payload
            };
        case postAirtimeBeneficiaries.POSTAIRTIMEBENEFICIARIES_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessagepostAirtimeBeneficiaries: payload
            };

        default:
            return state;
    }
};

export default postAirtimeBeneficiariesReducer;
