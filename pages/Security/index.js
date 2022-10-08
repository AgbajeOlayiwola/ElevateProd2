import { getCookie } from 'cookies-next';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DashLayout from '../../components/layout/Dashboard';
import ProfileLayout from '../../components/layout/ProfileLayout';
import BeneSvg from '../../components/ReusableComponents/BeneSvg';
import CustomerSingle from '../../components/ReusableComponents/CustomerSingle';
import EditProfileSvg from '../../components/ReusableComponents/ReusableSvgComponents/EditProfileSvg';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadresetPassword } from '../../redux/actions/actions';
import Visbility from '../../components/ReusableComponents/Eyeysvg';
import Loader from '../../components/ReusableComponents/Loader';
import validator from 'validator';
import { useEffect } from 'react';

const Security = () => {
    const dispatch = useDispatch();
    const { resetPassword, errorMessageresetPassword } = useSelector(
        (state) => state.resetPasswordReducer
    );
    const [error, setError] = useState('');
    const [errorMessages, setErrorMessages] = useState('');
    const [text, setText] = useState('Change Transaction Pin');
    const [password, setPassword] = useState('');
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
    const changePassword = (data) => {
        setLoading(true);
        const loginToken = getCookie('cookieToken');
        console.log(loginToken);
        const changePasswordData = {
            token: loginToken,
            password: data.newPassword,
            confirmPassword: data.confirmPassword
        };
        dispatch(loadresetPassword(changePasswordData));
    };

    const resetPasswordCheck = () => {
        if (resetPassword !== null) {
            console.log(resetPassword);
            setLoading(false);
        } else if (errorMessageresetPassword !== null) {
            console.log(errorMessageresetPassword);
            setLoading(false);
        }
    };

    useEffect(() => {
        resetPasswordCheck();
    }, [errorMessageresetPassword, resetPassword]);
    const renderForm = () => {
        switch (text) {
            case 'Change Transaction Pin':
                return (
                    <form>
                        <h2 className={styles.title}>Transaction Pin</h2>
                        <div className={styles.groupForm}>
                            <div className={styles.formGroup}>
                                <label>Old Transaction Pin</label>
                                <input
                                    type="password"
                                    placeholder="Old Transaction Pin"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>New Transaction Pin</label>
                                <input
                                    type="text"
                                    placeholder="New Transaction Pin"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Confirm Transaction Pin</label>
                                <input
                                    type="text"
                                    placeholder="Confirm Transaction Pin"
                                />
                            </div>
                        </div>
                        <div className={styles.profileBody}>
                            <button type="submit">Update</button>
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
                                    type="text"
                                    placeholder="Old Password"
                                    {...register('oldPassword', {
                                        required: 'Old Password is Required'
                                    })}
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
        <DashLayout text="Security">
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
                            }}
                        />
                    );
                })}
            >
                {renderForm()}
            </ProfileLayout>
        </DashLayout>
    );
};

export default Security;
