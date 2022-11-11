import { businessCategories } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    businessCategories: [],
    errorDatas: ''
};

const businessCategoriesReducer = (state = initialState, { type, payload }) => {
    //console.log(payload);÷ss
    switch (type) {
        case businessCategories.BUSINESSCATEGORIES_LOAD_START:
            return {
                ...state,
                isLoading: true,
                businessCategories: [],
                errorDatas: ''
            };
        case businessCategories.BUSINESSCATEGORIES_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                businessCategories: payload
            };
        case businessCategories.BUSINESSCATEGORIES_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorDatas: payload
            };

        default:
            return state;
    }
};

export default businessCategoriesReducer;
