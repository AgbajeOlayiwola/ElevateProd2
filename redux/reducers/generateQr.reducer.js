import {
    accountNumber,
    generateQrType,
    paymentQrType,
    qrInfoType
} from '../types/actionTypes';

const initialState = {
    isLoading: false,
    generateQrCodeSuccess: [],
    generateQrCodeError: ''
};

const generateQrReducer = (state = initialState, { type, payload }) => {
    //console.log(payload);÷ss
    switch (type) {
        case generateQrType.GENERATE_QR_START:
            return {
                ...state,
                isLoading: true,
                generateQrCodeSuccess: [],
                generateQrCodeError: ''
            };
        case generateQrType.GENERATE_QR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                generateQrCodeSuccess: payload
            };
        case generateQrType.GENERATE_QR_ERROR:
            return {
                ...state,
                isLoading: false,
                generateQrCodeError: payload
            };

        default:
            return state;
    }
};

export default generateQrReducer;