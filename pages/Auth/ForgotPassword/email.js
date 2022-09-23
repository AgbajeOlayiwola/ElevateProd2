import React, { useState } from 'react';
import { ButtonComp } from '../../../components';
import Card from '../../../components/layout/NotRegisteredForms/Card/index';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import ArrowBackSvg from '../../../components/ReusableComponents/ArrowBackSvg';
import { useRouter } from 'next/router';
const ForgotPassword = () => {
    const [emailError, setEmailError] = useState('');
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const onTypes = () => {
        console.log(errors.email?.message);
    };
    const router = useRouter();

    return (
        <>
            <div className={styles.back}>
                <ArrowBackSvg
                    action={() => {
                        router.push('../Auth/Login');
                    }}
                    color="#102572"
                />
                <p>Reset Password</p>
            </div>
            <div className={styles.emailP}>
                <p>
                    Enter the email registered with your account and
                    instructions to reset your password will be sent to your
                    email.
                </p>
            </div>
            <form className={styles.form}>
                <label htmlFor="email">Email Address</label>
                <input
                    type="text"
                    name="email"
                    placeholder="username@gmail.com"
                    {...register('email', {
                        pattern: {
                            // eslint-disable-next-line
                            value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Invalid email address'
                        }
                    })}
                    onChange={() => console.log(errors.email?.message)}
                />
                <div className={styles.errors}>{emailError}</div>
            </form>
        </>
    );
};

export default ForgotPassword;
