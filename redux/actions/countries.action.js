import Axios from 'axios';
import AuthTypes from '../types/auth.types';
import { PATH } from '../apiconfig/axiosconfig';

export function createUser(countries) {
    return {
        type: API,
        payload: {
            url: 'https://api.myjson.com/bins/19dtxc',
            method: 'GET',
            data: null,
            onSuccess: setArticleDetails,
            onFailure: () => {
                console.log('Error occured loading articles');
            },
            label: FETCH_ARTICLE_DETAILS
        }
    };
}
