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

    const router = useRouter();

    const { isLoading, profile, errorMessage } = useSelector(
        (state) => state.profile
    );

    const newUserAccountt = () => {
        const cookie = getCookie('cookieToken');
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
                console.log('Accoutn Status', response);
                setAccountDone(response.data.data);
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
    };
    useEffect(() => {
        newUserAccountt();
    }, []);

    return (
        <>
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
