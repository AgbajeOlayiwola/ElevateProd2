import { deleteBeneficiaries } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    deleteBeneficiaries: null,
    errorMessagedeleteBeneficiaries: null
};

const deleteBeneficiariesReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case deleteBeneficiaries.DELETEBENEFICIARIES_LOAD_START:
            return {
                ...state,
                isLoading: true,
                deleteBeneficiaries: null,
                errorMessagedeleteBeneficiaries: null
            };
        case deleteBeneficiaries.DELETEBENEFICIARIES_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                deleteBeneficiaries: payload
            };
        case deleteBeneficiaries.DELETEBENEFICIARIES_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessagedeleteBeneficiaries: payload
            };

        default:
            return state;
    }
};

export default deleteBeneficiariesReducer;
