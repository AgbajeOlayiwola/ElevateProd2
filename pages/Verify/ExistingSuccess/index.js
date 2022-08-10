import React, { useState } from 'react';
import styles from './styles.module.css';
import Card from '../../../components/layout/NotRegisteredForms/Card';
import Link from 'next/link';
import Success from '../../../components/ReusableComponents/Success';
import ButtonComp from '../../../components/ReusableComponents/Button';

const ExistingSuccess = ({ handleShowSuccessStep }) => {
    const accountDetails = localStorage.getItem('accountNumber');
    const accountNumber = JSON.parse(accountDetails);

    const [activeBtn, setActiveBtn] = useState(true);
    return (
        <div className={styles.successWrapper}>
            <Card>
                <div className={styles.bodyWrapper}>
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

                    <div className={styles.registrationStatus}>
                        <h3 className={styles.successMainHeading}>
                            Your Business account is ready
                        </h3>
                        <h6
                            className={styles.H6Wrapper}
                            style={{ textAlign: 'center' }}
                        >
                            Your account number is:{' '}
                            <span style={{ color: '#005b82' }}>
                                {accountNumber.data.accountNumber}
                            </span>
                        </h6>

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
                    </div>

                    {/* </ProfileCard> */}
                </div>
            </Card>
        </div>
    );
};

export default ExistingSuccess;
