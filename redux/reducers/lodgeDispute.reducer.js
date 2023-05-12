import { lodgeComplaint_Type, uploadMemartType } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    lodgeDisputeSuccess: null,
    lodgeDisputeErrorSubMessage: null
};

const lodgeDisputeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case lodgeComplaint_Type.GET_LODGE_COMPLAINT_START:
            return {
                ...state,
                isLoading: true,
                lodgeDisputeSuccesst: null,
                lodgeDisputeErrorSubMessage: null
            };
        case lodgeComplaint_Type.GET_LODGE_COMPLAINT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                lodgeDisputeSuccess: payload
            };
        case lodgeComplaint_Type.GET_LODGE_COMPLAINT_ERROR:
            return {
                ...state,
                isLoading: false,
                lodgeDisputeErrorSubMessage: payload
            };

        default:
            return state;
    }
};

export default lodgeDisputeReducer;
