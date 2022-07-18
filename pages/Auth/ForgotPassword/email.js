import React, { useState } from 'react';
import { ButtonComp } from '../../../components';
import Card from '../../../components/layout/NotRegisteredForms/Card/index';
import styles from './styles.module.css';
import * as IoIcons from 'react-icons/io';
const ForgotPassword = () => {
    const [activeBtn, setActiveBtn] = useState(true);
    return (
        <>
            <div className={styles.back}>
                <div>
                    <IoIcons.IoMdArrowBack />
                </div>
                <p>Reset Password</p>
            </div>
            <div className={styles.emailP}>
                Enter the email registered with your account and instructions to
                reset your password will be sent to your email.
            </div>
            <form className={styles.form}>
                <label htmlFor="email">Enter your Email</label>
                <input
                    type="text"
                    name="email"
                    placeholder="username@gmail.com"
                />
            </form>
        </>
    );
};

export default ForgotPassword;
