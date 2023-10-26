import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import * as yup from 'yup';
import { useRegisterMutation } from '../../../redux/api/authApi';
import { setProfile } from '../../../redux/slices/profile';
import ButtonComp from '../Button';
import Visbility from '../Eyeysvg';
import TermsConditions from '../TermmsConditions';
import styles from './styles.module.css';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        height: '70vh',
        width: '40vw',
        color: '#3e3e3e',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 999999
    }
};

const NewUser = ({ selectCountry, selectedOption, onSelectChange }) => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

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
    const [activeBtn, setActiveBtn] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState('');
    const [symbol, setSymbol] = useState(false);
    const [uppercase, setUppercase] = useState(false);
    const [numbers, setNumbers] = useState(false);
    const [loads, setLoads] = useState(false);

    // display Lofg in with end
    const types = (type) => {
        setOutType(type);
    };
    const typed = (type) => {
        setOutTyped(type);
    };
    const [
        register,
        {
            data: registerData,
            isLoading: registerLoad,
            isSuccess: registerSuccess,
            isError: registerFalse,
            error: registerErr,
            reset: registerReset
        }
    ] = useRegisterMutation();

    const handleProceed = async (val) => {
        await dispatch(setProfile(val?.data));
        dispatch(setToken(val?.data?.token));
        router.push('/Verify');
    };

    useEffect(() => {
        if (registerSuccess) {
            handleProceed(registerData);
            setLoading(false);
        }
    }, [registerSuccess]);

    const initSchema = yup.object().shape({
        confirm_password: yup
            .string()
            .required('Please confirm password')
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
        email: yup
            .string()
            .trim()
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup.string().required('Please enter your password'),
        preferredName: yup.string().required('Preffered name is required')
    });

    const initialValues = {
        email: '',
        password: '',
        preferredName: ''
    };

    const handleChange = (event) => {
        const newOption = event.target.value;
        onSelectChange(newOption); // Call the callback function in the parent component
    };
    const showToastMessage = () => {
        toast.error(registerErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
    };
    useEffect(() => {
        showToastMessage();
    }, [registerErr]);

    return (
        <>
            <div className={styles.secondSectionMidYes}>
                <label htmlFor="">Do you have an Ecobank Account?</label>
                <select onChange={handleChange} value={selectedOption}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>
            <ToastContainer />
            <Formik
                validationSchema={initSchema}
                initialValues={initialValues}
                // validateOnChange={true}
                onSubmit={(values, { setSubmitting }) => {
                    console.log('click');
                    register(values);
                    setLoading(true);
                    localStorage.setItem('email', values?.email);
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
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <p className={styles.error}></p>
                        <Tooltip anchorId="my-element" />
                        <div>
                            <div className={styles.homeForm}>
                                <div className={styles.secondSectionMidCountry}>
                                    <label
                                        htmlFor="preferredName"
                                        id="my-element"
                                        data-tooltip-content="This is the name you will be known on the app with"
                                    >
                                        Preferred user name/alias
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setFieldValue(
                                                'preferredName',
                                                e.target.value
                                            )
                                        }
                                        type="text"
                                        name="preferredName"
                                        placeholder="Preferred user name/alias"
                                    />
                                    <p className={styles.error}>
                                        {errors ? (
                                            <>{errors?.preferredName}</>
                                        ) : null}
                                    </p>
                                </div>

                                <div className={styles.secondSectionMidYes}>
                                    <label htmlFor="">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={(e) =>
                                            setFieldValue(
                                                'email',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter your Email"
                                    />
                                    <p className={styles.error}>
                                        {errors ? <>{errors?.email}</> : null}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.homeForm}>
                                <div className={styles.secondSectionMidCountry}>
                                    <label htmlFor="">Create Password</label>
                                    <div className={styles.divs}>
                                        <input
                                            type={outType ? 'text' : 'password'}
                                            placeholder="Enter Password"
                                            name="password"
                                            onChange={(e) =>
                                                setFieldValue(
                                                    'password',
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <Visbility
                                            typeSet={types}
                                            input="input"
                                        />
                                    </div>
                                    <PasswordStrengthBar
                                        password={values.password}
                                    />
                                    <p className={styles.error}>
                                        {errors ? (
                                            <>{errors?.password}</>
                                        ) : null}
                                    </p>
                                </div>
                                <div className={styles.secondSectionMidYes}>
                                    <label htmlFor="">Confirm Password</label>
                                    <div className={styles.divs}>
                                        <input
                                            placeholder="Enter Password "
                                            type={
                                                outTyped ? 'text' : 'password'
                                            }
                                            name="confirm_password"
                                            onChange={(e) =>
                                                setFieldValue(
                                                    'confirm_password',
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <Visbility
                                            typeSet={typed}
                                            input="input"
                                        />
                                    </div>
                                    <p className={styles.error}>
                                        {errors ? (
                                            <>{errors?.confirm_password}</>
                                        ) : null}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <ul>
                                <div className={styles.headerDiv}>
                                    <h2
                                        ref={(_subtitle) =>
                                            (subtitle = _subtitle)
                                        }
                                    >
                                        GLOBAL ACCOUNT TERMS AND CONDITIONS DEC
                                        2022
                                    </h2>
                                    <h1
                                        className={styles.errorX}
                                        onClick={closeModal}
                                    >
                                        X
                                    </h1>
                                </div>

                                <TermsConditions />
                            </ul>
                        </Modal>
                        <p className={styles.alreadyTC}>
                            <input
                                type="radio"
                                onChange={() => setActiveBtn(true)}
                                className={styles.termms}
                            />
                            I agree with SMEApp{' '}
                            <span
                                className={styles.termsBtn}
                                onClick={openModal}
                            >
                                <span>Terms and Conditions</span>
                            </span>
                        </p>
                        <div className={styles.secondSectionMidCountry}>
                            <ButtonComp
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
                                text="Create account"
                                type="submit"
                                loads={registerLoad}
                            />
                        </div>
                        <p className={styles.already}>
                            Already have an account?{' '}
                            <Link href="/Auth/Login">
                                <span>Sign in</span>
                            </Link>
                        </p>
                    </form>
                )}
            </Formik>
        </>
    );
};
export default NewUser;
