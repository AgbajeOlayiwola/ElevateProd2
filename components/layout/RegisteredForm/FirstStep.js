import React, { useState, useEffect, useRef } from 'react';
import ButtonComp from '../../ReusableComponents/Button';
import OtpInput from '../../ReusableComponents/Otpinput';
import ProfileSetupSide from '../../ReusableComponents/ProfileSetupSide';
import { ResetOTP } from '../NotRegisteredForms/StepTwoBVNAuthenticator/styles.module';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetOtpData } from '../../../redux/actions/resetOtpAction';
import { useRouter } from 'next/router';
const FirstStep = ({
    handleSubmit,
    action,
    loads,
    setFormData,
    formData,
    otpError
}) => {
    const [activeBtn, setActiveBtn] = useState(true);
    const { resetOtp, resetOtpErrorMessages } = useSelector(
        (state) => state.resetOtpReducer
    );

    const dispatch = useDispatch();
    const router = useRouter();
    if (typeof window !== 'undefined') {
        let accounts = window.localStorage.getItem('account');
        var newAccounts = JSON.parse(accounts);
        let loginWith = localStorage.getItem('LoginWith');
        // //console.log(loginWith);
        // //console.log(newAccounts.user.email);
    }
    const userId = () => {
        if (newAccounts.userId != undefined) {
            return newAccounts.userId;
        } else {
            return newAccounts.user.userId;
        }
    };
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

        setFormData({ ...formData, otp: myOtp });
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
    const ResetOtp = (e) => {
        const data = {
            userId: userId()
        };
        dispatch(resetOtpData(data));
    };

    // useEffect(() => {
    //     setOtpString('');
    // }, [resetOtp, resetOtpErrorMessages]);

    return (
        <div className={styles.bodys}>
            <section className={styles.sections}>
                <div className={styles.existingBody}>
                    <h1 className={styles.header}>OTP Verification</h1>
                    {otpError ? (
                        <p className={styles.error}>{otpError}</p>
                    ) : null}
                    {resetOtpErrorMessages ? (
                        <p>{resetOtpErrorMessages.response.data.message}</p>
                    ) : (
                        <p>{resetOtp?.data.message}</p>
                    )}

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
                            <p onClick={ResetOtp}>Resend OTP</p>

                            <button
                                // onClick={clear}
                                style={{ cursor: 'pointer' }}
                                className={styles.clr}
                                type="reset"
                            >
                                Clear
                            </button>
                        </div>
                    </form>
                    <ButtonComp
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        onClick={action}
                        type="submit"
                        text="Proceed"
                    />
                </div>
            </section>
        </div>
    );
};

export default FirstStep;
