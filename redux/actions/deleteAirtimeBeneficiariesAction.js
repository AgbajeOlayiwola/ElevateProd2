import { getCookie } from 'cookies-next';
import apiRoutes from '../helper/apiRoutes';
import { deleteAirtimeBeneficiaries } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//deleteAirtimeBeneficiaries action
export const deleteAirtimeBeneficiariesLoadStart = () => ({
    type: deleteAirtimeBeneficiaries.DELETEAIRTIMEBENEFICIARIES_LOAD_START
});

export const deleteAirtimeBeneficiariesLoadSuccess = (bill) => ({
    type: deleteAirtimeBeneficiaries.DELETEAIRTIMEBENEFICIARIES_LOAD_SUCCESS,
    payload: bill
});

export const deleteAirtimeBeneficiariesLoadError = (
    deleteAirtimeBeneficiarieserror
) => ({
    type: deleteAirtimeBeneficiaries.DELETEAIRTIMEBENEFICIARIES_LOAD_ERROR,
    payload: deleteAirtimeBeneficiarieserror
});
export const deleteAirtimeBeneficiariesData = (data) => (dispatch) => {
    dispatch(deleteAirtimeBeneficiariesLoadStart());
    const cookie = getCookie('cookieToken');
    axiosInstance
        .get(`${apiRoutes.deleteAirtimeBeneficiaries}${data}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
                Authorization: `Bearer ${cookie}`
            }
        })
        .then((response) =>
            dispatch(
                deleteAirtimeBeneficiariesLoadSuccess(response?.data?.data)
            )
        )
        .catch((error) =>
            dispatch(deleteAirtimeBeneficiariesLoadError(error?.message))
        );
};

//deleteBeneficiaries action end
