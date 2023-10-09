import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react';
import { RootState } from 'store';

// const baseUrl = 'https://dpmfb-prod-app-srvr-01.azurewebsites.net/api/v1';
const baseUrl =
    'https://eidev.ecobank.com:7505/smeapp-document-verification-service';
if (typeof window !== 'undefined') {
    const affiliate = localStorage.getItem('affiliateCode');
}

export const docsApi = createApi({
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
                    url: 'cac-verification',
                    method: 'post'
                };
            }
        })
    })
});

export const { useFaceMatchMutation, useGetCACMutation } = docsApi;
