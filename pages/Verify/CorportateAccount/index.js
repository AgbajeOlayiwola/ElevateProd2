import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import axiosInstance from '../../../redux/helper/apiClient';
import apiRoutes from '../../../redux/helper/apiRoutes';

const CorporateAccount = () => {
    const [accountInfo, setAccountInfo] = useState('');
    const [profileCont, setProfileCont] = useState([]);
    const [accountDone, setAccountDone] = useState('');
    const [accountError, setAccountError] = useState('');
    const [errorMes, setErrorMes] = useState('');
    const { isLoading, profile, errorMessage } = useSelector(
        (state) => state.profile
    );
    const router = useRouter();

    const newUserAccountt = () => {
        let cookie;
        if (getCookie('cookieToken') == undefined) {
            cookie = getCookie('existingToken');
        } else {
            cookie = getCookie('cookieToken');
        }

        const accountData = {
            affiliateCode: 'ENG',
            currency: 'NGN'
        };
        // const cookie = getCookie('cookieToken');
        axiosInstance
            .post(
                `https://ellevate-test.herokuapp.com${apiRoutes.corpNewUser}`,
                accountData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${cookie}`
                    }
                }
            )
            .then((response) => {
                console.log('create New Account', response.data);
                if (response.data.message === 'success') {
                    axiosInstance
                        .get(
                            `https://ellevate-app.herokuapp.com${apiRoutes.corpAccountStatus}`,
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${cookie}`
                                }
                            }
                        )
                        .then((response) => {
                            // console.log('Accoutn Status', response);
                            setAccountDone(response.data.data);
                        })
                        .catch((error) => {
                            console.log(error.response.data.message);
                        });
                }
            })
            .catch((error) => {
                console.log(
                    'create new account Error:',
                    error.response.data.message
                );
                setErrorMes(error.response.data.message);
            });

        if (
            errorMes ===
            'You already have an account with us. Please contact us for more information'
        ) {
            router.push('/Succes/CorpSuccess');
        }
    };

    useEffect(() => {
        newUserAccountt();
    }, [errorMes, accountDone]);

    const newUserCorpAccountt = () => {
        if (errorMes === 'Bank Account has not been created for this user') {
            console.log(errorMes);
            dispatch(newAccountStatusData());
            setInterval(() => {
                dispatch(newAccountStatusData());
            }, 10000);
        }
    };
    useEffect(() => {
        newUserCorpAccountt();
    }, [errorMes, accountDone]);

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

export default CorporateAccount;
