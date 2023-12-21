import { airtimeNetwork } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    airtimeNetwork: null,
    errorMessageAirtimeNetwork: null
};

const airtimeNetworkReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case airtimeNetwork.AIRTIMENETWORK_LOAD_START:
            return {
                ...state,
                isLoading: true,
                airtimeNetwork: null,
                errorMessageAirtimeNetwork: null
            };
        case airtimeNetwork.AIRTIMENETWORK_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                airtimeNetwork: payload
            };
        case airtimeNetwork.AIRTIMENETWORK_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessageAirtimeNetwork: payload
            };

        default:
            return state;
    }
};

export default airtimeNetworkReducer;
