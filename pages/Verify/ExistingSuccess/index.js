import React, { useState } from 'react';
import styles from './styles.module.css';
import Card from '../../../components/layout/NotRegisteredForms/Card';
import Link from 'next/link';
import Success from '../../../components/ReusableComponents/Success';

const ExistingSuccess = ({ handleShowSuccessStep }) => {
    let accountDetails;
    let accountNumber;
    if (typeof window !== 'undefined') {
        accountDetails = window.localStorage.getItem('accountNumber');
        if (accountDetails === null) {
            accountNumber = '';
        } else {
            accountNumber = JSON.parse(accountDetails);
        }
    }

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
                                {accountNumber == accountNumber.accountNumber}
                            </span>
                        </h6>

                        <h6 className={styles.elevateSuccess}>
                            With your Ellevate Account, you have <br />
                            <span> Deposit/Inflow Limit: N1,000,000</span>
                        </h6>
                        <Link href="/Dashboard">
                            <button className={styles.btnSuccess}>
                                Proceed to dashboard
                            </button>
                        </Link>
                    </div>

                    {/* </ProfileCard> */}
                </div>
            </Card>
        </div>
    );
};

export default ExistingSuccess;
