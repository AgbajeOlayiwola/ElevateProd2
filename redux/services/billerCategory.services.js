import apiClient from '../helper/apiClient';
class billerCategoryServices {
    getAllBillerCategory = () =>
        apiClient().get(
            'https://ellevate-app.herokuapp.com/billers/category?affiliateCode=ENG'
        );
}

export default new billerCategoryServices();
