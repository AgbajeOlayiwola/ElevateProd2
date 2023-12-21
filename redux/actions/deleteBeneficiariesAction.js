import { getCookie } from 'cookies-next';
import { deleteBeneficiaries } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//deleteBeneficiaries action
export const deleteBeneficiariesLoadStart = () => ({
    type: deleteBeneficiaries.DELETEBENEFICIARIES_LOAD_START
});

export const deleteBeneficiariesLoadSuccess = (bill) => ({
    type: deleteBeneficiaries.DELETEBENEFICIARIES_LOAD_SUCCESS,
    payload: bill
});

export const deleteBeneficiariesLoadError = (deleteBeneficiarieserror) => ({
    type: deleteBeneficiaries.DELETEBENEFICIARIES_LOAD_ERROR,
    payload: deleteBeneficiarieserror
});
export const deleteBeneficiariesData = (data) => (dispatch) => {
    dispatch(deleteBeneficiariesLoadStart());
    const cookie = getCookie('cookieToken');
    axiosInstance
        .get(`${apiRoutes.deleteBeneficiaries}${data}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) =>
            dispatch(deleteBeneficiariesLoadSuccess(response?.data?.data))
        )
        .catch((error) =>
            dispatch(deleteBeneficiariesLoadError(error?.message))
        );
};

//deleteBeneficiaries action end
