import React, { useState } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import Card from '../../../components/layout/NotRegisteredForms/Card';
import Link from 'next/link';
import {
    BodyWrapper,
    RegistrationStatus,
    SuccessMainHeading,
    H6Wrapper
} from '../../../components/styles.module';
import Success from '../../../components/ReusableComponents/Success';
import ButtonComp from '../../../components/ReusableComponents/Button';

const ExistingSuccess = ({ handleShowSuccessStep }) => {
    const accountDetails = localStorage.getItem('accountNumber');
    const accountNumber = JSON.parse(accountDetails);

    const [activeBtn, setActiveBtn] = useState(true);
    return (
        <div className={styles.successWrapper}>
            <Card>
                <BodyWrapper>
                    {/* <ProfileCard width="50%" height="80" text="profile card" /> */}
                    {/* yes yes yes
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
                                {accountNumber.data.accountNumber}
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
            </Card>
        </div>
    );
};

export default ExistingSuccess;
