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
    LastFieldAndButton,
    SelectInput
} from './styles.module';

const StepFourCompProfile2BizDetails = ({ handleShowSuccessStep }) => {
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
                            <Label>Enter Business Name</Label>
                            <br />
                            <FormInput
                                type="text"
                                placeholder="business name"
                                {...register('bvn')}
                            />
                        </div>
                        <div style={{ marginTop: '2rem' }}>
                            <Label>Enter Business Phone number</Label>
                            <br />
                            <FormInput
                                type="number"
                                placeholder="+234 8999 4048 44"
                                {...register('bvn')}
                            />
                        </div>
                        <div style={{ marginTop: '2rem', width: '100%' }}>
                            <Label>Select Business Type</Label>
                            <br />
                            <SelectInput>
                                <option>Retail business</option>
                                <option>Perishable business</option>
                            </SelectInput>
                        </div>
                        <div style={{ marginTop: '2rem' }}>
                            <Label>Enter Business Address</Label>
                            <br />
                            <FormInput
                                type="text"
                                placeholder="Your address here"
                                {...register('bvn')}
                            />
                        </div>
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
                            onClick={handleShowSuccessStep}
                        />
                    </LastFieldAndButton>
                </form>
                {/* <RegistrationStatus>
                   
                </RegistrationStatus>{' '} */}
            </CardContainer>
        </div>
    );
};

export default StepFourCompProfile2BizDetails;
