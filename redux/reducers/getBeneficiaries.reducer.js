import { getBeneficiaries } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    getBeneficiaries: null,
    errorMessagegetBeneficiaries: null
};

const getBeneficiariesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case getBeneficiaries.GETBENEFICIARIES_LOAD_START:
            return {
                ...state,
                isLoading: true,
                getBeneficiaries: null,
                errorMessagegetBeneficiaries: null
            };
        case getBeneficiaries.GETBENEFICIARIES_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                getBeneficiaries: payload
            };
        case getBeneficiaries.GETBENEFICIARIES_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessagegetBeneficiaries: payload
            };

        default:
            return state;
    }
};

export default getBeneficiariesReducer;
