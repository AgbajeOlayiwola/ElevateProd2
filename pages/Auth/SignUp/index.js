import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './style.module.css';
import { ButtonComp, LoginWith } from '../../../components';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Visbility from '../../../components/ReusableComponents/Eyeysvg';

const Signup = ({ type }) => {
    const router = useRouter();
    const [message, setMessage] = useState();
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    // button active states
    const [activeBtn, setActiveBtn] = useState(false);
    //button active states
    // business ui
    const [business, setBusiness] = useState(true);
    const [count, setCount] = useState([]);

    // display Login with
    const [displayLogUi, setDisplayLogUI] = useState(true);
    const [labelI, setLabelI] = useState('Enter Your OmniLite Login ID');
    const [labelII, setLabelII] = useState('Enter Your OmniLite Password');
    const [placeholderI, setPlaceholderI] = useState('Login ID');
    const [placeholderII, setPlaceholderII] = useState('Password');
    const [inputFields, setInputFields] = useState(false);
    const [bankDets, setBankDets] = useState(false);
    const [active, setActive] = useState(false);

    const [omnilit, setOmnilite] = useState(true);
    const [ecobank, setEcobank] = useState(false);
    const [acct, setAcct] = useState(false);
    const [card, setCard] = useState(false);
    const [statusCheck, setStatusCheck] = useState(false);
    const [outType, setOutType] = useState();

    const handleDisplay = () => {
        setDisplayLogUI((prevState) => !prevState);
        setActive((prevState) => !prevState);
        setLabelI('Enter Your OmniLite Login ID');
        setLabelII('Enter Your OmniLite Password');
        setPlaceholderI('Login ID');
        setPlaceholderII('Password');
        setInputFields(false);
        setBankDets(false);
    };
    const handleEco = () => {
        setDisplayLogUI((prevState) => !prevState);
        setActive((prevState) => !prevState);
        setLabelI('Enter Your Ecobank Online ID');
        setLabelII('Enter Your Ecobank Password');
        setPlaceholderI('Ecobank Online ID');
        setPlaceholderII('Ecobank Password');
        setInputFields(false);
        setBankDets(false);
    };
    const handleAcct = () => {
        setDisplayLogUI((prevState) => !prevState);
        setActive((prevState) => !prevState);
        setLabelI('Enter Your Account Number');
        setLabelII('Enter Your Account Password');
        setPlaceholderI('Account Number');
        setPlaceholderII('Password');
        setInputFields(true);
        setBankDets(false);
    };
    const handleBankCard = () => {
        setDisplayLogUI((prevState) => !prevState);
        setActive((prevState) => !prevState);
        setLabelI('Enter Your Bank Card Number');
        setLabelII('Enter Name On Card');
        setPlaceholderI('Bank Card Number');
        setPlaceholderII('Name On Card');
        setInputFields(false);
        setBankDets(true);
    };
    const [passwordMatch, setPasswordMatch] = useState('');

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
    const onSubmit = ({ data }) => {
        console.log(data);
        if (password == confPassword) {
            router.push('../Verify');
        } else {
            setPasswordMatch('Passwords do not match');
        }
    };

    const [bgcolor, setBgcolor] = useState(false);

    const switchRegistrationStatus = () => {
        setIsRegistered(false);
        setBgcolor((prevState) => !prevState);
    };
    const handlePaswword = (e) => {
        setCount(e.target.value.length);
        setConfPassword(e.target.value);
        if (password != confPassword) {
            setPasswordMatch('Passwords do not match');
        }
    };
    const handlePwd = (e) => {
        setCount(e.target.value.length);
        setPassword(e.target.value);
    };
    console.log(confPassword);
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
                                    {/* register your input into the hook by invoking the "register" function */}
                                    <div>
                                        <label>Preffered Name</label>
                                        <br />
                                        <input
                                            placeholder="Enter Your Name"
                                            className={styles.textInput}
                                            {...register('Name')}
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
                                                required
                                                type={
                                                    outType
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                onChange={handlePwd}
                                            />

                                            <Visbility typeSet={types} />
                                        </div>
                                        {count <= 1 || count >= 8 ? null : (
                                            <p className={styles.error}>
                                                Minimum Password length is 8
                                                Characters
                                            </p>
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

                                    {password == confPassword ? null : (
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
                                        <LoginWith
                                            labelI={labelI}
                                            labelII={labelII}
                                            placeholderI={placeholderI}
                                            placeholderII={placeholderII}
                                            displayInput={inputFields}
                                            bankdets={bankDets}
                                        />
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
