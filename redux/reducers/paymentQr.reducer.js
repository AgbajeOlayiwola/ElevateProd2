import { accountNumber, paymentQrType, qrInfoType } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    paymentQr: [],
    paymmentQrErrorMessages: ''
};

const paymentQrReducer = (state = initialState, { type, payload }) => {
    //console.log(payload);÷ss
    switch (type) {
        case paymentQrType.PAYMENT_QR_START:
            return {
                ...state,
                isLoading: true,
                paymentQr: [],
                paymmentQrErrorMessages: ''
            };
        case paymentQrType.PAYMENT_QR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                paymentQr: payload
            };
        case paymentQrType.PAYMENT_QR_ERROR:
            return {
                ...state,
                isLoading: false,
                paymmentQrErrorMessages: payload
            };

        default:
            return state;
    }
};

export default paymentQrReducer;
