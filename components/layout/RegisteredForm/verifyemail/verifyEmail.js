import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import {
    useResendEmailOtpMutation,
    useVerifyEmailMutation
} from '../../../../redux/api/authApi';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import ButtonComp from '../../../ReusableComponents/Button';
import VerifyEmailSvg from '../../../ReusableComponents/VerifyEmailSvg';
import ProfileSetupSide from '../../../ReusableComponents/ProfileSetupSide';
import { setProfile } from '../../../../redux/slices/profile';

const VerifyEmail = ({ nextStep }) => {
    const router = useRouter();
    const [activeBtn, setActiveBtn] = useState(true);
    const [
        resendEmailOtp,
        {
            data: resendEmailOtpData,
            isLoading: resendEmailOtpLoad,
            isSuccess: resendEmailOtpSuccess,
            isError: resendEmailOtpFalse,
            error: resendEmailOtpErr,
            reset: resendEmailOtpReset
        }
    ] = useResendEmailOtpMutation();
    const [
        verifyEmail,
        {
            data: verifyEmailData,
            isLoading: verifyEmailLoad,
            isSuccess: verifyEmailSuccess,
            isError: verifyEmailFalse,
            error: verifyEmailErr,
            reset: verifyEmailReset
        }
    ] = useVerifyEmailMutation();

    const otpLength = 6;
    const [otpValues, setOtpValues] = useState(Array(otpLength).fill(''));
    const [otpData, setOtpData] = useState('');
    const otpInputs = useRef([]);

    const handleInputChange = (inputIndex, value) => {
        const newOtpValues = [...otpValues];
        newOtpValues[inputIndex] = value;
        setOtpValues(newOtpValues);

        // Concatenate the values to form the OTP string
        const myOtp = newOtpValues.join('');

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
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const handleProceed = async (val) => {
        nextStep();
    };

    useEffect(() => {
        if (verifyEmailSuccess) {
            handleProceed(verifyEmailData);
            setLoading(false);
        }
    }, [verifyEmailSuccess, verifyEmailErr]);
    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const data = {
            token: otpData
        };
        console.log(data);
        verifyEmail(data);
    };
    return (
        <div className={styles.verifyCov}>
            <section className={styles.sectionI}>
                <ProfileSetupSide text="Checkout Priceless opportunities Be ahead" />
            </section>
            <div className={styles.verCovOuter}>
                <div className={styles.verybody}>
                    <VerifyEmailSvg />

                    <form onSubmit={handleSubmit}>
                        <p className={styles.error}>
                            {' '}
                            {verifyEmailErr
                                ? verifyEmailErr?.data?.message
                                : null}
                        </p>
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
                                            (otpInputs.current[index] = input)
                                        }
                                    />
                                </>
                            ))}
                        </div>
                        <div className={styles.veriEmaillTxt}>
                            <h3 className={styles.verifyEmail}>
                                Verify your Email
                            </h3>
                        </div>
                        <p className={styles.error}>
                            {resendEmailOtpErr
                                ? resendEmailOtpErr?.data?.message
                                : null}
                        </p>
                        {resendEmailOtpSuccess ? (
                            <p className={styles.hi}>Email Has Been Resent</p>
                        ) : (
                            <p className={styles.hi}>
                                An Email has been sent to your email
                                account,Please check your inbox and verify your
                                email.
                            </p>
                        )}
                        <div className={styles.resendEmail}>
                            <p>
                                Didint get mail
                                <span
                                    onClick={() => {
                                        const emailData = {
                                            email: localStorage.getItem('email')
                                        };
                                        resendEmailOtp(emailData);
                                    }}
                                >
                                    {' '}
                                    tap to resend Email
                                </span>
                            </p>
                        </div>
                        <div>
                            <ButtonComp
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
                                type="submit"
                                text="Verify OTP"
                                loads={verifyEmailLoad}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
