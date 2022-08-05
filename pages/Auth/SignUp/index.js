import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './style.module.css';
import { ButtonComp, LoginWith } from '../../../components';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import Visbility from '../../../components/ReusableComponents/Eyeysvg';
import { createUserAction } from '../../../redux/actions/actions';
import { useSelector } from 'react-redux';
import { encrypt } from '../../../redux/helper/hash';
import validator from 'validator';

const Signup = ({ type }) => {
    const router = useRouter();
    const [error, setError] = useState('');
    const [errorMessages, setErrorMessages] = useState('');
    const [pName, setPname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfPassword] = useState('');
    const [activeBtn, setActiveBtn] = useState(true);
    const [business, setBusiness] = useState(true);
    const [count, setCount] = useState([]);
    const [outType, setOutType] = useState();
    const dispatch = useDispatch();

    const { isLoading, user, errorMessage } = useSelector(
        (state) => state.registered
    );

    const [passwordMatch, setPasswordMatch] = useState('');
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
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const userName = (e) => {
        setPname(e.target.value);
    };
    // display Lofg in with end
    const types = (type) => {
        setOutType(type);
    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    // useEffect(() => {
    //     onSubmit();
    // }[errorMessage]);
    const onSubmit = (data) => {
        if (password === confirmPassword) {
            const postData = {
                pName,
                email,
                password: encrypt(password),
                confirmPassword: encrypt(confirmPassword),
                affiliateCode: 'ENG'
            };
            // console.log(password);\
            console.log(errorMessage);
            dispatch(createUserAction(postData));
        } else {
            passwordMatch;
        }
    };
    const sentSIgnUp = () => {
        console.log(errorMessage);
        if (errorMessage !== 'Account created successfully!') {
            setError(errorMessage);
        } else {
            router.push('../Verify/Loading');
        }
    };
    useEffect(() => {
        sentSIgnUp();
    }, [errorMessage]);

    const [bgcolor, setBgcolor] = useState(false);

    // console.log(confPassword);
    return (
        <>
            <div className={styles.cover}>
                <section className={styles.sectionI}>
                    <div>
                        <h2 className={styles.bvn}>
                            Input your BVN and open a Business Account in
                            <span> 3 minutes.</span>
                        </h2>
                        <svg
                            width="2"
                            height="227"
                            viewBox="0 0 2 227"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1 0V387"
                                stroke="white"
                                strokeDasharray="8 8"
                            />
                        </svg>
                    </div>
                </section>
                <section className={styles.sectionII}>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div className={styles.doYou}>
                                        Do you have an Ecobank account?
                                    </div>
                                    <div className={styles.ButtonWrapper}>
                                        <span
                                            className={styles.ToggleNo}
                                            onClick={() => {
                                                setBusiness(true),
                                                    setBgcolor(false);
                                            }}
                                            style={
                                                bgcolor
                                                    ? { background: '#f8f8f8' }
                                                    : { background: '#6ccf00' }
                                            }
                                        >
                                            <p
                                                className={styles.ToggleNoText}
                                                style={
                                                    bgcolor
                                                        ? { color: '#a5a5a5' }
                                                        : { color: '#ffffff' }
                                                }
                                            >
                                                No
                                            </p>
                                        </span>
                                        <span
                                            className={styles.ToggleYes}
                                            onClick={() => {
                                                setBusiness(false),
                                                    setBgcolor(true);
                                            }}
                                            style={
                                                bgcolor
                                                    ? { background: '#6ccf00' }
                                                    : { background: '#f8f8f8' }
                                            }
                                        >
                                            <p
                                                className={styles.ToggleYesText}
                                                style={
                                                    bgcolor
                                                        ? { color: '#ffffff' }
                                                        : { color: '#a5a5a5' }
                                                }
                                            >
                                                Yes
                                            </p>
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.wrap}>
                                    {/* <input
                                        type="checkbox"
                                        onChange={() => {
                                            setBusiness(
                                                (prevState) => !prevState
                                            );
                                        }}
                                    /> */}
                                </div>
                            </div>
                            {/* /* "handleSubmit" will validate your inputs before invoking "onSubmit" */}

                            {business ? (
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className={styles.form}
                                >
                                    <div className={styles.error}>{error}</div>
                                    {/* register your input into the hook by invoking the "register" function */}
                                    <div>
                                        <label>Preffered Name</label>
                                        <br />

                                        <input
                                            placeholder="Enter Your Name"
                                            className={styles.textInput}
                                            {...register('name')}
                                            onChange={userName}
                                            required
                                        />
                                    </div>

                                    {/* include validation with required or other standard HTML validation rules */}
                                    <div>
                                        <label>Email Address </label>

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
                                                    message:
                                                        'Invalid email address'
                                                }
                                            })}
                                            onChange={handleEmail}
                                        />
                                        {errors.email?.message}
                                    </div>

                                    {/* include validation with required or other standard HTML validation rules */}

                                    <div>
                                        <label>Password</label>
                                        <br />
                                        <div className={styles.divs}>
                                            <input
                                                placeholder="Password"
                                                className={styles.textInput}
                                                name="password"
                                                type={
                                                    outType
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                onChange={handlePwd}
                                            />

                                            <Visbility typeSet={types} />
                                        </div>
                                        {errorMessages === '' ? null : (
                                            <div className={styles.errorCont}>
                                                <div
                                                    className={
                                                        errorMessages ===
                                                        'Strong'
                                                            ? styles.strong
                                                            : errorMessages ===
                                                              'Medium'
                                                            ? styles.medium
                                                            : errorMessages ===
                                                              'Weak'
                                                            ? styles.errors
                                                            : styles.strong
                                                    }
                                                >
                                                    <p>{errorMessages}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* include validation with required or other standard HTML validation rules */}
                                    <div>
                                        <label>Confirm Password</label>
                                        <br />
                                        <div className={styles.divs}>
                                            <input
                                                placeholder="Confirm Password"
                                                className={styles.textInput}
                                                required
                                                type={
                                                    outType
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                onChange={handlePaswword}
                                            />
                                            <Visbility typeSet={types} />
                                        </div>
                                    </div>

                                    {password == confirmPassword ? null : (
                                        <p className={styles.error}>
                                            {passwordMatch}
                                        </p>
                                    )}

                                    {/* errors will return when field validation fails  */}
                                    {errors.exampleRequired && (
                                        <span>This field is required</span>
                                    )}
                                    <ButtonComp
                                        disabled={activeBtn}
                                        active={
                                            activeBtn ? 'active' : 'inactive'
                                        }
                                        text="Proceed"
                                        type="submit"
                                    />
                                </form>
                            ) : (
                                <>
                                    <p className={styles.choose}>
                                        Choose Preferred Login Option
                                    </p>

                                    <div onSubmit={handleSubmit(onSubmit)}>
                                        <LoginWith />
                                    </div>
                                </>
                            )}

                            <div>
                                <p className={styles.accout}>
                                    Do you Have An Accout?
                                    <Link href="../Auth/Login">
                                        <span className={styles.termss}>
                                            {' '}
                                            Sign In
                                        </span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Signup;
