import axios from 'axios';

let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoib0lCeVVGMXMiLCJ0b2tlblR5cGUiOiJBQ0NFU1MifSwiaWF0IjoxNjU5MDAzMTM5LCJleHAiOjE2NTkwODk1Mzl9.5TrWpNi5HWOSxqVEje3xdCbJnIzjI3MC8HgfJWrM2D4';
const axiosInstance = axios.create({
    baseURL: 'https://ellevate-app.herokuapp.com/',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
});

export default axiosInstance;
