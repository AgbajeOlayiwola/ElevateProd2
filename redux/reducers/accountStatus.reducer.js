import { accountStatus } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    accountStatus: [],
    errorMessages: ''
};

const accountStatusReducer = (state = initialState, { type, payload }) => {
    // console.log(payload);÷ss
    switch (type) {
        case accountStatus.ACCOUNTSTATUS_LOAD_START:
            return {
                ...state,
                isLoading: true,
                accountStatus: [],
                errorMessages: ''
            };
        case accountStatus.ACCOUNTSTATUS_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                accountStatus: payload
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
