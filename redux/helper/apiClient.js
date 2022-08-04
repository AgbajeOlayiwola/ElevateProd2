import axios from 'axios';

let loginToken = '';
let token;
if (typeof window !== 'undefined') {
    loginToken = window.localStorage.getItem('user');
    if (loginToken === null) {
        token = '';
    } else {
        token = JSON.parse(loginToken).data.token;
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
