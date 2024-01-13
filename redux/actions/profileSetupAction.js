import { getCookie } from 'cookies-next';
import apiRoutes from '../helper/apiRoutes';
import { setupProfile } from '../types/actionTypes';
export const setupProfileStart = () => ({
    type: setupProfile.PROFILESETUP_LOAD_START
});
export const setupProfileSucces = (profileSetup) => ({
    type: setupProfile.PROFILESETUP_LOAD_SUCCESS,
    payload: profileSetup
});
export const setupProfileError = (errorMessages) => ({
    type: setupProfile.PROFILESETUP_LOAD_ERROR,
    payload: errorMessages
});
export const bvnNinError = (bvnError) => ({
    type: setupProfile.BVN_NIN_LOAD_ERROR,
    payload: bvnError
});
export const bvnNinErrorI = (bvnErrorI) => ({
    type: setupProfile.BVN_NIN_LOAD_ERRORI,
    payload: bvnErrorI
});
export const bvnNinErrorII = (bvnErrorII) => ({
    type: setupProfile.BVN_NIN_LOAD_ERRORII,
    payload: bvnErrorII
});
export const bvnNinErrorIII = (bvnErrorIII) => ({
    type: setupProfile.BVN_NIN_LOAD_ERRORIII,
    payload: bvnErrorIII
});
export const bvnNinPending = (bvnNinPend) => ({
    type: setupProfile.BVN_NIN_LOAD_PENDING,
    payload: bvnNinPend
});
export const bvnNinData = (bvnNin) => ({
    type: setupProfile.BVN_NIN_LOAD_SUCCESS,
    payload: bvnNin
});
export const createProfileSetup = (profileData) => {
    const cookie = getCookie('cookieToken');
    return async (dispatch) => {
        await axios
            .post(
                `https://mysmeapp.ecobank.com:8443${apiRoutes.profileSetup}`,
                profileData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Client-Type': 'web',
                        Authorization: `Bearer ${cookie}`
                    }
                }
            )
            .then((response) => {
                dispatch(setupProfileSucces(response?.data));
                if (
                    response?.data?.message ===
                    'profile setup intialized, sending otp'
                ) {
                    const cookie = getCookie('cookieToken');
                    setTimeout(() => {
                        axios
                            .post(
                                `https://mysmeapp.ecobank.com:8443${apiRoutes.verifyStatus}`,
                                [],
                                {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'X-Client-Type': 'web',
                                        Authorization: `Bearer ${cookie}`
                                    }
                                }
                            )
                            .then((response) => {
                                dispatch(bvnNinData(response?.data?.message));
                            })
                            .catch((error) => {
                                dispatch(
                                    bvnNinError(error?.response?.data?.message)
                                );
                            });
                    }, 5000);
                }
            })
            .catch((error) => {
                // //// console.log
                //     'profile setup dispatch',
                //     error?.response.data.message
                // );
                dispatch(setupProfileError(error?.response?.data?.message));
            });
    };
};
