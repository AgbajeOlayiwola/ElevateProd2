import { qrMerchantInfo_Type } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    getQrMerchnatInfoSuccess: null,
    getQrMerchnatInfoErrorMessage: null
};

const getQrMerchantInfoReducer = (state = initialState, { type, payload }) => {
    //console.log(payload);÷ss
    switch (type) {
        case qrMerchantInfo_Type.GET_QR_MRCHANTINFO_TYPES_START:
            return {
                ...state,
                isLoading: true,
                getQrMerchnatInfoSuccess: null,
                getQrMerchnatInfoErrorMessage: null
            };
        case qrMerchantInfo_Type.GET_QR_MRCHANTINFO_TYPES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                getQrMerchnatInfoSuccess: payload
            };
        case qrMerchantInfo_Type.GET_QR_MRCHANTINFO_TYPES_ERROR:
            return {
                ...state,
                isLoading: false,
                getQrMerchnatInfoErrorMessage: payload
            };

        default:
            return state;
    }
};

export default getQrMerchantInfoReducer;
