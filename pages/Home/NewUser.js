import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { ButtonComp } from '../../components';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createUserAction } from '../../redux/actions/actions';
import Link from 'next/link';
import Loader from '../../components/ReusableComponents/Loader';
import { encrypt } from '../../redux/helper/hash';
import validator from 'validator';
import Visbility from '../../components/ReusableComponents/Eyeysvg';
import { useRouter } from 'next/router';
import InputTag from '../../components/ReusableComponents/Input';

const NewUser = ({ selectCountry }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [errorMessages, setErrorMessages] = useState('');
    const [preferredName, setPname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState([]);
    const [outType, setOutType] = useState();
    const [outTyped, setOutTyped] = useState();
    const [activeBtn, setActiveBtn] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState('');
    const [symbol, setSymbol] = useState(false);
    const [numbers, setNumbers] = useState(false);
    const [loads, setLoads] = useState(false);
    const { user, errorMessage } = useSelector((state) => state.registered);
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
                minLength: 0,
                minLowercase: 0,
                minUppercase: 0,
                minNumbers: 0,
                minSymbols: 1
            })
        ) {
            setSymbol(true);
        } else {
            setSymbol(false);
        }

        if (
            validator.isStrongPassword(e.target.value, {
                minLength: 0,
                minLowercase: 0,
                minUppercase: 0,
                minNumbers: 1,
                minSymbols: 0
            })
        ) {
            setNumbers(true);
        } else {
            setNumbers(false);
        }

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
        // //console.logpName);
    };
    // display Lofg in with end
    const types = (type) => {
        setOutType(type);
    };
    const typed = (type) => {
        setOutTyped(type);
    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const onSubmit = (data) => {
        //console.logdata);
        if (selectCountry === '') {
            setError('Choose a country');
        } else {
            window.localStorage.setItem(
                'country',
                JSON.stringify(selectCountry)
            );
        }
        setError('');
        if (
            password === confirmPassword &&
            symbol === true &&
            numbers === true
        ) {
            setLoads((prev) => !prev);
            const postData = {
                preferredName,
                email,
                password,
                confirmPassword,
                affiliateCode: 'ENG'
            };
            setLoading(true);
            // //console.logerrorMessage);
            dispatch(createUserAction(postData));
        } else {
            passwordMatch;
        }
    };
    const sentSIgnUp = () => {
        // //console.logerrorMessage);
        if (errorMessage !== null) {
            setError(errorMessage);
            setLoading(false);
        } else if (user == 'User registered successfully') {
            router.push('../Verify/Loading');
        }
    };
    useEffect(() => {
        sentSIgnUp();
    }, [errorMessage, user]);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formTag}>
            {error ? <p className={styles.error}>{error}</p> : null}
            <div className={styles.homeForm}>
                <div className={styles.secondSectionMidCountry}>
                    <label htmlFor="">Preferred Name</label>
                    <input
                        type="text"
                        {...register('userName', {
                            required: 'Preferred name  is required',
                            pattern: {
                                value: /^[A-Za-z ]+$/i,
                                message: 'Only Alphabelts allowed'
                            }
                        })}
                        onInput={userName}
                        value={preferredName}
                        placeholder="Preferred Name"
                    />
                    {/* <InputTag
                        label="Preferred Name"
                        placeholder="Preferred Name"
                        type="text"
                        pattern={{
                            value: /^[A-Za-z ]+$/i,
                            message: 'Only Alphabelts allowed'
                        }}
                        value={preferredName}
                        action={userName}
                    /> */}
                    {errors.userName ? (
                        <p className={styles.error}>
                            {errors.userName?.message}
                        </p>
                    ) : null}
                </div>
                <div className={styles.secondSectionMidYes}>
                    <label htmlFor="">Email Address</label>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Invalid email address'
                            }
                        })}
                        onInput={handleEmail}
                        value={email}
                        placeholder="Enter your Email"
                    />
                    <p className={styles.error}>{errors.email?.message}</p>
                </div>
            </div>
            <div className={styles.homeForm}>
                <div className={styles.secondSectionMidCountry}>
                    <label htmlFor="">Password</label>
                    <div className={styles.divs}>
                        <input
                            type={outType ? 'text' : 'password'}
                            placeholder="Enter Password"
                            onInput={handlePwd}
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
                <div className={styles.secondSectionMidYes}>
                    <label htmlFor="">Confirm Password</label>
                    <div className={styles.divs}>
                        <input
                            placeholder="Enter Password "
                            type={outTyped ? 'text' : 'password'}
                            onChange={handlePaswword}
                        />
                        <Visbility typeSet={typed} />
                    </div>
                    {password == confirmPassword ? null : (
                        <>
                            <p className={styles.error}>{passwordMatch}</p>
                        </>
                    )}
                    {
                        <div className={styles.sameErroSize}>
                            <p
                                className={
                                    numbers ? styles.success : styles.error
                                }
                            >
                                password should Contain atleast 1 number
                            </p>
                            <p
                                className={
                                    symbol ? styles.success : styles.error
                                }
                            >
                                password should Contain atleast 1 special
                                character
                            </p>
                        </div>
                    }
                </div>
            </div>
            <div className={styles.secondSectionMidCountry}>
                <ButtonComp
                    disabled={activeBtn}
                    active={activeBtn ? 'active' : 'inactive'}
                    text="Create account"
                    type="submit"
                    loads={loads}
                    err={errorMessage}
                />

                <p className={styles.already}>
                    Already have an account?{' '}
                    <Link href="../Auth/Login">
                        <span>Sign in</span>
                    </Link>
                </p>
            </div>
        </form>
    );
};
export default NewUser;
