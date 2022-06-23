import React from 'react';
import ButtonComp from '../../../ReusableComponents/Button';
import { useForm } from 'react-hook-form';

import { RegistrationStatus } from '../../../../pages/Onboarding/ProfileSetup/styles.module';
import {
    CardContainer,
    CardHeadingBVN,
    LeftHeading,
    // SmallInstructionText,
    Label,
    FormInput,
    ResetOTP,
    InputWrapper,
    ProgressBar,
    SmallCardContainer,
    RegStatusHeading,
    ButtonWrapper,
    ToggleYes,
    ToggleNo,
    ToggleYesText,
    ToggleNoText,
    GenderWrapper,
    LastFieldAndButton
} from './styles.module';

const StepThreeCompleteProfile1 = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const sendOTP = (data) => {
        console.log(data);
    };
    return (
        <div>
            <CardContainer>
                <CardHeadingBVN>
                    <LeftHeading>Complete your Profile</LeftHeading>
                    {/* <Imag 
                    src="/width" 
                    alt="lineImage" /> */}
                    <ProgressBar>Progress bar here</ProgressBar>
                </CardHeadingBVN>
                {/* The small card that wraps the form */}
                <form>
                    <SmallCardContainer>
                        <ButtonWrapper>
                            <ToggleNo>
                                <ToggleNoText>Personal details</ToggleNoText>
                            </ToggleNo>
                            <ToggleYes>
                                <ToggleYesText>Business details</ToggleYesText>
                            </ToggleYes>
                        </ButtonWrapper>
                        <div style={{ marginTop: '2rem' }}>
                            <Label>Enter your Full Name</Label>
                            <br />
                            <FormInput
                                type="text"
                                placeholder="business name"
                                {...register('bvn')}
                            />
                        </div>
                        <GenderWrapper>
                            <Label>Select your Gender</Label>
                            <br />
                            <div>
                                <FormInput
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    {...register('bvn')}
                                />
                                <label>Male</label>
                            </div>
                            <div>
                                <FormInput
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    {...register('bvn')}
                                />
                                <label>Female</label>
                            </div>
                        </GenderWrapper>
                    </SmallCardContainer>
                    <LastFieldAndButton>
                        <div>
                            <Label>Enter referral code(Optional)</Label>
                            <br />
                            <FormInput
                                type="text"
                                placeholder="Enter code"
                                {...register('bvn')}
                            />
                        </div>
                        <ButtonComp
                            width="100%"
                            height="52px"
                            text="Next"
                            type="button"
                            backgroundColor="#6ccf00"
                            color="#ffffff"
                            fontWeight="900"
                            margin="20% 0 0 0"
                            // onClick={handleShowSecondStep}
                        />
                    </LastFieldAndButton>
                </form>
                {/* <RegistrationStatus>
                   
                </RegistrationStatus>{' '} */}
            </CardContainer>
        </div>
    );
};

export default StepThreeCompleteProfile1;
