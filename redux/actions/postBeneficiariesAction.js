import { getCookie } from 'cookies-next';
import apiRoutes from '../helper/apiRoutes';
import { postBeneficiaries } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//postBeneficiaries action
export const postBeneficiariesLoadStart = () => ({
    type: postBeneficiaries.POSTBENEFICIARIES_LOAD_START
});

export const postBeneficiariesLoadSuccess = (bill) => ({
    type: postBeneficiaries.POSTBENEFICIARIES_LOAD_SUCCESS,
    payload: bill
});

export const postBeneficiariesLoadError = (postBeneficiarieserror) => ({
    type: postBeneficiaries.POSTBENEFICIARIES_LOAD_ERROR,
    payload: postBeneficiarieserror
});
export const postBeneficiariesData = (data) => (dispatch) => {
    dispatch(postBeneficiariesLoadStart());
    const cookie = getCookie('cookieToken');
    axiosInstance
        .post(`${apiRoutes.beneficiaries}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) =>
            dispatch(postBeneficiariesLoadSuccess(response?.data?.data))
        )
        .catch((error) =>
            dispatch(
                postBeneficiariesLoadError(error?.response?.data?.message[0])
            )
        );
};

//postBeneficiaries action end
