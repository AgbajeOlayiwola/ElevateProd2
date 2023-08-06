import { deleteCookie, getCookie } from 'cookies-next';
import axiosInstance from '../helper/apiClient';
import { logout } from '../types/actionTypes';
//logout actions
export const logoutLoadStart = () => ({
    type: logout.LOGOUT_START
});

export const logoutAction = () => (dispatch) => {
    dispatch(logoutLoadStart());
    localStorage.removeItem('user');

    localStorage.removeItem('token');
    localStorage.clear();

    if (getCookie('cookieToken') == undefined) {
        deleteCookie('existingToken');
    } else {
        deleteCookie('cookieToken');
    }
};
//logout actions end
