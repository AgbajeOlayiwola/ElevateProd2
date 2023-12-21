import { billerType } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    billerType: null,
    errorMessage: null
};

const billerTypeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case billerType.BILLERTYPE_LOAD_START:
            return {
                ...state,
                isLoading: true,
                billerType: null,
                errorMessage: null
            };
        case billerType.BILLERTYPE_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                billerType: payload
            };
        case billerType.BILLERTYPE_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload
            };

        default:
            return state;
    }
};

export default billerTypeReducer;
