/* eslint-disable react/display-name */
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../redux/helper/apiClient';
import apiRoutes from '../../redux/helper/apiRoutes';
import { getCookie } from 'cookies-next';
const withAuth = (WrappedComponent) => {
    return (props) => {
        const Router = useRouter();
        const [accessGranted, setAccessGranted] = useState(false);
        const [accountDone, setAccountDone] = useState('');
        const [errorMMes, setErrorMes] = useState('');

        useEffect(() => {
            const cookie = getCookie('cookieToken');
            axiosInstance
                .get(`https://testvate.live${apiRoutes.accountStatus}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${cookie}`
                    }
                })
                .then((response) => {
                    console.log('Accoutn Status', response);
                    setAccountDone(response.data.data);
                })
                .catch((error) => {
                    //console.log(error.response.data.message);
                    setErrorMes(error.response.data.message);
                });
            if (localStorage.getItem('user')) {
                setAccessGranted(true);
            } else {
                Router.replace('../Auth/Login');
                setAccessGranted(false);
            }
            if (errorMMes) {
                Router.replace('../Auth/Login');
                setAccessGranted(false);
            }
        }, []);

        if (accessGranted) {
            return <WrappedComponent {...props} />;
        } else {
            null;
        }
    };
};

export default withAuth;
