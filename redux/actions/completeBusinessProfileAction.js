import { getCookie } from 'cookies-next';
import axiosInstance from '../helper/apiClient';
import apiRoutes from '../helper/apiRoutes';
import { completeProfile } from '../types/actionTypes';
export const completeProfileLoadStart = (errorMessages) => ({
    type: completeProfile.COMP_PROFILE_LOAD_START,
    payload: errorMessages
});
export const completeProfileLoadSuccess = (compBusprofile) => ({
    type: completeProfile.COMP_PROFILE_LOAD_SUCCESS,
    payload: compBusprofile
});
export const completeProfileLoadError = (comperrorMessage) => ({
    type: completeProfile.COMP_PROFILE_LOAD_ERROR,
    payload: comperrorMessage
});

export const CompleteBusinessProfile = (completeProfileData) => {
    let cookie;
    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    return (dispatch) => {
        // dispatch(completeProfileLoadStart());
        axiosInstance
            .post(
                `https://mysmeapp.ecobank.com:8443${apiRoutes.completesBusinessProfile}`,
                completeProfileData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-Client-Type': 'web',
                        Authorization: `Bearer ${cookie}`
                    }
                }
            )
            .then((response) => {
                // //// console.log'complete business profiler', response.data);
                dispatch(completeProfileLoadSuccess(response?.data));
            })
            .catch((error) => {
                // //// console.logerror);
                dispatch(completeProfileLoadError(error?.response?.data));
            });
    };
};
//Complete Profile Post End
