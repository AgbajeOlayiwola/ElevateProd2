import { billerCategory } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    billerCategory: null,
    errorMessage: null
};

const billerCategoryReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case billerCategory.BILLERCATEGORY_LOAD_START:
            return {
                ...state,
                isLoading: true,
                billerCategory: null,
                errorMessage: null
            };
        case billerCategory.BILLERCATEGORY_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                billerCategory: payload
            };
        case billerCategory.BILLERCATEGORY_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload
            };

        default:
            return state;
    }
};

export default billerCategoryReducer;
