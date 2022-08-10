import React, { useEffect } from 'react';
import styles from './styles.module.css';
import { accountStatusData } from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const ExistingAccount = () => {
    const user = localStorage.getItem('userId');
    const userId = JSON.parse(user);
    const dispatch = useDispatch();
    const router = useRouter();
    const { accountStatus, errorMessages } = useSelector(
        (state) => state.accountStatusReducer
    );
    useEffect(() => {
        dispatch(accountStatusData(userId));
    }, []);
    const newAccountTest1 = () => {
        console.log(accountStatus);
        if (errorMessages) {
            //  setError(errorMessages);
            console.log(errorMessages);
        } else if (accountStatus.message === 'Try Again') {
            setTimeout(() => {
                dispatch(accountStatusData(userId));
            }, 40000);
        } else if (accountStatus.message === 'SUCCESS') {
            window.localStorage.setItem(
                'accountNumber',
                JSON.stringify(accountStatus)
            );
            router.push('/Succes');
        }
    };
    useEffect(() => {
        newAccountTest1();
    }, [errorMessages, accountStatus]);

    return (
        <div className={styles.cover}>
            <div className={styles.covInn}>
                <div className={styles.load}>
                    <svg
                        width="59"
                        height="15"
                        viewBox="0 0 59 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.svg}
                    >
                        <circle cx="7.5" cy="7.25684" r="7" fill="#6CCF00" />
                        <circle cx="29.5" cy="7.25684" r="7" fill="#6CCF00" />
                        <circle cx="51.5" cy="7.25684" r="7" fill="#6CCF00" />
                    </svg>
                </div>
                <p className={styles.kindly}>
                    Kindly wait while the system fetches your account number,
                    this will take a moment.
                </p>
            </div>
        </div>
    );
};

export default ExistingAccount;
