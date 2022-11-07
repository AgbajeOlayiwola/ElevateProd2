import { deleteAirtimeBeneficiaries } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    deleteAirtimeBeneficiaries: null,
    errorMessagedeleteAirtimeBeneficiaries: null
};

const deleteAirtimeBeneficiariesReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case deleteAirtimeBeneficiaries.DELETEAIRTIMEBENEFICIARIES_LOAD_START:
            return {
                ...state,
                isLoading: true,
                deleteAirtimeBeneficiaries: null,
                errorMessagedeleteAirtimeBeneficiaries: null
            };
        case deleteAirtimeBeneficiaries.DELETEAIRTIMEBENEFICIARIES_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                deleteAirtimeBeneficiaries: payload
            };
        case deleteAirtimeBeneficiaries.DELETEAIRTIMEBENEFICIARIES_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessagedeleteAirtimeBeneficiaries: payload
            };

        default:
            return state;
    }
};

export default deleteAirtimeBeneficiariesReducer;
