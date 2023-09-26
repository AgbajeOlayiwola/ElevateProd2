import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react';
import { RootState } from 'store';

// const baseUrl = 'https://dpmfb-prod-app-srvr-01.azurewebsites.net/api/v1';
const baseUrl = 'https://eidev.ecobank.com:7505/smeapp-service/';
if (typeof window !== 'undefined') {
    const affiliate = localStorage.getItem('affiliateCode');
}

export const authApi = createApi({
    reducerPath: 'onboardingApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        credentials: 'same-origin',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().profile?.token;
            // headers.set('accept', 'application/json');
            // headers.set(('Access-Control-Allow-Origin', '*'));
            headers.set('content-type', 'application/json');
            headers.set('x-affiliate-code', 'ENG');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),

    endpoints: (builder) => ({
        createAccount: builder.mutation({
            query: (body) => {
                return {
                    url: '/register',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-affiliate-code': 'ENG'
                    },
                    body
                };
            }
        }),

        loginAccount: builder.mutation({
            query: (body) => {
                return {
                    url: '/login',
                    method: 'post',
                    body
                };
            }
        }),

        resendOtp: builder.mutation({
            query: (body) => {
                return {
                    url: '/resend-otp',
                    method: 'post',
                    body
                };
            }
        }),
        verifySmsOtp: builder.mutation({
            query: (body) => {
                return {
                    url: '/verify-otp',
                    method: 'post',
                    body
                };
            }
        }),
        verifyEmail: builder.mutation({
            query: (body) => {
                return {
                    url: '/verify-email',
                    method: 'post',
                    body
                };
            }
        }),
        resendEmail: builder.mutation({
            query: (body) => {
                return {
                    url: '/resend-verification',
                    method: 'post',
                    body
                };
            }
        }),
        resetPassword: builder.mutation({
            query: (body) => {
                return {
                    url: '/reset-password',
                    method: 'post',
                    body
                };
            }
        }),
        forgotPassword: builder.mutation({
            query: (body) => {
                return {
                    url: '/forgot-password',
                    method: 'post',
                    body
                };
            }
        }),

        profileSetupUnregisteredBusiness: builder.mutation({
            query: (body) => {
                return {
                    url: '/unregistered-business',
                    method: 'post',
                    body
                };
            }
        }),

        profileSetupEcoAuth: builder.mutation({
            query: (body) => {
                return {
                    url: '/eco-auth',
                    method: 'post',
                    body
                };
            }
        }),
        endpoints: (builder) => ({
            searchRC: builder.mutation({
                query: (body) => {
                    return {
                        url: 'business-name',
                        method: 'post',
                        body
                    };
                }
            })
        }),
        endpoints: (builder) => ({
            faceMatch: builder.mutation({
                query: (body) => {
                    return {
                        url: 'facematch-with-bvn',
                        method: 'post',
                        body
                    };
                }
            }),
            getCAC: builder.mutation({
                query: (body) => {
                    return {
                        url:
                            'smeapp-document-verification-service/cac-verification',
                        method: 'post'
                    };
                }
            }),
            profileSetUpRegisteredBusiness: builder.mutation({
                query: (body) => {
                    return {
                        url:
                            'smeapp-register-business/authentication/profile-setup/registered-business',
                        method: 'post'
                    };
                }
            }),
            profileSetUpUnregisteredBusiness: builder.mutation({
                query: (body) => {
                    return {
                        url:
                            'smeapp-profile-unregister-business/authentication/profile-setup/registered-business',
                        method: 'post',
                        body
                    };
                }
            })
        })
    })
});

export const {
    useBusinessSetupMutation,
    useCreateAccountMutation,
    useForgotPasswordMutation,
    useLoginAccountMutation,
    useProfileSetupEcoAuthMutation,
    useProfileSetupUnregisteredBusinessMutation,
    useResendEmailMutation,
    useResendOtpMutation,
    useResetPasswordMutation,
    useUpdatePhoneMutation,
    useVerifySmsOtpMutation,
    useVerifyEmailMutation
} = authApi;
