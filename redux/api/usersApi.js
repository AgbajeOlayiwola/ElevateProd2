import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react';
import { RootState } from 'store';

// const baseUrl = 'https://dpmfb-prod-app-srvr-01.azurewebsites.net/api/v1';
const baseUrl = 'https://eidev.ecobank.com:7505/smeapp-users/v1/api/users/';
if (typeof window !== 'undefined') {
    const affiliate = localStorage.getItem('affiliateCode');
}

export const usersApi = createApi({
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
        updatePhone: builder.mutation({
            query: (body) => {
                return {
                    url: 'update-phone',
                    method: 'post',
                    body
                };
            }
        })
    })
});

export const { useUpdatePhoneMutation } = usersApi;
