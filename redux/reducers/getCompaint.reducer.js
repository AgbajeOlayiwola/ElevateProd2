import { disputCategoryType, getAllComplaintType } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    getAllComplaintSuccess: null,
    getAllComplaintErrorMessage: null
};

const getComplaintReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case getAllComplaintType.GET_ALL_COMPLAINT_LOAD_START:
            return {
                ...state,
                isLoading: true,
                getAllComplaintSuccess: null,
                getAllComplaintErrorMessage: null
            };
        case getAllComplaintType.GET_ALL_COMPLAINT_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                getAllComplaintSuccess: payload
            };
        case getAllComplaintType.GET_ALL_COMPLAINT_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                getAllComplaintErrorMessage: payload
            };

        default:
            return state;
    }
};

export default getComplaintReducer;
