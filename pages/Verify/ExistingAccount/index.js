import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { accountStatusData } from '../../../redux/actions/accountStatusAction';
import styles from './styles.module.css';

const ExistingAccount = () => {
    const { accountStatus, errorMessages } = useSelector(
        (state) => state.accountStatusReducer
    );
    let user;
    let userId;
    if (typeof window !== 'undefined') {
        user = localStorage.getItem('userId');
        if (user === null) {
            userId = '';
        } else {
            userId = JSON.parse(user);
        }
    }
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(accountStatusData(userId));
    }, []);
    const newAccountTest1 = () => {
        // //// console.logaccountStatus);
        if (errorMessages) {
            //  setError(errorMessages);
            // //// console.logerrorMessages);
        } else if (accountStatus.message === 'Try Again') {
            if (count >= 5) {
                router.push('/Verify/Waiting');
            } else {
                setTimeout(() => {
                    dispatch(accountStatusData(userId));
                }, 40000);
            }
        } else if (accountStatus.message === 'SUCCESS') {
            window.localStorage.setItem(
                'accountNumber',
                JSON.stringify(accountStatus.data)
            );
            router.push('/Verify/ExistingSuccess');
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
