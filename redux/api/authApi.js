import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
// const baseUrl = 'https://eidev.ecobank.com:7505/smeapp-auth/v1/api/auth/';
// https://cheffieapp.com/api/v1/authentication/user/
const baseUrl = 'https://eidev.ecobank.com:7505/smeapp-service/';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        credentials: 'same-origin',
        // mode: 'no-cors',

        prepareHeaders: (headers, { getState }) => {
            const token = getState().token;
            headers.set('Accept', 'application/json'),
                headers.set('Content-Type', 'application/json'); // Set Content-Type here
            // Add other allowed headers here
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
    // Add the middleware to your API

    endpoints: (builder) => ({
        loginAccount: builder.mutation({
            query: (body) => {
                return {
                    url: 'login',
                    method: 'POST',
                    body
                };
            }
        }),
        getAccountNo: builder.mutation({
            query: () => {
                return {
                    url: 'get-account-no',
                    method: 'POST',
                    body: {}
                };
            }
        }),
        getAccountStatus: builder.mutation({
            query: () => {
                return {
                    url: 'get-account-status',
                    method: 'POST',
                    body: {}
                };
            }
        }),

        register: builder.mutation({
            query: (body) => {
                return {
                    url: 'register',
                    method: 'post',
                    body
                };
            }
        }),
        profileSetUpUnregisteredBusiness: builder.mutation({
            query: (body) => {
                return {
                    url: 'unregistered-business',
                    method: 'post',
                    body
                };
            }
        }),
        forgotPassword: builder.mutation({
            query: (body) => {
                return {
                    url: 'forgot-password',
                    method: 'post',
                    body
                };
            }
        }),
        resetPassword: builder.mutation({
            query: (body) => {
                return {
                    url: 'reset-password',
                    method: 'post',
                    body
                };
            }
        }),
        resendEmailOtp: builder.mutation({
            query: (body) => {
                return {
                    url: 'resend-verification',
                    method: 'post',
                    body
                };
            }
        }),
        verifyEmail: builder.mutation({
            query: (body) => {
                return {
                    url: 'verify-email',
                    method: 'post',
                    body
                };
            }
        }),
        verifyOtp: builder.mutation({
            query: (body) => {
                return {
                    url: 'verify-otp',
                    method: 'post',
                    body
                };
            }
        }),
        resendOtp: builder.mutation({
            query: (body) => {
                return {
                    url: 'resend-otp',
                    method: 'post',
                    body
                };
            }
        }),
        registeredSetup: builder.mutation({
            query: (body) => {
                return {
                    url: 'registered-business',
                    method: 'post',
                    body
                };
            }
        }),
        unregisteredSetup: builder.mutation({
            query: (body) => {
                return {
                    url: 'unregistered-business',
                    method: 'post',
                    body
                };
            }
        }),
        facematch: builder.mutation({
            query: (body) => {
                return {
                    url: 'facematch-with-bvn',
                    method: 'post',
                    body
                };
            }
        }),
        getCAC: builder.mutation({
            query: () => {
                return {
                    url: 'cac-verification',
                    method: 'post',
                    body: {
                        registrationNumber: ''
                    }
                };
            }
        }),
        getCategories: builder.mutation({
            query: () => {
                return {
                    url: 'business-categories',
                    method: 'post',
                    body: {}
                };
            }
        }),
        searchRC: builder.mutation({
            query: (body) => {
                return {
                    url: 'business-name',
                    method: 'post',
                    body
                };
            }
        }),
        businessSetup: builder.mutation({
            query: (body) => {
                return {
                    url: 'business-setup',
                    method: 'post',
                    body
                };
            }
        }),
        updatePhone: builder.mutation({
            query: (body) => {
                return {
                    url: 'user-update-phone',
                    method: 'post',
                    body
                };
            }
        }),
        getProfile: builder.mutation({
            query: () => {
                return {
                    url: 'user-profile',
                    method: 'post',
                    body: {}
                };
            }
        }),
        vninVerification: builder.mutation({
            query: () => {
                return {
                    url: 'vNin-verification',
                    method: 'post'
                };
            }
        }),
        ninVerification: builder.mutation({
            query: () => {
                return {
                    url: 'nin-verification',
                    method: 'post'
                };
            }
        }),
        tinVerification: builder.mutation({
            query: () => {
                return {
                    url: 'tin-verification',
                    method: 'post'
                };
            }
        }),
        bvnVerification: builder.mutation({
            query: () => {
                return {
                    url: 'bvn-verification',
                    method: 'post'
                };
            }
        }),
        documentVerification: builder.mutation({
            query: () => {
                return {
                    url: 'document-verification',
                    method: 'post'
                };
            }
        }),

        bulkTransfer: builder.mutation({
            query: (body) => {
                return {
                    url: 'bulk-transfer',
                    method: 'post',
                    body
                };
            }
        }),
        billerPayment: builder.mutation({
            query: (body) => {
                return {
                    url: 'biller-payment',
                    method: 'post',
                    body
                };
            }
        }),
        billerValidation: builder.mutation({
            query: (body) => {
                return {
                    url: 'biller-validation',
                    method: 'post',
                    body
                };
            }
        }),
        billerDetails: builder.mutation({
            query: (body) => {
                return {
                    url: 'biller-details',
                    method: 'post',
                    body
                };
            }
        }),
        airNetworks: builder.mutation({
            query: () => {
                return {
                    url: 'airtime-topup-networks',
                    method: 'post',
                    body: {}
                };
            }
        }),
        mobiNetworks: builder.mutation({
            query: (body) => {
                return {
                    url: 'mobilemoney-networks',
                    method: 'post',
                    body: {}
                };
            }
        }),
        billerCategories: builder.mutation({
            query: (body) => {
                return {
                    url: 'biller-categories',
                    method: 'post',
                    body: {}
                };
            }
        }),
        billers: builder.mutation({
            query: (body) => {
                return {
                    url: 'billers',
                    method: 'post',
                    body
                };
            }
        }),
        airtimeTopup: builder.mutation({
            query: (body) => {
                return {
                    url: 'airtime-topup',
                    method: 'post',
                    body
                };
            }
        }),
        mobileMoney: builder.mutation({
            query: (body) => {
                return {
                    url: 'mobilemoney',
                    method: 'post',
                    body
                };
            }
        }),
        acctInquiry: builder.mutation({
            query: () => {
                return {
                    url: 'account-inquiry',
                    method: 'post'
                };
            }
        }),
        createIAcct: builder.mutation({
            query: (body) => {
                return {
                    url: 'create-individual-account',
                    method: 'post',
                    body
                };
            }
        }),
        createCAcct: builder.mutation({
            query: (body) => {
                return {
                    url: 'corporate-account-creation',
                    method: 'post',
                    body
                };
            }
        }),
        registerAccountNumber: builder.mutation({
            query: (body) => {
                return {
                    url: 'register-account-number',
                    method: 'post',
                    body
                };
            }
        }),
        registerCard: builder.mutation({
            query: (body) => {
                return {
                    url: 'card-register',
                    method: 'post',
                    body
                };
            }
        }),
        authOmnilite: builder.mutation({
            query: (body) => {
                return {
                    url: 'auth-omnilite',
                    method: 'post',
                    body
                };
            }
        }),
        authEcobank: builder.mutation({
            query: (body) => {
                return {
                    url: 'auth-ecobank-online',
                    method: 'post',
                    body
                };
            }
        }),
        getMoreAccountNumberDetails: builder.mutation({
            query: (body) => {
                return {
                    url: 'account-details',
                    method: 'post',
                    body
                };
            }
        }),

        resendExisitingOtp: builder.mutation({
            query: (body) => {
                return {
                    url: 'existing-resend-otp',
                    method: 'post',
                    body
                };
            }
        }),

        verifyExistingOtp: builder.mutation({
            query: (body) => {
                return {
                    url: 'existing-verify-otp',
                    method: 'post',
                    body
                };
            }
        }),
        createExistingUserProfile: builder.mutation({
            query: (body) => {
                return {
                    url: 'create-user-profile',
                    method: 'post',
                    body
                };
            }
        }),
        getAcctBals: builder.mutation({
            query: () => {
                return {
                    url: 'get-account-balance',
                    method: 'post',
                    body: {}
                };
            }
        }),
        faceMatchWithoutBvn: builder.mutation({
            query: (body) => {
                return {
                    url: 'facematch',
                    method: 'post',
                    body
                };
            }
        }),
        paymentbanklist: builder.mutation({
            query: (body) => {
                return {
                    url: 'payment-banklist',
                    method: 'post',
                    body: {}
                };
            }
        }),
        accountInquiry: builder.mutation({
            query: (body) => {
                return {
                    url: 'account-inquiry',
                    method: 'post',
                    body
                };
            }
        }),
        singleTransfer: builder.mutation({
            query: (body) => {
                return {
                    url: 'payment-single-transfer',
                    method: 'post',
                    body
                };
            }
        }),
        verifyTransactionPin: builder.mutation({
            query: (body) => {
                return {
                    url: 'user-verify-transaction-pin',
                    method: 'post',
                    body
                };
            }
        }),
        updateTransactionPin: builder.mutation({
            query: (body) => {
                return {
                    url: 'user-update-transaction-pin',
                    method: 'post',
                    body
                };
            }
        }),

        createTransactionPin: builder.mutation({
            query: (body) => {
                return {
                    url: 'user-create-transaction-pin',
                    method: 'post',
                    body
                };
            }
        }),
        getRelationshipManager: builder.mutation({
            query: (body) => {
                return {
                    url: 'get-relationship-manager',
                    method: 'post',
                    body
                };
            }
        }),
        physicalQr: builder.mutation({
            query: (body) => {
                return {
                    url: 'physical-qr',
                    method: 'post',
                    body: {}
                };
            }
        }),
        dynamicQr: builder.mutation({
            query: (body) => {
                return {
                    url: 'dynamic-qr',
                    method: 'post',
                    body
                };
            }
        }),
        ussdRefference: builder.mutation({
            query: (body) => {
                return {
                    url: 'ussd-reference',
                    method: 'post',
                    body
                };
            }
        }),
        ordrVirtualAccount: builder.mutation({
            query: (body) => {
                return {
                    url: 'virtual-account-order',
                    method: 'post',
                    body
                };
            }
        }),
        virtualAccountStatus: builder.mutation({
            query: (body) => {
                return {
                    url: 'virtual-account-trans-status',
                    method: 'post',
                    body
                };
            }
        }),
        changePassword: builder.mutation({
            query: (body) => {
                return {
                    url: 'user-change-password',
                    method: 'post',
                    body
                };
            }
        }),
        accountMiniStatement: builder.mutation({
            query: (body) => {
                return {
                    url: 'account-mini-statement',
                    method: 'post',
                    body
                };
            }
        }),
        accountFullStatement: builder.mutation({
            query: (body) => {
                return {
                    url: 'account-full-statement',
                    method: 'post',
                    body
                };
            }
        }),
        facematchithAccountnumber: builder.mutation({
            query: (body) => {
                return {
                    url: 'facematch-with-accountnumber',
                    method: 'post',
                    body
                };
            }
        }),
        enrollQr: builder.mutation({
            query: (body) => {
                return {
                    url: 'enroll-qr',
                    method: 'post',
                    body
                };
            }
        }),
        disputeHistory: builder.mutation({
            query: (body) => {
                return {
                    url: 'dispute-history',
                    method: 'post',
                    body
                };
            }
        }),

        transactionHistory: builder.mutation({
            query: (body) => {
                return {
                    url: 'transactions-history',
                    method: 'post',
                    body
                };
            }
        }),
        createUserBeneficiary: builder.mutation({
            query: (body) => {
                return {
                    url: 'create-user-beneficiary',
                    method: 'post',
                    body
                };
            }
        }),
        deleteUserBeneficiary: builder.mutation({
            query: (body) => {
                return {
                    url: 'delete-user-beneficiary',
                    method: 'post',
                    body
                };
            }
        }),
        deleteUserBeneficiary: builder.mutation({
            query: (body) => {
                return {
                    url: 'delete-user-beneficiary',
                    method: 'post',
                    body
                };
            }
        }),
        getUserBeneficiary: builder.mutation({
            query: (body) => {
                return {
                    url: 'get-user-beneficiary',
                    method: 'post',
                    body
                };
            }
        }),
        logisticsGigStations: builder.mutation({
            query: (body) => {
                return {
                    url: 'logistics-gig-stations',
                    method: 'post',
                    body
                };
            }
        }),
        logisticsGigCaptureShipment: builder.mutation({
            query: (body) => {
                return {
                    url: 'logistics-gig-capture-shipment',
                    method: 'post',
                    body
                };
            }
        }),
        logisticsGigShipmentPrice: builder.mutation({
            query: (body) => {
                return {
                    url: 'logistics-gig-shipment-price',
                    method: 'post',
                    body
                };
            }
        }),
        transactionsSummary: builder.mutation({
            query: (body) => {
                return {
                    url: 'transactions-summary',
                    method: 'post',
                    body: {}
                };
            }
        }),
        paymentFetchtransactionfee: builder.mutation({
            query: (body) => {
                return {
                    url: 'payment-fetchtransactionfee',
                    method: 'post',
                    body
                };
            }
        })
    })
});

