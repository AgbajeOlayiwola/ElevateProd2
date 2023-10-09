import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    useResendExisitingOtpMutation,
    useVerifyExistingOtpMutation
} from '../../../redux/api/authApi';
import ButtonComp from '../../ReusableComponents/Button';
import Loader from '../../ReusableComponents/Loader';
import styles from './styles.module.css';
const FirstStep = ({ setFormData, formData, action }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    const [typedOtp, setSetypedOtp] = useState('');
    const { existingUserDetails } = useSelector((store) => store);
    const dispatch = useDispatch();
    const router = useRouter();
    const otpLength = 6;
    const [otpValues, setOtpValues] = useState(Array(otpLength).fill(''));
    const otpInputs = useRef([]);
    //new otp function
    const handleInputChange = (inputIndex, value) => {
        const newOtpValues = [...otpValues];
        newOtpValues[inputIndex] = value;
        setOtpValues(newOtpValues);
        const myOtp = newOtpValues.join('');
        // Concatenate the values to form the OTP string;
        // console.log('OTP:', myOtp);

        if (value && inputIndex > length - 1) {
            const nextInput = otpInputs.current[inputIndex + 1];
            if (nextInput) {
                nextInput.focus(); // Move cursor to the next input if it exists
            }
        }
        setSetypedOtp(myOtp);
    };
    const [
        verifyExistingOtp,
        {
            data: verifyExistingOtpData,
            isLoading: verifyExistingOtpLoad,
            isSuccess: verifyExistingOtpSuccess,
            isError: verifyExistingOtpFalse,
            error: verifyExistingOtpErr,
            reset: verifyExistingOtpReset
        }
    ] = useVerifyExistingOtpMutation();
    const [
        resendExisitingOtp,
        {
            data: resendExisitingOtpData,
            isLoading: resendExisitingOtpLoad,
            isSuccess: resendExisitingOtpSuccess,
            isError: resendExisitingOtpFalse,
            error: resendExisitingOtpErr,
            reset: resendExisitingOtpReset
        }
    ] = useResendExisitingOtpMutation();
    useEffect(() => {
        if (verifyExistingOtpSuccess) {
            action();
        }
    }, [verifyExistingOtpSuccess]);
    const handleInputKeyPress = (event, inputIndex) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            event.preventDefault();
            handleInputChange(inputIndex, '');

            if (inputIndex > 0) {
                otpInputs.current[inputIndex - 1].focus(); // Move cursor to the previous input
            }
        }
    };

    const verifyOtp = (e) => {
        e.preventDefault();
        const data = {
            phoneNumber: '2348111062865',
            otp: typedOtp
        };
        verifyExistingOtp(data);
    };
    const ResetOtp = (e) => {
        e.preventDefault();
        resendExisitingOtp({
            phoneNumber: '2348111062865'
        });
    };

    return (
        <div className={styles.bodys}>
            <section className={styles.sections}>
                <div className={styles.existingBody}>
                    <h1 className={styles.header}>OTP Verification</h1>
                    {verifyExistingOtpErr ? (
                        <p className={styles.error}>Unable to Verify OTP</p>
                    ) : null}
                    {resendExisitingOtpErr ? (
                        <p className={styles.error}>Unable to send OTP</p>
                    ) : null}

                    <p className={styles.p}>
                        A one time Password has been sent to your registered
                        phone number please enter digits below.
                    </p>
                    <form>
                        <div className={styles.formInpt}>
                            {otpValues.map((value, index) => (
                                <input
                                    key={index}
                                    type="password"
                                    className="otp-input"
                                    maxLength="1"
                                    value={otpValues[index]}
                                    onInput={(e) =>
                                        handleInputChange(index, e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                        handleInputKeyPress(e, index)
                                    }
                                    ref={(input) =>
                                        (otpInputs.current[index] = input)
                                    }
                                />
                            ))}
                        </div>

                        <div className={styles.resendFlex}>
                            {resendExisitingOtpLoad ? (
                                <Loader />
                            ) : (
                                <p onClick={ResetOtp}>Resend OTP</p>
                            )}
                        </div>
                    </form>
                    <ButtonComp
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        onClick={verifyOtp}
                        type="submit"
                        text="Proceed"
                        loads={verifyExistingOtpLoad}
                    />
                </div>
            </section>
        </div>
    );
};

export default FirstStep;
