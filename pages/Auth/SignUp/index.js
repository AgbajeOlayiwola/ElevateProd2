import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './style.module.css';
import { ButtonComp, LoginWith } from '../../../components';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Signup = () => {
    const router = useRouter();
    const [message, setMessage] = useState();
    // business ui
    const [business, setBusiness] = useState(false);
    // display Login with
    const [displayLogUi, setDisplayLogUI] = useState(false);
    const [labelI, setLabelI] = useState();
    const [labelII, setLabelII] = useState();
    const [placeholderI, setPlaceholderI] = useState();
    const [placeholderII, setPlaceholderII] = useState();
    const [inputFields, setInputFields] = useState(false);

    const handleDisplay = () => {
        setDisplayLogUI((prevState) => !prevState);
        setLabelI('Enter Your OmniLite Login ID');
        setLabelII('Enter Your OmniLite Password');
        setPlaceholderI('Login ID');
        setPlaceholderII('Password');
        setInputFields(false);
    };
    const handleEco = () => {
        setDisplayLogUI((prevState) => !prevState);
        setLabelI('Enter Your Ecobank Login ID');
        setLabelII('Enter Your Ecobank Password');
        setPlaceholderI('Ecobank ID');
        setPlaceholderII('Ecobank Password');
        setInputFields(false);
    };
    const handleAcct = () => {
        setDisplayLogUI((prevState) => !prevState);
        setLabelI('Enter Your Account Number');
        setLabelII('Enter Your Account Password');
        setPlaceholderI('Account Number');
        setPlaceholderII('Password');
        setInputFields(true);
    };
    const handleBankCard = () => {
        setDisplayLogUI((prevState) => !prevState);
        setLabelI('Enter Your Bank Card');
        setLabelII('Enter Your Bank CArd Password');
        setPlaceholderI('Bank Card Number');
        setPlaceholderII('Password');
        setInputFields(false);
    };

    // display Lofg in with end

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const onSubmit = ({ data }) => {
        console.log(data);
        router.push('../Verify');
    };
    console.log(watch('example')); // watch input value by passing the name of it

    return (
        <>
            {business ? (
                <div className={styles.cover}>
                    <section className={styles.sectionI}>
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
                    </section>
                    <section className={styles.sectionII}>
                        <div>
                            <div>
                                <h1 className={styles.signup}>Sign up</h1>
                            </div>
                        </div>
                        {/* /* "handleSubmit" will validate your inputs before invoking
                "onSubmit" */}
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
                                />
                            </div>

                            {/* include validation with required or other standard HTML validation rules */}
                            <div>
                                <label>Password</label>
                                <br />
                                <input
                                    placeholder="Password"
                                    className={styles.textInput}
                                    type="password"
                                    {...register('password', {
                                        required: true
                                    })}
                                />
                            </div>

                            {/* include validation with required or other standard HTML validation rules */}
                            <div>
                                <label>Confirm Password</label>
                                <br />
                                <input
                                    placeholder="Confirm Password"
                                    className={styles.textInput}
                                    type="password"
                                    required
                                    {...register('exampleRequired', {
                                        required: true
                                    })}
                                />
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    className={styles.termcondition}
                                />
                                <label>
                                    I agree with Ellevate App
                                    <span> Terms and Conditions</span>
                                </label>
                            </div>
                            {/* errors will return when field validation fails  */}
                            {errors.exampleRequired && (
                                <span>This field is required</span>
                            )}
                            <ButtonComp text="Proceed" type="submit" />
                        </form>

                        <div>
                            <p className={styles.accout}>
                                Do you Have An Accout? <span>Sign up</span>
                            </p>
                        </div>
                    </section>
                </div>
            ) : (
                <div className={styles.cover}>
                    <section className={styles.sectionI}>
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
                    </section>
                    <section className={styles.sectionII}>
                        <div>
                            <div>
                                <h1 className={styles.signup}>Sign up</h1>
                            </div>
                        </div>
                        {/* /* "handleSubmit" will validate your inputs before invoking
                "onSubmit" */}
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className={styles.form}
                        >
                            {/* register your input into the hook by invoking the "register" function */}
                            <div>
                                <label>Enter Your BVN</label>
                                <br />
                                <input
                                    placeholder="Enter Your BVN"
                                    className={styles.textInput}
                                    {...register('Name')}
                                />
                            </div>
                            {/* include validation with required or other standard HTML validation rules */}
                            <div>
                                <label>Password</label>
                                <br />
                                <input
                                    placeholder="Password"
                                    className={styles.textInput}
                                    type="password"
                                    {...register('password', {
                                        required: true
                                    })}
                                />
                            </div>

                            {/* include validation with required or other standard HTML validation rules */}
                            <div>
                                <label>Confirm Password</label>
                                <br />
                                <input
                                    placeholder="Confirm Password"
                                    className={styles.textInput}
                                    type="password"
                                    required
                                    {...register('exampleRequired', {
                                        required: true
                                    })}
                                />
                            </div>
                            <p className={styles.choose}>
                                Choose Preferred Login Option
                            </p>
                            <div className={styles.omnisets}>
                                <div
                                    className={styles.omnilite}
                                    onClick={handleDisplay}
                                >
                                    <Image
                                        src="/Assets/Images/omni.png"
                                        width={30}
                                        height={30}
                                        alt="omnilite"
                                    />
                                </div>
                                <div
                                    className={styles.ecobank}
                                    onClick={handleEco}
                                >
                                    <Image
                                        src="/Assets/Images/ecobank.png"
                                        width={30}
                                        height={30}
                                        alt="omnilite"
                                    />
                                </div>
                                <div
                                    className={styles.AcctNum}
                                    onClick={handleAcct}
                                >
                                    <Image
                                        src="/Assets/Images/account.png"
                                        width={30}
                                        height={30}
                                        alt="omnilite"
                                    />
                                </div>
                                <div
                                    className={styles.Bankcard}
                                    onClick={handleBankCard}
                                >
                                    <Image
                                        src="/Assets/Images/bankcard.png"
                                        width={30}
                                        height={30}
                                        alt="omnilite"
                                    />
                                </div>
                            </div>
                            <LoginWith
                                labelI={labelI}
                                labelII={labelII}
                                placeholderI={placeholderI}
                                placeholderII={placeholderII}
                                display={displayLogUi}
                                displayInput={inputFields}
                            />
                            <div>
                                <input
                                    type="radio"
                                    className={styles.termcondition}
                                />
                                <label>
                                    I agree with Ellevate App
                                    <span> Terms and Conditions</span>
                                </label>
                            </div>
                            {/* errors will return when field validation fails  */}
                            {errors.exampleRequired && (
                                <span>This field is required</span>
                            )}
                            <ButtonComp text="Proceed" type="submit" />
                        </form>

                        <div>
                            <p className={styles.accout}>
                                Do you Have An Accout? <span>Sign up</span>
                            </p>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
};

export default Signup;
