import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react';
import { RootState } from 'store';

// const baseUrl = 'https://dpmfb-prod-app-srvr-01.azurewebsites.net/api/v1';
const baseUrl = 'https://wfz3gcz0-8081.uks1.devtunnels.ms/v1/api/';
if (typeof window !== 'undefined') {
    const affiliate = localStorage.getItem('affiliateCode');
}

export const authApi = createApi({
    reducerPath: 'onboardingApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().profile?.token;
            headers.set('Accept', 'application/json');
            headers.set('Content-Type', 'application/json');
            headers.set(
                'x-affiliate-code',
                localStorage.getItem('affiliateCode')
            );
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
                    url: 'auth/register',
                    method: 'post',
                    body
                };
            }
        }),

        loginAccount: builder.mutation({
            query: (body) => {
                return {
                    url: 'auth/login',
                    method: 'post',
                    body
                };
            }
        }),

        resendOtp: builder.mutation({
            query: (body) => {
                return {
                    url: 'auth/resend-otp',
                    method: 'post',
                    body
                };
            }
        }),
        verifySmsOtp: builder.mutation({
            query: (body) => {
                return {
                    url: 'auth/verify-otp',
                    method: 'post',
                    body
                };
            }
        }),
        verifyEmail: builder.mutation({
            query: (body) => {
                return {
                    url: 'auth/verify-email',
                    method: 'post',
                    body
                };
            }
        }),
        resendEmail: builder.mutation({
            query: (body) => {
                return {
                    url: 'auth/resend-verification',
                    method: 'post',
                    body
                };
            }
        }),
        resetPassword: builder.mutation({
            query: (body) => {
                return {
                    url: 'auth/reset-password',
                    method: 'post',
                    body
                };
            }
        }),
        forgotPassword: builder.mutation({
            query: (body) => {
                return {
                    url: 'auth/forgot-password',
                    method: 'post',
                    body
                };
            }
        }),

        profileSetupUnregisteredBusiness: builder.mutation({
            query: (body) => {
                return {
                    url: 'auth/profile-setup/unregistered-business',
                    method: 'post',
                    body
                };
            }
        }),

        profileSetupEcoAuth: builder.mutation({
            query: (body) => {
                return {
                    url: 'auth/profile-setup/eco-auth',
                    method: 'post',
                    body
                };
            }
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
