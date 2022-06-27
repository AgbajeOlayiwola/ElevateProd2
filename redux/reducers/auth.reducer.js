import AuthTypes from '../types/auth.types';

const initialState = {
    createAccount: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthTypes.CREATE_ACCOUNT:
            // console.log(action.payload);
            return {
                ...state,
                createAccount: action.payload
            };

        default:
            return state;
    }
};
