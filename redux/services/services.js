import apiClient from '../helper/apiClient';
class Services {
    getAllCountries = () =>
        apiClient().get('https://ellevate-app.herokuapp.com/countries');
    getAllLanguages = () =>
        apiClient().get('https://ellevate-app.herokuapp.com/languages');
    createAccount = () =>
        apiClient().post('https://ellevate-app.herokuapp.com/auth/register');
}

export default new Services();
