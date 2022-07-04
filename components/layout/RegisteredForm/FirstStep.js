import React from 'react';
import OtpInput from '../../ReusableComponents/Otpinput';
import styles from './styles.module.css';

const FirstStep = () => {
    return (
        <div>
            <h1 className={styles.header}>Phone Number (OTP) Authenticator</h1>
            <p className={styles.p}>
                An OTP has been sent to your Phone number registered with phone.
                Please enter the OTP below to complete your profile.
            </p>
            <OtpInput />
        </div>
    );
};

export default FirstStep;
