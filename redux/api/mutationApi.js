import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react';
import { RootState } from 'store';

// const baseUrl = 'https://dpmfb-prod-app-srvr-01.azurewebsites.net/api/v1';
const baseUrl = 'https://mysmeapp.ecobank.com:8443/';

export const mutationApi = createApi({
    reducerPath: 'onboardingApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = '';
            headers.set('x-api-key', 'aXA7DdqHKemWwXO5maT1hiLuWbOYTyFB');
            headers.set('Accept', 'application/json');
            headers.set('Content-Type', 'application/json');
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
                    url: 'authentication/register',
                    method: 'post',
                    body
                };
            }
        }),
        bb: builder.mutation({
            query: (body) => {
                return {
                    url: 'bank-account/create/individual',
                    method: 'post',
                    body
                };
            }
        }),
        loginAccount: builder.mutation({
            query: (body) => {
                return {
                    url: 'authentication/v1/login',
                    method: 'post',
                    body
                };
            }
        }),
        secondFactor: builder.mutation({
            query: (body) => {
                return {
                    url: 'authentication/login/2FA',
                    method: 'post',
                    body
                };
            }
        }),
        forgotPassword: builder.mutation({
            query: (body) => {
                return {
                    url: 'authentication/forget-password',
                    method: 'post',
                    body
                };
            }
        }),
        resetPassword: builder.mutation({
            query: (body) => {
                return {
                    url: 'authentication/reset-password',
                    method: 'post',
                    body
                };
            }
        }),
        registerBusiness: builder.mutation({
            query: (body) => {
                return {
                    url: 'authentication/profile-setup/registered-business',
                    method: 'post',
                    body
                };
            }
        }),
        registerNormal: builder.mutation({
            query: (body) => {
                return {
                    url: 'authentication/profile-setup/unregistered-business',
                    method: 'post',
                    body
                };
            }
        }),
        verifyOtp: builder.mutation({
            query: (body) => {
                return {
                    url: 'authentication/otp/verify',
                    method: 'post',
                    body
                };
            }
        }),
        resendOtp: builder.mutation({
            query: (body) => {
                return {
                    url: 'authentication/otp/re-send',
                    method: 'post',
                    body
                };
            }
        }),
        resendEmail: builder.mutation({
            query: (body) => {
                return {
                    url: 'authentication/email-verification/re-send',
                    method: 'post',
                    body
                };
            }
        }),
        updatePhone: builder.mutation({
            query: (body) => {
                return {
                    url: 'users/phone/update',
                    method: 'post',
                    body
                };
            }
        }),
        fetchBusiness: builder.mutation({
            query: (body) => {
                return {
                    url: 'business/name',
                    method: 'post',
                    body
                };
            }
        }),
        businessSetup: builder.mutation({
            query: (body) => {
                return {
                    url: 'business/setup/mobile',
                    method: 'post',
                    body
                };
            }
        }),
        verifyRegisteredBusiness: builder.mutation({
            query: () => {
                return {
                    url: 'document-verification/registered-business',
                    method: 'post'
                };
            }
        }),
        verifyUnRegisteredBusiness: builder.mutation({
            query: () => {
                return {
                    url: 'document-verification/unregistered-business',
                    method: 'post'
                };
            }
        }),
        omniReg: builder.mutation({
            query: (body) => {
                return {
                    url: 'authentication/register/omnilite',
                    method: 'post',
                    body
                };
            }
        }),
        ecoReg: builder.mutation({
            query: (body) => {
                return {
                    url: 'authentication/register/ecobank-online',
                    method: 'post',
                    body
                };
            }
        }),
        acctReg: builder.mutation({
            query: (body) => {
                return {
                    url: 'authentication/register/account-number',
                    method: 'post',
                    body
                };
            }
        }),
        cardReg: builder.mutation({
            query: (body) => {
                return {
                    url: 'authentication/register/card',
                    method: 'post',
                    body
                };
            }
        }),
        ecoSetup: builder.mutation({
            query: (body) => {
                return {
                    url: 'authentication/profile-setup/unregistered-business',
                    method: 'post',
                    body
                };
            }
        }),
        ecoRegSetup: builder.mutation({
            query: (body) => {
                return {
                    url: 'authentication/profile-setup/registered-business',
                    method: 'post',
                    body
                };
            }
        }),
        faceMatch: builder.mutation({
            query: (value) => {
                return {
                    url: 'authentication/facematch/upload-base64',
                    method: 'post',
                    body: {
                        userFaceBase64: value
                    }
                };
            }
        }),
        NewProfile: builder.mutation({
            query: (body) => {
                return {
                    url: 'authentication/profile-setup/eco-auth',
                    method: 'post',
                    body
                };
            }
        }),

        createIAcct: builder.mutation({
            query: () => {
                return {
                    url: 'bank-account/create/individual',
                    method: 'post',
                    body: {
                        affiliateCode: 'ENG',
                        currency: 'NGN'
                    }
                };
            }
        }),
        createCAcct: builder.mutation({
            query: () => {
                return {
                    url: 'bank-account/create/corperate',
                    method: 'post',
                    body: {
                        affiliateCode: 'ENG',
                        currency: 'NGN'
                    }
                };
            }
        }),

        getTransferName: builder.mutation({
            query: (value) => {
                return {
                    url: 'bank-account/inter-bank/info',
                    method: 'post',
                    body: value
                };
            }
        }),
        getTxName: builder.mutation({
            query: (value) => {
                return {
                    url: 'bank-account/intra-bank/info',
                    method: 'post',
                    body: value
                };
            }
        }),
        getManager: builder.mutation({
            query: (value) => {
                return {
                    url: 'bank-account/account-manager',
                    method: 'post',
                    body: value
                };
            }
        }),
        getAccountBal: builder.mutation({
            query: (value) => {
                return {
                    url: 'bank-account/balance',
                    method: 'post',
                    body: {
                        accountId: value
                    }
                };
            }
        }),

        deleteUser: builder.mutation({
            query: (body) => {
                return {
                    url: 'users/delete-account',
                    method: 'post',
                    body
                };
            }
        }),
        setPrimary: builder.mutation({
            query: (body) => {
                return {
                    url: 'bank-account/primary',
                    method: 'post',
                    body
                };
            }
        }),

        singlePayment: builder.mutation({
            query: (body) => {
                return {
                    url: 'payment/single-transfer',
                    method: 'post',
                    body
                };
            }
        }),
        addSingleBeneficiary: builder.mutation({
            query: (body) => {
                return {
                    url: 'beneficiaries',
                    method: 'post',
                    body
                };
            }
        }),
        addAirtimeBeneficiary: builder.mutation({
            query: (body) => {
                return {
                    url: 'phone-number-beneficiaries',
                    method: 'post',
                    body
                };
            }
        }),
        getTXfees: builder.mutation({
            query: (body) => {
                return {
                    url: 'transactions/transaction-fees',
                    method: 'post',
                    body
                };
            }
        }),
        getMiniStatement: builder.mutation({
            query: (id) => {
                return {
                    url: 'bank-account/statement/mini',
                    method: 'post',
                    body: {
                        accountId: id
                    }
                };
            }
        }),
        getFullStatement: builder.mutation({
            query: (body) => {
                return {
                    url: 'bank-account/statement/full',
                    method: 'post',
                    body
                };
            }
        }),
        bulkPayment: builder.mutation({
            query: (body) => {
                return {
                    url: 'payment/bulk-transfer',
                    method: 'post',
                    body
                };
            }
        }),
        billerPayment: builder.mutation({
            query: (body) => {
                return {
                    url: 'payment/biller-payment',
                    method: 'post',
                    body
                };
            }
        }),
        airtimePayment: builder.mutation({
            query: (body) => {
                return {
                    url: 'payment/airtime-topup',
                    method: 'post',
                    body
                };
            }
        }),

        deletePb: builder.mutation({
            query: (id) => {
                return {
                    url: `phone-number-beneficiaries/delete/${id}`,
                    method: 'get'
                };
            }
        }),
        deleteBen: builder.mutation({
            query: (id) => {
                return {
                    url: `beneficiaries/delete/${id}`,
                    method: 'get'
                };
            }
        }),
        getUssdStatus: builder.mutation({
            query: (id) => {
                return {
                    url: 'payment/ussd/status',
                    method: 'post',
                    body: {
                        transactionRef: id
                    }
                };
            }
        }),

        submitDispute: builder.mutation({
            query: (body) => {
                return {
                    url: 'dispute-management/lodge-complaint',
                    method: 'post',
                    body
                };
            }
        }),
        verifyPin: builder.mutation({
            query: (body) => {
                return {
                    url: 'users/transaction-pin/verify',
                    method: 'post',
                    body
                };
            }
        }),
        resetPin: builder.mutation({
            query: (body) => {
                return {
                    url: 'users/transaction-pin/reset',
                    method: 'post',
                    body
                };
            }
        }),
        startReset: builder.mutation({
            query: (body) => {
                return {
                    url: 'users/transaction-pin/update',
                    method: 'post',
                    body
                };
            }
        }),
        generateUssd: builder.mutation({
            query: (body) => {
                return {
                    url: 'payment/ussd/generate',
                    method: 'post',
                    body
                };
            }
        }),
        generateQr: builder.mutation({
            query: (body) => {
                return {
                    url: 'payment/qr/generate',
                    method: 'post',
                    body
                };
            }
        }),
        generatePayLink: builder.mutation({
            query: (body) => {
                return {
                    url: 'payment/payment-link/create',
                    method: 'post',
                    body
                };
            }
        }),
        uploadDocument: builder.mutation({
            query: (body) => {
                return {
                    url: 'account-upgrade/utility-document/upload-json',
                    method: 'post',
                    body
                };
            }
        }),
        transactionPin: builder.mutation({
            query: (body) => {
                return {
                    url: 'account-upgrade/transaction-pin/set',
                    method: 'post',
                    body
                };
            }
        }),
        uploadId: builder.mutation({
            query: (body) => {
                return {
                    url: 'account-upgrade/identification-document/upload-json',
                    method: 'post',
                    body
                };
            }
        }),
        uploadVNin: builder.mutation({
            query: (body) => {
                return {
                    url: 'account-upgrade/vNin-verification',
                    method: 'post',
                    body
                };
            }
        }),
        cacUpload: builder.mutation({
            query: (body) => {
                return {
                    url: 'account-upgrade/cac-cert/upload-json',
                    method: 'post',
                    body
                };
            }
        }),
        scumlUpload: builder.mutation({
            query: (body) => {
                return {
                    url: 'account-upgrade/scuml/upload-json',
                    method: 'post',
                    body
                };
            }
        }),
        mematUpload: builder.mutation({
            query: (body) => {
                return {
                    url: 'account-upgrade/memart/upload-json',
                    method: 'post',
                    body
                };
            }
        }),
        postProfiling: builder.mutation({
            query: (body) => {
                return {
                    url: 'ellevate-profiling',
                    method: 'post',
                    body
                };
            }
        }),

        referEmails: builder.mutation({
            query: (body) => {
                return {
                    url: 'account-upgrade/reference-form/share',
                    method: 'post',
                    body
                };
            }
        }),
        referForms: builder.mutation({
            query: (body) => {
                return {
                    url: 'account-upgrade/reference-form/upload-json',
                    method: 'post',
                    body
                };
            }
        }),
        cacDoc: builder.mutation({
            query: (body) => {
                return {
                    url: 'account-upgrade/cac-document/upload-json',
                    method: 'post',
                    body
                };
            }
        })
    })
});

