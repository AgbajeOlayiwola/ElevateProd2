import React from 'react';
import ButtonComp from '../../../ReusableComponents/Button';
import { useForm } from 'react-hook-form';
// import {

// } from '../../RegisteredForm/styles.module';
import {
    CardContainer,
    RegistrationStatus
} from '../../../../pages/Onboarding/ProfileSetup/styles.module';
import {
    CardHeadingBVN,
    LeftHeading,
    SmallInstructionText,
    Label,
    FormInput,
    ResetOTP,
    InputWrapper
} from './styles.module';

const StepTwoBVNAuthenticator = () => {
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
                {/* <ProfileCard width="50%" height="0"> */}
                <CardHeadingBVN>
                    <LeftHeading>BVN (OTP) Authenticator</LeftHeading>
                    {/* <Imag 
                    src="/width" 
                    alt="lineImage" /> */}
                    <h6>Progress bar here</h6>
                </CardHeadingBVN>
                <SmallInstructionText>
                    An OTP has been sent to your Phone number registered with
                    BVN. Please enter the OTP below to complete your profile.
                </SmallInstructionText>
                <RegistrationStatus>
                    <form onSubmit={handleSubmit(sendOTP)}>
                        {/* register your input into the hook by invoking the "register" function */}
                        <div>
                            <Label>Input OTP</Label>
                            <br />
                            <FormInput type="number" {...register('bvn')} />
                        </div>
                        <ResetOTP>
                            <p style={{ color: '#005B82', cursor: 'pointer' }}>
                                Resend OTP
                            </p>
                            <p style={{ cursor: 'pointer' }}>Clear</p>
                        </ResetOTP>

                        <ButtonComp
                            width="100%"
                            height="52px"
                            text="Proceed"
                            type="button"
                            backgroundColor="#6ccf00"
                            color="#ffffff"
                            fontWeight="900"
                            margin="20% 0 0 0"
                            // onClick={handleShowSecondStep}
                        />
                    </form>
                </RegistrationStatus>{' '}
            </CardContainer>
        </div>
    );
};

export default StepTwoBVNAuthenticator;
