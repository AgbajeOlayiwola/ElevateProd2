import React, { useState, useEffect } from 'react';
import ButtonComp from '../../ReusableComponents/Button';
// import { RegisteredCardWrapper } from './styles.module';
import { useForm } from 'react-hook-form';
import Card from '../NotRegisteredForms/Card';
import Visbility from '../../ReusableComponents/Eyeysvg';
import styles from './styles.module.css';
import validator from 'validator';
import { existingUserProfileData } from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../ReusableComponents/Loader';
import Progressbar from '../../ReusableComponents/Progressbar';
import ArrowBackSvg from '../../ReusableComponents/ArrowBackSvg';
import ProfileSetupSide from '../../ReusableComponents/ProfileSetupSide';
import { setCookie } from 'cookies-next';

const RegisteredForm = ({
    handleShowSecondStep,
    action,
    move,
    formData,
    setFormData,
    loading,
    setLoading,
    loads,
    err
    // errorMessage
}) => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const account = localStorage.getItem('account');
    const accountDetails = JSON.parse(account);
    //console.log(accountDetails);
    const sendAccount = localStorage.getItem('account');
    const sendAccounts = JSON.parse(sendAccount);
    const [activeBtn, setActiveBtn] = useState(true);
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState('');
    // const [userId, setUserId] = useState('');
    const [errorMessages, setErrorMessages] = useState('');
    // const [loading, setLoading] = useState(false);
    const [emailData, setEmailData] = useState('');
    const { existingUserProfilee, errorMessage } = useSelector(
        (state) => state.existingUserProfileReducer
    );
    //console.log(existingUserProfilee);
    const handlePaswword = (e) => {
        setCount(e.target.value.length);
        setConfPassword(e.target.value);
        setFormData({
            ...formData,
            confPassword: e.target.value
        });
        if (password != confPassword) {
            setPasswordMatch('Passwords do not match');
        }
    };
    //how to write states in functional componenet in reactjs

    const handlePwd = (e) => {
        setCount(e.target.value.length);
        setFormData({
            ...formData,
            password: e.target.value
        });
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
        // let meta = sendAccounts;
        // meta = { ...meta, password: e.target.value };
        // window.localStorage.setItem('meta', JSON.stringify(meta));
    };
    //console.log(profileInfo);
    let accounts = window.localStorage.getItem('account');
    var newAccounts = JSON.parse(accounts);
    //console.log(newAccounts);
    //console.log('payload', emailData, password, confPassword);

    useEffect(() => {
        if (newAccounts.userId) {
            setFormData({ ...formData, userId: newAccounts.userId });
        } else if (newAccounts.user.userId) {
            setFormData({ ...formData, userId: newAccounts.user.userId });
        }

        //console.log(formData.userId);
    }, []);
    const types = (types) => {
        setOutTypes(types);
    };
    const type = (type) => {
        setOutType(type);
    };
    useEffect(() => {
        setLoading((prev) => !prev);
    }, [errorMessage]);

    const [count, setCount] = useState([]);
    const [outType, setOutType] = useState();
    const [outTypes, setOutTypes] = useState();

    //console.log(existingUserProfilee);
    return (
        <div className={styles.body}>
            <section className={styles.sectionI}>
                <ProfileSetupSide text="Input your BVN and open a Business Account in 3 minutes." />
            </section>
            <section className={styles.sectionII}>
                <div className={styles.secondStepForm}>
                    <div className={styles.cardHeading}>
                        <ArrowBackSvg action={action} color="#102572" />
                        <div>
                            {errorMessage ? (
                                <p className={styles.error}>
                                    {errorMessage?.response?.data?.message}
                                </p>
                            ) : null}
                            <h3 className={styles.LeftHeading}>
                                Profile Setup
                            </h3>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(move)}>
                        {/* include validation with required or other standard HTML validation rules */}
                        <div className={styles.textInput}>
                            <label>Email Address </label>
                            {errors.email?.message}
                            <input
                                placeholder="Enter Your Email"
                                className={styles.textInput}
                                required
                                // readOnly
                                value={
                                    newAccounts.email
                                        ? newAccounts.email
                                        : newAccounts.user
                                        ? newAccounts.user.email
                                        : formData.emailData
                                }
                                onChange={(event) =>
                                    setFormData({
                                        ...formData,
                                        emailData: event.target.value
                                    })
                                }
                            />
                        </div>

                        <div className={styles.textInput}>
                            <label> Password</label>
                            <div className={styles.divs}>
                                <input
                                    placeholder="Enter your Password"
                                    className={styles.textInput}
                                    required
                                    autoComplete="false"
                                    type={outTypes ? 'text' : 'password'}
                                    onChange={handlePwd}
                                />
                                <Visbility typeSet={types} input="input" />
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

                        <div className={styles.textInput}>
                            <label>Confirm Password</label>
                            <div className={styles.divs}>
                                <input
                                    placeholder="Confirm your Password"
                                    className={styles.textInput}
                                    autoComplete="false"
                                    required
                                    type={outType ? 'text' : 'password'}
                                    onChange={handlePaswword}
                                />

                                <Visbility typeSet={type} input="input" />
                            </div>
                            {password === confPassword ? null : (
                                <p className={styles.error}>{passwordMatch}</p>
                            )}
                        </div>
                        {/* {loading ? <Loader /> : null} */}
                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            type="submit"
                            text="Next"
                            loads={loads}
                            err={err}
                        />
                        {/* )} */}
                    </form>
                </div>
            </section>
        </div>
    );
};

export default RegisteredForm;
