import React, { useState, useEffect } from 'react';
import ButtonComp from '../../ReusableComponents/Button';
// import { RegisteredCardWrapper } from './styles.module';
import { useForm } from 'react-hook-form';
import Card from '../NotRegisteredForms/Card';
import Visbility from '../../ReusableComponents/Eyeysvg';
import styles from './styles.module.css';
import validator from 'validator';
import { existingUserProfileData } from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../ReusableComponents/Loader';

const RegisteredForm = ({ handleShowSecondStep, onSubmit }) => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const account = localStorage.getItem('account');
    const accountDetails = JSON.parse(account);
    const [activeBtn, setActiveBtn] = useState(true);
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState('');
    const [errorMessages, setErrorMessages] = useState('');
    const [loading, setLoading] = useState(false);
    const { existingUserProfile, errorMessage } = useSelector(
        (state) => state.existingUserProfileReducer
    );
    const handlePaswword = (e) => {
        setCount(e.target.value.length);
        setConfPassword(e.target.value);
        if (password != confPassword) {
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
        let meta = accountDetails.data.meta;
        meta = { ...meta, password: e.target.value };
        window.localStorage.setItem('meta', JSON.stringify(meta));
    };

    // const onSubmit = (data) => {
    // setLoading(true);
    // console.log(data);

    // const userData = {
    //     email: data.email,
    //     password: password,
    //     confirmPassword: confPassword
    // };
    // dispatch(existingUserProfileData(userData));
    // };

    // const profileTest = () => {
    //     if (errorMessage) {
    // setError(errorMessage);
    // console.log(errorMessage);
    // setLoading(false);
    // } else if (existingUserProfile.message === 'SUCCESS') {
    //     alert('Success');
    //     setLoading(false);
    // router.push('/Onboarding/ExistingProfileSetup');
    //     }
    // };
    // useEffect(() => {
    //     profileTest();
    // }, [errorMessage, existingUserProfile]);
    const types = (type) => {
        setOutType(type);
    };
    const [count, setCount] = useState([]);
    const [outType, setOutType] = useState();
    return (
        <>
            <h1 className={styles.header}>Profile Setup</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* include validation with required or other standard HTML validation rules */}
                <div className={styles.textInput}>
                    <label>Email Address </label>
                    {errors.email?.message}
                    <br />

                    <input
                        placeholder="Enter Your Email"
                        className={styles.textInput}
                        required
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                // eslint-disable-next-line
                                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Invalid email address'
                            }
                        })}
                        readOnly
                        value={accountDetails.data.meta.email.toLowerCase()}
                    />
                </div>

                <div className={styles.textInput}>
                    <label>Password</label>
                    <br />
                    <div className={styles.divs}>
                        <input
                            placeholder="Confirm Password"
                            className={styles.textInput}
                            required
                            type={outType ? 'text' : 'password'}
                            onChange={handlePwd}
                        />
                        <Visbility typeSet={types} />
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
                </div>

                <div className={styles.textInput}>
                    <label>Confirm Password</label>
                    <br />
                    <div className={styles.divs}>
                        <input
                            placeholder="Confirm Password"
                            className={styles.textInput}
                            required
                            type={outType ? 'text' : 'password'}
                            onChange={handlePaswword}
                        />

                        <Visbility typeSet={types} />
                    </div>
                    {password === confPassword ? null : (
                        <p className={styles.error}>{passwordMatch}</p>
                    )}
                </div>
                {loading ? (
                    <Loader />
                ) : (
                    <ButtonComp
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        // onClick={handleSubmit}
                        type="submit"
                        text="Next"
                    />
                )}
            </form>
        </>
    );
};

export default RegisteredForm;
