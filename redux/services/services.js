import apiClient from '../helper/apiClient';
import axios from '../helper/apiClient';
class Services {
    getAllCountries = () =>
        axios.get('https://ellevate-app.herokuapp.com/countries');
    getAllLanguages = () =>
        axios.get('https://ellevate-app.herokuapp.com/languages');
    createAccount = (postData) =>
        axios.post(
            'https://ellevate-app.herokuapp.com/auth/register',
            postData
        );
    loginUser = (loginData) =>
        axios.post('https://ellevate-app.herokuapp.com/auth/login', loginData);
}

export default new Services();
