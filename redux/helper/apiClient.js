import axios from 'axios';
import { getCookie } from 'cookies-next';
var loginToken = '';
var cookieToken;
var options = 1 / 24;

loginToken = getCookie('Token', options);
if (loginToken === null) {
    cookieToken = getCookie('Token', options);
} else {
    cookieToken = getCookie('Token', options);
}

const axiosInstance = axios.create({
    baseURL: 'https://mysmeapp.ecobank.com:8443'
    // baseURL: '//https://mysmeapp.ecobank.com:8443> /'
});

export default axiosInstance;
