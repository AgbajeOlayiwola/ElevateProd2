import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import axiosInstance from '../../../redux/helper/apiClient';
import apiRoutes from '../../../redux/helper/apiRoutes';
import { logoutAction } from '../../../redux/actions/actions';

const CorporateAccount = () => {
    const [accountInfo, setAccountInfo] = useState('');
    const [profileCont, setProfileCont] = useState([]);
    const [accountDone, setAccountDone] = useState('');
    const [accountWait, setAccountWait] = useState();
    const [accountError, setAccountError] = useState('');
    const [errorMes, setErrorMes] = useState('');
    const { isLoading, profile, errorMessage } = useSelector(
        (state) => state.profile
    );
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

    // Another way to call the clearTimer() to start
    // the countdown is via action event from the
    // button first we create function to be called
    // by the button
    // const onClickReset = () => {
    //     clearTimer(getDeadTime());
    // };

    const newUserAccountt = () => {
        const accountData = {
            affiliateCode: 'ENG',
            currency: 'NGN'
        };
        // const cookie = getCookie('cookieToken');
        let cookie;

        if (getCookie('cookieToken') == undefined) {
            cookie = getCookie('existingToken');
        } else {
            cookie = getCookie('cookieToken');
        }
        axiosInstance
            .post(
                `https://testvate.live${apiRoutes.corpNewUser}`,

                accountData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Client-Type': 'web',
                        Authorization: `Bearer ${cookie}`
                    }
                }
            )
            .then((response) => {
                //console.log'create New Account', response.data);
                if (response.data.message === 'success') {
                    setInterval(() => {
                        axiosInstance
                            .get(`https://testvate.live/bank-account/status`, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-Client-Type': 'web',
                                    Authorization: `Bearer ${cookie}`
                                }
                            })
                            .then((response) => {
                                //console.log'Accoutn Status', response);
                                setAccountDone(response.data.message);
                            })
                            .catch((error) => {
                                //console.logerror.response.data.message);
                            });
                    }, 10000);
                }
            })
            .catch((error) => {
                //console.log
                // 'create new account Error:',
                // error.response.data.message
                // );
                // setErrorMes(error.response.data.message);
                if (
                    // errorMes ===
                    //     'You already have an account with us. Please contact us for more information' ||
                    error
                ) {
                    setTimeout(() => {
                        axiosInstance
                            .get(`https://testvate.live/bank-account/status`, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-Client-Type': 'web',
                                    Authorization: `Bearer ${cookie}`
                                }
                            })
                            .then((response) => {
                                //console.log'Accoutn Status', response);
                                setAccountDone(response.data.message);
                            })
                            .catch((error) => {
                                //console.logerror.response.data.message);
                            });
                    }, 30000);
                }
            });
    };
    //console.log(accountDone);
    useEffect(() => {
        if (accountDone === 'success') {
            router.push('/Succes/CorpSuccess');
        }
    }, [errorMes, accountDone]);
    useEffect(() => {
        newUserAccountt();
    }, [errorMes, accountDone]);

    const newUserCorpAccountt = () => {
        if (
            errorMes === 'Pending Creation, Try Again' ||
            errorMes === 'Try Again' ||
            errorMes === 'Bank Account has not been created for this user'
        ) {
            const interval = setInterval(() => {
                dispatch(newAccountStatusData());
            }, 30000);
        }

        if (accountDone.message === 'success') {
            //console.logaccountStatus.messages, errorMessages);
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
    };
    useEffect(() => {
        newUserCorpAccountt();
    }, [errorMes, accountDone, timer]);

    return (
        <>
            <div className={styles.cover}>
                <div className={styles.covInn}>
                    <div className={styles.load}>
                        {errorMes ? (
                            <div className={styles.error}>
                                <h2 className={styles.error}>{errorMes}</h2>
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

export default CorporateAccount;
