import React, { useState, useEffect } from 'react';
import ButtonComp from '../../../ReusableComponents/Button';
// import { RegisteredCardWrapper } from './styles.module';
import { useForm } from 'react-hook-form';
import { Label, FormInput, InputWrapper } from './styles.module';
import Progressbar from '../../../ReusableComponents/Progressbar';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
// import { loadCountry } from '../../../../redux/actions/actions';
import Head from 'next/head';

const RegisteredForm = ({ formData, setFormData, action, errorM, errorI }) => {
    // const [progress, setProgress] = useState('25%');

    const [switchs, setSwitch] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);
    const [bgcolor, setBgcolor] = useState(false);
    const [activeBtn, setActiveBtn] = useState(true);
    // const dispatch = useDispatch();
    // const { countries } = useSelector((state) => state.countryReducer);

    // useEffect(() => {
    //     dispatch(loadCountry());
    // }, []);
    // useEffect(() => {
    //     if (countries !== null) {
    //         setCountry(countries);
    //     }
    // }, [countries]);

    const router = useRouter();

    const handleShowSecondStep = () => {
        setShowSecondStep(true);
        setShowFirstStep(false);
    };
    const handleRegistrationStatus = () => {
        setIsRegistered(true);
        setBgcolor((prevState) => !prevState);
        setFormData({ ...formData, type: 'REGISTERED BUSINESS' });
    };
    const switchRegistrationStatus = () => {
        setIsRegistered(false);
        setBgcolor((prevState) => !prevState);

        setFormData({ ...formData, type: 'UNREGISTERED BUSINESS' });
    };
    // console.log(
    //     formData.type,
    //     formData.rcnumber,
    //     formData.tinNumber,
    //     formData.bvNumber,
    //     formData.phoneNumber,
    //     formData.dateOfBirth
    // );
    // console.log(formData.flag);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
    };
    const { isLoading, profile, errorMessages, bvnErrorI } = useSelector(
        (state) => state.profileSetup
    );
    const { Loading, otp, otpErrorMessage } = useSelector((state) => state.otp);
    // console.log('error essage', otpErrorMessage);
    useEffect(() => {
        console.log('bvnError', bvnErrorI);
        console.log(errorMessages);
        //change to no error messages boss
        if (!errorMessages) {
            console.log(errorMessages);
        } else {
            console.log('moved');
        }
    }, [errorMessages]);

    return (
        <div className={styles.bodyWrapper}>
            <div className={styles.cardHeading}>
                <h3 className={styles.LeftHeading}>Profile Setup</h3>
            </div>
            <div className={styles.formWrapper}>
                <InputWrapper>
                    <p className={styles.error}>{errorI}</p> <br />
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
                {isRegistered ? (
                    <>
                        <InputWrapper>
                            <Label>
                                Enter your RC Number/Business Registration
                                Number
                            </Label>
                        </InputWrapper>
                        <FormInput
                            type="text"
                            placeholder="Your Business Registration number"
                            name="rc_number"
                            {...register('rc_number', {
                                required: 'BVN is required',
                                minLength: {
                                    value: 10,
                                    message: 'Min length is 10'
                                }
                            })}
                            value={formData.rcnumber}
                            onChange={(event) => {
                                setFormData({
                                    ...formData,
                                    rcnumber: event.target.value
                                });
                                //if (event.target.value.length == 15)
                                //  return false; //limits to 10 digit entry
                                //setRcnumber(event?.target.value); //saving input to state
                            }}
                        />
                        {/* <div className="errors">
                            {errors.rc_number?.message}
                        </div> */}
                        <InputWrapper>
                            <Label>
                                Enter your TIN <i>(optional)</i>{' '}
                            </Label>
                            <FormInput
                                name="tin"
                                type="number"
                                placeholder="Your Tax Identification number"
                                {...register('tin')}
                                value={formData.tinNumber}
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        tinNumber: event.target.value
                                    });
                                    //if (event.target.value.length == 9)
                                    //return false; //limits to 10 digit entry
                                    //setTinumber(event?.target.value); //saving input to state
                                }}
                            />
                            <div className="errors">{errors.tin?.message}</div>
                        </InputWrapper>

                        <InputWrapper>
                            <Label>Enter your BVN</Label>
                            <FormInput
                                type="number"
                                placeholder="Your BVN"
                                name="bvn"
                                {...register('bvn', {
                                    required: 'BVN is required',
                                    minLength: {
                                        value: 10,
                                        message: 'Min length is 10'
                                    }
                                })}
                                value={formData.bvNumber}
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        bvNumber: event.target.value
                                    });
                                    //if (event.target.value.length == 12)
                                    // return false; //limits to 10 digit entry
                                    // setNumber(event?.target.value); //saving input to state
                                }}
                            />
                            <p className={styles.error}>{errorM}</p>
                            <div className="errors">{errors.bvn?.message}</div>
                        </InputWrapper>

                        <InputWrapper>
                            <Label>Phone Number</Label>
                            <div className={styles.phone}>
                                <div className={styles.phoneHeader}>
                                    <span>
                                        <img src={formData.flag} alt="" />
                                    </span>
                                    <p>{formData.baseCurrency}</p>
                                    {/* <input
                                    type="number"
                                    placeholder="+234"
                                    {...register('phone_number', {
                                        required: 'phone number is required',
                                        minLength: {
                                            value: 9,
                                            message: 'Min length is 9'
                                        }
                                    })}
                                    value={formData.countryCode}
                                    onChange={(event) => {
                                        setFormData({
                                            ...formData,
                                            countryCode: event.target.value
                                        });
                                        if (event.target.value.length == 15)
                                          return false; //limits to 10 digit entry
                                        setPhoneNumber(event?.target.value); //saving input to state
                                    }}
                                /> */}
                                </div>
                                <div className={styles.phoneDetails}>
                                    <p> +{formData.countryCode}</p>
                                    <input
                                        type="number"
                                        placeholder="812 345 6789"
                                        {...register('countryCode_number', {
                                            required:
                                                'Country Code is required',
                                            minLength: {
                                                value: 9,
                                                message: 'Min length is 9'
                                            }
                                        })}
                                        value={formData.phoneNumber}
                                        onChange={(event) => {
                                            setFormData({
                                                ...formData,
                                                phoneNumber: event.target.value
                                            });
                                            //if (event.target.value.length == 15)
                                            //  return false; //limits to 10 digit entry
                                            //setPhoneNumber(event?.target.value); //saving input to state
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="errors">
                                {errors.phone_number?.message}
                            </div>
                        </InputWrapper>
                        <InputWrapper>
                            <Label>Date of Birth</Label>
                            <FormInput
                                type="date"
                                placeholder="dd-mm-yyyy"
                                max="2002-12-31"
                                {...register('date_of_birth', {
                                    required: 'Date of birth is required',
                                    minLength: {
                                        value: 9,
                                        message: 'Min length is 9'
                                    }
                                })}
                                vallue={formData.dateOfBirth}
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        dateOfBirth: event.target.value
                                    });
                                }}
                            />
                            <div className="errors">
                                {errors.date_of_birth?.message}
                            </div>
                        </InputWrapper>
                    </>
                ) : (
                    ''
                )}
                {!isRegistered ? (
                    <>
                        <InputWrapper>
                            <Label>Enter your BVN</Label>
                            <FormInput
                                type="number"
                                placeholder="Your BVN"
                                name="bvn"
                                {...register('bvn', {
                                    required: 'BVN is required',
                                    minLength: {
                                        value: 10,
                                        message: 'Min length is 10'
                                    }
                                })}
                                value={formData.bvNumber}
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        bvNumber: event.target.value
                                    });
                                    //if (event.target.value.length == 12)
                                    //  return false; //limits to 10 digit entry
                                    //setNumber(event?.target.value); //saving input to state
                                }}
                            />
                            <p className={styles.error}>{errorM}</p>
                            <div className="errors">{errors.bvn?.message}</div>
                        </InputWrapper>
                        <InputWrapper>
                            <Label>Phone Number</Label>
                            <div className={styles.phone}>
                                <div className={styles.phoneHeader}>
                                    <span>
                                        <img src={formData.flag} alt="" />
                                    </span>
                                    <p>{formData.baseCurrency}</p>
                                    {/* <input
                                    type="number"
                                    placeholder="+234"
                                    {...register('phone_number', {
                                        required: 'phone number is required',
                                        minLength: {
                                            value: 9,
                                            message: 'Min length is 9'
                                        }
                                    })}
                                    value={formData.countryCode}
                                    onChange={(event) => {
                                        setFormData({
                                            ...formData,
                                            countryCode: event.target.value
                                        });
                                        if (event.target.value.length == 15)
                                          return false; //limits to 10 digit entry
                                        setPhoneNumber(event?.target.value); //saving input to state
                                    }}
                                /> */}
                                </div>
                                <div className={styles.phoneDetails}>
                                    <p> +{formData.countryCode}</p>
                                    <input
                                        type="number"
                                        placeholder="812 345 6789"
                                        {...register('countryCode_number', {
                                            required:
                                                'Country Code is required',
                                            minLength: {
                                                value: 9,
                                                message: 'Min length is 9'
                                            }
                                        })}
                                        value={formData.phoneNumber}
                                        onChange={(event) => {
                                            setFormData({
                                                ...formData,
                                                phoneNumber: event.target.value
                                            });
                                            //if (event.target.value.length == 15)
                                            //  return false; //limits to 10 digit entry
                                            //setPhoneNumber(event?.target.value); //saving input to state
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="errors">
                                {errors.phone_number?.message}
                            </div>
                        </InputWrapper>
                        <InputWrapper>
                            <Label>Date of Birth</Label>
                            <FormInput
                                type="date"
                                placeholder="DD  |  MM  |  YYYY"
                                max="2002-12-31"
                                {...register('date_of_birth', {
                                    required: 'Date of birth is required',
                                    minLength: {
                                        value: 9,
                                        message: 'Min length is 9'
                                    }
                                })}
                                value={formData.dateOfBirth}
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        dateOfBirth: event.target.value
                                    });
                                }}
                            />
                            <div className="errors">
                                {errors.date_of_birth?.message}
                            </div>
                        </InputWrapper>
                    </>
                ) : null}
                <ButtonComp
                    disabled={activeBtn}
                    active={activeBtn ? 'active' : 'inactive'}
                    onClick={action}
                    type="submit"
                    text={'Next'}
                />
            </div>
        </div>
    );
};

export default RegisteredForm;
