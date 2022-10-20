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
    createNewUserAccount,
    getNewUserAccountDetails,
    newAccountStatusData
} from '../../../redux/actions/actions';
import { IoMdGift } from 'react-icons/io';

const AccountLoading = () => {
    const [accountInfo, setAccountInfo] = useState('');
    const [profileCont, setProfileCont] = useState([]);
    const [errorT, setError] = useState();
    const { accountStatus, errorMessages } = useSelector(
        (state) => state.accountStatusReducer
    );

    const router = useRouter();

    // const { isLoading, profile, errorMessage } = useSelector(
    //     (state) => state.profile
    // );
    const dispatch = useDispatch();

    // console.log(profile);

    // console.log(accountStatus, errorMessages);
    //error message
    //Bank Account has not been created for this user
    const { newAccount, newAccountErrorMessage } = useSelector(
        (state) => state.newUserAccountDets
    );

    useEffect(() => {
        const accountData = {
            affiliateCode: 'ENG',
            currency: 'NGN'
        };
        dispatch(createNewUserAccount(accountData));
        dispatch(newAccountStatusData());

        if (accountStatus.message === 'success') {
            // console.log(accountStatus.messages, errorMessages);
            router.push('/Succes');
        } else if (
            newAccountErrorMessage ===
            'Sorry, we could not process your request. Please chat with us to get this sorted.'
        ) {
            setError(newAccountErrorMessage);
        }
    }, [accountStatus.messages]);

    // console.log(errorMessages);
    const newUserAccountt = () => {
        if (
            errorMessages === 'Bank Account has not been created for this user'
        ) {
            console.log(errorMessages);
            dispatch(newAccountStatusData());
            setInterval(() => {
                dispatch(newAccountStatusData());
            }, 10000);
        }
    };
    useEffect(() => {
        newUserAccountt();
    }, [errorMessages]);

    return (
        <>
            <div className={styles.cover}>
                <div className={styles.covInn}>
                    <div className={styles.load}>
                        {errorT ? (
                            <div className={styles.error}>
                                <h2 className={styles.error}>{errorT}</h2>
                                <br />
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