export const {
    useGenerateUssdMutation,
    useGenerateQrMutation,
    useGeneratePayLinkMutation,
    useResetPinMutation,
    useStartResetMutation,
    useCreateIAcctMutation,
    useCreateCAcctMutation,
    useGetTransferNameMutation,
    useGetAccountBalMutation,
    useGetTxNameMutation,
    useDeleteUserMutation,
    useGetManagerMutation,
    useSetPrimaryMutation,
    useCreateAccountMutation,
    useLoginAccountMutation,
    useRegisterBusinessMutation,
    useRegisterNormalMutation,
    useVerifyOtpMutation,
    useResendEmailMutation,
    useFetchBusinessMutation,
    useBusinessSetupMutation,
    useVerifyRegisteredBusinessMutation,
    useVerifyUnRegisteredBusinessMutation,
    useResendOtpMutation,
    useOmniRegMutation,
    useEcoRegMutation,
    useAcctRegMutation,
    useCardRegMutation,
    useEcoSetupMutation,
    useFaceMatchMutation,
    useEcoRegSetupMutation,
    useNewProfileMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useSecondFactorMutation,
    useUpdatePhoneMutation,
    useSinglePaymentMutation,
    useBulkPaymentMutation,
    useBillerPaymentMutation,
    useAirtimePaymentMutation,
    useAddSingleBeneficiaryMutation,
    useGetTXfeesMutation,
    useDeleteBenMutation,
    useDeletePbMutation,
    useAddAirtimeBeneficiaryMutation,
    useGetUssdStatusMutation,
    useGetMiniStatementMutation,
    useGetFullStatementMutation,
    useSubmitDisputeMutation,
    useVerifyPinMutation,
    useUploadDocumentMutation,
    useTransactionPinMutation,
    useUploadIdMutation,
    useUploadVNinMutation,
    useCacUploadMutation,
    useScumlUploadMutation,
    useMematUploadMutation,
    usePostProfilingMutation,
    useReferEmailsMutation,
    useReferFormsMutation,
    useCacDocMutation
} = mutationApi;
