import { getCookie } from 'cookies-next';
import axiosInstance from '../helper/apiClient';
import apiRoutes from '../helper/apiRoutes';
import { setupBusProfile } from '../types/actionTypes';
import {
    bvnNinData,
    bvnNinError,
    setupProfileError,
    setupProfileSucces
} from './profileSetupAction';
//business profile setup action start
export const setupBusProfileStart = (busErrorMessages) => ({
    type: setupBusProfile.BUS_PROFILESETUP_LOAD_START,
    payload: busErrorMessages
});
export const setupBusProfileSucces = (busProfileSetup) => ({
    type: setupBusProfile.BUS_PROFILESETUP_LOAD_SUCCESS,
    payload: busProfileSetup
});
export const setupBusProfileError = (busErrorMessages) => ({
    type: setupBusProfile.BUS_PROFILESETUP_LOAD_ERROR,
    payload: busErrorMessages
});
export const bvnBusNinError = (busBvnError) => ({
    type: setupBusProfile.BUS_BVN_NIN_LOAD_ERROR,
    payload: busBvnError
});
export const bvnBusNinErrorI = (busBvnErrorI) => ({
    type: setupBusProfile.BUS_BVN_NIN_LOAD_ERRORI,
    payload: busBvnErrorI
});
export const bvnBusNinErrorII = (busBvnErrorII) => ({
    type: setupBusProfile.BUS_BVN_NIN_LOAD_ERRORII,
    payload: busBvnErrorII
});
export const bvnBusNinErrorIII = (busBvnErrorIII) => ({
    type: setupBusProfile.BUS_BVN_NIN_LOAD_ERRORIII,
    payload: busBvnErrorIII
});
export const bvnBusNinPending = (busBvnNinPend) => ({
    type: setupBusProfile.BUS_BVN_NIN_LOAD_PENDING,
    payload: busBvnNinPend
});
export const bvnBusNinData = (busBvnNin) => ({
    type: setupBusProfile.BUS_BVN_NIN_LOAD_SUCCESS,
    payload: busBvnNin
});
export const createBusProfileSetup = (businessProfileData) => {
    const cookie = getCookie('cookieToken');
    return async (dispatch) => {
        await axios
            .post(
                `https://mysmeapp.ecobank.com:8443${apiRoutes?.profileSetupBus}`,
                businessProfileData,
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

                // //// console.log'data from Business profile', response.data);
                if (response?.data?.message === 'Success') {
                    const cookie = getCookie('cookieToken');
                    setTimeout(() => {
                        axiosInstance
                            .post(
                                `https://mysmeapp.ecobank.com:8443${apiRoutes?.verifyStatusBus}`,
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
