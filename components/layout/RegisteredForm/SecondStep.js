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
import { Formik } from 'formik';
import * as yup from 'yup';
import {
    useCreateExistingUserProfileMutation,
    useGetMoreAccountNumberDetailsMutation,
    useRegisterMutation
} from '../../../redux/api/authApi';
import { setExistingUserDetails } from '../../../redux/slices/existingUserData';
import { setProfile } from '../../../redux/slices/profile';
import { setfaceMatchDetails } from '../../../redux/slices/facematchSlice';
const RegisteredForm = ({
    action,
    move,
    formData,
    setFormData,
    setLoading,
    loads,
    nextStep
}) => {
    const dispatch = useDispatch();

    const account = localStorage.getItem('account');
    const accountDetails = JSON.parse(account);
    const sendAccount = localStorage.getItem('account');
    const sendAccounts = JSON.parse(sendAccount);
    const [activeBtn, setActiveBtn] = useState(true);
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState('');
    const [errorMessages, setErrorMessages] = useState('');
    const [count, setCount] = useState([]);
    const [outType, setOutType] = useState();
    const [outTypes, setOutTypes] = useState();
    const types = (types) => {
        setOutTypes(types);
    };
    const type = (type) => {
        setOutType(type);
    };
    const [
        createExistingUserProfile,
        {
            data: createExistingUserProfileData,
            isLoading: createExistingUserProfileLoad,
            isSuccess: createExistingUserProfileSuccess,
            isError: createExistingUserProfileFalse,
            error: createExistingUserProfileErr,
            reset: createExistingUserProfileReset
        }
    ] = useCreateExistingUserProfileMutation();
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
        password: yup.string().required('Please enter your password')
        // .matches(
        //     /^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#\$%\^&\*])(?=.{8,})/,
        //     'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        // ),
        // preferredName: yup.string().required('Preffered name is required')
    });

    const initialValues = {
        email: '',
        password: ''
    };
    const [
        getMoreAccountNumberDetails,
        {
            data: getMoreAccountNumberDetailsData,
            isLoading: getMoreAccountNumberDetailsLoad,
            isSuccess: getMoreAccountNumberDetailsSuccess,
            isError: getMoreAccountNumberDetailsFalse,
            error: getMoreAccountNumberDetailsErr,
            reset: getMoreAccountNumberDetailsReset
        }
    ] = useGetMoreAccountNumberDetailsMutation();
    const { existingUserDetails } = useSelector((store) => store);
    const { moreAccountNumberDetails } = useSelector((store) => store);
    const { faceMatchDetails } = useSelector((store) => store);

    console.log(faceMatchDetails);

    console.log(existingUserDetails);
    console.log(moreAccountNumberDetails);
    useEffect(() => {
        if (getMoreAccountNumberDetailsData) {
            dispatch(
                setExistingUserDetails(getMoreAccountNumberDetailsData?.data)
            );
        }
    }, [getMoreAccountNumberDetailsSuccess]);

    useEffect(() => {
        if (createExistingUserProfileData) {
            dispatch(setProfile(createExistingUserProfileData?.data));
            nextStep();
        }
    }, [createExistingUserProfileSuccess]);

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
                            <h3 className={styles.LeftHeading}>
                                Profile Setup
                            </h3>
                        </div>
                    </div>
                    {createExistingUserProfileErr ? (
                        <p className={styles.error}>
                            {createExistingUserProfileErr?.data?.message}
                        </p>
                    ) : null}
                    <Formik
                        validationSchema={initSchema}
                        initialValues={initialValues}
                        // validateOnChange={true}
                        onSubmit={(values, { setSubmitting }) => {
                            if (localStorage.getItem('loginWith')) {
                                dispatch(setfaceMatchDetails(values));
                                action();
                            } else {
                                const data = {
                                    password: values.password,
                                    email: values.email,
                                    customerCategory:
                                        moreAccountNumberDetails?.accounts
                                            ?.customerType == 'I'
                                            ? 'INDIVIDUAL'
                                            : 'COMMERCIAL',
                                    firstName: moreAccountNumberDetails?.accounts?.accountName.split(
                                        ' '
                                    )[0],
                                    lastName: moreAccountNumberDetails?.accounts?.accountName
                                        .split(' ')
                                        ?.slice(1)
                                        ?.join(' '),
                                    middleName: '',
                                    gender:
                                        moreAccountNumberDetails?.accounts
                                            ?.gender === 'M'
                                            ? 'Male'
                                            : moreAccountNumberDetails?.accounts
                                                  ?.gender === 'F'
                                            ? 'Female'
                                            : null, //Format as M or F
                                    dateOfBirth:
                                        moreAccountNumberDetails?.accounts
                                            ?.dob || null,
                                    nationality:
                                        existingUserDetails?.affiliateCountry ||
                                        null,
                                    phoneNumber:
                                        moreAccountNumberDetails?.accounts
                                            ?.mobileNos || null,
                                    accountNumber:
                                        moreAccountNumberDetails?.accounts
                                            ?.accountNumber || null,
                                    currencyCode:
                                        moreAccountNumberDetails?.accounts
                                            ?.currencyCode || null,
                                    customerId:
                                        moreAccountNumberDetails?.accounts
                                            ?.customerID || null,
                                    bvn:
                                        moreAccountNumberDetails?.accounts
                                            ?.bvn || null,
                                    accounts: existingUserDetails?.accounts,
                                    city: '',
                                    state: '',
                                    lga: ''
                                };
                                createExistingUserProfile(data);
                            }
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
                            <form onSubmit={handleSubmit}>
                                {/* include validation with required or other standard HTML validation rules */}
                                <div className={styles.textInput}>
                                    <label>Email Address </label>

                                    <input
                                        placeholder="Enter Your Email"
                                        className={styles.textInput}
                                        onChange={(e) =>
                                            setFieldValue(
                                                'email',
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <p className={styles.error}>
                                    {errors ? <>{errors?.email}</> : null}
                                </p>
                                <div className={styles.textInput}>
                                    <label> Password</label>
                                    <div className={styles.divs}>
                                        <input
                                            placeholder="Enter your Password"
                                            className={styles.textInput}
                                            required
                                            autoComplete="false"
                                            name="password"
                                            onChange={(e) =>
                                                setFieldValue(
                                                    'password',
                                                    e.target.value
                                                )
                                            }
                                            type={
                                                outTypes ? 'text' : 'password'
                                            }
                                        />
                                        <Visbility
                                            typeSet={types}
                                            input="input"
                                        />
                                    </div>
                                </div>
                                <p className={styles.error}>
                                    {errors ? <>{errors?.password}</> : null}
                                </p>
                                <div className={styles.textInput}>
                                    <label>Confirm Password</label>
                                    <div className={styles.divs}>
                                        <input
                                            placeholder="Confirm your Password"
                                            className={styles.textInput}
                                            autoComplete="false"
                                            required
                                            type={outType ? 'text' : 'password'}
                                            name="confirm_password"
                                            onChange={(e) =>
                                                setFieldValue(
                                                    'confirm_password',
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <Visbility
                                            typeSet={type}
                                            input="input"
                                        />
                                    </div>
                                </div>
                                <p className={styles.error}>
                                    {errors ? (
                                        <>{errors?.confirm_password}</>
                                    ) : null}
                                </p>
                                {/* {loading ? <Loader /> : null} */}
                                <ButtonComp
                                    disabled={activeBtn}
                                    active={activeBtn ? 'active' : 'inactive'}
                                    type="submit"
                                    text="Next"
                                    loads={createExistingUserProfileLoad}
                                />
                            </form>
                        )}
                    </Formik>
                </div>
            </section>
        </div>
    );
};

export default RegisteredForm;
