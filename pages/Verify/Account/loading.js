import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
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
    newAccountStatusData,
    logoutAction
} from '../../../redux/actions/actions';
import { IoMdGift } from 'react-icons/io';

const AccountLoading = () => {
    const [accountInfo, setAccountInfo] = useState('');
    const [profileCont, setProfileCont] = useState([]);
    const [accountWait, setAccountWait] = useState();
    const [errorT, setError] = useState();
    const { accountStatuss, errorMessages } = useSelector(
        (state) => state.accountStatusReducer
    );

    const router = useRouter();

    const dispatch = useDispatch();

    const { newAccount, newAccountErrorMessage } = useSelector(
        (state) => state.newUserAccountDets
    );
    // We need ref in this, because we are dealing
    // with JS setInterval to keep track of it and
    // stop it when needed
    const Ref = useRef(null);

    const [timer, setTimer] = useState('00:00:60');

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total,
            hours,
            minutes,
            seconds
        };
    };

    const startTimer = (e) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            // update the timer
            // check if less than 10 then we need to
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : '0' + hours) +
                    ':' +
                    (minutes > 9 ? minutes : '0' + minutes) +
                    ':' +
                    (seconds > 9 ? seconds : '0' + seconds)
            );
        }
    };

    const clearTimer = (e) => {
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next
        setTimer('00:00:60');

        // If you try to remove this line the
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };

    const getDeadTime = () => {
        let deadline = new Date();

        // This is where you need to adjust if
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + 50);
        return deadline;
    };

    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible

    // We put empty array to act as componentDid
    // mount only
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    // Another way to call the clearTimer() to start
    // the countdown is via action event from the
    // button first we create function to be called
    // by the button
    // const onClickReset = () => {
    //     clearTimer(getDeadTime());
    // };

    const [count, setCount] = useState(0);
    const newUserAccountt = () => {
        const accountData = {
            affiliateCode: 'ENG',
            currency: 'NGN'
        };
        dispatch(createNewUserAccount(accountData));
    };
    useEffect(() => {
        newUserAccountt();
    }, []);
    // useEffect(() => {
    //     setCount(count + 1);
    // }, [errorMessages]);
    useEffect(() => {
        if (newAccount !== null) {
            dispatch(newAccountStatusData());
        } else if (newAccountErrorMessage !== null) {
            setError(newAccountErrorMessage);
            const interval = setInterval(() => {
                dispatch(newAccountStatusData());
            }, 30000);
            return () => {
                clearInterval(interval);
            };
        }
    }, [newAccount, newAccountErrorMessage]);
    useEffect(() => {
        if (
            errorMessages === 'Pending Creation, Try Again' ||
            errorMessages === 'Try Again' ||
            errorMessages === 'Bank Account has not been created for this user'
        ) {
            // if (count === 1) {
            const interval = setInterval(() => {
                dispatch(newAccountStatusData());
            }, 30000);
            return () => {
                clearInterval(interval);
            };
            // }
            // else {
            //     router.push('/Verify/Waiting');
            // }
        }
        if (accountStatuss !== null) {
            //console.log(accountStatus.messages, errorMessages);
            router.push('/Succes');
        }
        if (timer === '00:00:00') {
            dispatch(logoutAction());
            if (!localStorage.getItem('user')) {
                router.replace('/Auth/Login');
            }
        }
        if (timer === '00:00:10') {
            setAccountWait('Your Account Number will be sent to your Email');
        }

        // setTimeout(() => {
        //     setError(
        //         'Your account creatio is taking a while, once its completed an email will be sent to you'
        //     );
        // }, 60000);
    }, [errorMessages, accountStatuss, timer]);

    return (
        <>
            {/* <h2>{timer}</h2> */}
            <div className={styles.cover}>
                <div className={styles.covInn}>
                    <div className={styles.load}>
                        {errorT ? (
                            <div className={styles.error}>
                                <h2 className={styles.error}>{errorT}</h2>
                                <br />
                            </div>
                        ) : timer <= '00:00:10' ? (
                            <div>
                                <p className={styles.error}>{timer}</p>
                                <p>{accountWait}</p>
                            </div>
                        ) : (
                            <>
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
                                <p className={styles.kindly}>
                                    Kindly wait while the system fetches your
                                    account number, this will take a moment.
                                </p>
                            </>
                        )}
                        <br />{' '}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountLoading;
