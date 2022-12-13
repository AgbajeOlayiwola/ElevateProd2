/* eslint-disable react/display-name */
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../redux/helper/apiClient';
import apiRoutes from '../../redux/helper/apiRoutes';
import { getCookie } from 'cookies-next';
import { loadAccountPrimary, logoutAction } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
const withAuth = (WrappedComponent) => {
    return (props) => {
        const dispatch = useDispatch();
        const Router = useRouter();
        const [accessGranted, setAccessGranted] = useState(false);
        const [accountDone, setAccountDone] = useState('');
        const [errorMMes, setErrorMes] = useState('');
        const { accountPrimary, accountPrimaryError } = useSelector(
            (state) => state.accountPrimaryReducer
        );

        useEffect(() => {
            dispatch(loadAccountPrimary());

            if (accountPrimary) {
                setAccessGranted(true);
            } else {
                dispatch(logoutAction());
                if (!localStorage.getItem('user')) {
                    Router.replace('../Auth/Login');
                }

                setAccessGranted(false);
            }
            if (accountPrimary === null) {
                dispatch(logoutAction());
                if (!localStorage.getItem('user')) {
                    Router.replace('../Auth/Login');
                }

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
