import axios from 'axios';
var loginToken = '';
var token;

if (typeof window !== 'undefined') {
    loginToken = window.localStorage.getItem('token');
    if (loginToken === null) {
        token = JSON.parse(loginToken);
    } else {
        token = JSON.parse(loginToken);
    }
}

const axiosInstance = axios.create({
    baseURL: 'https://ellevate-app.herokuapp.com/',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
});

export default axiosInstance;
