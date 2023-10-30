import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import { ButtonComp } from '../../../components';
import BeneSvg from '../../../components/ReusableComponents/BeneSvg';
import CustomerSingle from '../../../components/ReusableComponents/CustomerSingle';
import Visbility from '../../../components/ReusableComponents/Eyeysvg';
import OtpInput from '../../../components/ReusableComponents/Otpinput';
import PaymentSuccess from '../../../components/ReusableComponents/PopupStyle';
import EditProfileSvg from '../../../components/ReusableComponents/ReusableSvgComponents/EditProfileSvg';
import ProfileLayout from '../../../components/layout/ProfileLayout';
import {
    useChangePasswordMutation,
    useUpdateTransactionPinMutation
} from '../../../redux/api/authApi';
import styles from './styles.module.css';

const Security = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [errorMessages, setErrorMessages] = useState('');
    const [outcome, setOutcome] = useState(false);
    const [message, setMessage] = useState('');
    const [statusbar, setStatusbar] = useState('');
    const [text, setText] = useState('Change Transaction Pin');
    const [password, setPassword] = useState('');
    const [pin, setPin] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [oldTransactionPin, setOldTransactionPin] = useState('');
    const [confirmPin, setConfPin] = useState('');
    const [confirmPassword, setConfPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState([]);
    const [outType, setOutType] = useState();
    const [outTyped, setOutTyped] = useState();
    const [passwordMatch, setPasswordMatch] = useState('');
    const types = (type) => {
        setOutType(type);
    };
    const typed = (type) => {
        setOutTyped(type);
    };

    const profileData = [
        {
            text: 'Change Transaction Pin',
            icon: <EditProfileSvg />,
            color: '#7A7978'
        },
        {
            text: 'Change Password',
            icon: <BeneSvg />,
            color: '#7A7978'
        }
    ];
    const [
        updateTransactionPin,
        {
            data: updateTransactionPinData,
            isLoading: updateTransactionPinLoad,
            isSuccess: updateTransactionPinSuccess,
            isError: updateTransactionPinFalse,
            error: updateTransactionPinErr,
            reset: updateTransactionPinReset
        }
    ] = useUpdateTransactionPinMutation();

    const [otpValue, setOtpValue] = useState('');
    const handleOtpChange = (otp) => {
        setOtpValue(otp);
    };
    const [confOtpValue, setConfOtpValue] = useState('');
    const handleConfOtpChange = (otp) => {
        setConfOtpValue(otp);
    };
    const changeOtp = (e) => {
        e.preventDefault();
        const data = {
            oldTransactionPin: otpValue,
            newTransactionPin: confOtpValue
        };
        updateTransactionPin(data);
    };

    const showSuccessToastMessage = () => {
        toast.success('Transaction Pin Updated ', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
        // closeAction();
    };
    useEffect(() => {
        if (updateTransactionPinSuccess) {
            showSuccessToastMessage();
        }
    }, [updateTransactionPinSuccess]);
    const showErroroastMessage = () => {
        toast.error(updateTransactionPinErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
        // closeAction();
    };
    useEffect(() => {
        if (updateTransactionPinErr) {
            showErroroastMessage();
        }
    }, [updateTransactionPinErr]);

    const initSchema = yup.object().shape({
        confirm_password: yup
            .string()
            .required('Please confirm password')
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
        password: yup.string().required('Please enter your old password'),
        new_password: yup.string().required('Enter your new password')
    });

    const initialValues = {
        password: '',
        confirm_password: '',
        new_password: ''
    };
    const [
        changePassword,
        {
            data: changePasswordData,
            isLoading: changePasswordLoad,
            isSuccess: changePasswordSuccess,
            isError: changePasswordFalse,
            error: changePasswordErr,
            reset: changePasswordReset
        }
    ] = useChangePasswordMutation();
    const showSuccessPassToastMessage = () => {
        toast.success('Transaction Pin Updated ', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
        // closeAction();
    };
    useEffect(() => {
        if (changePasswordSuccess) {
            showSuccessPassToastMessage();
        }
    }, [changePasswordSuccess]);
    const showErrorPassToastMessage = () => {
        toast.error(changePasswordErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
        // closeAction();
    };
    useEffect(() => {
        if (changePasswordErr) {
            showErrorPassToastMessage();
            console.log(changePasswordErr);
        }
    }, [changePasswordErr]);
    const renderForm = () => {
        switch (text) {
            case 'Change Transaction Pin':
                return (
                    <form>
                        <ToastContainer />
                        <div className={styles.otpInputs}>
                            <label>Old Transaction Pin</label>

                            <br />
                            <OtpInput
                                onOtpChange={handleOtpChange}
                                otpfields={6}
                            />
                        </div>
                        <br />
                        <br />
                        <div className={styles.otpInputs}>
                            <label>New Transaction Pin</label>
                            <br />
                            <OtpInput
                                onOtpChange={handleConfOtpChange}
                                otpfields={6}
                            />
                        </div>
                        <br />
                        <br />
                        <br />
                        <ButtonComp
                            disabled={true}
                            active={'active'}
                            text={'Change Transaction Pin'}
                            type="submit"
                            onClick={changeOtp}
                            loads={updateTransactionPinLoad}
                        />
                        <br />
                        <br />
                        <br />
                        <br />
                    </form>
                );
            case 'Change Password':
                return (
                    <Formik
                        validationSchema={initSchema}
                        initialValues={initialValues}
                        // validateOnChange={true}
                        onSubmit={(values, { setSubmitting }) => {
                            const data = {
                                currentPassword: values.password,
                                newPassword: values.new_password
                            };
                            changePassword(data);
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
                            <form onSubmit={handleSubmit}>
                                <ToastContainer />
                                <h2 className={styles.title}>New Password</h2>
                                <div className={styles.groupForm}>
                                    <div className={styles.formGroup}>
                                        <label>Old Password</label>
                                        <input
                                            type="password"
                                            placeholder="Old Password"
                                            onChange={(e) =>
                                                setFieldValue(
                                                    'password',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <p className={styles.error}>
                                        {errors ? (
                                            <>{errors?.password}</>
                                        ) : null}
                                    </p>
                                    <div className={styles.formGroup}>
                                        <label>New Password</label>
                                        <div className={styles.divs}>
                                            <input
                                                type={
                                                    outType
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                onChange={(e) =>
                                                    setFieldValue(
                                                        'new_password',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="New Password"
                                            />
                                            <Visbility
                                                typeSet={types}
                                                input="input"
                                            />
                                        </div>
                                    </div>
                                    <p className={styles.error}>
                                        {errors ? (
                                            <>{errors?.new_password}</>
                                        ) : null}
                                    </p>
                                    <PasswordStrengthBar
                                        password={values.new_password}
                                    />
                                    <div className={styles.formGroup}>
                                        <label>Confirm Password</label>
                                        <div className={styles.divs}>
                                            <input
                                                placeholder="Confirm Password "
                                                onChange={(e) =>
                                                    setFieldValue(
                                                        'confirm_password',
                                                        e.target.value
                                                    )
                                                }
                                                type={
                                                    outTyped
                                                        ? 'text'
                                                        : 'password'
                                                }
                                            />
                                            <Visbility
                                                typeSet={typed}
                                                input="input"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <p className={styles.error}>
                                    {errors ? (
                                        <>{errors?.confirm_password}</>
                                    ) : null}
                                </p>
                                <div className={styles.profileBody}>
                                    <ButtonComp
                                        disabled={true}
                                        active={'active'}
                                        text={'Change Password'}
                                        type="submit"
                                        loads={changePasswordLoad}
                                    />
                                </div>
                            </form>
                        )}
                    </Formik>
                );
        }
    };
    return (
        // <DashLayout page="Security">
        <ProfileLayout
            head={profileData?.map((profile, index) => {
                return (
                    <CustomerSingle
                        key={index}
                        profileText={profile.text}
                        icon={profile.icon}
                        color={profile.color}
                        action={() => {
                            setText(profile.text);
                            setCount(0);
                            setConfPassword('');
                            setConfPin('');
                            setOldPassword('');
                            setOldTransactionPin('');
                            setPin('');
                            setPassword('');
                            setPasswordMatch('');
                        }}
                    />
                );
            })}
        >
            {outcome ? (
                <PaymentSuccess
                    body={message}
                    error={message}
                    statusbar={statusbar}
                    overlay="true"
                    action={
                        statusbar === 'error'
                            ? () => {
                                  setOutcome(false);
                              }
                            : statusbar === 'success'
                            ? () => {
                                  setOutcome(false);
                                  setConfPassword('');
                                  setConfPin('');
                                  setOldPassword('');
                                  setOldTransactionPin('');
                                  setPin('');
                                  setPassword('');
                              }
                            : null
                    }
                    text="Retry"
                />
            ) : null}
            {renderForm()}
        </ProfileLayout>
    );
};

export default Security;
