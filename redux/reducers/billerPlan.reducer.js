import { billerPlan } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    billerPlan: null,
    errorMessage: null
};

const billerPlanReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case billerPlan.BILLERPLAN_LOAD_START:
            return {
                ...state,
                isLoading: true,
                billerPlan: null,
                errorMessage: null
            };
        case billerPlan.BILLERPLAN_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                billerPlan: payload
            };
        case billerPlan.BILLERPLAN_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload
            };

        default:
            return state;
    }
};

export default billerPlanReducer;
