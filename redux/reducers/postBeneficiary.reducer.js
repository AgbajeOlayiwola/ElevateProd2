import { postBeneficiaries } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    postBeneficiaries: null,
    errorMessagepostBeneficiaries: null
};

const postBeneficiariesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case postBeneficiaries.POSTBENEFICIARIES_LOAD_START:
            return {
                ...state,
                isLoading: true,
                postBeneficiaries: null,
                errorMessagepostBeneficiaries: null
            };
        case postBeneficiaries.POSTBENEFICIARIES_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                postBeneficiaries: payload
            };
        case postBeneficiaries.POSTBENEFICIARIES_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessagepostBeneficiaries: payload
            };

        default:
            return state;
    }
};

export default postBeneficiariesReducer;
