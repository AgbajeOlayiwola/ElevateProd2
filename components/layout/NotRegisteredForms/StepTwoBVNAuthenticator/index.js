import React, { useEffect, useState } from 'react';
import ButtonComp from '../../../ReusableComponents/Button';
import { useForm } from 'react-hook-form';
import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
// import {

// } from '../../RegisteredForm/styles.module';
import {
    CardHeadingBVN,
    LeftHeading,
    SmallInstructionText,
    Label,
    FormInput,
    ResetOTP,
    InputWrapper
} from './styles.module';
import Progressbar from '../../../ReusableComponents/Progressbar';
import Card from '../../NotRegisteredForms/Card';
import OtpInput from '../../../ReusableComponents/Otpinput';
import { verifyOtp } from '../../../../redux/actions/actions';

const StepTwoBVNAuthenticator = ({
    handleShowThirdStep,
    setFormData,
    formData
}) => {
    const [progress, setProgress] = useState('50%');
    const [otps, setOtp] = useState([]);
    const handleChange = (otps) => {
        setOtp();
        console.log(otps);
    };
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const sendOTP = (data) => {
        console.log(data);
    };
    const [activeBtn, setActiveBtn] = useState(true);
    return (
        <div className={styles.cover}>
            <div>
                {/* <ProfileCard width="50%" height="0"> */}
                <CardHeadingBVN>
                    <LeftHeading>BVN (OTP) Authenticator</LeftHeading>
                    {/* <Imag 
                    src="/width" 
                    alt="lineImage" /> */}
                </CardHeadingBVN>
                <SmallInstructionText>
                    An OTP has been sent to your Phone number registered with
                    BVN. Please enter the OTP below to complete your profile.
                </SmallInstructionText>
                <p className={styles.inp}>Input OTP</p>
                <OtpInput formData={formData} setFormData={setFormData} />
                <ResetOTP>
                    <p style={{ color: '#005B82', cursor: 'pointer' }}>
                        Resend OTP
                    </p>
                    <button
                        style={{ cursor: 'pointer' }}
                        className={styles.clr}
                        type="reset"
                    >
                        Clear
                    </button>
                </ResetOTP>
            </div>
        </div>
    );
};

export default StepTwoBVNAuthenticator;
