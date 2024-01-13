import { Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { ButtonComp } from '../../../components';
import ArrowBackSvg from '../../../components/ReusableComponents/ArrowBackSvg';
import MailSvg from '../../../components/ReusableComponents/ReusableSvgComponents/MailSvg';
import { useForgotPasswordMutation } from '../../../redux/api/authApi';
import { setResetPassword } from '../../../redux/slices/resetpasswordslice';
import styles from './styles.module.css';
const ForgotPassword = ({ onSubmit, forgotPasswordErrorMessages, onMove }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const initSchema = yup.object().shape({
        email: yup
            .string()
            .trim()
            .email('Enter a valid email')
            .required('Email is required')
    });

    const initialValues = {
        email: ''
    };
    const [
        forgotPassword,
        {
            data: forgotPasswordData,
            isLoading: forgotPasswordLoad,
            isSuccess: forgotPasswordSuccess,
            isError: forgotPasswordFalse,
            error: forgotPasswordErr,
            reset: forgotPasswordReset
        }
    ] = useForgotPasswordMutation();

    useEffect(() => {
        // console.log(forgotPasswordErr);
        if (forgotPasswordSuccess) {
            onMove();
        } else if (forgotPasswordErr) {
            setLoading(false);
        }
    }, [forgotPasswordSuccess]);

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
            <p className={styles.error}>
                {forgotPasswordErr ? forgotPasswordErr?.data?.message : null}
            </p>
            <div className={styles.emailP}>
                <p>
                    Enter the email registered with your account and
                    instructions to reset your password will be sent to your
                    email.
                </p>
            </div>
            <Formik
                validationSchema={initSchema}
                initialValues={initialValues}
                // validateOnChange={true}
                onSubmit={(values, { setSubmitting }) => {
                    forgotPassword(values);
                    dispatch(setResetPassword(values?.email));
                    setLoading(true);
                    setSubmitting(false);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    setFieldValue,
                    handleSubmit
                }) => (
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label htmlFor="email">Email Address</label>
                        <div className={styles.divs}>
                            <MailSvg />
                            <input
                                type="text"
                                onChange={(e) => {
                                    setFieldValue('email', e.target.value);
                                }}
                                name="email"
                            />
                        </div>
                        <p className={styles.error}>
                            {errors ? <>{errors?.email}</> : null}
                        </p>
                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            onClick={handleSubmit}
                            type="submit"
                            text="Reset Password"
                            loads={loading}
                        />
                    </form>
                )}
            </Formik>
        </>
    );
};

export default ForgotPassword;
