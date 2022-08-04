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
                <p>Password Reset</p>
            </div>
            <div>
                <p>
                    We have sent a password recover instructions to your email.
                </p>
            </div>
            <Link href="../Auth/Login">
                <ButtonComp
                    disabled={activeBtn}
                    active={activeBtn ? 'active' : 'inactive'}
                    type="submit"
                    text="Close"
                />
            </Link>
        </div>
    );
};

export default EmailSent;
