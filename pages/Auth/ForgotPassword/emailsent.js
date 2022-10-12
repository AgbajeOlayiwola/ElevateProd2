import React, { useState } from 'react';
import { ButtonComp } from '../../../components';
import styles from './styles.module.css';
import Link from 'next/link';
import ResetPasswordSvg from '../../../components/ReusableComponents/ResetPasswordMessageSvg';

const EmailSent = () => {
    const [activeBtn, setActiveBtn] = useState(true);
    return (
        <div className={styles.emailSent}>
            <div>
                <ResetPasswordSvg />
            </div>
            <h2 className={styles.check}>Check your Email</h2>
            <p className={styles.recover}>
                We have sent a password recovery instructions to your email.
            </p>
        </div>
    );
};

export default EmailSent;