export const {
    usePaymentFetchtransactionfeeMutation,
    useTransactionsSummaryMutation,
    useTransactionHistoryMutation,
    useDisputeHistoryMutation,
    useVirtualAccountStatusMutation,
    useOrdrVirtualAccountMutation,
    useEnrollQrMutation,
    useFacematchithAccountnumberMutation,
    useAccountMiniStatementMutation,
    useAccountFullStatementMutation,
    useChangePasswordMutation,
    useUpdateTransactionPinMutation,
    usePhysicalQrMutation,
    useDynamicQrMutation,
    useUssdRefferenceMutation,
    useGetRelationshipManagerMutation,
    useCreateTransactionPinMutation,
    useVerifyTransactionPinMutation,
    useSingleTransferMutation,
    useAccountInquiryMutation,
    usePaymentbanklistMutation,
    useGetAcctBalsMutation,
    useFaceMatchWithoutBvnMutation,
    useSearchRCMutation,
    useGetAccountNoMutation,
    useCreateExistingUserProfileMutation,
    useResendExisitingOtpMutation,
    useVerifyExistingOtpMutation,
    useGetMoreAccountNumberDetailsMutation,
    useAuthEcobankMutation,
    useAuthOmniliteMutation,
    useRegisterAccountNumberMutation,
    useRegisterCardMutation,
    useDocumentVerificationMutation,
    useBvnVerificationMutation,
    useNinVerificationMutation,
    useTinVerificationMutation,
    useLoginAccountMutation,
    useVninVerificationMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useGetCategoriesMutation,
    useResendEmailOtpMutation,
    useVerifyEmailMutation,
    useVerifyOtpMutation,
    useFacematchMutation,
    useGetCACMutation,
    useResendOtpMutation,
    useRegisterMutation,
    useRegisteredSetupMutation,
    useUpdatePhoneMutation,
    useGetProfileMutation,
    useUnregisteredSetupMutation,
    useBulkTransferMutation,
    useBillerPaymentMutation,
    useBillerValidationMutation,
    useBillerDetailsMutation,
    useAirNetworksMutation,
    useBillerCategoriesMutation,
    useBillersMutation,
    useAirtimeTopupMutation,
    useMobileMoneyMutation,
    useMobiNetworksMutation,
    useAcctInquiryMutation,
    useProfileSetUpUnregisteredBusinessMutation,
    useBusinessSetupMutation,
    useCreateIAcctMutation,
    useCreateCAcctMutation,
    useGetAccountStatusMutation
} = authApi;
