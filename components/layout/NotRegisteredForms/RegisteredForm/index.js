import React, { useEffect, useState } from 'react';
import ButtonComp from '../../../ReusableComponents/Button';
// import { RegisteredCardWrapper } from './styles.module';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InputWrapper, Label } from './styles.module';
import styles from './styles.module.css';
// import { loadCountry } from '../../../../redux/actions/actions';
import { Formik } from 'formik';
import {
    useProfileSetUpUnregisteredBusinessMutation,
    useRegisteredSetupMutation
} from '../../../../redux/api/authApi';
import { useSearchRCMutation } from '../../../../redux/api/cacApi';
import socialdata from '../../../ReusableComponents/Lotties/loading.json';
const RegisteredForm = ({ formData, setFormData, nextStep }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    const [businessName, setBusinessName] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();
    const [getRcFisrst, setGetRCFirst] = useState(false);
    const handleRegistrationStatus = () => {
        setFormData({ ...formData, type: true });
    };
    const switchRegistrationStatus = () => {
        setFormData({ ...formData, type: false });
    };
    let subtitle;
    const socialOptions = {
        loop: true,
        autoplay: true,
        animationData: socialdata,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const initialValues = {
        bvn: '',
        phoneNumber: ''
    };
    const businessInitialValues = {
        rcNumber: '',
        tin: '',
        bvn: '',
        phoneNumber: ''
    };
    const [callRc, setCallRc] = useState('');
    searchRC;
    const [
        searchRC,
        {
            data: searchRCData,
            isLoading: searchRCLoad,
            isSuccess: searchRCSuccess,
            isError: searchRCFalse,
            error: searchRCErr,
            reset: searchRCReset
        }
    ] = useSearchRCMutation();
    const [
        registeredSetup,
        {
            data: registeredSetupData,
            isLoading: registeredSetupLoad,
            isSuccess: registeredSetupSuccess,
            isError: registeredSetupFalse,
            error: registeredSetupErr,
            reset: registeredSetupReset
        }
    ] = useRegisteredSetupMutation();
    const [
        profileSetUpUnregisteredBusiness,
        {
            data: profileSetUpUnregisteredBusinessData,
            isLoading: profileSetUpUnregisteredBusinessLoad,
            isSuccess: profileSetUpUnregisteredBusinessSuccess,
            isError: profileSetUpUnregisteredBusinessFalse,
            error: profileSetUpUnregisteredBusinessErr,
            reset: profileSetUpUnregisteredBusinessReset
        }
    ] = useProfileSetUpUnregisteredBusinessMutation();
    useEffect(() => {
        if (callRc?.length > 2) {
            searchRC({
                registrationNumber: callRc
            });
        }
    }, [callRc]);
    const registerUser = (value) => {
        if ((formData.type == true) === true) {
            const data = {
                idNumber: value?.bvn?.length
                    ? value?.bvn
                    : `${formData?.countryCode}${value?.phoneNumber}`,
                phoneNumber: `${formData?.countryCode}${value?.phoneNumber}`,
                // taxNumber: '126378883',
                registrationNumber: callRc
            };

            registeredSetup(data);
        } else {
            const data = {
                idNumber: value?.bvn?.length
                    ? value?.bvn
                    : `${formData?.countryCode}${value?.phoneNumber}`,
                phoneNumber: `${formData?.countryCode}${value?.phoneNumber}`
            };
            console.log(data);
            profileSetUpUnregisteredBusiness(data);
        }
    };

    useEffect(() => {
        if (registeredSetupData) {
            nextStep();
        }
    }, [registeredSetupSuccess]);

    useEffect(() => {
        if (profileSetUpUnregisteredBusinessData) {
            nextStep();
        }
    }, [profileSetUpUnregisteredBusinessSuccess]);
    const affiliate = localStorage.getItem('affiliateCode');
    const showToastMessage = () => {
        toast.error(registeredSetupErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
    };
    useEffect(() => {
        if (registeredSetupErr) {
            showToastMessage();
        }
    }, [registeredSetupErr]);
    console.log(profileSetUpUnregisteredBusinessErr);
    const showToasErrortMessage = () => {
        toast.error(profileSetUpUnregisteredBusinessErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
    };
    useEffect(() => {
        if (profileSetUpUnregisteredBusinessErr) {
            showToasErrortMessage();
        }
    }, [profileSetUpUnregisteredBusinessErr]);

    return (
        <div className={styles.bodyWrapper}>
            <div className={styles.cardHeading}>
                <ToastContainer />
                <h3 className={styles.LeftHeading}>Profile Setup</h3>
                {/* <p>We recommend you use a phone number linked to BVN</p> */}
            </div>
            <div className={styles.formWrapper}>
                <InputWrapper>
                    <Label>Is your Business Registered?</Label>
                    <select
                        name=""
                        id=""
                        onChange={(e) => {
                            if (e.target.value === 'No') {
                                switchRegistrationStatus();
                            } else if (e.target.value === 'Yes') {
                                handleRegistrationStatus();
                            }
                        }}
                    >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </InputWrapper>
                {formData.type == true ? (
                    <Formik
                        // validationSchema={initSchema}
                        initialValues={businessInitialValues}
                        // validateOnChange={true}
                        onSubmit={(values, { setSubmitting }) => {
                            const data = {
                                rcNumber: callRc,
                                tin: values?.tin,
                                bvn: values?.bvn,
                                phoneNumber: values?.phoneNumber
                            };
                            localStorage.setItem(
                                'regprofilesetupdata',
                                JSON.stringify(data)
                            );
                            registerUser(values);
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
                            <form onSubmit={handleSubmit}>
                                <InputWrapper>
                                    <Label>
                                        Enter your RC Number/Business
                                        Registration Number
                                    </Label>
                                </InputWrapper>
                                <input
                                    type="text"
                                    placeholder="Your Business Registration number"
                                    name="rcNumber"
                                    onChange={(e) => setCallRc(e.target.value)}
                                />

                                <InputWrapper>
                                    <Label>Enter your TIN</Label>
                                    <input
                                        name="tin"
                                        type="text"
                                        placeholder="Your Tax Identification number"
                                        onChange={(e) =>
                                            setFieldValue('tin', e.target.value)
                                        }
                                    />
                                </InputWrapper>
                                {affiliate === 'ENG' ||
                                affiliate === 'EGH' ||
                                affiliate === 'EKE' ? (
                                    <InputWrapper>
                                        <Label>
                                            {affiliate === 'ENG'
                                                ? 'Enter your BVN'
                                                : affiliate === 'EGH'
                                                ? 'Ghana ID Number'
                                                : affiliate === 'EKE'
                                                ? 'Kenya ID Number'
                                                : ''}
                                        </Label>

                                        <input
                                            placeholder={
                                                affiliate === 'ENG'
                                                    ? 'Enter your BVN'
                                                    : affiliate === 'EGH'
                                                    ? 'Ghana ID Number'
                                                    : affiliate === 'EKE'
                                                    ? 'Kenya ID Number'
                                                    : ''
                                            }
                                            label={
                                                affiliate === 'ENG'
                                                    ? 'Enter your BVN'
                                                    : affiliate === 'EGH'
                                                    ? 'Ghana ID Number'
                                                    : affiliate === 'EKE'
                                                    ? 'Kenya ID Number'
                                                    : ''
                                            }
                                            name="bvn"
                                            // @ts-ignore
                                            autoCorrect={false}
                                            onChange={(value) => {
                                                setFieldValue(
                                                    'bvn',
                                                    value?.target?.value
                                                ),
                                                    console.log(value);
                                            }}
                                            // maxLength={11}
                                        />
                                    </InputWrapper>
                                ) : null}

                                <InputWrapper>
                                    <Label>Phone Number</Label>
                                    <div className={styles.phone}>
                                        <div className={styles.phoneHeader}>
                                            <span>
                                                <img
                                                    src={formData.flag}
                                                    alt=""
                                                />
                                            </span>
                                            <p>{formData.baseCurrency}</p>
                                        </div>
                                        <div className={styles.phoneDetails}>
                                            <p> +{formData.countryCode}</p>
                                            <input
                                                type="number"
                                                name="phoneNumber"
                                                placeholder="812 345 6789"
                                                onChange={(e) =>
                                                    setFieldValue(
                                                        'phoneNumber',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </InputWrapper>

                                <ButtonComp
                                    disabled={activeBtn}
                                    active={activeBtn ? 'active' : 'inactive'}
                                    type="submit"
                                    text={'Next'}
                                    loads={registeredSetupLoad}
                                />
                            </form>
                        )}
                    </Formik>
                ) : (
                    ''
                )}
                {formData.type === false ? (
                    <Formik
                        // validationSchema={initSchema}
                        initialValues={initialValues}
                        // validateOnChange={true}
                        onSubmit={(values, { setSubmitting }) => {
                            const data = {
                                bvn: values?.bvn,
                                phoneNumber: values?.phoneNumber
                            };
                            localStorage.setItem(
                                'profilesetupdata',
                                JSON.stringify(data)
                            );
                            registerUser(values);
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
                            <form onSubmit={handleSubmit}>
                                {affiliate === 'ENG' ||
                                affiliate === 'EGH' ||
                                affiliate === 'EKE' ? (
                                    <InputWrapper>
                                        <Label>
                                            {affiliate === 'ENG'
                                                ? 'Enter your BVN'
                                                : affiliate === 'EGH'
                                                ? 'Ghana ID Number'
                                                : affiliate === 'EKE'
                                                ? 'Kenya ID Number'
                                                : ''}
                                        </Label>

                                        <input
                                            placeholder={
                                                affiliate === 'ENG'
                                                    ? 'Enter your BVN'
                                                    : affiliate === 'EGH'
                                                    ? 'Ghana ID Number'
                                                    : affiliate === 'EKE'
                                                    ? 'Kenya ID Number'
                                                    : ''
                                            }
                                            label={
                                                affiliate === 'ENG'
                                                    ? 'Enter your BVN'
                                                    : affiliate === 'EGH'
                                                    ? 'Ghana ID Number'
                                                    : affiliate === 'EKE'
                                                    ? 'Kenya ID Number'
                                                    : ''
                                            }
                                            name="bvn"
                                            // @ts-ignore
                                            autoCorrect={false}
                                            onChange={(value) =>
                                                setFieldValue(
                                                    'bvn',
                                                    value?.target?.value
                                                )
                                            }
                                            // maxLength={11}
                                            value={values.bvn}
                                        />
                                    </InputWrapper>
                                ) : null}

                                <InputWrapper>
                                    <Label>Phone Number</Label>
                                    <div className={styles.phone}>
                                        <div className={styles.phoneHeader}>
                                            <span>
                                                <img
                                                    src={formData.flag}
                                                    alt=""
                                                />
                                            </span>
                                            <p>{formData.baseCurrency}</p>
                                        </div>
                                        <div className={styles.phoneDetails}>
                                            <p> +{formData.countryCode}</p>
                                            <input
                                                type="number"
                                                placeholder="812 345 6789"
                                                name="phoneNumber"
                                                onChange={(e) =>
                                                    setFieldValue(
                                                        'phoneNumber',
                                                        e.target.value
                                                    )
                                                }
                                                value={values?.phoneNumber}
                                            />
                                        </div>
                                    </div>
                                </InputWrapper>

                                <ButtonComp
                                    disabled={true}
                                    active={activeBtn ? 'active' : 'inactive'}
                                    type="submit"
                                    text={'Next'}
                                    loads={profileSetUpUnregisteredBusinessLoad}
                                />
                            </form>
                        )}
                    </Formik>
                ) : null}
            </div>
        </div>
    );
};

export default RegisteredForm;
