import axios from 'axios';

export const apiCallInit = (otherHeaders) =>
    axios.create({
        baseURL: '',
        headers: {
            'Content-Type': 'application/json',
            ...otherHeaders
        },
        // timeout: 5000,
        timeoutErrorMessage: 'SMILE-ID Time out Exceeded'
    });
