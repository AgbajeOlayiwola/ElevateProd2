import React, { useEffect, useState, useRef } from 'react';
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
    action,
    otpError
}) => {
    // const [progress, setProgress] = useState('50%');
    const [otps, setOtp] = useState([]);
    if (typeof window !== 'undefined') {
        let accounts = window.localStorage.getItem('user');
        var newAccounts = JSON.parse(accounts);

        //console.log(newAccounts.user.email);
    }

    const dispatch = useDispatch();

    const { resetOtp, resetOtpErrorMessages } = useSelector(
        (state) => state.resetOtpReducer
    );

    const [activeBtn, setActiveBtn] = useState(false);

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
                    setActiveBtn(true);
                }
            }
        }
    };
    useEffect(() => {
        setFormData({ ...formData, otp: ssnValues.join('') });
    }, [ssnValues]);

    const clear = (e) => {
        setValue((ssnValues) => ['']);
    };
    const ResetOtp = (e) => {
        e.preventDefault();
        setValue((ssnValues) => ['']);
        const data = {
            userId: newAccounts.userId
        };
        dispatch(resetOtpData(data));
        //console.logresetOtp, resetOtpErrorMessages);
    };

    useEffect(() => {
        console.log(resetOtp);
        setValue((ssnValues) => ['']);
    }, [resetOtp, resetOtpErrorMessages]);

    return (
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
                    {otpError ? (
                        <p className={styles.error}>{otpError}</p>
                    ) : null}
                    {resetOtpErrorMessages ? (
                        <p> {resetOtpErrorMessages.response.data.message}</p>
                    ) : resetOtpErrorMessages?.response?.data?.message ? (
                        <p>{resetOtp?.data.message}</p>
                    ) : null}
                    <p className={styles.inp}>Input OTP</p>
                    <form>
                        <div className={styles.otpInps}>
                            <input
                                type="password"
                                name="ssn-1"
                                maxLength={1}
                                onInput={handleOtpChange}
                            />
                            <input
                                type="password"
                                name="ssn-2"
                                maxLength={1}
                                onInput={handleOtpChange}
                            />
                            <input
                                type="password"
                                name="ssn-3"
                                maxLength={1}
                                onInput={handleOtpChange}
                            />
                            <input
                                type="password"
                                name="ssn-4"
                                maxLength={1}
                                onInput={handleOtpChange}
                            />
                            <input
                                type="password"
                                name="ssn-5"
                                maxLength={1}
                                onInput={handleOtpChange}
                            />
                            <input
                                type="password"
                                name="ssn-6"
                                maxLength={1}
                                onInput={handleOtpChange}
                            />
                        </div>
                        <div className={styles.resendFlex}>
                            <button
                                className={styles.resetOtp}
                                onClick={ResetOtp}
                                type="reset"
                            >
                                Resend OTP
                            </button>
                            <button
                                onClick={clear}
                                className={styles.clr}
                                type="reset"
                            >
                                Clear
                            </button>
                        </div>
                    </form>
                    <ButtonComp
                        onClick={action}
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        // onClick={action}
                        type="button"
                        margin="80px 0px 0px 0px"
                        text="Proceed"
                    />
                </div>
            </div>
        </div>
    );
};

export default StepTwoBVNAuthenticator;
