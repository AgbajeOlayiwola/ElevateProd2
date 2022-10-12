import { shareRefFormtype, uploadScmulType } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    shareRefForm: null,
    shareRefFormErrorMessages: null
};

const shareRefReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case shareRefFormtype.GET_SHARE_REFFERENCE_START:
            return {
                ...state,
                isLoading: true,
                shareRefForm: null,
                scmulErrorMessages: null
            };
        case shareRefFormtype.GET_SHARE_REFFERENCE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                shareRefForm: payload
            };
        case shareRefFormtype.GET_SHARE_REFFERENCE_ERROR:
            return {
                ...state,
                isLoading: false,
                shareRefFormErrorMessages: payload
            };

        default:
            return state;
    }
};

export default shareRefReducer;
