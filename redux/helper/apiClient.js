import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://ellevate-app.herokuapp.com/",
    responseType: 'json',
    // headers: {
    //     headerType: 'example header type',
    //     Authorization: `Bearer ${token}`
    // }
});

export default axiosInstance;
