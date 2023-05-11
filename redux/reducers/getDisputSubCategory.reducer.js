import {
    disputSubCategoryType,
    disputeType,
    getBeneficiaries
} from '../types/actionTypes';

const initialState = {
    isLoading: false,
    getDisputCategorySubSuccess: null,
    getDisputCategoryErrorSubMessage: null
};

const getDisputeSubCategoryReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case disputSubCategoryType.DISPUTCATEGORYSUB_LOAD_START:
            return {
                ...state,
                isLoading: true,
                getDisputCategorySubSuccess: null,
                getDisputCategoryErrorSubMessage: null
            };
        case disputSubCategoryType.DISPUTCATEGORYSUB_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                getDisputCategorySubSuccess: payload
            };
        case disputSubCategoryType.DISPUTCATEGORYSUB_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                getDisputCategoryErrorSubMessage: payload
            };

        default:
            return state;
    }
};

export default getDisputeSubCategoryReducer;
