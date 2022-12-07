import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import axiosInstance from '../../redux/helper/apiClient';
import Success from '../../components/ReusableComponents/Success';
import { ButtonComp } from '../../components';
import { getCookie } from 'cookies-next';
import apiRoutes from '../../redux/helper/apiRoutes';

const CorporateSuccess = () => {
    const [activeBtn, setActiveBtn] = useState(true);
    const [accountDone, setAccountDone] = useState('');
    useEffect(() => {
        const cookie = getCookie('cookieToken');
        axiosInstance
            .get(`https://testvate.live${apiRoutes.accountStatus}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cookie}`
                }
            })
            .then((response) => {
                //console.log('Accoutn Status', response);
                setAccountDone(response.data.data);
            })
            .catch((error) => {
                //console.log(error.response.data.message);
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
                        Your business account is ready!.
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
                        Your Corporate Account has been Created, Kindly update
                        your documents to activate account.
                    </p>
                </div>
            </>
        </div>
    );
};

export default CorporateSuccess;
