import axios from 'axios';
import AuthTypes from '../types/auth.types';
import { PATH } from '../apiconfig/axiosconfig';

// Signup Action creator
export function createUser(userDetails) {
    // console.log(userDetails);

    return async (dispatch) => {
        const response = await axios.post(`${PATH}user`, userDetails);
        if (response.status !== 201) {
            const err = await response;
            console.log('failure: ');
            throw new Error(err);
        }
        await dispatch({
            type: AuthTypes.CREATE_ACCOUNT,
            payload: response.data
        });
        const res = await response;
        console.log('RESP: ', res);
        console.log('STATUS: ', res.status);
    };
}
