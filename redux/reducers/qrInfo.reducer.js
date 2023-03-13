import { accountNumber, qrInfoType } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    qrInfo: [],
    qrInfoErrorMessages: ''
};

const qrInfoReducer = (state = initialState, { type, payload }) => {
    //console.log(payload);÷ss
    switch (type) {
        case qrInfoType.QR_INFO_START:
            return {
                ...state,
                isLoading: true,
                qrInfo: [],
                qrInfoErrorMessages: ''
            };
        case qrInfoType.QR_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                qrInfo: payload
            };
        case qrInfoType.QR_INFO_ERROR:
            return {
                ...state,
                isLoading: false,
                qrInfoErrorMessages: payload
            };

        default:
            return state;
    }
};

export default qrInfoReducer;
