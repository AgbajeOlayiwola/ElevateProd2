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
<<<<<<< HEAD
        <div className={styles.succCov}>
            <div className={styles.succCovInn}>
                <BodyWrapper>
                    {/* <ProfileCard width="50%" height="80" text="profile card" /> */}
                    {/* yes
            </ProfileCard> */}
                    {/* <ProfileCard width="50%" height="0"> */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}
                    >
                        <Success />
                    </div>

                    <RegistrationStatus>
                        <SuccessMainHeading>
                            Your Business account is ready
                        </SuccessMainHeading>
                        <H6Wrapper style={{ textAlign: 'center' }}>
                            Your account number is:{' '}
                            <span style={{ color: '#005b82' }}>
                                {accountDone.accountNumber}
                            </span>
                        </H6Wrapper>

                        <h6 className={styles.elevateSuccess}>
                            With your Ellevate Account, you have <br />
                            <span> Deposit/Inflow Limit: N1,000,000</span>
                        </h6>
                        <Link href="/Dashboard">
                            <ButtonComp
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
                                text="Proceed to dashboard"
                                type="button"
                                margin="20% 0 0 0"
                                // onClick={handleShowSecondStep}
                            />
                        </Link>
                    </RegistrationStatus>

                    {/* </ProfileCard> */}
                </BodyWrapper>
            </div>
=======
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
>>>>>>> ccc305cb95bd528020a8f0424d8e4e4a9eb7fa29
        </div>
    );
};

export default StepFiveSuccessPage;
