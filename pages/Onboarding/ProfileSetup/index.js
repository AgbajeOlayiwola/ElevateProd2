import React, { useState } from 'react';
import { ButtonComp } from '../../../components';
import lineImage from '../../../public/Assets/Svgs/Rectangle 12.svg';

import {
    CardContainer,
    BodyWrapper,
    CardHeading,
    LeftHeading
} from '../ProfileSetup/styles.module';

const ProfileSetup = () => {
    return (
        <BodyWrapper>
            <CardContainer>
                <CardHeading>
                    <LeftHeading>Profile Setup</LeftHeading>
                    {/* <img src={lineImage} alt="lineImage" /> */}
                </CardHeading>
            </CardContainer>
        </BodyWrapper>
    );
};

export default ProfileSetup;
