import React from 'react';
import OtpInput from '../../ReusableComponents/Otpinput';
import styles from './styles.module.css';

const FirstStep = () => {
    return (
        <div>
            <h1 className={styles.header}>(OTP) Authentiator</h1>
            <OtpInput />
        </div>
    );
};

export default FirstStep;
