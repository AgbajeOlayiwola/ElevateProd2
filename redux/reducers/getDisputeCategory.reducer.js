import { disputCategoryType } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    getDisputCategorySuccess: null,
    getDisputCategoryErrorMessage: null
};

const getDisputeCategoryReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case disputCategoryType.DISPUTCATEGORY_LOAD_START:
            return {
                ...state,
                isLoading: true,
                getDisputCategorySuccess: null,
                getDisputCategoryErrorMessage: null
            };
        case disputCategoryType.DISPUTCATEGORY_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                getDisputCategorySuccess: payload
            };
        case disputCategoryType.DISPUTCATEGORY_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                getDisputCategoryErrorMessage: payload
            };

        default:
            return state;
    }
};

export default getDisputeCategoryReducer;
