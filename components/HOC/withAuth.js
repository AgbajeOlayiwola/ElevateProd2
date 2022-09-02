/* eslint-disable react/display-name */
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
const withAuth = (WrappedComponent) => {
    return (props) => {
        const Router = useRouter();
        const [accessGranted, setAccessGranted] = useState(false);

        useEffect(() => {
            if (localStorage.getItem('user')) {
                setAccessGranted(true);
            } else {
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
