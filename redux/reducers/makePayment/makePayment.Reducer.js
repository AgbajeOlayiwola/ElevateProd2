import { makePayment } from '../../types/actionTypes';

const initialState = {
    senderDetails: {},
    BeneficiaryDetail: {
        fname: '',
        bankName: '',
        accountNo: ''
    },
    amount: '',
    narration: ''
};

const makePaymentReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case makePayment.SINGLE_TRANSFER:
            return {
                ...state,
                payload
            };
    }
};
