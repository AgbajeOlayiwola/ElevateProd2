/* eslint-disable react/display-name */
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Idle from 'react-idle';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const dispatch = useDispatch();
        const Router = useRouter();
        const [accessGranted, setAccessGranted] = useState(false);
        const [accountDone, setAccountDone] = useState('');
        const [errorMMes, setErrorMes] = useState('');
        const [cornifyLoaded, setCornifyLoaded] = useState('');
        const router = useRouter();

        const preloadCornify = () => {
            dispatch(logoutAction());
            if (!localStorage?.getItem('user')) {
                router.replace('../Auth/Login');
            }
        };

        useEffect(() => {
            if (localStorage?.getItem('user')) {
                setAccessGranted(true);
            } else {
                Router.replace('../Auth/Login');
                setAccessGranted(false);
            }

            // Cleanup function
            return () => {
                // Perform any cleanup actions here (if needed).
                // For example, you could reset the state to its initial value:
                setAccessGranted(false);
            };
        }, []);

        if (accessGranted) {
            return (
                <>
                    <Idle
                        timeout={300000}
                        onChange={({ idle }) => {
                            if (idle) {
                                preloadCornify();
                            }
                        }}
                    />
                    <WrappedComponent {...props} />
                </>
            );
        } else {
            null;
        }
    };
};
//test

export default withAuth;
