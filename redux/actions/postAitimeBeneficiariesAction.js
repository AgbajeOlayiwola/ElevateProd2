import { getCookie } from 'cookies-next';
import { postAirtimeBeneficiaries } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//postAirtimeBeneficiaries action
export const postAirtimeBeneficiariesLoadStart = () => ({
    type: postAirtimeBeneficiaries.POSTAIRTIMEBENEFICIARIES_LOAD_START
});

export const postAirtimeBeneficiariesLoadSuccess = (bill) => ({
    type: postAirtimeBeneficiaries.POSTAIRTIMEBENEFICIARIES_LOAD_SUCCESS,
    payload: bill
});

export const postAirtimeBeneficiariesLoadError = (
    postAirtimeBeneficiarieserror
) => ({
    type: postAirtimeBeneficiaries.POSTAIRTIMEBENEFICIARIES_LOAD_ERROR,
    payload: postAirtimeBeneficiarieserror
});
export const postAirtimeBeneficiariesData = (data) => (dispatch) => {
    dispatch(postAirtimeBeneficiariesLoadStart());
    const cookie = getCookie('cookieToken');
    axiosInstance
        .post(`${apiRoutes.airtimeBeneficiaries}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) =>
            dispatch(postAirtimeBeneficiariesLoadSuccess(response?.data?.data))
        )
        .catch((error) =>
            dispatch(postAirtimeBeneficiariesLoadError(error?.message))
        );
};

//postAirtimeBeneficiaries action end
