import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    useResendOtpMutation,
    useUpdatePhoneMutation,
    useVerifyOtpMutation
} from '../../../../redux/api/authApi';
import ButtonComp from '../../../ReusableComponents/Button';
import {
    CardHeadingBVN,
    LeftHeading,
    SmallInstructionText
} from './styles.module';
import styles from './styles.module.css';

const StepTwoBVNAuthenticator = ({
    handleShowThirdStep,
    setFormData,
    formData,
    action,
    otpError,
    nextStep,
    type
}) => {
    const { profile } = useSelector((store) => store);

    if (typeof window !== 'undefined') {
        let accounts = window?.localStorage?.getItem('user');
        var newAccounts = JSON.parse(accounts);
    }

    const otpLength = 6;
    const [otpValues, setOtpValues] = useState(Array(otpLength).fill(''));
    const otpInputs = useRef([]);
    const [otpData, setOtpData] = useState('');
    const handleInputChange = (inputIndex, value) => {
        const newOtpValues = [...otpValues];
        newOtpValues[inputIndex] = value;
        setOtpValues(newOtpValues);

        // Concatenate the values to form the OTP string
        const myOtp = newOtpValues.join('');
        // console.log('OTP:', otpString);

        if (value && inputIndex > length - 1) {
            const nextInput = otpInputs.current[inputIndex + 1];
            if (nextInput) {
                nextInput.focus(); // Move cursor to the next input if it exists
            }
        }
        setOtpData(myOtp);
    };
    const handleInputKeyPress = (event, inputIndex) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            event.preventDefault();
            handleInputChange(inputIndex, '');

            if (inputIndex > 0) {
                otpInputs.current[inputIndex - 1].focus(); // Move cursor to the previous input
            }
        }
    };
    const [phone, setPhone] = useState('otp');
    const [newPhone, setNewPhone] = useState('');
    const [
        updatePhone,
        {
            data: updatePhoneData,
            isLoading: updatePhoneLoad,
            isSuccess: updatePhoneSuccess,
            isError: updatePhoneFalse,
            error: updatePhoneErr,
            reset: updatePhoneReset
        }
    ] = useUpdatePhoneMutation();
    const [
        verifyOtp,
        {
            data: verifyOtpData,
            isLoading: verifyOtpLoad,
            isSuccess: verifyOtpSuccess,
            isError: verifyOtpFalse,
            error: verifyOtpErr,
            reset: verifyOtpReset
        }
    ] = useVerifyOtpMutation();
    const [
        resendOtp,
        {
            data: resendOtpData,
            isLoading: resendOtpLoad,
            isSuccess: resendOtpSuccess,
            isError: resendOtpFalse,
            error: resendOtpErr,
            reset: resendOtpReset
        }
    ] = useResendOtpMutation();
    const handleResendOtp = (e) => {
        e.preventDefault();
        resendOtp({
            userId: profile?.user?.user_id
        });
    };
    const clicked = (e) => {
        e.preventDefault();
        console.log('clicked');
        const data = {
            otp: otpData
        };
        verifyOtp(data);
    };
    const handlePhoneChange = (e) => {
        e.preventDefault();
        console.log('clicked');
        const data = {
            phoneNumber: `${formData?.countryCode}${newPhone}`
        };
        updatePhone(data);
    };

    useEffect(() => {
        if (verifyOtpSuccess || verifyOtpErr) {
            console.log('otp Error');
            nextStep();
        }
    }, [verifyOtpSuccess, verifyOtpErr]);
    return (
        <div className={styles.bvnBody}>
            <div className={styles.cover}>
                <div>
                    <CardHeadingBVN>
                        <LeftHeading>OTP Verification</LeftHeading>
                    </CardHeadingBVN>
                    <SmallInstructionText>
                        A one time Password has been sent to your registered
                        phone number please enter digits below.
                    </SmallInstructionText>

                    <div className={styles.bvnHeading}>
                        <p
                            className={styles.inp}
                            onClick={() => {
                                setPhone('otp');
                            }}
                        >
                            Input OTP
                        </p>
                        <p
                            className={styles.inp}
                            onClick={() => {
                                setPhone('phone');
                            }}
                        >
                            Change Phone Number
                        </p>
                    </div>
                    <p className={styles.error}>
                        {verifyOtpErr?.data?.message}
                    </p>
                    <p className={styles.error}>
                        {' '}
                        {resendOtpErr?.data?.message}
                    </p>
                    {phone === 'otp' ? (
                        <form>
                            <div className={styles.newOtpInput}>
                                {otpValues.map((value, index) => (
                                    <>
                                        <input
                                            key={index}
                                            type="password"
                                            className="otp-input"
                                            maxLength="1"
                                            value={otpValues[index]}
                                            onInput={(e) =>
                                                handleInputChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            onKeyDown={(e) =>
                                                handleInputKeyPress(e, index)
                                            }
                                            ref={(input) =>
                                                (otpInputs.current[index] =
                                                    input)
                                            }
                                        />
                                    </>
                                ))}
                            </div>

                            <div className={styles.resendFlex}>
                                {resendOtpSuccess ? <p>OTP sent</p> : null}
                                <button
                                    className={styles.resetOtp}
                                    onClick={handleResendOtp}
                                >
                                    Resend OTP
                                </button>
                            </div>
                        </form>
                    ) : phone === 'phone' ? (
                        <div className={styles.changePhone}>
                            <div className={styles.submit}>
                                <div className={styles.countryCode}>
                                    <p> {`+${formData?.countryCode}`}</p>
                                </div>

                                <input
                                    type="number"
                                    value={newPhone}
                                    onChange={(e) =>
                                        setNewPhone(e.target.value)
                                    }
                                    placeholder="Enter New Phone Number"
                                />
                            </div>
                            <ButtonComp
                                disabled={true}
                                text="Change Phone Number"
                                active={'active'}
                                loads={updatePhoneLoad}
                                onClick={handlePhoneChange}
                            />
                        </div>
                    ) : null}
                    {phone === 'otp' ? (
                        <ButtonComp
                            disabled={true}
                            onClick={clicked}
                            text="Verify Otp"
                            active={'active'}
                            loads={verifyOtpLoad}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default StepTwoBVNAuthenticator;
