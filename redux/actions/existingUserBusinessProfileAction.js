import { getCookie } from 'cookies-next';
import { existingBusnessSetup, getCAC, sendCac } from '../types/actionTypes';
import apiRoutes from '../helper/apiRoutes';
import axiosInstance from '../helper/apiClient';
//existingUser profile setup action start
export const exSetupBusSendCac = () => ({
    type: sendCac.SEND_CAC_START
});
export const exSetupBusSendCacSucces = (cacName) => ({
    type: sendCac.SEND_CAC_SUCCESS,
    payload: cacName
});
export const exSetupBusSendCacError = (cacNameError) => ({
    type: sendCac.SEND_CAC_ERROR,
    payload: cacNameError
});
//get business cac
export const exGetBusCac = () => ({
    type: getCAC.GET_CAC_START
});
export const exGetBusCacSuccess = (getCacName) => ({
    type: getCAC.GET_CAC_SUCCESS,
    payload: getCacName
});
export const exGetBusCacError = (getCacNameError) => ({
    type: getCAC.GET_CAC_ERROR,
    payload: getCacNameError
});

export const exBusinessProfile = () => ({
    type: existingBusnessSetup.EXISTING_BUSINESS_START
});
export const exBusinessProfileSuccess = (existingProfileSetupPay) => ({
    type: existingBusnessSetup.EXISTING_BUSINESS_SUCCESS,
    payload: existingProfileSetupPay
});
export const exBusinessProfileError = (existingProfileSetupError) => ({
    type: existingBusnessSetup.EXISTING_BUSINESS_ERROR,
    payload: existingProfileSetupError
});
export const ExCreateBusProfileSetup = (businessProfileData) => {
    let cookie;

    if (getCookie('cookieToken') == undefined) {
        cookie = getCookie('existingToken');
    } else {
        cookie = getCookie('cookieToken');
    }
    return async (dispatch) => {
        await axios
            .post(
                `https://mysmeapp.ecobank.com:8443${apiRoutes.businessNameCac}`,
                {
                    registerationNumber: businessProfileData.registerationNumber
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Client-Type': 'web',
                        Authorization: `Bearer ${cookie}`
                    }
                }
            )
            .then((response) => {
                dispatch(exSetupBusSendCacSucces(response?.data));
                if (response.data) {
                    let cookie;

                    if (getCookie('cookieToken') == undefined) {
                        cookie = getCookie('existingToken');
                    } else {
                        cookie = getCookie('cookieToken');
                    }
                    axios
                        .get(
                            `https://mysmeapp.ecobank.com:8443${apiRoutes.verifyCac}`,
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-Client-Type': 'web',
                                    Authorization: `Bearer ${cookie}`
                                }
                            }
                        )
                        .then((response) => {
                            dispatch(exGetBusCacSuccess(response));
                            if (
                                response?.data?.data?.isCredentialsValid ===
                                true
                            ) {
                                let cookie;

                                if (getCookie('cookieToken') == undefined) {
                                    cookie = getCookie('existingToken');
                                } else {
                                    cookie = getCookie('cookieToken');
                                }
                                axios
                                    .post(
                                        `https://mysmeapp.ecobank.com:8443${apiRoutes.completesBusinessProfile}`,
                                        businessProfileData,
                                        {
                                            headers: {
                                                'Content-Type':
                                                    'application/json',
                                                Authorization: `Bearer ${cookie}`
                                            }
                                        }
                                    )
                                    .then((response) => {
                                        dispatch(
                                            exBusinessProfileSuccess(response)
                                        );
                                    })
                                    .catch((error) => {
                                        dispatch(exBusinessProfileError(error));
                                    });
                            }
                        })

                        .catch((error) => dispatch(exGetBusCacError(error)));
                }
            })

            .catch((error) => {
                dispatch(
                    exSetupBusSendCacError(error?.response?.data?.message)
                );
            });
    };
};
