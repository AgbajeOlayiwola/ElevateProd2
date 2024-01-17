import { createSlice } from '@reduxjs/toolkit';

// Slice
const createInvoiceSlice = createSlice( {
  name: 'onboarding data',
  initialState: {
    Stage: 1, // default page stage to show on page load
    InventoryDetails: {
      invoiceTitle: '',
      invoiceDate: '',
      invoiceDueDate: '',
      invoiceDescription: '',
      businessName: '',
      businessLogo: '',
      businessEmailAddress: '',
      businessPhoneNumber: '',
      useExistingBusiness: false,
      showBusinessAccount: false
    },
    UserPrivacyInfoDetail: {
      userPassword: '',
      userConfirmPassword: '',
      country: '',
      state: '',
      subScribeToNewLetter: false,
      subScribeOtherProducts: false,
    },
    ReviewDetails: {},
  },

  reducers: {
    stage: ( state, action ) => {
      state.Stage = action.payload;
    },
    userInventoryDetails: ( state, action ) => {
      state.InventoryDetails = action.payload;
    },
    userPrivacyInfo: ( state, action ) => {
      state.UserPrivacyInfoDetail = action.payload;
    },
    userReviewInfo: ( state, action ) => {
      state.ReviewDetails = action.payload;
    },
  },
} );

// Actions
export const { stage, userInventoryDetails, userPrivacyInfo, userReviewInfo } =
  createInvoiceSlice.actions;
export default createInvoiceSlice;
