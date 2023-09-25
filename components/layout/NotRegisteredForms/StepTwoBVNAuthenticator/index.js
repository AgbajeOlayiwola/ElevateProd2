import React, { useEffect, useState, useRef } from 'react';
import ButtonComp from '../../../ReusableComponents/Button';
import { useForm } from 'react-hook-form';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
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
import Loader from '../../../ReusableComponents/Loader';
import { resetOtpData } from '../../../../redux/actions/resetOtpAction';
import { changeNumberAction } from '../../../../redux/actions/changeNumberAction';
import { Formik } from 'formik';
import { useUpdatePhoneMutation } from '../../../../redux/api/usersApi';
import {
    useResendOtpMutation,
    useVerifySmsOtpMutation
} from '../../../../redux/api/authApi';

const StepTwoBVNAuthenticator = ({
    handleShowThirdStep,
    setFormData,
    formData,
    action,
    otpError
}) => {
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
        verifySmsOtp,
        {
            data: verifySmsOtpData,
            isLoading: verifySmsOtpLoad,
            isSuccess: verifySmsOtpSuccess,
            isError: verifySmsOtpFalse,
            error: verifySmsOtpErr,
            reset: verifySmsOtpReset
        }
    ] = useVerifySmsOtpMutation();
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
    const clicked = (e) => {
        e.preventDefault();
        console.log('clicked');
        const data = {
            otp: otpData
        };
        verifySmsOtp(data);
    };
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
                                                (otpInputs.current[
                                                    index
                                                ] = input)
                                            }
                                        />
                                    </>
                                ))}
                            </div>
                            <div className={styles.resendFlex}>
                                <button
                                    className={styles.resetOtp}
                                    type="reset"
                                >
                                    Resend OTP
                                </button>
                            </div>
                        </form>
                    ) : phone === 'phone' ? (
                        <div className={styles.changePhone}>
                            <form>
                                <div className={styles.submit}>
                                    <input
                                        placeholder="+234"
                                        type="number"
                                        onChange={(e) =>
                                            setCountryCode(e.target.value)
                                        }
                                    />
                                    <input
                                        type="number"
                                        placeholder="Enter New Phone Number"
                                    />
                                </div>

                                <button type="submit">Change</button>
                            </form>
                        </div>
                    ) : null}
                    {phone === 'otp' ? (
                        <ButtonComp
                            onClick={clicked}
                            text="Verify Otp"
                            active={'active'}
                            loads={verifySmsOtpLoad}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default StepTwoBVNAuthenticator;
