import React, { useEffect, useState } from 'react';
import ButtonComp from '../../../ReusableComponents/Button';
import { useForm } from 'react-hook-form';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';

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
import { resetOtpData, verifyOtp } from '../../../../redux/actions/actions';
import { otp } from '../../../../redux/types/actionTypes';

const StepTwoBVNAuthenticator = ({
    handleShowThirdStep,
    setFormData,
    formData,
    action
}) => {
    // const [progress, setProgress] = useState('50%');
    const [otps, setOtp] = useState([]);
    const handleChange = (otps) => {
        setOtp();
        //console.logotps);
    };
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const sendOTP = (data) => {
        //console.logdata);
    };
    const { resetOtp, resetOtpErrorMessages } = useSelector(
        (state) => state.resetOtpReducer
    );
    //console.logformData.phoneNumber);

    const [activeBtn, setActiveBtn] = useState(true);

    const ResetOtp = () => {
        const data = {
            phoneNumber: formData.phoneNumber
        };
        dispatch(resetOtpData(data));
        //console.logresetOtp, resetOtpErrorMessages);
    };
    useEffect(() => {
        //console.logresetOtp);
        //console.logresetOtpErrorMessages);
    }, [resetOtp, resetOtpErrorMessages]);
    return (
        <form>
            <div className={styles.bvnBody}>
                <div className={styles.cover}>
                    <div>
                        {/* <ProfileCard width="50%" height="0"> */}
                        <CardHeadingBVN>
                            <LeftHeading>OTP Verification</LeftHeading>
                            {/* <Progressbar
                            bgcolor="#6CCF00"
                            progressCount={progress}
                            height={14}
                            progWidth="100%"
                        /> */}
                            {/* <Imag 
                    src="/width" 
                    alt="lineImage" /> */}
                        </CardHeadingBVN>
                        <SmallInstructionText>
                            A one time Password has been sent to your registered
                            phone number please enter digits below.
                        </SmallInstructionText>
                        {resetOtpErrorMessages ? (
                            <p>
                                {' '}
                                {resetOtpErrorMessages.response.data.message}
                            </p>
                        ) : null}
                        <p className={styles.inp}>Input OTP</p>
                        <OtpInput
                            formData={formData}
                            setFormData={setFormData}
                        />
                        <ResetOTP>
                            <p onClick={ResetOtp}>Resend OTP</p>

                            <button
                                style={{ cursor: 'pointer' }}
                                className={styles.clr}
                                type="reset"
                            >
                                Clear
                            </button>
                        </ResetOTP>
                    </div>
                    <ButtonComp
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        onClick={action}
                        type="button"
                        margin="80px 0px 0px 0px"
                        text="Proceed"
                    />
                </div>
            </div>
        </form>
    );
};

export default StepTwoBVNAuthenticator;
