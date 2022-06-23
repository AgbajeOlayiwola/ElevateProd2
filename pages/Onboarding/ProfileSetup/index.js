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
    ButtonWrapper
} from '../ProfileSetup/styles.module';
import RegisteredForm from '../../../components/layout/RegisteredForm';

const ProfileSetup = () => {
    const [isRegistered, setIsRegistered] = useState(false);

    const [showSecondStep, setShowSecondStep] = useState(false);

    // A function to handle business registration status
    const handleRegistrationStatus = () => {
        setIsRegistered(true);
    };

    // Handle the mulstistep hide and display of a particular step
    const handleShowSecondStep = () => {
        setShowSecondStep(true);
    };

    return (
        <BodyWrapper>
            {/* <ProfileCard width="50%" height="80" text="profile card" /> */}
            {/* yes
            </ProfileCard> */}
            {!showSecondStep ? (
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
                                <ButtonComp
                                    width="50%"
                                    height="52px"
                                    text="Yes"
                                    type="button"
                                    backgroundColor="#6ccf00"
                                    color="#ffffff"
                                    fontWeight="900"
                                    margin="0"
                                    // onClick={handleRegistrationStatus}
                                    onClick={handleShowSecondStep}
                                />
                                <ButtonComp
                                    width="50%"
                                    height="52px"
                                    text="No"
                                    type="button"
                                    backgroundColor="#F8F8F8"
                                    color="#A5A5A5"
                                    fontWeight="900"
                                    margin="0"
                                />
                            </ButtonWrapper>
                        </RegStatusHeading>

                        {/* THE FORM */}
                        <RegisteredForm />

                        {/* END OF THE FORM */}

                        <ButtonComp
                            width="100%"
                            height="52px"
                            text="Next"
                            type="button"
                            backgroundColor="#6ccf00"
                            color="#ffffff"
                            fontWeight="900"
                            margin="80% 0 0 0"
                            onClick={handleShowSecondStep}
                        />
                    </RegistrationStatus>
                    {/* </ProfileCard> */}
                </CardContainer>
            ) : (
                ''
            )}

            {/* Second step of the multistep form if registered */}
            {showSecondStep ? (
                <CardContainer>
                    {/* <ProfileCard width="50%" height="0"> */}
                    <CardHeading>
                        <LeftHeading>Complete Profile</LeftHeading>
                        {/* <Imag 
                    src="/width" 
                    alt="lineImage" /> */}
                        <h6>Progress bar here</h6>
                    </CardHeading>
                    <RegistrationStatus>
                        <RegStatusHeading>
                            Is your business registered?
                            <ButtonWrapper>
                                <ButtonComp
                                    width="50%"
                                    height="52px"
                                    text="Yes"
                                    type="button"
                                    backgroundColor="#6ccf00"
                                    color="#ffffff"
                                    fontWeight="900"
                                    margin="0"
                                />
                                <ButtonComp
                                    width="50%"
                                    height="52px"
                                    text="No"
                                    type="button"
                                    backgroundColor="#F8F8F8"
                                    color="#A5A5A5"
                                    fontWeight="900"
                                    margin="0"
                                />
                            </ButtonWrapper>
                        </RegStatusHeading>
                        <ButtonComp
                            width="100%"
                            height="52px"
                            text="Next"
                            type="button"
                            backgroundColor="#6ccf00"
                            color="#ffffff"
                            fontWeight="900"
                            margin="80% 0 0 0"
                        />
                    </RegistrationStatus>
                    {/* </ProfileCard> */}
                </CardContainer>
            ) : (
                ''
            )}

            {/* PERSONAL DETAILS */}
            <CardContainer>
                {/* <ProfileCard width="50%" height="0"> */}
                <CardHeading>
                    <LeftHeading>Complete Profile</LeftHeading>
                    {/* <Imag 
                    src="/width" 
                    alt="lineImage" /> */}
                    <h6>Progress bar here</h6>
                </CardHeading>
                <RegistrationStatus>
                    {/* <RegStatusHeading>
                            Is your business registered?
                            <ButtonWrapper>
                                <ButtonComp
                                    width="50%"
                                    height="52px"
                                    text="Yes"
                                    type="button"
                                    backgroundColor="#6ccf00"
                                    color="#ffffff"
                                    fontWeight="900"
                                    margin="0"
                                />
                                <ButtonComp
                                    width="50%"
                                    height="52px"
                                    text="No"
                                    type="button"
                                    backgroundColor="#F8F8F8"
                                    color="#A5A5A5"
                                    fontWeight="900"
                                    margin="0"
                                />
                            </ButtonWrapper>
                        </RegStatusHeading> */}
                    <ButtonComp
                        width="100%"
                        height="52px"
                        text="Next"
                        type="button"
                        backgroundColor="#6ccf00"
                        color="#ffffff"
                        fontWeight="900"
                        margin="80% 0 0 0"
                    />
                </RegistrationStatus>
                {/* </ProfileCard> */}
            </CardContainer>
        </BodyWrapper>
    );
};

export default ProfileSetup;
