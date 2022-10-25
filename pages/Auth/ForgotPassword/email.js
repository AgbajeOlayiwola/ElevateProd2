import React, { useState, useEffect } from 'react';
import { ButtonComp } from '../../../components';
import Card from '../../../components/layout/NotRegisteredForms/Card/index';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import ArrowBackSvg from '../../../components/ReusableComponents/ArrowBackSvg';
import { useRouter } from 'next/router';
import MailSvg from '../../../components/ReusableComponents/ReusableSvgComponents/MailSvg';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordData } from '../../../redux/actions/actions';
const ForgotPassword = () => {
    const [activeBtn, setActiveBtn] = useState(true);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const checkDataContent = (e) => {
        setEmail(e.target.value);
    };
    const [email, setEmail] = useState('');
    const { forgotPassword, forgotPasswordErrorMessages } = useSelector(
        (state) => state.fogrotPasswordReducer
    );
    const dispatch = useDispatch();
    const router = useRouter();
    const onSubmit = (data) => {
        const forgotPassworEmail = {
            email
        };

        dispatch(forgotPasswordData(forgotPassworEmail));

        //console.logforgotPassword, forgotPasswordErrorMessages);
        // fogrotPasswordReducer
    };
    useEffect(() => {
        //console.logforgotPassword);
        //console.logforgotPasswordErrorMessages);
    }, [forgotPassword, forgotPasswordErrorMessages]);
    // if (forgotPassword) {
    //     if (forgotPassword.data.message === 'password reset email sent') {
    //         router.push('./ForgotPassword/emailsent');
    //     } else {
    //         router.push('../../Onboarding/ProfileSetup');
    //     }
    // } else {
    //     //console.log'hg');
    // }

    return (
        <>
            {forgotPassword ? <p>{forgotPassword.data.message}</p> : null}
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
                {forgotPasswordErrorMessages ? (
                    <p className={styles.errors}>
                        {forgotPasswordErrorMessages.response.data.message}
                    </p>
                ) : null}
                <p>
                    Enter the email registered with your account and
                    instructions to reset your password will be sent to your
                    email.
                </p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email Address</label>
                <div className={styles.divs}>
                    <MailSvg />
                    <input
                        type="text"
                        name="email"
                        placeholder="Enter your Email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Invalid email address'
                            }
                        })}
                        onChange={checkDataContent}
                    />
                </div>
                <p className={styles.errors}>{errors.email?.message}</p>
                <ButtonComp
                    disabled={activeBtn}
                    active={activeBtn ? 'active' : 'inactive'}
                    onClick={handleSubmit}
                    type="submit"
                    text="Reset Password"
                />
            </form>
        </>
    );
};

export default ForgotPassword;
