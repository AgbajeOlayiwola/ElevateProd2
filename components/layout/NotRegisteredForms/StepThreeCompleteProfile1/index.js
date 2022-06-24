import React, { useState } from 'react';
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
import styles from './styles.module.css';
import Card from '../../NotRegisteredForms/Card';
import Progressbar from '../../../ReusableComponents/Progressbar';

const StepThreeCompleteProfile1 = ({
    handleShowFourthStep,
    handleShowThirdStepOnly
}) => {
    const [progress, setProgress] = useState('75%');
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
        <div className={styles.cover}>
            <Card>
                <div className={styles.prog}>
                    <CardHeadingBVN>
                        <LeftHeading>Complete your Profile</LeftHeading>
                        {/* <Imag 
                    src="/width" 
                    alt="lineImage" /> */}
                    </CardHeadingBVN>
                    <Progressbar
                        bgcolor="#6CCF00"
                        progressCount={progress}
                        height={14}
                    />
                </div>
                {/* The small card that wraps the form */}
                <form>
                    <SmallCardContainer>
                        <ButtonWrapper>
                            <ToggleNo onClick={handleShowThirdStepOnly}>
                                <ToggleNoText>Personal details</ToggleNoText>
                            </ToggleNo>
                            <ToggleYes onClick={handleShowFourthStep}>
                                <ToggleYesText>Business details</ToggleYesText>
                            </ToggleYes>
                        </ButtonWrapper>
                        <div
                            className={styles.dets}
                            style={{ marginTop: '2rem' }}
                        >
                            <Label>Enter your Full Name</Label>
                            <br />
                            <FormInput
                                type="text"
                                placeholder="business name"
                                {...register('bvn')}
                            />

                            <GenderWrapper>
                                <Label>Select your Gender</Label>
                                <br />
                                <div className={styles.male}>
                                    <FormInput
                                        style={{ width: '10%' }}
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        {...register('bvn')}
                                    />
                                    <label>Male</label>
                                </div>
                                <div className={styles.female}>
                                    <FormInput
                                        style={{ width: '10%' }}
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        {...register('bvn')}
                                    />
                                    <label>Female</label>
                                </div>
                            </GenderWrapper>
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
                            // onClick={handleShowFourthStep}
                        />
                    </LastFieldAndButton>
                </form>
                {/* <RegistrationStatus>
                   
                </RegistrationStatus>{' '} */}
            </Card>
        </div>
    );
};

export default StepThreeCompleteProfile1;
