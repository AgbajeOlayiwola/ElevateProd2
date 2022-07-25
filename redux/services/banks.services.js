import apiClient from '../helper/apiClient';
class bankService {
    getAllBanks = () =>
        apiClient().get(
            'https://ellevate-app.herokuapp.com/banks?affiliateCode=ENG'
        );
}

export default new bankService();
