import Axios from 'axios';
import AuthTypes from '../types/auth.types';
import { PATH } from '../apiconfig/axiosconfig';

export function createUser(countries) {
    return async (dispatch) => {
        try {
            const response = await Axios.get(`${PATH}countries`).then(
                ({ data }) => {
                    dispatch(setArticleDetails(data));
                }
            );
        } catch (error) {
            console.error(error);
        }
    };
}
