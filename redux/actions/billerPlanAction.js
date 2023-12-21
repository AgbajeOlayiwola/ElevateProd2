import apiRoutes from '../helper/apiRoutes';
import { billerPlan } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//country actions
export const billerPlanLoadStart = () => ({
    type: billerPlan.BILLERPLAN_LOAD_START
});

export const billerPlanLoadSuccess = (billers) => ({
    type: billerPlan.BILLERPLAN_LOAD_SUCCESS,
    payload: billers
});

export const billerPlanLoadError = (errorMessage) => ({
    type: billerPlan.BILLERPLAN_LOAD_ERROR,
    payload: errorMessage
});
export const loadbillerPlan = (code) => (dispatch) => {
    dispatch(billerPlanLoadStart());
    axiosInstance
        .get(`${apiRoutes.getBillerPlan}?billerCode=${code}`)
        .then((response) => dispatch(billerPlanLoadSuccess(response.data.data)))
        .catch((error) => dispatch(billerPlanLoadError(error?.message)));
};
//country actions end
