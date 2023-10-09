import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createNewUserAccount } from '../../../redux/actions/createNwUserAccountAction';
import { logoutAction } from '../../../redux/actions/logOutAction';
import Loader from '../../../components/ReusableComponents/Loader';
import {
    useCreateCAcctMutation,
    useCreateIAcctMutation
} from '../../../redux/api/authApi';

const AccountLoading = () => {
    const [accountWait, setAccountWait] = useState();

    const router = useRouter();

    const dispatch = useDispatch();

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
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (timer === '00:00:00') {
            dispatch(logoutAction());
            if (!localStorage.getItem('user')) {
                // router.replace('/Auth/Login');
            }
        }
        if (timer === '00:00:10') {
            setAccountWait('Your Account Number will be sent to your Email');
        }
    }, [timer]);
    const [error, setError] = useState();

    return (
        <>
            {/* <h2>{timer}</h2> */}
            <div className={styles.cover}>
                <div className={styles.covInn}>
                    <div className={styles.load}>
                        {error ? (
                            <div className={styles.error}>
                                <h2 className={styles.error}>{error}</h2>
                                <br />
                            </div>
                        ) : timer <= '00:00:10' ? (
                            <div>
                                <p className={styles.error}>{timer}</p>
                                <p className={styles.error}>{accountWait}</p>
                            </div>
                        ) : (
                            <>
                                <Loader />
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
