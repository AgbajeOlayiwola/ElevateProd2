import apiRoutes from '../helper/apiRoutes';
import { login } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//add user
export const userRegisterStart = (user) => ({
    type: login.REGISTER_SUCCESS,
    payload: user
});
export const userRegisterError = (errorMessage) => ({
    type: login.REGISTER_FAIL,
    payload: errorMessage
});
export const createUserAction = (postData) => {
    return (dispatch) => {
        axiosInstance
            .post(`${apiRoutes.register}`, postData)
            .then((response) => {
                dispatch(userRegisterStart(response?.data?.message));
            })
            .catch((error) => {
                dispatch(userRegisterError(error?.response?.data?.message));
            });
    };
};
//add user end
