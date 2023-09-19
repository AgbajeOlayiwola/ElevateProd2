import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react';
import { RootState } from 'store';

// const baseUrl = 'https://dpmfb-prod-app-srvr-01.azurewebsites.net/api/v1';
const baseUrl = 'https://mysmeapp.ecobank.com:8443/';

export const queryApi = createApi({
    reducerPath: 'queryApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = '';
            headers.set('x-api-key', 'aXA7DdqHKemWwXO5maT1hiLuWbOYTyFB');
            // headers.set('x-api-key', 'C8t13zn1IkpLXoFwFJP9Y88TAfRSxFLZ');
            headers.set('Accept', 'application/json');
            headers.set('Content-Type', 'application/json');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getUserData: builder.query({
            query: () => {
                return {
                    url: 'document-verification/cac'
                };
            }
        }),
        businessCategory: builder.query({
            query: () => {
                return {
                    url: 'business-categories'
                };
            }
        }),
        getLga: builder.query({
            query: () => {
                return {
                    url: 'lga'
                };
            }
        }),
        getAcctStatus: builder.query({
            query: () => {
                return {
                    url: 'bank-account/status'
                };
            }
        }),
        getImage: builder.query({
            query: () => {
                return {
                    url: 'users/profile/image'
                };
            }
        }),
        getAccounts: builder.query({
            query: () => {
                return {
                    url: 'bank-account'
                };
            }
        }),
        getBanks: builder.query({
            query: () => {
                return {
                    url: 'bank-list?affiliateCode=ENG'
                };
            }
        }),
        getProfile: builder.query({
            query: () => {
                return {
                    url: 'users/profile'
                };
            }
        }),
        getStaticQr: builder.query({
            query: () => {
                return {
                    url: 'payment/qr/merchant-info'
                };
            }
        }),
        getPrimaryAcct: builder.query({
            query: () => {
                return {
                    url: 'bank-account/primary'
                };
            }
        }),
        freezeAcct: builder.query({
            query: () => {
                return {
                    url: 'users/freeze-transactions'
                };
            }
        }),
        unfreezeAcct: builder.query({
            query: () => {
                return {
                    url: 'users/unfreeze-transactions'
                };
            }
        }),
        getBillersCat: builder.query({
            query: () => {
                return {
                    url: 'payment/billers/categories'
                };
            }
        }),
        getBillers: builder.query({
            query: (value) => {
                return {
                    url: `payment/billers?category=${value}`
                };
            }
        }),
        getBeneficiaries: builder.query({
            query: () => {
                return {
                    url: 'beneficiaries'
                };
            }
        }),
        getPhoneBeneficiaries: builder.query({
            query: () => {
                return {
                    url: 'phone-number-beneficiaries'
                };
            }
        }),
        getTx: builder.query({
            query: () => {
                return {
                    url:
                        'transactions/filter/?pageSearchIndex=0&numberOfRecords=10000'
                };
            }
        }),
        getSpecTx: builder.query({
            query: (id) => {
                return {
                    url: `transactions/filter/?pageSearchIndex=0&numberOfRecords=10000&transactionType=${id}`
                };
            }
        }),
        getDetails: builder.query({
            query: (value) => {
                return {
                    url: `payment/billers/details?billerCode=${value}`
                };
            }
        }),
        getChannelsTx: builder.query({
            query: () => {
                return {
                    url: 'transactions'
                };
            }
        }),
        getDisputeTypes: builder.query({
            query: () => {
                return {
                    url: 'dispute-management/get-complaint-types'
                };
            }
        }),
        getDisputeHistory: builder.query({
            query: () => {
                return {
                    url: 'dispute-management/records'
                };
            }
        }),
        getDecal: builder.query({
            query: () => {
                return {
                    url: 'qr-merchant/request-physical-qr'
                };
            }
        }),
        getDisputeCat: builder.query({
            query: (id) => {
                return {
                    url: `dispute-management/get-complaint-categories?caseType=${id}`
                };
            }
        }),
        getDisputeSub: builder.query({
            query: (value) => {
                return {
                    url: `dispute-management/get-complaint-sub-categories?caseType=${value?.type}&caseCategory=${value?.cat}`
                };
            }
        }),
        getState: builder.query({
            query: () => {
                return {
                    url: 'lga'
                };
            }
        }),
        getSurvey: builder.query({
            query: () => {
                return {
                    url: 'ellevate-profiling/questions'
                };
            }
        }),
        submitUpgrade: builder.query({
            query: () => {
                return {
                    url: 'account-upgrade/push-document-for-review'
                };
            }
        }),
        getSharepoint: builder.query({
            query: () => {
                return {
                    url: 'share-point-document'
                };
            }
        }),
        getAddVerificationStatus: builder.query({
            query: () => {
                return {
                    url: 'address-verification/status'
                };
            }
        }),
        getSharePoint: builder.query({
            query: () => {
                return {
                    url: 'share-point-document'
                };
            }
        }),
        getVninStatus: builder.query({
            query: () => {
                return {
                    url: 'document-verification/vNin/status'
                };
            },
            keepUnusedDataFor: 5
        })
    })
});

export const {
    useGetAccountsQuery,
    useLazyGetAccountsQuery,
    useGetBanksQuery,
    useGetProfileQuery,
    useLazyGetProfileQuery,
    useGetStaticQrQuery,
    useGetPrimaryAcctQuery,
    useLazyFreezeAcctQuery,
    useLazyUnfreezeAcctQuery,
    useBusinessCategoryQuery,
    useGetUserDataQuery,
    useLazyGetUserDataQuery,
    useGetLgaQuery,
    useGetAcctStatusQuery,
    useLazyGetAcctStatusQuery,
    useGetImageQuery,
    useGetBillersCatQuery,
    useGetBillersQuery,
    useGetDetailsQuery,
    useGetTxQuery,
    useGetBeneficiariesQuery,
    useGetPhoneBeneficiariesQuery,
    useGetSpecTxQuery,
    useGetChannelsTxQuery,
    useGetDisputeTypesQuery,
    useLazyGetDisputeCatQuery,
    useLazyGetDisputeSubQuery,
    useGetDisputeHistoryQuery,
    useLazyGetDecalQuery,
    useLazySubmitUpgradeQuery,
    useGetStateQuery,
    useGetSurveyQuery,
    useGetSharepointQuery,
    useGetAddVerificationStatusQuery,
    useGetSharePointQuery,
    useGetVninStatusQuery
} = queryApi;
