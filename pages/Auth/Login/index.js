import React, { useState, useEffect } from 'react';
import { ButtonComp } from '../../../components';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Visbility from '../../../components/ReusableComponents/Eyeysvg';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAction } from '../../../redux/actions/actions';
import { encrypt } from '../../../redux/helper/hash';
import Loader from '../../../components/ReusableComponents/Loader';
import ProfileSetupSide from '../../../components/ReusableComponents/ProfileSetupSide';
import LoginCircleSvg from '../../../components/ReusableComponents/ReusableSvgComponents/LoginCircleSvg';
import MailSvg from '../../../components/ReusableComponents/ReusableSvgComponents/MailSvg';
import LockSvg from '../../../components/ReusableComponents/ReusableSvgComponents/LockSvg';

const Login = () => {
    const [activeBtn, setActiveBtn] = useState(true);
    const [loading, setLoading] = useState(false);
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
    const { userProfile, errorMessage } = useSelector(
        (state) => state.userProfileReducer
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
        const loginData = {
            identifier,
            password
        };
        dispatch(loginUserAction(loginData));
        // dispatch(createNewUserAccount());
    };
    // console.log(prevPath);
    // console.log(user);
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
            if (user.statusCode === 200) {
                if (
                    user.data.user.profile.profileSetupStatus ===
                    'PROFILE_SETUP_COMPLETED'
                ) {
                    router.push('../../Dashboard');
                } else {
                    router.push('../../Onboarding/ProfileSetup');
                }
            }
        }
    };
    useEffect(() => {
        sentLogin();
    }, [errorMessages, user]);

    const types = (type) => {
        setOutType(type);
    };
    // console.log(user);
    // console.log(data); // watch input value by passing the name of it

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
