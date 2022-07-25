import bankService from '../../services/banks.services';

import {
    bankLoadSuccess,
    bankLoadError,
    bankLoadStart
} from '../../actions/actions';

export const loadbankAsync = () => (dispatch) => {
    dispatch(bankLoadStart());
    bankService
        .getAllBanks()
        .then((response) => dispatch(bankLoadSuccess(response.data.data)))
        .catch((error) => dispatch(bankLoadError(error.message)));
};
