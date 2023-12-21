import { Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import { ButtonComp } from '../../../components';
import Visbility from '../../../components/ReusableComponents/Eyeysvg';
import OtpInput from '../../../components/ReusableComponents/Otpinput';
import LockSvg from '../../../components/ReusableComponents/ReusableSvgComponents/LockSvg';
import { useResetPasswordMutation } from '../../../redux/api/authApi';
import styles from './styles.module.css';

const ResetPassword = ({ submit, forgotPasswordErrorMessages, loading }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    const router = useRouter();
    const [outType, setOutType] = useState();
    const [outTypes, setOutTypes] = useState();
    const [otpValue, setOtpValue] = useState('');
    const types = (type) => {
        setOutTypes(type);
    };
    const type = (type) => {
        setOutType(type);
    };
    const handleOtpChange = (otp) => {
        setOtpValue(otp);
    };
    const initSchema = yup.object().shape({
        confnewPassword: yup
            .string()
            .required('Please confirm password')
            .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),

        newPassword: yup.string().required('Please enter your password')
    });
    const initialValues = {
        newPassword: '',
        otpValues: '',
        email: ''
    };
    const [
        resetPassword,
        {
            data: resetPasswordData,
            isLoading: resetPasswordLoad,
            isSuccess: resetPasswordSuccess,
            isError: resetPasswordFalse,
            error: resetPasswordErr,
            reset: resetPasswordReset
        }
    ] = useResetPasswordMutation();
    const showToastMessage = () => {
        toast.success('Password Reset Successfully', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
        router.push('/Auth/Login');
    };
    useEffect(() => {
        if (resetPasswordSuccess) {
            showToastMessage();
        }
    }, [resetPasswordSuccess]);
    const showToastErrorMessage = () => {
        toast.error('An error occured reseting password', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
    };
    useEffect(() => {
        if (resetPasswordErr) {
            showToastErrorMessage();
        }
    }, [resetPasswordErr]);

    const { resetPasswordslice } = useSelector((store) => store);
    return (
        <div className={styles.covWrapper}>
            <div className={styles.create}>
                <h2>Create New Password</h2>
                <p>
                    Your new password must be different from previous passwords
                    used.
                </p>
            </div>
            <ToastContainer />
            <Formik
                validationSchema={initSchema}
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting }) => {
                    // nextPage();
                    const data = {
                        email: resetPasswordslice,
                        token: otpValue,
                        newPassword: values?.newPassword
                    };
                    resetPassword(data);
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
                    <form className={styles.formCre} onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="newPassword">Email</label>
                            <div className={styles.divs}>
                                <LockSvg />
                                <input
                                    disabled
                                    name="email"
                                    placeholder="Email"
                                    onChange={(e) =>
                                        setFieldValue('email', e.target.value)
                                    }
                                    value={resetPasswordslice}
                                />
                                <Visbility typeSet={types} input="input" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="newPassword">OTP</label>
                            <div className={styles.Inpdivs}>
                                <OtpInput
                                    onOtpChange={handleOtpChange}
                                    otpfields={6}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="newPassword">New Password</label>
                            <div className={styles.divs}>
                                <LockSvg />
                                <input
                                    type={outTypes ? 'text' : 'password'}
                                    onChange={(e) =>
                                        setFieldValue(
                                            'newPassword',
                                            e.target.value
                                        )
                                    }
                                    value={values?.newPassword}
                                    name="newPassword"
                                    placeholder="Enter your Password"
                                />
                                <Visbility typeSet={types} input="input" />
                            </div>
                            <p className={styles.error}>
                                {errors ? <>{errors?.newPassword}</> : null}
                            </p>
                        </div>
                        <div>
                            <label htmlFor="confnewPassword">
                                Confirm New Password
                            </label>
                            <div className={styles.divs}>
                                <LockSvg />
                                <input
                                    onChange={(e) =>
                                        setFieldValue(
                                            'confnewPassword',
                                            e.target.value
                                        )
                                    }
                                    type={outType ? 'text' : 'password'}
                                    name="confnewPassword"
                                    placeholder="Confirm your Password"
                                />
                                <Visbility typeSet={type} input="input" />
                            </div>
                            <p className={styles.error}>
                                {errors ? <>{errors?.confnewPassword}</> : null}
                            </p>
                        </div>
                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            type="submit"
                            text="Create New Password"
                            loads={resetPasswordLoad}
                        />
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default ResetPassword;
