import { logout } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    logout: null,
    errorData: null
};

const logoutReducer = (state = initialState, { type, payload }) => {
    //console.log(payload);÷ss
    switch (type) {
        case logout.LOGOUT_START:
            return {
                ...state,
                isLoading: true,
                logout: null,
                errorData: null
            };

        default:
            return state;
    }
};

export default logoutReducer;
