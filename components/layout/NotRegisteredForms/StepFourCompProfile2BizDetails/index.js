import React, { useState } from 'react';
import ButtonComp from '../../../ReusableComponents/Button';
import { useForm } from 'react-hook-form';
import Card from '../../NotRegisteredForms/Card';
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
import styles from './styles.module.css';
import Progressbar from '../../../ReusableComponents/Progressbar';
const StepFourCompProfile2BizDetails = ({ handleShowSuccessStep }) => {
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
        <div>
            <div>
                {/* The small card that wraps the form */}
                <form>
                    <div className={styles.dets}>
                        <SmallCardContainer>
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
                    </div>
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
                    </LastFieldAndButton>
                </form>
                {/* <RegistrationStatus>
                   
                </RegistrationStatus>{' '} */}
            </div>
        </div>
    );
};

export default StepFourCompProfile2BizDetails;
