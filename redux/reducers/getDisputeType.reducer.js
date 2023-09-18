import { disputeType, getBeneficiaries } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    getDisputCategOryTypeSuccess: null,
    getDisputCategOryTypeErrorMessage: null
};

const getDisputeTypeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case disputeType.DISPUTETYPE_LOAD_START:
            return {
                ...state,
                isLoading: true,
                getDisputCategOryTypeSuccess: null,
                getDisputCategOryTypeErrorMessage: null
            };
        case disputeType.DISPUTETYPE_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                getDisputCategOryTypeSuccess: payload
            };
        case disputeType.DISPUTETYPE_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                getDisputCategOryTypeErrorMessage: payload
            };

        default:
            return state;
    }
};

export default getDisputeTypeReducer;
