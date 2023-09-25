import React, { useState, useEffect } from 'react';
import ButtonComp from '../../../ReusableComponents/Button';
// import { RegisteredCardWrapper } from './styles.module';
import { useForm } from 'react-hook-form';
import { Label, input, InputWrapper } from './styles.module';
import Progressbar from '../../../ReusableComponents/Progressbar';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
// import { loadCountry } from '../../../../redux/actions/actions';
import Head from 'next/head';
import Loader from '../../../ReusableComponents/Loader';
import { getRCDetails } from '../../../../redux/actions/getRcDetailsAction';
import Lottie from 'react-lottie';
import socialdata from '../../../ReusableComponents/Lotties/loading.json';
import { Formik } from 'formik';
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
        phoneNumber: '',
        dateOfBirth: ''
    };
    const businessInitialValues = {
        rcNumber: '',
        tin: '',
        bvn: '',
        phoneNumber: '',
        date: ''
    };
    return (
        <div className={styles.bodyWrapper}>
            <div className={styles.cardHeading}>
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
                                rcNumber: values?.rcNumber,
                                tin: values?.tin,
                                bvn: values?.bvn,
                                phoneNumber: values?.phoneNumber,
                                date: values?.date
                            };
                            localStorage.setItem(
                                'regprofilesetupdata',
                                JSON.stringify(data)
                            );

                            if (localStorage.getItem('regprofilesetupdata')) {
                                nextStep();
                            }
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
                                    onChange={(e) =>
                                        setFieldValue(
                                            'rcNumber',
                                            e.target.value
                                        )
                                    }
                                />

                                <InputWrapper>
                                    <Label>Business Name</Label>
                                </InputWrapper>

                                <input
                                    type="text"
                                    placeholder={
                                        getRcFisrst
                                            ? 'Fetching'
                                            : 'Enter Your Business Name'
                                    }
                                    value={businessName}
                                    onChange={(e) =>
                                        setBusinessName(e.target.value)
                                    }
                                    disabled
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

                                <InputWrapper>
                                    <Label>Enter your BVN</Label>
                                    <input
                                        type="number"
                                        placeholder="Your BVN"
                                        name="bvn"
                                        onChange={(e) =>
                                            setFieldValue('bvn', e.target.value)
                                        }
                                    />
                                </InputWrapper>

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
                                <InputWrapper>
                                    <Label>Date of Birth</Label>
                                    <input
                                        type="date"
                                        placeholder="dd-mm-yyyy"
                                        max="2004-12-31"
                                        name="date"
                                        onChange={(e) =>
                                            setFieldValue(
                                                'date',
                                                e.target.value
                                            )
                                        }
                                    />
                                </InputWrapper>
                                <ButtonComp
                                    disabled={activeBtn}
                                    active={activeBtn ? 'active' : 'inactive'}
                                    type="submit"
                                    text={'Next'}
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
                                phoneNumber: values?.phoneNumber,
                                dateOfBirth: values?.dateOfBirth
                            };
                            localStorage.setItem(
                                'profilesetupdata',
                                JSON.stringify(data)
                            );
                            if (localStorage.getItem('profilesetupdata')) {
                                nextStep();
                            }
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
                                    <Label>Enter your BVN</Label>
                                    <input
                                        type="number"
                                        placeholder="Your BVN"
                                        name="bvn"
                                        onChange={(e) =>
                                            setFieldValue('bvn', e.target.value)
                                        }
                                    />
                                </InputWrapper>

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
                                            />
                                        </div>
                                    </div>
                                </InputWrapper>
                                <InputWrapper>
                                    <Label>Date of Birth</Label>
                                    <input
                                        type="date"
                                        placeholder="DD  |  MM  |  YYYY"
                                        max="2004-12-31"
                                        name="dateOfBirth"
                                        onChange={(e) =>
                                            setFieldValue(
                                                'dateOfBirth',
                                                e.target.value
                                            )
                                        }
                                    />
                                </InputWrapper>
                                {/* {loading ? <Loader /> : null} */}
                                <ButtonComp
                                    disabled={activeBtn}
                                    active={activeBtn ? 'active' : 'inactive'}
                                    type="submit"
                                    text={'Next'}
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
