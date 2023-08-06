import apiRoutes from '../helper/apiRoutes';
import { billerCategory } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//billerCategory actions
export const billerCategoryLoadStart = () => ({
    type: billerCategory.BILLERCATEGORY_LOAD_START
});

export const billerCategoryLoadSuccess = (biller) => ({
    type: billerCategory.BILLERCATEGORY_LOAD_SUCCESS,
    payload: biller
});

export const billerCategoryLoadError = (errorMessage) => ({
    type: billerCategory.BILLERCATEGORY_LOAD_ERROR,
    payload: errorMessage
});

export const loadbillerCategory = (code) => (dispatch) => {
    dispatch(billerCategoryLoadStart());
    axiosInstance
        .get(`${apiRoutes.getBillerCategories}?affiliateCode=${code}`)
        .then((response) =>
            dispatch(billerCategoryLoadSuccess(response?.data?.data))
        )
        .catch((error) => dispatch(billerCategoryLoadError(error?.message)));
};
//billerCategory actions end
