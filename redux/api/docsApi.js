import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react';

// const baseUrl = 'https://dpmfb-prod-app-srvr-01.azurewebsites.net/api/v1';
const baseUrl = 'https://eidev.ecobank.com:7505/';
if (typeof window !== 'undefined') {
    const affiliate = localStorage.getItem('affiliateCode');
}

export const docsApi = createApi({
    reducerPath: 'docsApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().profile?.token;
            // headers.set('Accept', 'application/json');
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
                    url:
                        'smeapp-document-verification-service/facematch-with-bvn',
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
                    method: 'post',
                    body
                };
            }
        })
    })
});

export const {
    useFaceMatchMutation,
    useGetCACMutation,
    useProfileSetUpRegisteredBusinessMutation
} = docsApi;
