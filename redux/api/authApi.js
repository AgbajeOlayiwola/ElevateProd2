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
        }),
        loanScoring: builder.mutation({
            query: (body) => {
                return {
                    url: 'loan-scoring',
                    method: 'post',
                    body
                };
            }
        }),
        loanRepaymnt: builder.mutation({
            query: (body) => {
                return {
                    url: 'loan-repayment',
                    method: 'post',
                    body
                };
            }
        }),
        loanBooking: builder.mutation({
            query: (body) => {
                return {
                    url: 'loan-booking',
                    method: 'post',
                    body
                };
            }
        }),
        loanBalance: builder.mutation({
            query: (body) => {
                return {
                    url: 'loan-balance',
                    method: 'post',
                    body
                };
            }
        }),
        loanRepayment: builder.mutation({
            query: (body) => {
                return {
                    url: 'loan-repayment',
                    method: 'post',
                    body
                };
            }
        }),
        freezeAcct: builder.mutation({
            query: () => {
                return {
                    url: 'user-freeze-transactions',
                    method: 'post',
                    body: {}
                };
            }
        }),
        unfreezeAcct: builder.mutation({
            query: () => {
                return {
                    url: 'users-unfreeze-transactions',
                    method: 'post',
                    body: {}
                };
            }
        }),
        creatStorefront: builder.mutation({
            query: (body) => {
                return {
                    url: 'create-storefront',
                    method: 'post',
                    body
                };
            }
        }),
        deletStorefront: builder.mutation({
            query: (body) => {
                return {
                    url: 'delete-storefront',
                    method: 'post',
                    body
                };
            }
        }),
        deletAllStorefront: builder.mutation({
            query: (body) => {
                return {
                    url: 'delete-all-storefronts',
                    method: 'post',
                    body
                };
            }
        }),
        getStoreFront: builder.mutation({
            query: (body) => {
                return {
                    url: 'get-store',
                    method: 'post',
                    body
                };
            }
        }),
        getAllSToreFront: builder.mutation({
            query: () => {
                return {
                    url: 'get-all-storefronts',
                    method: 'post',
                    body: {}
                };
            }
        }),
        makeDfaultStoreFront: builder.mutation({
            query: (body) => {
                return {
                    url: 'default-storefront',
                    method: 'post',
                    body
                };
            }
        }),
        updateStoreFront: builder.mutation({
            query: (body) => {
                return {
                    url: 'update-storefront',
                    method: 'post',
                    body
                };
            }
        }),
        makeEnable: builder.mutation({
            query: (body) => {
                return {
                    url: 'make-enable',
                    method: 'post',
                    body
                };
            }
        }),
        updateFaqs: builder.mutation({
            query: (body) => {
                return {
                    url: 'update-faqs',
                    method: 'post',
                    body
                };
            }
        }),
        getFaqs: builder.mutation({
            query: () => {
                return {
                    url: 'get-faqs',
                    method: 'post',
                    body: {}
                };
            }
        }),
        createeInventory: builder.mutation({
            query: (body) => {
                return {
                    url: 'create-inventory',
                    method: 'post',
                    body
                };
            }
        }),
        updateInventory: builder.mutation({
            query: (body) => {
                return {
                    url: 'update-inventory',
                    method: 'post',
                    body
                };
            }
        }),
        getInventoriesByCategory: builder.mutation({
            query: (body) => {
                return {
                    url: 'inventories-by-category',
                    method: 'post',
                    body
                };
            }
        }),
        getInventoriesByCollection: builder.mutation({
            query: (body) => {
                return {
                    url: 'inventories-by-collection',
                    method: 'post',
                    body
                };
            }
        }),
        getAllInventoriesById: builder.mutation({
            query: (body) => {
                return {
                    url: 'inventories-by-storeid',
                    method: 'post',
                    body
                };
            }
        }),
        deleteAllInventories: builder.mutation({
            query: (body) => {
                return {
                    url: 'delete-all-inventories',
                    method: 'post',
                    body
                };
            }
        }),
        deleteByInventoryid: builder.mutation({
            query: (body) => {
                return {
                    url: 'delete-by-inventoryid',
                    method: 'post',
                    body
                };
            }
        }),
        getInventory: builder.mutation({
            query: (body) => {
                return {
                    url: 'get-inventory',
                    method: 'post',
                    body
                };
            }
        }),

        getAllCollections: builder.mutation({
            query: (body) => {
                return {
                    url: 'get-all-collections',
                    method: 'post',
                    body
                };
            }
        }),
        getAllCategory: builder.mutation({
            query: (body) => {
                return {
                    url: 'get-all-categories',
                    method: 'post',
                    body
                };
            }
        }),
        createCategory: builder.mutation({
            query: (body) => {
                return {
                    url: 'create-category',
                    method: 'post',
                    body
                };
            }
        }),
        createCollection: builder.mutation({
            query: (body) => {
                return {
                    url: 'create-collection',
                    method: 'post',
                    body
                };
            }
        }),
        deleteAllCollection: builder.mutation({
            query: (body) => {
                return {
                    url: 'delete-all-collections',
                    method: 'post',
                    body
                };
            }
        }),
        deleteCollection: builder.mutation({
            query: (body) => {
                return {
                    url: 'delete-collection',
                    method: 'post',
                    body
                };
            }
        }),
        getCollection: builder.mutation({
            query: (body) => {
                return {
                    url: 'get-collection',
                    method: 'post',
                    body
                };
            }
        }),
        updateCollction: builder.mutation({
            query: (body) => {
                return {
                    url: 'update-collection',
                    method: 'post',
                    body
                };
            }
        }),

        deleteAllCatgories: builder.mutation({
            query: (body) => {
                return {
                    url: 'delete-all-categories',
                    method: 'post',
                    body
                };
            }
        }),
        deleteCategory: builder.mutation({
            query: (body) => {
                return {
                    url: 'delete-category',
                    method: 'post',
                    body
                };
            }
        }),
        getCategory: builder.mutation({
            query: (body) => {
                return {
                    url: 'get-category',
                    method: 'post',
                    body
                };
            }
        }),
        updateCategory: builder.mutation({
            query: (body) => {
                return {
                    url: 'update-category',
                    method: 'post',
                    body
                };
            }
        }),
        verifyAccount: builder.mutation({
            query: (body) => {
                return {
                    url: 'account-inquiry',
                    method: 'post',
                    body
                };
            }
        }),
        addAccount: builder.mutation({
            query: (body) => {
                return {
                    url: 'add-account',
                    method: 'post',
                    body
                };
            }
        }),
        getId: builder.mutation({
            query: (body) => {
                return {
                    url: 'get-customerid',
                    method: 'post',
                    body
                };
            }
        }),
        setPrimaryAcct: builder.mutation({
            query: (body) => {
                return {
                    url: 'set-primary-account',
                    method: 'post',
                    body
                };
            }
        }),
        storelinkGetStore: builder.mutation({
            query: (body) => {
                return {
                    url: 'storelink-get-store',
                    method: 'post',
                    body
                };
            }
        }),
        addCart: builder.mutation({
            query: (body) => {
                return {
                    url: 'add-cart',
                    method: 'post',
                    body
                };
            }
        }),
        storefrontAnalyticsSummary: builder.mutation({
            query: () => {
                return {
                    url: 'storefront-analytics-summary',
                    method: 'post',
                    body: {}
                };
            }
        }),
        logDisputeCase: builder.mutation({
            query: (body) => {
                return {
                    url: 'log-dispute-case',
                    method: 'post',
                    body
                };
            }
        }),

        viewOrder: builder.mutation({
            query: (body) => {
                return {
                    url: 'view-order',
                    method: 'post',
                    body
                };
            }
        }),

        createOrder: builder.mutation({
            query: (body) => {
                return {
                    url: 'create-order',
                    method: 'post',
                    body
                };
            }
        }),
        viewOrderByStatus: builder.mutation({
            query: (body) => {
                return {
                    url: 'view-orders-by-status',
                    method: 'post',
                    body
                };
            }
        }),
        shipOrder: builder.mutation({
            query: (body) => {
                return {
                    url: 'ship-order',
                    method: 'post',
                    body
                };
            }
        }),
        logisticsnableProviders: builder.mutation({
            query: (body) => {
                return {
                    url: 'logistics-enable-provider',
                    method: 'post',
                    body
                };
            }
        }),
        getTxBeneficiary: builder.mutation({
            query: () => {
                return {
                    url: 'get-user-beneficiary',
                    method: 'post',
                    body: {}
                };
            }
        }),
        deleteTxBeneficiary: builder.mutation({
            query: (body) => {
                return {
                    url: 'delete-user-beneficiary',
                    method: 'post',
                    body
                };
            }
        }),
        createTxBeneficiary: builder.mutation({
            query: (body) => {
                return {
                    url: 'create-user-beneficiary',
                    method: 'post',
                    body
                };
            }
        }),
        getPhoneBeneficiary: builder.mutation({
            query: () => {
                return {
                    url: 'get-phone-beneficiary',
                    method: 'post',
                    body: {}
                };
            }
        }),
        deletePhoneBeneficiary: builder.mutation({
            query: (body) => {
                return {
                    url: 'delete-phone-beneficiary',
                    method: 'post',
                    body
                };
            }
        }),
        createPhoneBeneficiary: builder.mutation({
            query: (body) => {
                return {
                    url: 'create-phone-beneficiary',
                    method: 'post',
                    body
                };
            }
        }),
        getLoans: builder.mutation({
            query: (body) => {
                return {
                    url: 'get-loans',
                    method: 'post',
                    body: {}
                };
            }
        }),
        logisticsDisableProvider: builder.mutation({
            query: (body) => {
                return {
                    url: 'logistics-disable-provider',
                    method: 'post',
                    body: {}
                };
            }
        }),
        logisticsEnableProvider: builder.mutation({
            query: (body) => {
                return {
                    url: 'logistics-enable-provider',
                    method: 'post',
                    body: {}
                };
            }
        })
        //         logistics-disable-provider
        // logistics-enable-provider
        // logistics-gig-capture-shipment
        // logistics-gig-shipment-price
        // logistics-gig-stations
        // logistics-providers
    })
});

