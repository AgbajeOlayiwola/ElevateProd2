import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import { ButtonComp, Countries } from '../../../components';
import { affiliateCountries } from '../../../components/ReusableComponents/Data';
import Visbility from '../../../components/ReusableComponents/Eyeysvg';
import ProfileSetupSide from '../../../components/ReusableComponents/ProfileSetupSide';
import LockSvg from '../../../components/ReusableComponents/ReusableSvgComponents/LockSvg';
import MailSvg from '../../../components/ReusableComponents/ReusableSvgComponents/MailSvg';
import { useLoginAccountMutation } from '../../../redux/api/authApi';
import { setPinned } from '../../../redux/slices/pinned';
import { setProfile } from '../../../redux/slices/profile';
import { setToken } from '../../../redux/slices/tokenSlice';
import styles from './styles.module.css';
// Number of input fields that make up SSN
const Login = () => {
    const [activeBtn, setActiveBtn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [countryState, setCountryState] = useState(false);
    const [selectCountry, setSelectCountry] = useState({
        affiliateCode: 'ENG',
        baseCurrency: 'NGN',
        countryCode: '234',
        flags: {
            svg: 'https://flagcdn.com/ng.svg',
            png: 'https://flagcdn.com/w320/ng.png'
        },
        name: 'Nigeria'
    });

    const [outType, setOutType] = useState();
    const dispatch = useDispatch();
    const router = useRouter();
    const [
        loginAccount,
        {
            data: loginAccountData,
            isLoading: loginAccountLoad,
            isSuccess: loginAccountSuccess,
            isError: loginAccountFalse,
            error: loginAccountErr,
            reset: loginAccountReset
        }
    ] = useLoginAccountMutation();
    useEffect(() => {
        // console.log(loginAccountSuccess, loginAccountData, loginAccountErr);
    }, [loginAccountSuccess, loginAccountErr, loginAccountData]);

    useEffect(() => {
        localStorage.setItem('affiliateCode', selectCountry?.affiliateCode);
        // console.log(loginAccountErr);
    }, []);
    const initSchema = yup.object().shape({
        email: yup
            .string()
            .trim()
            .email('Email is required')
            .required('Email is required'),
        password: yup.string().required('Enter Password')
    });
    const initialValues = {
        email: '',
        password: ''
    };
    const handleNavIn = async (val) => {
        await dispatch(setProfile(val?.data));
        dispatch(setToken(val?.data?.token));
        router.push('/Admin/Dashboard');
    };

    useEffect(() => {
        if (loginAccountSuccess) {
            dispatch(setProfile(loginAccountData));
            if (loginAccountData?.data?.user?.hasSetTransactionPin === 'N') {
                dispatch(setPinned(false));
                dispatch(setToken(loginAccountData?.data?.token));
                dispatch(setProfile(loginAccountData?.data));
            } else if (
                loginAccountData?.data?.user?.hasSetTransactionPin === 'Y'
            ) {
                dispatch(setPinned(true));
                dispatch(setToken(loginAccountData?.data?.token));
                dispatch(setProfile(loginAccountData?.data));
            }
            if (loginAccountData?.data?.user?.hasVerifiedEmail === 'N') {
                dispatch(setProfile(loginAccountData?.data));
                dispatch(setToken(loginAccountData?.data?.token));
                router.push({
                    pathname: '/Verify',
                    query: { id: 4 }
                });
            } else if (
                loginAccountData?.data?.user?.profileSetupStatus ===
                    'REGISTERED' &&
                loginAccountData?.data?.user?.createdFromEcobankCred === 'N'
            ) {
                dispatch(setProfile(loginAccountData?.data));
                dispatch(setToken(loginAccountData?.data?.token));
                router.push({
                    pathname: '/Verify',
                    query: { id: 0 }
                });
            } else if (
                loginAccountData?.data?.user?.profileSetupStatus ===
                    'LIVENESS_VERIFIED' ||
                (loginAccountData?.data?.user?.profileSetupStatus ===
                    'PROFILE_SETUP' &&
                    loginAccountData?.data?.user?.createdFromEcobankCred ===
                        'N')
            ) {
                dispatch(setProfile(loginAccountData?.data));
                dispatch(setToken(loginAccountData?.data?.token));
                router.push({
                    pathname: '/Onboarding/ProfileSetup',
                    query: { id: 1 }
                });
            } else if (
                loginAccountData?.data?.user?.profileSetupStatus ===
                    'PROFILE_SETUP_AWAITING_OTP' &&
                loginAccountData?.data?.user?.createdFromEcobankCred === 'N'
            ) {
                dispatch(setProfile(loginAccountData?.data));
                dispatch(setToken(loginAccountData?.data?.token));
                router.push({
                    pathname: '/Onboarding/ProfileSetup',
                    query: { id: 2 }
                });
            } else if (
                loginAccountData?.data?.user?.profileSetupStatus ===
                    'PROFILE_SETUP_COMPLETED' &&
                loginAccountData?.data?.user?.createdFromEcobankCred === 'Y'
            ) {
                dispatch(setToken(loginAccountData?.data?.token));
                router.push({
                    pathname: '/Onboarding/ProfileSetup',
                    query: { id: 3 }
                });
            } else if (
                loginAccountData?.data?.user?.profileSetupStatus ===
                    'LIVENESS_VERIFIED' &&
                loginAccountData?.data?.user?.createdFromEcobankCred === 'N' &&
                loginAccountData?.data?.user?.phoneNumber === null
            ) {
                dispatch(setProfile(loginAccountData?.data));
                dispatch(setToken(loginAccountData?.data?.token));
                router.push({
                    pathname: '/Onboarding/ProfileSetup',
                    query: { id: 0 }
                });
            } else if (
                loginAccountData?.data?.user?.profileSetupStatus ===
                    'LIVENESS_VERIFIED' ||
                (loginAccountData?.data?.user?.profileSetupStatus ===
                    'PROFILE_SETUP_COMPLETED' &&
                    loginAccountData?.data?.user?.createdFromEcobankCred ===
                        'N' &&
                    loginAccountData?.data?.user?.phoneNumber !== null)
            ) {
                dispatch(setProfile(loginAccountData?.data));
                dispatch(setToken(loginAccountData?.data?.token));
                router.push({
                    pathname: '/Onboarding/ProfileSetup',
                    query: { id: 3 }
                });
            } else if (
                loginAccountData?.data?.user?.profileSetupStatus ===
                    'REGISTERED' &&
                loginAccountData?.data?.user?.createdFromEcobankCred === 'Y'
            ) {
                dispatch(setProfile(loginAccountData?.data));
                dispatch(setToken(loginAccountData?.data?.token));
                router.push({
                    pathname: '/Onboarding/ExistingProfileSetup',
                    query: { id: 4 }
                });
            } else if (
                loginAccountData?.data?.user?.profileSetupStatus ===
                    'PROFILE_SETUP' &&
                loginAccountData?.data?.user?.createdFromEcobankCred === 'Y'
            ) {
                dispatch(setToken(loginAccountData?.data?.token));
                router.push({
                    pathname: '/Onboarding/ExistingProfileSetup',
                    query: { id: 2 }
                });
            } else if (
                loginAccountData?.data?.user?.profileSetupStatus ===
                'AWAITING_ACCOUNT_NUMBER'
            ) {
                dispatch(setToken(loginAccountData?.data?.token));
                router.push({
                    pathname: '/Verify/Account',
                    query: { id: 2 }
                });
            }
            // else if (
            //     loginAccountData?.user?.profileSetupStatus ===
            //         'PROFILE_SETUP' &&
            //     loginAccountData?.user?.createdFromEcobankCred === 'N'
            // ) {
            //     navigation.reset({
            //         index: 0,
            //         routes: [{ name: 'SelfieScreen' }]
            //     });
            // }
            if (
                loginAccountData?.data?.user?.profileSetupStatus ===
                    'ACCOUNT_NUMBER_RETRIEVED' ||
                loginAccountData?.data?.user?.profileSetupStatus ===
                    'ACCOUNT_CREATED'
            ) {
                handleNavIn(loginAccountData);
                dispatch(setToken(loginAccountData?.data?.token));
            }
            // console.log(loginAccountData, 'check check');
        }
    }, [loginAccountSuccess]);

    const types = (type) => {
        setOutType(type);
    };
    const showToastMessage = () => {
        toast.error(loginAccountErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    useEffect(() => {
        showToastMessage();
    }, [loginAccountErr]);

    return (
        <div className={styles.sectionCove}>
            <section className={styles.sectionI}>
                <ProfileSetupSide text="The world is your Canvas. Explore! " />
            </section>
            <ToastContainer />
            <section className={styles.sectionII}>
                <div className={styles.loginCont}>
                    <div className={styles.welc}>
                        <h2>Welcome Back</h2>
                        <p>
                            {/* Marvellous Solutions,  */}
                            Kindly enter your details to Login.
                        </p>
                    </div>

                    <div className={styles.secondSectionMidCountry}>
                        <label>Choose your Business Location</label>
                        <Countries
                            displayCountry={() => {
                                setCountryState(!countryState);
                            }}
                            selectCountry={selectCountry}
                            countryState={countryState}
                            countrys={affiliateCountries}
                            setCountryState={setCountryState}
                            setSelectCountry={setSelectCountry}
                        />
                    </div>
                    <br />
                    <Formik
                        validationSchema={initSchema}
                        validateOnChange={true}
                        initialValues={initialValues}
                        onSubmit={(values, { setSubmitting }) => {
                            loginAccount(values);
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
                            <form
                                onSubmit={handleSubmit}
                                className={styles.form}
                            >
                                <div className={styles.loginForm}>
                                    <label>Email Address </label>
                                    <div className={styles.divs}>
                                        <MailSvg />
                                        <input
                                            type="email"
                                            name="email"
                                            onChange={(e) =>
                                                setFieldValue(
                                                    'email',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter Your Email"
                                            className={styles.emailInput}
                                        />
                                    </div>
                                    <p className={styles.error}>
                                        {errors ? <>{errors?.email}</> : null}
                                    </p>
                                </div>
                                <div className={styles.loginForm}>
                                    <label>Password </label>
                                    <div className={styles.divs}>
                                        <LockSvg />
                                        <input
                                            name="password"
                                            autoComplete="false"
                                            onChange={(e) =>
                                                setFieldValue(
                                                    'password',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter Your Password"
                                            type={outType ? 'text' : 'password'}
                                            className={styles.passwordInput}
                                        />
                                        <Visbility
                                            typeSet={types}
                                            input="input"
                                        />
                                    </div>
                                    <p className={styles.error}>
                                        {errors ? (
                                            <>{errors?.password}</>
                                        ) : null}
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

                                <ButtonComp
                                    disabled={activeBtn}
                                    active={activeBtn ? 'active' : 'inactive'}
                                    loads={loginAccountLoad}
                                    margin="0px 0 0 0"
                                    text="Login"
                                    type="submit"
                                />
                            </form>
                        )}
                    </Formik>

                    <div>
                        <p className={styles.accout}>
                            Don&apos;t have an account?
                            <span>
                                <Link href="/Auth/Signup"> Sign up</Link>
                            </span>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
