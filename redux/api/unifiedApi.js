import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://160.119.246.165/';

export const unifiedApi = createApi({
    reducerPath: 'unifiedApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.unitoken;
            headers.set('X-Client-Type', 'mobile');
            //   headers.set(
            //     'X-CSCAPI-KEY',
            //     'MUR1NXRHTEhhUnZMQktVc0Y0WHJYOG1lWHpzRVBUeXdHVjMwTFNESQ==',
            //   );
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        auth: builder.mutation({
            query: () => {
                return {
                    url: 'authorization-server-v1/oauth/token?grant_type=password&client_id=unified_sub_client&client_secret=unified_sub_client@5768&username=unified_admin&password=unified_test@1234',
                    method: 'post'
                };
            }
        }),
        createVC: builder.mutation({
            query: (body) => {
                return {
                    url: 'unifiedapis-sme/services/generatevcard2',
                    method: 'post',
                    body
                };
            },
            transformResponse: (response) => {
                const isError =
                    response?.hostHeaderInfo?.responseCode !== '000';
                return {
                    isError,
                    data: {
                        message: response?.hostHeaderInfo?.responseMessage
                    }
                };
            }
        }),
        fetchVC: builder.mutation({
            query: (body) => {
                return {
                    url: 'unifiedapis-sme/services/fetchvcard2',
                    method: 'post',
                    body
                };
            },
            transformResponse: (response) => {
                const isError =
                    response?.hostHeaderInfo?.responseCode !== '000';
                return {
                    isError,
                    data: {
                        message: response?.hostHeaderInfo?.responseMessage,
                        virtualCards: response?.virtualCards
                    }
                };
            }
        }),
        getVCBalance: builder.mutation({
            query: (body) => {
                return {
                    url: 'unifiedapis-sme/services/checkvcardbalance',
                    method: 'post',
                    body
                };
            },
            transformResponse: (response) => {
                const isError =
                    response?.hostHeaderInfo?.responseCode !== '000';
                return {
                    isError,
                    data: {
                        message: response?.hostHeaderInfo?.responseMessage,
                        balance: response?.balance
                    }
                };
            }
        }),
        blockVC: builder.mutation({
            query: (body) => {
                return {
                    url: 'unifiedapis-sme/services/blockvcard',
                    method: 'post',
                    body
                };
            },
            transformResponse: (response) => {
                const isError =
                    response?.hostHeaderInfo?.responseCode !== '000';
                return {
                    isError,
                    data: {
                        message: response?.hostHeaderInfo?.responseMessage
                    }
                };
            }
        }),
        unblockVC: builder.mutation({
            query: (body) => {
                return {
                    url: 'unifiedapis-sme/services/unblockvcard',
                    method: 'post',
                    body
                };
            },
            transformResponse: (response) => {
                const isError =
                    response?.hostHeaderInfo?.responseCode !== '000';
                return {
                    isError,
                    data: {
                        message: response?.hostHeaderInfo?.responseMessage
                    }
                };
            }
        }),
        closeVC: builder.mutation({
            query: (body) => {
                return {
                    url: 'unifiedapis-sme/services/closevcard',
                    method: 'post',
                    body
                };
            },
            transformResponse: (response) => {
                const isError =
                    response?.hostHeaderInfo?.responseCode !== '000';
                return {
                    isError,
                    data: {
                        message: response?.hostHeaderInfo?.responseMessage
                    }
                };
            }
        }),
        fundVC: builder.mutation({
            query: (body) => {
                return {
                    url: 'unifiedapis-sme/services/fundvcard',
                    method: 'post',
                    body
                };
            },
            transformResponse: (response) => {
                const isError =
                    response?.hostHeaderInfo?.responseCode !== '000';
                return {
                    isError,
                    data: {
                        message: response?.hostHeaderInfo?.responseMessage
                    }
                };
            }
        }),
        defundVC: builder.mutation({
            query: (body) => {
                return {
                    url: 'unifiedapis-sme/services/defundvcard',
                    method: 'post',
                    body
                };
            },
            transformResponse: (response) => {
                const isError =
                    response?.hostHeaderInfo?.responseCode !== '000';
                return {
                    isError,
                    data: {
                        message: response?.hostHeaderInfo?.responseMessage
                    }
                };
            }
        })
    })
});

export const {
    useDefundVCMutation,
    useFundVCMutation,
    useFetchVCMutation,
    useCloseVCMutation,
    useBlockVCMutation,
    useUnblockVCMutation,
    useGetVCBalanceMutation,
    useCreateVCMutation,
    useAuthMutation
} = unifiedApi;
