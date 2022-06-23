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
    RegStatusHeading
} from '../ProfileSetup/styles.module';

const ProfileSetup = () => {
    return (
        <BodyWrapper>
            {/* <ProfileCard width="50%" height="80" text="profile card" /> */}
            {/* yes
            </ProfileCard> */}
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
                        <div>
                            <ButtonComp
                                width="50%"
                                height="52px"
                                text="Yes"
                                type="button"
                                backgroundColor="#6ccf00"
                                color="#ffffff"
                            />
                            <ButtonComp
                                width="50%"
                                height="52px"
                                text="No"
                                type="button"
                                backgroundColor="#F8F8F8"
                                color="#A5A5A5"
                            />
                        </div>
                    </RegStatusHeading>
                </RegistrationStatus>
                {/* </ProfileCard> */}
            </CardContainer>
        </BodyWrapper>
    );
};

export default ProfileSetup;
