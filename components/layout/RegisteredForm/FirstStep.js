import React from 'react';
import OtpInput from '../../ReusableComponents/Otpinput';
import { ResetOTP } from '../NotRegisteredForms/StepTwoBVNAuthenticator/styles.module';
import styles from './styles.module.css';

const FirstStep = () => {
    return (
        <div className={styles.stepFour}>
            <h1 className={styles.header}>Phone Number (OTP) Authenticator</h1>
            <p className={styles.p}>
                An OTP has been sent to your Phone number registered with phone.
                Please enter the OTP below to complete your profile.
            </p>
            <form>
                <OtpInput />
                <div className={styles.resendFlex}>
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
                </div>
            </form>
        </div>
    );
};

export default FirstStep;
