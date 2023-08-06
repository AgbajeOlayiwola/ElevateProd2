import { getCookie } from 'cookies-next';
import { postEllevateProfilling } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
export const postEllevateProfilingLoad = () => ({
    type: postEllevateProfilling.POST_ELLEVATE_PROFILLING_START
});
export const postEllevateProfilingSuccess = (ellevateProfilingSeccess) => ({
    type: postEllevateProfilling.POST_ELLEVATE_PROFILLING_SUCCESS,
    payload: ellevateProfilingSeccess
});
export const postEllevateProfilingError = (ellevateProfillingError) => ({
    type: postEllevateProfilling.POST_ELLEVATE_PROFILLING_ERROR,
    payload: ellevateProfillingError
});
export const postEllevateProfilingDetails = (profileSetupItems) => (
    dispatch
) => {
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }

    // dispatch(accountNumberLoadStart());
    axios
        .post(
            `https://mysmeapp.ecobank.com:8443${apiRoutes.postEllevateProfiling}`,
            profileSetupItems,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Client-Type': 'web',
                    Authorization: `Bearer ${cookie}`
                }
            }
        )
        .then((response) => {
            dispatch(postEllevateProfilingSuccess(response?.data?.message));
        })
        .catch((error) =>
            dispatch(postEllevateProfilingError(error?.response?.data?.message))
        );
};
//Ellevate Profiling end
