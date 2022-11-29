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
    baseURL: 'http://137.184.64.30'
});

export default axiosInstance;
