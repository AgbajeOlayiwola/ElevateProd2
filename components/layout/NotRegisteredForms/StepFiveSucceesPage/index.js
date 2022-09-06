import React, { useState, useEffect } from 'react';
import { ButtonComp } from '../../../../components';
import styles from './styles.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Success from '../../../ReusableComponents/Success';
import apiRoutes from '../../../../redux/helper/apiRoutes';
import axiosInstance from '../../../../redux/helper/apiClient';
import { setCookie, getCookie } from 'cookies-next';

const StepFiveSuccessPage = ({ handleShowSuccessStep }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    const [accountDone, setAccountDone] = useState('');
    useEffect(() => {
        const cookie = getCookie('cookieToken');
        axiosInstance
            .get(
                `https://ellevate-app.herokuapp.com${apiRoutes.accountStatus}`,
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
    }, []);
    return (
        <div className={styles.cover}>
            <>
                <div className={styles.Success}>
                    <Success />
                </div>
                <div className={styles.successBody}>
                    <h2 className={styles.h2}>
                        Your Business account is ready!
                    </h2>
                    <h3>
                        Your Account Number is{' '}
                        <span>{accountDone.accountNumber}</span>
                    </h3>
                    <Link href="/Dashboard">
                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            // onClick={handleSubmit}
                            type="submit"
                            text="Proceed To Dashboard"
                        />
                    </Link>
                    <p>
                        With your Ellevate Account, you have Deposit/Inflow
                        Limit: N1,000,000
                    </p>
                </div>
            </>
        </div>
    );
};

export default StepFiveSuccessPage;
