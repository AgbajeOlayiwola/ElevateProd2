import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DashLayout from '../../components/layout/Dashboard';
import ProfileLayout from '../../components/layout/ProfileLayout';
import BeneSvg from '../../components/ReusableComponents/BeneSvg';
import CustomerSingle from '../../components/ReusableComponents/CustomerSingle';
import EditProfileSvg from '../../components/ReusableComponents/ReusableSvgComponents/EditProfileSvg';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    loadresetPassword,
    loadchangeTransactionPin
} from '../../redux/actions/actions';
import Visbility from '../../components/ReusableComponents/Eyeysvg';
import Loader from '../../components/ReusableComponents/Loader';
import validator from 'validator';
import { useEffect } from 'react';
import PaymentSuccess from '../../components/ReusableComponents/PopupStyle';

const Security = () => {
    const dispatch = useDispatch();
    const { resetPassword, errorMessageresetPassword } = useSelector(
        (state) => state.resetPasswordReducer
    );
    const { changeTransactionPin, changeTransactionPinError } = useSelector(
        (state) => state.changeTransactionPinReducer
    );
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
    const handlePaswword = (e) => {
        setCount(e.target.value.length);
        setConfPassword(e.target.value);
        if (password != confirmPassword) {
            setPasswordMatch('Passwords do not match');
        }
    };
    const handlePwd = (e) => {
        setCount(e.target.value.length);
        if (
            validator.isStrongPassword(e.target.value, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            })
        ) {
            setErrorMessages(' Strong');
        } else if (
            validator.isStrongPassword(e.target.value, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 0,
                minNumbers: 1,
                minSymbols: 0
            })
        ) {
            setErrorMessages('Medium');
        } else {
            setErrorMessages('Weak');
        }
        setPassword(e.target.value);
        if (e.target.value === '') {
            setErrorMessages('');
        }
    };
    const handleNewPin = (e) => {
        setCount(e.target.value.length);
        setConfPin(e.target.value);
        if (pin !== confirmPin) {
            setPasswordMatch('Pin do not match');
        }
    };
    const handlePin = (e) => {
        setPin(e.target.value);
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
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const changePin = (data) => {
        setLoading(true);
        const changePinData = {
            oldPin: data.oldPin,
            newPin: data.newPin,
            confirmPin: data.confirmPin
        };
        dispatch(loadchangeTransactionPin(changePinData));
    };

    const resetPinCheck = () => {
        if (changeTransactionPin !== null) {
            //console.logchangeTransactionPin);
            setLoading(false);
            setMessage('Pin Changed Successfully');
            setStatusbar('success');
            setOutcome(true);
        } else if (changeTransactionPinError !== null) {
            //console.logchangeTransactionPinError);
            setLoading(false);
            setMessage(changeTransactionPinError);
            setOutcome(true);
            setStatusbar('error');
        }
    };

    useEffect(() => {
        resetPinCheck();
    }, [changeTransactionPinError, changeTransactionPin]);
    const changePassword = (data) => {
        setLoading(true);
        const changePasswordData = {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword
        };
        if (data.oldPassword === data.newPassword) {
            setMessage('New password cannot be the same as Old password');
            setOutcome(true);
            setStatusbar('error');
            setLoading(false);
        } else {
            dispatch(loadresetPassword(changePasswordData));
        }
    };

    const resetPasswordCheck = () => {
        if (resetPassword !== null) {
            //console.logresetPassword);
            setLoading(false);
            setMessage('Password Changed Successfully');
            setStatusbar('success');
            setOutcome(true);
        } else if (errorMessageresetPassword !== null) {
            //console.logerrorMessageresetPassword);
            setLoading(false);
            setMessage(errorMessageresetPassword);
            setOutcome(true);
            setStatusbar('error');
        }
    };

    useEffect(() => {
        resetPasswordCheck();
    }, [errorMessageresetPassword, resetPassword]);
    const renderForm = () => {
        switch (text) {
            case 'Change Transaction Pin':
                return (
                    <form onSubmit={handleSubmit(changePin)}>
                        <h2 className={styles.title}>Transaction Pin</h2>
                        <div className={styles.groupForm}>
                            <div className={styles.formGroup}>
                                <label>Old Transaction Pin</label>
                                <input
                                    type="password"
                                    placeholder="Old Transaction Pin"
                                    {...register('oldPin', {
                                        required:
                                            'Old Transaction Pin is Required'
                                    })}
                                    value={oldTransactionPin}
                                    onInput={(e) => {
                                        setOldTransactionPin(e.target.value);
                                    }}
                                />
                                <p className={styles.error}>
                                    {errors?.oldPin?.message}
                                </p>
                            </div>
                            <div className={styles.formGroup}>
                                <label>New Transaction Pin</label>
                                <div className={styles.divs}>
                                    <input
                                        type={outType ? 'text' : 'password'}
                                        placeholder="New Transaction Pin"
                                        {...register('newPin', {
                                            required: 'New Pin is Required'
                                        })}
                                        value={pin}
                                        onInput={handlePin}
                                    />
                                    <Visbility typeSet={types} />
                                </div>
                                <p className={styles.error}>
                                    {errors?.newPin?.message}
                                </p>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Confirm Transaction Pin</label>
                                <div className={styles.divs}>
                                    <input
                                        type={outTyped ? 'text' : 'password'}
                                        placeholder="Confirm Transaction Pin"
                                        {...register('confirmPin', {
                                            required: 'Confirm Pin is Required'
                                        })}
                                        value={confirmPin}
                                        onChange={handleNewPin}
                                    />
                                    <Visbility typeSet={typed} />
                                </div>
                                {pin == confirmPin ? null : (
                                    <p className={styles.error}>
                                        {passwordMatch}
                                    </p>
                                )}
                                <p className={styles.error}>
                                    {errors?.confirmPin?.message}
                                </p>
                            </div>
                        </div>
                        <div className={styles.profileBody}>
                            {loading ? (
                                <Loader />
                            ) : (
                                <button type="submit">Update</button>
                            )}
                        </div>
                    </form>
                );
            case 'Change Password':
                return (
                    <form onSubmit={handleSubmit(changePassword)}>
                        <h2 className={styles.title}>New Password</h2>
                        <div className={styles.groupForm}>
                            <div className={styles.formGroup}>
                                <label>Old Password</label>
                                <input
                                    type="password"
                                    placeholder="Old Password"
                                    {...register('oldPassword', {
                                        required: 'Old Password is Required'
                                    })}
                                    value={oldPassword}
                                    onInput={(e) => {
                                        setOldPassword(e.target.value);
                                    }}
                                />
                                <p className={styles.error}>
                                    {errors?.oldPassword?.message}
                                </p>
                            </div>
                            <div className={styles.formGroup}>
                                <label>New Password</label>
                                <div className={styles.divs}>
                                    <input
                                        type={outType ? 'text' : 'password'}
                                        placeholder="New Password"
                                        {...register('newPassword', {
                                            required: 'New Password is Required'
                                        })}
                                        value={password}
                                        onInput={handlePwd}
                                    />
                                    <Visbility typeSet={types} />
                                </div>
                                <p className={styles.error}>
                                    {errors?.newPassword?.message}
                                </p>
                            </div>
                            {errorMessages === '' ? null : (
                                <div className={styles.errorCont}>
                                    <div
                                        className={
                                            errorMessages === 'Strong'
                                                ? styles.strong
                                                : errorMessages === 'Medium'
                                                ? styles.medium
                                                : errorMessages === 'Weak'
                                                ? styles.errors
                                                : styles.strong
                                        }
                                    >
                                        <p>{errorMessages}</p>
                                    </div>
                                </div>
                            )}
                            <div className={styles.formGroup}>
                                <label>Confirm Password</label>
                                <div className={styles.divs}>
                                    <input
                                        placeholder="Confirm Password "
                                        type={outTyped ? 'text' : 'password'}
                                        {...register('confirmPassword', {
                                            required:
                                                'Confirm Password is Required'
                                        })}
                                        value={confirmPassword}
                                        onChange={handlePaswword}
                                    />
                                    <Visbility typeSet={typed} />
                                </div>
                                {password == confirmPassword ? null : (
                                    <p className={styles.error}>
                                        {passwordMatch}
                                    </p>
                                )}
                                <p className={styles.error}>
                                    {errors?.confirmPassword?.message}
                                </p>
                            </div>
                        </div>
                        <div className={styles.profileBody}>
                            {loading ? (
                                <Loader />
                            ) : (
                                <button type="submit">Update</button>
                            )}
                        </div>
                    </form>
                );
        }
    };
    return (
        <DashLayout page="Security">
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
        </DashLayout>
    );
};

export default Security;
