import { otp, otpType } from '../types/actionTypes';

const initialState = {
    Loading: false,
    otpActData: null,
    otpErrorMessage: null
};
// useEffect(() => {
//     if (bvnError) {
//         setPage(page - 1);
//         setErrorM(bvnError);
//         setErrorI(bvnErrorI);
//     } else if (!otpErrorMessage) {
//         setPage(page + 1);
//     }
// }, [otpErrorMessage, bvnError]);

const otpReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case otpType.OTP_LOAD_START:
            return {
                ...state,
                Loading: true,
                otpActData: null,
                otpErrorMessage: null
            };
        case otpType.OTP_LOAD_SUCCESS:
            return {
                ...state,
                Loading: true,
                otpActData: payload,
                otpErrorMessage: null
            };
        case otpType.OTP_LOAD_ERROR:
            return {
                ...state,
                Loading: false,
                otpActData: null,
                otpErrorMessage: payload
            };

        default:
            return state;
    }
};

export default otpReducer;
