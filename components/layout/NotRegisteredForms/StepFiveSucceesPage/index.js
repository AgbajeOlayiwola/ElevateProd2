import React, { useState } from 'react';
import { ButtonComp } from '../../../../components';
import styles from './styles.module.css';
// import lineImage from '../../../public/Assets/Svgs/Rectangle 12.svg';
import Image from 'next/image';
// import ProfileCard from '../../../components/ReusableComponents/ProfileCard';
import Card from '../../NotRegisteredForms/Card';
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
    SuccessMainHeading
} from './styles.module';
// import {

// } from '../StepFiveSucceesPage/styles.module'.
// import RegisteredForm from '../../../components/layout/RegisteredForm';
// import StepTwoBVNAuthenticator from '../../components/layout/NotRegisteredForms/StepTwoBVNAuthenticator';
// import StepThreeCompleteProfile1 from '../../../components/layout/NotRegisteredForms/StepThreeCompleteProfile1';
// import StepFourCompProfile2BizDetails from '../../components/layout/NotRegisteredForms/StepFourCompProfile2BizDetails';
import RegisteredForm from '../../RegisteredForms/RegisteredForm';
import StepTwoBVNAuthenticator from '../StepTwoBVNAuthenticator';
import StepThreeCompleteProfile1 from '../StepThreeCompleteProfile1';
import StepFourCompProfile2BizDetails from '../StepFourCompProfile2BizDetails';
import Success from '../../../ReusableComponents/Success';

const StepFiveSuccessPage = () => {
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
                <div>
                    <Success />
                </div>

                <RegistrationStatus>
                    <SuccessMainHeading>
                        Your Business account is ready
                    </SuccessMainHeading>
                    <h6 style={{ textAlign: 'center' }}>
                        Your account number is: <span>232222829</span>
                    </h6>

                    <h6 className={styles.elevateSuccess}>
                        With your Ellevate Account, you have{' '}
                        <span> Deposit/Inflow Limit: N500,000</span>
                    </h6>
                    <ButtonComp
                        width="100%"
                        height="52px"
                        text="Proceed to dashboard"
                        type="button"
                        backgroundColor="#6ccf00"
                        color="#ffffff"
                        fontWeight="900"
                        margin="20% 0 0 0"
                        // onClick={handleShowSecondStep}
                    />
                </RegistrationStatus>
                {/* </ProfileCard> */}
            </BodyWrapper>
        </Card>
    );
};

export default StepFiveSuccessPage;
