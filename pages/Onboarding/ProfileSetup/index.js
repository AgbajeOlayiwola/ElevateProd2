import React, { useState } from 'react';
import { ButtonComp } from '../../../components';
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

const ProfileSetup = () => {
    const [isRegistered, setIsRegistered] = useState(false);

    const [showFirstStep, setShowFirstStep] = useState(true);
    const [showSecondStep, setShowSecondStep] = useState(false);
    const [showThirdStep, setShowThirdStep] = useState(false);

    // A function to handle business registration status
    const handleRegistrationStatus = () => {
        setIsRegistered(true);
    };

    // Handle the mulstistep hide and display of a particular step
    const handleShowSecondStep = () => {
        setShowSecondStep(true);
        setShowFirstStep(false);
    };

    // Handle the multistep display the third step
    const handleShowThirdStep = () => {
        setShowThirdStep(true);
        setShowSecondStep(false);
    };

    return (
        <BodyWrapper>
            {/* <ProfileCard width="50%" height="80" text="profile card" /> */}
            {/* yes
            </ProfileCard> */}
            {showFirstStep ? (
                <CardContainer>
                    {/* <ProfileCard width="50%" height="0"> */}
                    <CardHeading>
                        <LeftHeading>Profile Setup</LeftHeading>
                        {/* <Imag 
                    src="/width" 
                    alt="lineImage" /> */}
                        <h6>Progress bar here</h6>
                    </CardHeading>
                    <RegistrationStatus>
                        <RegStatusHeading>
                            Is your business registered?
                            <ButtonWrapper>
                                <ToggleNo>
                                    <ToggleNoText>No</ToggleNoText>
                                </ToggleNo>
                                <ToggleYes>
                                    <ToggleYesText>Yes</ToggleYesText>
                                </ToggleYes>
                            </ButtonWrapper>
                        </RegStatusHeading>

                        {/* THE FORM */}
                        <RegisteredForm
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

            {showThirdStep ? <StepThreeCompleteProfile1 /> : ''}
        </BodyWrapper>
    );
};

export default ProfileSetup;
