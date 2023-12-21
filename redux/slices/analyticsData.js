import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const analyticsDataSlice = createSlice({
    name: 'analyticsData',
    initialState,
    reducers: {
        setanalyticsData: (state, { payload }) => {
            return payload;
        },
        clearanalyticsData: () => {
            return '';
        }
    }
});

const { reducer, actions } = analyticsDataSlice;
export const { setanalyticsData, clearanalyticsData } = actions;
export default reducer;
