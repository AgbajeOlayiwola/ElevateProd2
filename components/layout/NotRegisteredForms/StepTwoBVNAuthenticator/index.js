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

    const numOfFields = 6;

    const [ssnValues, setValue] = useState(['']);
    const handleOtpChange = (e) => {
        const { maxLength, value, name } = e.target;
        const [fieldName, fieldIndex] = name.split('-');

        // Check if they hit the max character length
        if (value.length >= maxLength) {
            // Check if it's not the last input field
            if (parseInt(fieldIndex, 10) <= 6) {
                // Get the next input field
                const nextSibling = document.querySelector(
                    `input[name=ssn-${parseInt(fieldIndex, 10) + 1}]`
                );
                setValue((prevValue) => [...prevValue, value]);

                console.log(ssnValues);

                // If found, focus the next field
                if (nextSibling !== null) {
                    nextSibling.focus();
                } else {
                }
            }
        }
    };
    useEffect(() => {
        setFormData({ ...formData, otp: ssnValues.join('') });
    }, [ssnValues]);

    const clear = () => {
        setValue((ssnValues) => ['']);
    };
    const ResetOtp = () => {
        setValue((ssnValues) => ['']);
        const data = {
            phoneNumber: formData.phoneNumber
        };
        dispatch(resetOtpData(data));
        //console.logresetOtp, resetOtpErrorMessages);
    };

    useEffect(() => {
        setValue((ssnValues) => ['']);
    }, [resetOtp, resetOtpErrorMessages]);

    return (
        <form onSubmit={handleSubmit(action)}>
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
                        <div className={styles.otpInps}>
                            <input
                                type="password"
                                name="ssn-1"
                                maxLength={1}
                                onChange={handleOtpChange}
                            />
                            <input
                                type="password"
                                name="ssn-2"
                                maxLength={1}
                                onChange={handleOtpChange}
                            />
                            <input
                                type="password"
                                name="ssn-3"
                                maxLength={1}
                                onChange={handleOtpChange}
                            />
                            <input
                                type="password"
                                name="ssn-4"
                                maxLength={1}
                                onChange={handleOtpChange}
                            />
                            <input
                                type="password"
                                name="ssn-5"
                                maxLength={1}
                                onChange={handleOtpChange}
                            />
                            <input
                                type="password"
                                name="ssn-6"
                                maxLength={1}
                                onChange={handleOtpChange}
                            />
                        </div>

                        <p onClick={ResetOtp}>Resend OTP</p>

                        <button
                            style={{ cursor: 'pointer' }}
                            className={styles.clr}
                            type="reset"
                            onClick={clear}
                        >
                            Clear
                        </button>
                        {/* </ResetOTP> */}
                    </div>
                    <ButtonComp
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        // onClick={action}
                        type="submit"
                        margin="80px 0px 0px 0px"
                        text="Proceed"
                    />
                </div>
            </div>
        </form>
    );
};

export default StepTwoBVNAuthenticator;
