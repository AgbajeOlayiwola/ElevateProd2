import React, { useState } from 'react';
import { ButtonComp } from '../../../../components';
import styles from './styles.module.css';
import Image from 'next/image';
import Card from '../../NotRegisteredForms/Card';
import Link from 'next/link';
import {
    CardContainer,
    BodyWrapper,
    CardHeading,
    LeftHeading,
    RegistrationStatus,
    RegStatusHeading,
    ButtonWrapper,
    ToggleYes,
    ToggleNo,
    ToggleYesText,
    ToggleNoText,
    SuccessMainHeading,
    H6Wrapper
} from './styles.module';
import Success from '../../../ReusableComponents/Success';

const StepFiveSuccessPage = ({ handleShowSuccessStep }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);

    const handleShowThirdStepOnly = () => {
        setShowThirdStep(true);
        setShowFourthStep(false);
        setShowSecondStep(false);
    };

    return (
        <Card>
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
                        <span style={{ color: '#005b82' }}>232222829</span>
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
    );
};

export default StepFiveSuccessPage;
