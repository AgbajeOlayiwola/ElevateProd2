import { getCookie } from 'cookies-next';
import apiRoutes from '../helper/apiRoutes';
import { getAirtimeBeneficiaries } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//getAirtimeBeneficiaries action
export const getAirtimeBeneficiariesLoadStart = () => ({
    type: getAirtimeBeneficiaries.GETAIRTIMEBENEFICIARIES_LOAD_START
});

export const getAirtimeBeneficiariesLoadSuccess = (bill) => ({
    type: getAirtimeBeneficiaries.GETAIRTIMEBENEFICIARIES_LOAD_SUCCESS,
    payload: bill
});

export const getAirtimeBeneficiariesLoadError = (getBeneficiarieserror) => ({
    type: getAirtimeBeneficiaries.GETAIRTIMEBENEFICIARIES_LOAD_ERROR,
    payload: getBeneficiarieserror
});
export const getAirtimeBeneficiariesData = () => (dispatch) => {
    const cookie = getCookie('cookieToken');
    dispatch(getAirtimeBeneficiariesLoadStart());
    axiosInstance
        .get(`${apiRoutes.airtimeBeneficiaries}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) =>
            dispatch(getAirtimeBeneficiariesLoadSuccess(response?.data?.data))
        )
        .catch((error) =>
            dispatch(getAirtimeBeneficiariesLoadError(error?.message))
        );
};

//getAirtimeBeneficiaries action end
