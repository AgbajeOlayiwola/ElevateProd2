import apiRoutes from '../helper/apiRoutes';
import { businessCategories } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//businessCategories actions
export const businessCategoriesLoadStart = () => ({
    type: businessCategories.BUSINESSCATEGORIES_LOAD_START
});

export const businessCategoriesLoadSuccess = (countries) => ({
    type: businessCategories.BUSINESSCATEGORIES_LOAD_SUCCESS,
    payload: countries
});

export const businessCategoriesLoadError = (errorMessage) => ({
    type: businessCategories.BUSINESSCATEGORIES_LOAD_ERROR,
    payload: errorMessage
});

export const businessCategoriesData = () => (dispatch) => {
    dispatch(businessCategoriesLoadStart());
    axiosInstance
        .get(`${apiRoutes.businessCategories}`)
        .then((response) =>
            dispatch(businessCategoriesLoadSuccess(response?.data?.data))
        )
        .catch((error) =>
            dispatch(
                businessCategoriesLoadError(error?.response?.data?.message)
            )
        );
};
//businessCategories actions end
