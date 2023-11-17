import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const baseUrl = 'https://eidev.ecobank.com:7505/';
// const baseUrl = 'https://eidev.ecobank.com:7505/smeapp-register/';

export const logisticsApi = createApi({
    reducerPath: 'logisticsApi',
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
    endpoints: (builder) => ({
        getLogisticsProviders: builder.query({
            query: () => {
                return {
                    url: 'smeapp-logistics-providers-service/providers/list'
                };
            }
        }),
        getStations: builder.query({
            query: () => {
                return {
                    url: 'smeapp-logistics-providers-service/get/stations'
                };
            }
        }),
        enableLogistic: builder.mutation({
            query: (body) => {
                return {
                    url: 'smeapp-enable-logistic-service/assign/logistic-provider',
                    method: 'post',
                    body
                };
            }
        }),
        disableLogistic: builder.mutation({
            query: (body) => {
                return {
                    url: 'smeapp-disable-logistic-service/unassign/logistic-provider',
                    method: 'post',
                    body
                };
            }
        })
    })
});

export const {
    useGetLogisticsProvidersQuery,
    useGetStationsQuery,
    useEnableLogisticMutation,
    useDisableLogisticMutation
} = logisticsApi;
