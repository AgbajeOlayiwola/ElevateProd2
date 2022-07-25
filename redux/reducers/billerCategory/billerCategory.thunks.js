import billerCategoryServices from '../../services/billerCategory.services';

import {
    billerCategoryLoadSuccess,
    billerCategoryLoadError,
    billerCategoryLoadStart
} from '../../actions/actions';

export const loadbillerCategoryAsync = () => (dispatch) => {
    dispatch(billerCategoryLoadStart());
    billerCategoryServices
        .getAllBillerCategory()
        .then((response) =>
            dispatch(billerCategoryLoadSuccess(response.data.data))
        )
        .catch((error) => dispatch(billerCategoryLoadError(error.message)));
};
