import React, { useState, useEffect } from 'react';
import { ButtonComp } from '../../../components';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Visbility from '../../../components/ReusableComponents/Eyeysvg';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/ReusableComponents/Loader';
import ProfileSetupSide from '../../../components/ReusableComponents/ProfileSetupSide';
import MailSvg from '../../../components/ReusableComponents/ReusableSvgComponents/MailSvg';
import LockSvg from '../../../components/ReusableComponents/ReusableSvgComponents/LockSvg';
import { loginUserAction } from '../../../redux/actions/loginUserAction';
// Number of input fields that make up SSN
const Login = () => {
    const [activeBtn, setActiveBtn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const [newUser, setNewUser] = useState();
    const [circle, setCircle] = useState(false);
    const [error, setError] = useState('');
    const [mainError, setmainError] = useState('');
    const [identifier, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [outType, setOutType] = useState();
    const [mloading, setMloading] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const { isLoading, user, errorMessages } = useSelector(
        (state) => state.auth
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
    const openModal = () => {
        setError('');
        setLoading((prev) => !prev);
        const loginData = {
            identifier,
            password
        };
        dispatch(loginUserAction(loginData));
    };
    useEffect(() => {
        if (user) {
            console.log(user);
            if (user?.statusCode === 200) {
                if (
                    user?.data?.user?.profile?.createdFromEcobankCred === false
                ) {
                    if (
                        user?.data?.user?.profile?.customerCategory ===
                        'COMMERCIAL'
                    ) {
                        if (
                            user?.data?.user?.profile?.profileSetupStatus ===
                            'PROFILE_SETUP_COMPLETED'
                        ) {
                            router.push('../../Verify/CorportateAccount');
                        } else if (
                            user?.data?.user?.profile?.profileSetupStatus ===
                            'AWAITING_ACCOUNT_NUMBER'
                        ) {
                            router.push('../../Verify/CorportateAccount');
                        } else if (
                            user?.data?.user?.profile?.profileSetupStatus ===
                            'ACCOUNT_NUMBER_RETRIEVED'
                        ) {
                            //console.log('here');
                            router.push('../../Admin/Dashboard');
                        } else {
                            router.push('../../Onboarding/ProfileSetup');
                        }
                    } else {
                        if (
                            user?.data?.user?.profile?.profileSetupStatus ===
                            'PROFILE_SETUP_COMPLETED'
                        ) {
                            router.push('../../Verify/Account/loading');
                        } else if (
                            user?.data?.user?.profile?.profileSetupStatus ===
                            'AWAITING_ACCOUNT_NUMBER'
                        ) {
                            router.push('../../Verify/Account/loading');
                        } else if (
                            user?.data?.user?.profile?.profileSetupStatus ===
                            'ACCOUNT_NUMBER_RETRIEVED'
                        ) {
                            router.push('../../Admin/Dashboard');
                        } else {
                            router.push('../../Onboarding/ProfileSetup');
                        }
                    }
                }
            }
        }
        if (user) {
            if (user?.data?.user?.profile?.createdFromEcobankCred === true) {
                if (
                    user?.data?.user?.profile?.profileSetupStatus ===
                    'PROFILE_SETUP_COMPLETED'
                ) {
                    window?.localStorage?.setItem(
                        'displayAccount',
                        JSON.stringify(user?.data?.user)
                    );
                    window?.localStorage?.setItem(
                        'account',
                        JSON.stringify(user.data.user.profile)
                    );
                    router.push('../../Admin/Dashboard');
                } else if (
                    user.data.user.profile.profileSetupStatus ===
                    'PROFILE_SETUP'
                ) {
                    window.localStorage.setItem(
                        'displayAccount',
                        JSON.stringify(user.data.user)
                    );
                    window.localStorage.setItem(
                        'account',
                        JSON.stringify(user.data.user.profile)
                    );
                    router.push({
                        pathname: '/Onboarding/ExistingProfileSetup',
                        query: { id: 2 }
                    });
                } else if (
                    user.data.user.profile.profileSetupStatus ===
                    'LIVENESS_VERIFIED'
                ) {
                    window?.localStorage?.setItem(
                        'displayAccount',
                        JSON.stringify(user.data.user)
                    );
                    window?.localStorage?.setItem(
                        'account',
                        JSON.stringify(user.data.user.profile)
                    );
                    router.push({
                        pathname: '/Onboarding/ExistingProfileSetup',
                        query: { id: 3 }
                    });
                } else if (
                    user.data.user.profile.profileSetupStatus ===
                    'PROFILE_SETUP_AWAITING_OTP'
                ) {
                    window.localStorage.setItem(
                        'displayAccount',
                        JSON.stringify(user.data.user)
                    );
                    window?.localStorage?.setItem(
                        'account',
                        JSON.stringify(user.data.user.profile)
                    );

                    router.push({
                        pathname: '/Onboarding/ExistingProfileSetup',
                        query: { id: 0 }
                    });
                }
                if (
                    user.data.user.profile.profileSetupStatus ===
                    'AWAITING_ACCOUNT_NUMBER'
                ) {
                    window.localStorage.setItem(
                        'displayAccount',
                        JSON.stringify(user.data.user)
                    );
                    window?.localStorage?.setItem(
                        'account',
                        JSON.stringify(user.data.user.profile)
                    );
                    router.push('../../Verify/CorportateAccount');
                } else if (
                    user.data.user.profile.profileSetupStatus ===
                    'ACCOUNT_NUMBER_RETRIEVED'
                ) {
                    window?.localStorage?.setItem(
                        'displayAccount',
                        JSON.stringify(user.data.user)
                    );
                    window?.localStorage?.setItem(
                        'account',
                        JSON.stringify(user.data.user.profile)
                    );
                    router.push('../../Admin/Dashboard');
                }
            }
        } else if (errorMessages !== null) {
            setmainError(errorMessages);
            setLoading((prev) => !prev);
        }
    }, [user, errorMessages]);

    const types = (type) => {
        setOutType(type);
    };

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
                    {mainError ? (
                        <h2 className={styles.error}>{mainError}</h2>
                    ) : null}
                    <form
                        onSubmit={handleSubmit(openModal)}
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
                            {errors.email?.message ? (
                                <p className={styles.errors}>
                                    {errors.email?.message}
                                </p>
                            ) : null}
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
                                <Visbility typeSet={types} input="input" />
                            </div>
                            {errors?.password?.message ? (
                                <p className={styles.errors}>
                                    {errors?.password?.message}
                                </p>
                            ) : null}
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
                                type="submit"
                            />
                        )}
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
