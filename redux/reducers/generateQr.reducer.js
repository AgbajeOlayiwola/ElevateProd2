import { generateQrType } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    generateQrCodeSuccess: null,
    generateQrCodeError: null
};

const generateQrReducer = (state = initialState, { type, payload }) => {
    //console.log(payload);÷ss
    switch (type) {
        case generateQrType.GENERATE_QR_START:
            return {
                ...state,
                isLoading: true,
                generateQrCodeSuccess: null,
                generateQrCodeError: null
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
