import apiClient from '../helper/apiClient';
class Services {
    getAllCountries = () =>
        apiClient().get('https://ellevate-app.herokuapp.com/countries');
    getAllLanguages = () =>
        apiClient().get('https://ellevate-app.herokuapp.com/languages');
    createAccount = (postData) =>
        apiClient().post(
            'https://ellevate-app.herokuapp.com/auth/register',
            postData
        );
}

export default new Services();
