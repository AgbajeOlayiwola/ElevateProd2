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
import { setCookies } from 'cookies-next';
import Cookies from 'js-cookie';
import StorePopup from '../../../components/ReusableComponents/StorePopup';
import OutsideClick from '../../../components/ReusableComponents/OutsideClick';

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
    const { auth2FaCodeSuccess, auth2FaCodeError } = useSelector(
        (state) => state.auth2FaReducer
    );
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    // function isExcel(file) {
    //     const fileType = file.type;
    //     const fileName = file.name;
    //     return (
    //       fileType === "application/vnd.ms-excel" || // Microsoft Excel 97-2003    fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || // Microsoft Excel 2007 and later    fileType === "application/vnd.ms-excel.sheet.macroEnabled.12" || // Microsoft Excel 2007 and later with macros    fileType === "application/vnd.ms-excel.sheet.binary.macroEnabled.12" || // Microsoft Excel 97-2003 with macros    fileName.endsWith(".xls") || // Microsoft Excel 97-2003    fileName.endsWith(".xlsx") || // Microsoft Excel 2007 and later    fileName.endsWith(".xlsm") || // Microsoft Excel 2007 and later with macros    fileName.endsWith(".xlsb") // Microsoft Excel 97-2003 with macros  );
    //   }

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
        setMloading((prev) => !prev);
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
        if (auth2FaCodeError !== null) {
            console.log('here');
            setError(auth2FaCodeError.data.message);
            // console.log(auth2FaCodeError);
            // setLoading(false);

            setMloading((prev) => !prev);
            // } else if (
            //     newAccountErrorMessage ===
            //     'You already have an account with us. Please contact us for more information'
            // ) {
            // router.push('/Dashboard');,
            setNewUser(auth2FaCodeSuccess);
        } else if (auth2FaCodeSuccess) {
            console.log('here');
            if (auth2FaCodeSuccess.data.statusCode === 200) {
                if (
                    auth2FaCodeSuccess.data.data.user.profile
                        .createdFromEcobankCred === false
                ) {
                    if (
                        auth2FaCodeSuccess.data.data.user.profile
                            .customerCategory === 'COMMERCIAL'
                    ) {
                        console.log('here Commercial');
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
                            console.log('here');
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

                console.log('here Fals');
            }
            if (auth2FaCodeSuccess) {
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
        }
    };
    useEffect(() => {
        if (user) {
            if (user.data._2FAToken === undefined) {
                if (user) {
                    if (user.statusCode === 200) {
                        if (
                            user.data.user.profile.createdFromEcobankCred ===
                            false
                        ) {
                            if (
                                user.data.user.profile.customerCategory ===
                                'COMMERCIAL'
                            ) {
                                console.log('here Commercial');
                                if (
                                    user.data.user.profile
                                        .profileSetupStatus ===
                                    'PROFILE_SETUP_COMPLETED'
                                ) {
                                    router.push(
                                        '../../Verify/CorportateAccount'
                                    );
                                } else if (
                                    user.data.user.profile
                                        .profileSetupStatus ===
                                    'AWAITING_ACCOUNT_NUMBER'
                                ) {
                                    router.push(
                                        '../../Verify/CorportateAccount'
                                    );
                                } else if (
                                    user.data.user.profile
                                        .profileSetupStatus ===
                                    'ACCOUNT_NUMBER_RETRIEVED'
                                ) {
                                    console.log('here');
                                    router.push('../../Dashboard');
                                } else {
                                    router.push(
                                        '../../Onboarding/ProfileSetup'
                                    );
                                }
                            } else {
                                if (
                                    user.data.user.profile
                                        .profileSetupStatus ===
                                    'PROFILE_SETUP_COMPLETED'
                                ) {
                                    router.push('../../Verify/Account/loading');
                                } else if (
                                    user.data.user.profile
                                        .profileSetupStatus ===
                                    'AWAITING_ACCOUNT_NUMBER'
                                ) {
                                    router.push('../../Verify/Account/loading');
                                } else if (
                                    user.data.user.profile
                                        .profileSetupStatus ===
                                    'ACCOUNT_NUMBER_RETRIEVED'
                                ) {
                                    router.push('../../Dashboard');
                                } else {
                                    router.push(
                                        '../../Onboarding/ProfileSetup'
                                    );
                                }
                            }
                        }
                    }
                    console.log('here Fals');
                }
                if (user) {
                    if (
                        user.data.user.profile.createdFromEcobankCred === true
                    ) {
                        if (
                            user.data.user.profile.profileSetupStatus ===
                            'PROFILE_SETUP_COMPLETED'
                        ) {
                            window.localStorage.setItem(
                                'displayAccount',
                                JSON.stringify(user.data.user)
                            );
                            window.localStorage.setItem(
                                'account',
                                JSON.stringify(user.data.user.profile)
                            );
                            router.push('../../Dashboard');
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
                            router.push('/Onboarding/ExistingProfileSetup');
                        }
                        if (
                            user.data.user.profile.profileSetupStatus ===
                            'AWAITING_ACCOUNT_NUMBER'
                        ) {
                            window.localStorage.setItem(
                                'displayAccount',
                                JSON.stringify(user.data.user)
                            );
                            window.localStorage.setItem(
                                'account',
                                JSON.stringify(user.data.user.profile)
                            );
                            router.push('../../Verify/CorportateAccount');
                        } else if (
                            user.data.user.profile.profileSetupStatus ===
                            'ACCOUNT_NUMBER_RETRIEVED'
                        ) {
                            window.localStorage.setItem(
                                'displayAccount',
                                JSON.stringify(user.data.user)
                            );
                            window.localStorage.setItem(
                                'account',
                                JSON.stringify(user.data.user.profile)
                            );
                            router.push('../../Dashboard');
                        }
                    }
                }
            } else {
                setOverlay(true);
                setLoading((prev) => !prev);
            }
        } else if (errorMessages) {
            setmainError(errorMessages);
            // setMloading((prev) => !prev);
            setLoading((prev) => !prev);
        }
    }, [user, errorMessages]);

    useEffect(() => {
        sentLogin();
    }, [auth2FaCodeSuccess, auth2FaCodeError]);

    const types = (type) => {
        setOutType(type);
    };
    function openModal() {
        setError('');
        setLoading((prev) => !prev);
        const loginData = {
            identifier,
            password
        };
        dispatch(loginUserAction(loginData));
    }

    function closeModal() {
        setOverlay(false);
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
                    {mainError ? (
                        <h2 className={styles.error}>{mainError}</h2>
                    ) : null}
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
                                type="button"
                                onClick={openModal}
                            />
                        )}
                        {/* <Modal
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
                            {error ? (
                                <h2 className={styles.error}>{error}</h2>
                            ) : null}
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
                            {mloading ? (
                                <Loader />
                            ) : (
                                <ButtonComp
                                    disabled={activeBtn}
                                    active={activeBtn ? 'active' : 'inactive'}
                                    text="Submit & Login"
                                    type="submit"
                                    // onClick={openModal}
                                    onClick={onSubmit}
                                    loads={mloading}
                                    err={errorMessages}
                                />
                            )}
                        </Modal> */}
                        <OutsideClick onClickOutside={closeModal}>
                            <StorePopup overlay={overlay}>
                                <div className={styles.otpDiv}>
                                    <h1
                                        className={styles.errorX}
                                        onClick={closeModal}
                                    >
                                        Enter OTP Below
                                    </h1>
                                    {error ? (
                                        <h2 className={styles.error}>
                                            {error}
                                        </h2>
                                    ) : null}
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
                                    {mloading ? (
                                        <Loader />
                                    ) : (
                                        <ButtonComp
                                            disabled={activeBtn}
                                            active={
                                                activeBtn
                                                    ? 'active'
                                                    : 'inactive'
                                            }
                                            text="Submit & Login"
                                            type="submit"
                                            // onClick={openModal}
                                            onClick={onSubmit}
                                            loads={mloading}
                                            err={errorMessages}
                                        />
                                    )}
                                </div>
                            </StorePopup>
                        </OutsideClick>
                    </form>
                    {/* <p>
                        <label>
                            Tap to
                            <input
                                type="file"
                                accept=".csv, .xlsm"
                                onChange={(e) => {
                                    if (
                                        e.target.files[0].type ===
                                        'application/vnd.ms-excel.sheet.macroenabled.12'
                                    ) {
                                        console.log(e.target.files[0].type);
                                        const reader = new FileReader();
                                        reader.onload = (e) => {
                                            const data = e.target.result;
                                            const workbook = XLSX.read(data, {
                                                type: 'array'
                                            });
                                            const sheetName =
                                                workbook.SheetNames[0];
                                            const worksheet =
                                                workbook.Sheets[sheetName];
                                            const json = XLSX.utils.sheet_to_json(
                                                worksheet
                                            );
                                            localStorage.setItem(
                                                'csvData',
                                                JSON.stringify(json)
                                            );
                                        };
                                        reader.readAsArrayBuffer(
                                            e.target.files[0]
                                        );

                                        localStorage.removeItem('number');
                                        setCsvUpload(true);
                                        setActiveBtn(true);
                                    } else {
                                        console.log('invalid file');
                                    }
                                }}
                            />
                            <span> Upload CSV File</span>
                        </label>
                    </p> */}
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
