import { createSlice } from '@reduxjs/toolkit';
const initialState = 'en';
const dynamicQrDataSlice = createSlice({
    name: 'dynamicQrData',
    initialState,
    reducers: {
        setDynamicQrData: (state, { payload }) => {
            return payload;
        },
        clearDynamicQrData: () => {
            return '';
        }
    }
});

const { reducer, actions } = dynamicQrDataSlice;
export const { setDynamicQrData, clearDynamicQrData } = actions;
export default reducer;
