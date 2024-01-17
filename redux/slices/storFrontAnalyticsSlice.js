import { createSlice } from '@reduxjs/toolkit';
const initialState = {};
const storefrontAnalyticsData = createSlice({
    name: 'storefrontAnalytics',
    initialState,
    reducers: {
        setStorefrontAnalytics: (state, { payload }) => {
            return payload;
        },
        clearStorefrontAnalytics: () => {
            return {};
        }
    }
});

const { reducer, actions } = storefrontAnalyticsData;
export const { setStorefrontAnalytics, clearStorefrontAnalytics } = actions;
export default reducer;
