import apiRoutes from '../helper/apiRoutes';
import { cardLogin } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//cardLogin action
export const cardLoginLoadStart = () => ({
    type: cardLogin.CARDLOGIN_LOAD_START
});

export const cardLoginLoadSuccess = (cardLoginS) => ({
    type: cardLogin.CARDLOGIN_LOAD_SUCCESS,
    payload: cardLoginS
});

export const cardLoginLoadError = (cardLoginerrorMessages) => ({
    type: cardLogin.CARDLOGIN_LOAD_ERROR,
    payload: cardLoginerrorMessages
});
export const cardLoginData = (data) => (dispatch) => {
    dispatch(cardLoginLoadStart());
    axiosInstance
        .post(`${apiRoutes.cardLogin}`, data)
        .then((response) => dispatch(cardLoginLoadSuccess(response?.data)))
        .catch((error) =>
            dispatch(cardLoginLoadError(error?.response?.data?.message))
        );
};
