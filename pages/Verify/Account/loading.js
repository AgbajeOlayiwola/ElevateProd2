import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import StepFiveSuccessPage from '../../../components/layout/NotRegisteredForms/StepFiveSucceesPage';
import FailedModal from '../../../components/ReusableComponents/FailedModal';
import axiosInstance from '../../../redux/helper/apiClient';
import apiRoutes from '../../../redux/helper/apiRoutes';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    accountStatusData,
    CompProfile,
    getNewUserAccountDetails,
    newAccountStatusData
} from '../../../redux/actions/actions';
import { IoMdGift } from 'react-icons/io';

const AccountLoading = () => {
    const [accountInfo, setAccountInfo] = useState('');
    const [profileCont, setProfileCont] = useState([]);
    const [errorT, setError] = useState();

    const router = useRouter();

    // const { isLoading, profile, errorMessage } = useSelector(
    //     (state) => state.profile
    // );
    const dispatch = useDispatch();

    // console.log(profile);
    const { accountStatus, errorMessages } = useSelector(
        (state) => state.accountStatusReducer
    );
    // useEffect(() => {
    // const accountData = {
    //     affiliateCode: 'ENG',
    //     ccy: 'NGN'
    // };
    // dispatch(createNewUserAccount(accountData));
    // }, []);
    // console.log(accountStatus);
    useEffect(() => {
        dispatch(newAccountStatusData());
    }, []);

    console.log(errorMessages);
    const newUserAccountt = () => {
        console.log(accountStatus);
        if (!errorMessages) {
            if (accountStatus.message === 'Try Again') {
                setTimeout(() => {
                    dispatch(newAccountStatusData());
                }, 1000);
            } else if (accountStatus.message === 'SUCCESS') {
                router.push('/Succes');
            }
        }
    };
    useEffect(() => {
        if (errorMessages) {
            setError(errorMessages);
        } else {
            newUserAccountt();
        }
    }, [errorMessages, accountStatus]);

    return (
        <>
            <div className={styles.cover}>
                <div className={styles.covInn}>
                    <div className={styles.load}>
                        {errorT ? (
                            <div className={styles.error}>
                                <h2 className={styles.error}>{errorT}</h2>
                                <br />
                                <h2> kindly reload</h2>
                            </div>
                        ) : (
                            <svg
                                width="59"
                                height="15"
                                viewBox="0 0 59 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={styles.svg}
                            >
                                <circle
                                    cx="7.5"
                                    cy="7.25684"
                                    r="7"
                                    fill="#6CCF00"
                                />
                                <circle
                                    cx="29.5"
                                    cy="7.25684"
                                    r="7"
                                    fill="#6CCF00"
                                />
                                <circle
                                    cx="51.5"
                                    cy="7.25684"
                                    r="7"
                                    fill="#6CCF00"
                                />
                            </svg>
                        )}
                        <br />{' '}
                    </div>
                    <p className={styles.kindly}>
                        Kindly wait while the system fetches your account
                        number, this will take a moment.
                    </p>
                </div>
            </div>
        </>
    );
};

export default AccountLoading;
