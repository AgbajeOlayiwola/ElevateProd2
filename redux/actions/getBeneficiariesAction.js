import { getCookie } from 'cookies-next';
import apiRoutes from '../helper/apiRoutes';
import { getBeneficiaries } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//getBeneficiaries action
export const getBeneficiariesLoadStart = () => ({
    type: getBeneficiaries.GETBENEFICIARIES_LOAD_START
});

export const getBeneficiariesLoadSuccess = (bill) => ({
    type: getBeneficiaries.GETBENEFICIARIES_LOAD_SUCCESS,
    payload: bill
});

export const getBeneficiariesLoadError = (getBeneficiarieserror) => ({
    type: getBeneficiaries.GETBENEFICIARIES_LOAD_ERROR,
    payload: getBeneficiarieserror
});
export const getBeneficiariesData = () => (dispatch) => {
    const cookie = getCookie('cookieToken');
    dispatch(getBeneficiariesLoadStart());
    axiosInstance
        .get(`${apiRoutes.beneficiaries}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) =>
            dispatch(getBeneficiariesLoadSuccess(response?.data?.data))
        )
        .catch((error) => dispatch(getBeneficiariesLoadError(error?.message)));
};

//getBeneficiaries action end
