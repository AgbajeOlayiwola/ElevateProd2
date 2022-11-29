import { accountStatus } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    accountStatuss: null,
    errorMessages: ''
};

const accountStatusReducer = (state = initialState, { type, payload }) => {
    //console.log(payload);÷ss
    switch (type) {
        case accountStatus.ACCOUNTSTATUS_LOAD_START:
            return {
                ...state,
                isLoading: true,
                accountStatuss: null,
                errorMessages: ''
            };
        case accountStatus.ACCOUNTSTATUS_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                accountStatuss: payload
            };
        case accountStatus.ACCOUNTSTATUS_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessages: payload
            };

        default:
            return state;
    }
};

export default accountStatusReducer;
