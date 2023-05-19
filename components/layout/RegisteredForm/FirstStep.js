import React, { useState, useEffect } from 'react';
import ButtonComp from '../../ReusableComponents/Button';
import OtpInput from '../../ReusableComponents/Otpinput';
import ProfileSetupSide from '../../ReusableComponents/ProfileSetupSide';
import { ResetOTP } from '../NotRegisteredForms/StepTwoBVNAuthenticator/styles.module';
import styles from './styles.module.css';
import { resetOtpData } from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
const FirstStep = ({
    handleSubmit,
    action,
    loads,
    setFormData,
    formData,
    otpError
}) => {
    const [activeBtn, setActiveBtn] = useState(true);

    const numOfFields = 6;
    const { resetOtp, resetOtpErrorMessages } = useSelector(
        (state) => state.resetOtpReducer
    );
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
    const dispatch = useDispatch();
    if (typeof window !== 'undefined') {
        let accounts = window.localStorage.getItem('account');
        var newAccounts = JSON.parse(accounts);
        let loginWith = localStorage.getItem('LoginWith');
        //console.log(loginWith);
        //console.log(newAccounts.user.email);
    }
    const userId = () => {
        if (newAccounts.userId != undefined) {
            return newAccounts.userId;
        } else {
            return newAccounts.user.userId;
        }
    };
    useEffect(() => {
        if (ssnValues.length !== 1) {
            setFormData({ ...formData, otp: ssnValues.join('') });
        }
    }, [ssnValues]);
    const ResetOtp = (e) => {
        setValue((ssnValues) => ['']);
        // document.querySelector();
        const data = {
            userId: userId()
        };
        dispatch(resetOtpData(data));
        //console.logresetOtp, resetOtpErrorMessages);
    };
    const clear = () => {
        setValue((ssnValues) => ['']);
    };
    useEffect(() => {
        setValue((ssnValues) => ['']);
    }, [resetOtp, resetOtpErrorMessages]);

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
                            <p onClick={ResetOtp}>Resend OTP</p>

                            <button
                                onClick={clear}
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
