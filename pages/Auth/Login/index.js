import React, { useState, useEffect } from 'react';
import { ButtonComp } from '../../../components';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Visbility from '../../../components/ReusableComponents/Eyeysvg';
import { useDispatch, useSelector } from 'react-redux';
import {
    auth2FaCodeDetails,
    loginUserAction
} from '../../../redux/actions/actions';
import { encrypt } from '../../../redux/helper/hash';
import Loader from '../../../components/ReusableComponents/Loader';
import ProfileSetupSide from '../../../components/ReusableComponents/ProfileSetupSide';
import LoginCircleSvg from '../../../components/ReusableComponents/ReusableSvgComponents/LoginCircleSvg';
import MailSvg from '../../../components/ReusableComponents/ReusableSvgComponents/MailSvg';
import LockSvg from '../../../components/ReusableComponents/ReusableSvgComponents/LockSvg';
import Modal from 'react-modal';
import OtpInput from '../../../components/ReusableComponents/Otpinput';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        height: '70vh',
        width: '60vw',
        color: '#3e3e3e',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

// Number of input fields that make up SSN

const Login = () => {
    const [activeBtn, setActiveBtn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [newUser, setNewUser] = useState();
    const [circle, setCircle] = useState(false);
    const [error, setError] = useState('');
    const [identifier, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [outType, setOutType] = useState();
    const dispatch = useDispatch();
    const router = useRouter();

    const { isLoading, user, errorMessages } = useSelector(
        (state) => state.auth
    );
    const { auth2FaCodeSuccess, auth2FaCodeError } = useSelector(
        (state) => state.auth2FaReducer
    );
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    //set password value
    const handlePwd = (e) => {
        setPassword(e.target.value);
    };
    //set email value
    const checkDataContent = (e) => {
        setEmail(e.target.value);
    };

    const onSubmit = (data) => {
        setError('');
        setLoading((prev) => !prev);
        const stringValues = ssnValues.join('');

        console.log(stringValues);
        const loginData = {
            MFAToken: user.data._2FAToken,
            otp: stringValues
        };
        dispatch(auth2FaCodeDetails(loginData));
        // dispatch(createNewUserAccount());
    };
    //console.log(user);
    const sentLogin = () => {
        if (errorMessages !== null) {
            setError(errorMessages);
            // setLoading(false);
            setLoading((prev) => !prev);
            // } else if (
            //     newAccountErrorMessage ===
            //     'You already have an account with us. Please contact us for more information'
            // ) {
            // router.push('/Dashboard');,
        } else if (user !== null) {
            setNewUser(auth2FaCodeSuccess);
            console.log(auth2FaCodeSuccess);
            if (auth2FaCodeSuccess.statusCode === 200) {
                if (
                    auth2FaCodeSuccess.data.data.user.profile
                        .createdFromEcobankCred === false
                ) {
                    if (
                        auth2FaCodeSuccess.data.data.user.profile
                            .customerCategory == 'COMMERCIAL'
                    ) {
                        if (
                            auth2FaCodeSuccess.data.data.user.profile
                                .profileSetupStatus ===
                            'PROFILE_SETUP_COMPLETED'
                        ) {
                            router.push('../../Verify/CorportateAccount');
                        } else if (
                            auth2FaCodeSuccess.data.data.user.profile
                                .profileSetupStatus ===
                            'AWAITING_ACCOUNT_NUMBER'
                        ) {
                            router.push('../../Verify/CorportateAccount');
                        } else if (
                            auth2FaCodeSuccess.data.data.user.profile
                                .profileSetupStatus ===
                            'ACCOUNT_NUMBER_RETRIEVED'
                        ) {
                            router.push('../../Dashboard');
                        } else {
                            router.push('../../Onboarding/ProfileSetup');
                        }
                    } else {
                        if (
                            auth2FaCodeSuccess.data.data.user.profile
                                .profileSetupStatus ===
                            'PROFILE_SETUP_COMPLETED'
                        ) {
                            router.push('../../Verify/Account/loading');
                        } else if (
                            auth2FaCodeSuccess.data.data.user.profile
                                .profileSetupStatus ===
                            'AWAITING_ACCOUNT_NUMBER'
                        ) {
                            router.push('../../Verify/Account/loading');
                        } else if (
                            auth2FaCodeSuccess.data.data.user.profile
                                .profileSetupStatus ===
                            'ACCOUNT_NUMBER_RETRIEVED'
                        ) {
                            router.push('../../Dashboard');
                        } else {
                            router.push('../../Onboarding/ProfileSetup');
                        }
                    }
                }
            }
            if (
                auth2FaCodeSuccess.data.data.user.profile
                    .createdFromEcobankCred === true
            ) {
                if (
                    auth2FaCodeSuccess.data.data.user.profile
                        .profileSetupStatus === 'PROFILE_SETUP_COMPLETED'
                ) {
                    window.localStorage.setItem(
                        'displayAccount',
                        JSON.stringify(auth2FaCodeSuccess.data.data.user)
                    );
                    window.localStorage.setItem(
                        'account',
                        JSON.stringify(
                            auth2FaCodeSuccess.data.data.user.profile
                        )
                    );
                    router.push('../../Dashboard');
                } else if (
                    auth2FaCodeSuccess.data.data.user.profile
                        .profileSetupStatus === 'PROFILE_SETUP'
                ) {
                    window.localStorage.setItem(
                        'displayAccount',
                        JSON.stringify(auth2FaCodeSuccess.data.data.user)
                    );
                    window.localStorage.setItem(
                        'account',
                        JSON.stringify(
                            auth2FaCodeSuccess.data.data.user.profile
                        )
                    );
                    router.push('/Onboarding/ExistingProfileSetup');
                }
                if (
                    auth2FaCodeSuccess.data.data.user.profile
                        .profileSetupStatus === 'AWAITING_ACCOUNT_NUMBER'
                ) {
                    window.localStorage.setItem(
                        'displayAccount',
                        JSON.stringify(auth2FaCodeSuccess.data.data.user)
                    );
                    window.localStorage.setItem(
                        'account',
                        JSON.stringify(
                            auth2FaCodeSuccess.data.data.user.profile
                        )
                    );
                    router.push('../../Verify/CorportateAccount');
                } else if (
                    auth2FaCodeSuccess.data.data.user.profile
                        .profileSetupStatus === 'ACCOUNT_NUMBER_RETRIEVED'
                ) {
                    window.localStorage.setItem(
                        'displayAccount',
                        JSON.stringify(auth2FaCodeSuccess.data.data.user)
                    );
                    window.localStorage.setItem(
                        'account',
                        JSON.stringify(
                            auth2FaCodeSuccess.data.data.user.profile
                        )
                    );
                    router.push('../../Dashboard');
                }
            }
        }
    };
    useEffect(() => {
        if (user) {
            console.log(user.data._2FAToken);
            setIsOpen(true);
        }
    }, [user]);

    useEffect(() => {
        sentLogin();
    }, [auth2FaCodeSuccess, auth2FaCodeError]);

    const types = (type) => {
        setOutType(type);
    };
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setError('');
        setLoading((prev) => !prev);
        const loginData = {
            identifier,
            password
        };
        dispatch(loginUserAction(loginData));
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    //console.log(user);
    //console.log(data); // watch input value by passing the name of it

    const numOfFields = 6;

    const [ssnValues, setValue] = useState(['']);

    // const useSSNFields = () => {

    const handleChange = (e) => {
        const { maxLength, value, name } = e.target;
        const [fieldName, fieldIndex] = name.split('-');

        // Check if they hit the max character length
        if (value.length >= maxLength) {
            // Check if it's not the last input field
            if (parseInt(fieldIndex, 10) <= 6) {
                // Get the next input field
                const nextSibling = document.querySelector(
                    `input[name=ssn-${parseInt(fieldIndex, 10) + 1}]`
                );
                setValue((prevValue) => [...prevValue, value]);

                console.log(ssnValues);

                // If found, focus the next field
                if (nextSibling !== null) {
                    nextSibling.focus();
                } else {
                }
            }
        }
    };

    // };
    // const { handleChange } = useSSNFields();

    return (
        <div className={styles.sectionCove}>
            <section className={styles.sectionI}>
                <ProfileSetupSide text="The world is your Canvas. Explore! " />
            </section>
            <section className={styles.sectionII}>
                <div className={styles.loginCont}>
                    <div className={styles.welc}>
                        <h2>Welcome Back ✌🏽</h2>
                        <p>
                            {/* Marvellous Solutions,  */}
                            Kindly enter your details to Login.
                        </p>
                    </div>
                    {error ? <h2 className={styles.error}>{error}</h2> : null}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={styles.form}
                    >
                        <div className={styles.loginForm}>
                            <label>Email Address </label>
                            <div className={styles.divs}>
                                <MailSvg />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Your Email"
                                    className={styles.emailInput}
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: 'Invalid email address'
                                        }
                                    })}
                                    onInput={checkDataContent}
                                />
                            </div>
                            <p className={styles.errors}>
                                {errors.email?.message}
                            </p>
                        </div>
                        <div className={styles.loginForm}>
                            <label>Password </label>
                            <div className={styles.divs}>
                                <LockSvg />
                                <input
                                    name="password"
                                    autoComplete="false"
                                    placeholder="Enter Your Password"
                                    type={outType ? 'text' : 'password'}
                                    className={styles.passwordInput}
                                    {...register('password', {
                                        required: 'Password is required'
                                    })}
                                    onInput={handlePwd}
                                />
                                <Visbility typeSet={types} />
                            </div>
                            <p className={styles.errors}>
                                {errors?.password?.message}
                            </p>
                        </div>
                        <div className={styles.remForg}>
                            <div>
                                <Link href="../Auth/ForgotPassword">
                                    <p className={styles.forget}>
                                        Forgot Password?
                                    </p>
                                </Link>
                            </div>
                        </div>
                        {loading ? (
                            <Loader />
                        ) : (
                            <ButtonComp
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
                                margin="0px 0 0 0"
                                text="Login"
                                type="button"
                                onClick={openModal}
                            />
                        )}
                        <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <h1 className={styles.errorX} onClick={closeModal}>
                                X
                            </h1>
                            <h1 className={styles.errorX} onClick={closeModal}>
                                Enter Otp Below
                            </h1>
                            <div className={styles.otp}>
                                <div className={styles.otpInn}>
                                    <div className={styles.otpInps}>
                                        <input
                                            type="password"
                                            name="ssn-1"
                                            maxLength={1}
                                            onChange={handleChange}
                                        />
                                        <input
                                            type="password"
                                            name="ssn-2"
                                            maxLength={1}
                                            onChange={handleChange}
                                        />
                                        <input
                                            type="password"
                                            name="ssn-3"
                                            maxLength={1}
                                            onChange={handleChange}
                                        />
                                        <input
                                            type="password"
                                            name="ssn-4"
                                            maxLength={1}
                                            onChange={handleChange}
                                        />
                                        <input
                                            type="password"
                                            name="ssn-5"
                                            maxLength={1}
                                            onChange={handleChange}
                                        />
                                        <input
                                            type="password"
                                            name="ssn-6"
                                            maxLength={1}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <ButtonComp
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
                                text="Submit & Login"
                                type="submit"
                                // onClick={openModal}
                                onClick={onSubmit}
                                loads={loading}
                                err={errorMessages}
                            />
                        </Modal>
                    </form>
                    <div>
                        <p className={styles.accout}>
                            Don&apos;t have an account?
                            <span>
                                <Link href="/Home"> Sign up</Link>
                            </span>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
