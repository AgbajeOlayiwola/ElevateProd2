import React, { useState } from 'react';
import { ButtonComp, Progressbar } from '../../../components';
import lineImage from '../../../public/Assets/Svgs/Rectangle 12.svg';
import Image from 'next/image';
// import ProfileCard from '../../../components/ReusableComponents/ProfileCard';

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
    ToggleNoText
} from '../ProfileSetup/styles.module';
import RegisteredForm from '../../../components/layout/RegisteredForm';
import StepTwoBVNAuthenticator from '../../../components/layout/NotRegisteredForms/StepTwoBVNAuthenticator';
import StepThreeCompleteProfile1 from '../../../components/layout/NotRegisteredForms/StepThreeCompleteProfile1';
import StepFourCompProfile2BizDetails from '../../../components/layout/NotRegisteredForms/StepFourCompProfile2BizDetails';
import StepFiveSuccessPage from '../../../components/layout/NotRegisteredForms/StepFiveSucceesPage';

const ProfileSetup = () => {
    const [isRegistered, setIsRegistered] = useState(false);

    const [showFirstStep, setShowFirstStep] = useState(true);
    const [showSecondStep, setShowSecondStep] = useState(false);
    const [showThirdStep, setShowThirdStep] = useState(false);
    const [showFourthStep, setShowFourthStep] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [progress, setProgress] = useState('20%');

    // A function to handle business registration status
    const handleRegistrationStatus = () => {
        setIsRegistered(true);
    };
    const switchRegistrationStatus = () => {
        setIsRegistered(false);
    };

    // Handle the mulstistep hide and display of a particular step
    const handleShowSecondStep = () => {
        setShowSecondStep(true);
        setShowFirstStep(false);
    };

    // Handle the multistep to display the third step
    const handleShowThirdStep = () => {
        setShowThirdStep(true);
        setShowSecondStep(false);
    };

    // Handle the multistep to display the fourth step
    const handleShowFourthStep = () => {
        setShowThirdStep(false);
        setShowFourthStep(true);
    };

    // Handle the multistep to display the fifth-success step
    const handleShowSuccessStep = () => {
        setShowFourthStep(false);
        setShowSuccess(true);
    };
    const handleShowThirdStepOnly = () => {
        // setShowThirdStep(true);
        // showFirstStep(false);
        // setShowSecondStep(false);
        // setShowFourthStep(false);
        alert('working');
    };

    return (
        <BodyWrapper>
            {showFirstStep ? (
                <CardContainer>
                    {/* <ProfileCard width="50%" height="0"> */}
                    <CardHeading>
                        <LeftHeading>Profile Setup</LeftHeading>
                        <Progressbar
                            bgcolor="#6CCF00"
                            progressCount={progress}
                            height={14}
                        />
                        {/* <Imag 
                    src="/width" 
                    alt="lineImage" /> */}
                    </CardHeading>
                    <RegistrationStatus>
                        <RegStatusHeading>
                            Is your business registered?
                            <ButtonWrapper>
                                <ToggleNo onClick={switchRegistrationStatus}>
                                    <ToggleNoText>Yes</ToggleNoText>
                                </ToggleNo>
                                <ToggleYes onClick={handleRegistrationStatus}>
                                    <ToggleYesText>No</ToggleYesText>
                                </ToggleYes>
                            </ButtonWrapper>
                        </RegStatusHeading>

                        {/* THE FORM */}
                        <RegisteredForm
                            isRegistered={isRegistered}
                            handleShowSecondStep={handleShowSecondStep}
                        />

                        {/* END OF THE FORM */}

                        {/* <ButtonComp
                            width="100%"
                            height="52px"
                            text="Next"
                            type="button"
                            backgroundColor="#6ccf00"
                            color="#ffffff"
                            fontWeight="900"
                            margin="80% 0 0 0"
                            onClick={handleShowSecondStep}
                        /> */}
                    </RegistrationStatus>
                    {/* </ProfileCard> */}
                </CardContainer>
            ) : (
                ''
            )}

            {/* Second step of the multistep form if registered */}
            {showSecondStep ? (
                <StepTwoBVNAuthenticator
                    handleShowThirdStep={handleShowThirdStep}
                />
            ) : (
                ''
            )}

            {showThirdStep ? (
                <StepThreeCompleteProfile1
                    handleShowFourthStep={handleShowFourthStep}
                    handleShowThirdStepOnly={handleShowThirdStepOnly}
                />
            ) : (
                ''
            )}
            {showFourthStep ? (
                <StepFourCompProfile2BizDetails
                    handleShowSuccessStep={handleShowSuccessStep}
                />
            ) : (
                ''
            )}

            {showSuccess ? <StepFiveSuccessPage /> : ''}
        </BodyWrapper>
    );
};

export default ProfileSetup;