export const {
    useLogisticsEnableProviderMutation,
    useLogisticsDisableProviderMutation,
    useDeleteByInventoryidMutation,
    useCreateOrderMutation,
    useCreatePhoneBeneficiaryMutation,
    useDeletePhoneBeneficiaryMutation,
    useGetPhoneBeneficiaryMutation,
    useDeleteTxBeneficiaryMutation,
    useGetTxBeneficiaryMutation,
    useCreateTxBeneficiaryMutation,
    useDeleteCategoryMutation,
    useDeleteCollectionMutation,
    useLogisticsnableProvidersMutation,
    useShipOrderMutation,
    useViewOrderByStatusMutation,
    useViewOrderMutation,
    useLogDisputeCaseMutation,
    useUpdateInventoryMutation,
    useUpdateFaqsMutation,
    useStorefrontAnalyticsSummaryMutation,
    useAddCartMutation,
    useStorelinkGetStoreMutation,
    useSetPrimaryAcctMutation,
    useGetIdMutation,
    useVerifyAccountMutation,
    useAddAccountMutation,
    useGetAllInventoriesByIdMutation,
    useCreateCategoryMutation,
    useCreateCollectionMutation,
    useGetAllCategoryMutation,
    useGetAllCollectionsMutation,
    useCreateeInventoryMutation,
    useUpdateStoreFrontMutation,
    useDeletStorefrontMutation,
    useDeletAllStorefrontMutation,
    useMakeEnableMutation,
    useGetAllSToreFrontMutation,
    useGetStoreFrontMutation,
    useCreatStorefrontMutation,
    useFreezeAcctMutation,
    useUnfreezeAcctMutation,
    useLoanScoringMutation,
    useLoanRepaymntMutation,
    useLoanBalanceMutation,
    useLoanBookingMutation,
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
