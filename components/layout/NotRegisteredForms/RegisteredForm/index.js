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
import Loader from '../../../ReusableComponents/Loader';

const RegisteredForm = ({
    formData,
    setFormData,
    action,
    errorM,
    errorI,
    bvnError,
    actionI,
    loading,
    setLoading,
    loads
}) => {
    // const [progress, setProgress] = useState('25%');
    // const [loading, setLoading] = useState(false);
    const [switchs, setSwitch] = useState(true);
    const [bgcolor, setBgcolor] = useState(false);
    const [activeBtn, setActiveBtn] = useState(true);

    const router = useRouter();

    const handleShowSecondStep = () => {
        setShowSecondStep(true);
        setShowFirstStep(false);
    };
    const handleRegistrationStatus = () => {
        //console.log('true');
        setFormData({ ...formData, type: true });
    };
    const switchRegistrationStatus = () => {
        //console.log('false');
        setFormData({ ...formData, type: false });
    };
    let subtitle;

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        //console.log(data);
    };
    const { isLoading, profile, errorMessages, bvnErrorI } = useSelector(
        (state) => state.profileSetup
    );

    //console.log('error essage', otpErrorMessage);
    // useEffect(() => {
    //     setLoading((prev) => !prev);
    // }, [isLoading, profile, errorMessages]);

    // useEffect(() => {
    //     //console.log('bvnError', bvnErrorI);
    //     //console.log(errorMessages);
    //     setErrorM(errorMessages);

    //     //change to no error messages boss
    //     if (!errorMessages) {
    //         //console.log(errorMessages);
    //     } else {
    //         //console.log('moved');
    //     }
    // }, [errorMessages]);

    return (
        <div className={styles.bodyWrapper}>
            <div className={styles.cardHeading}>
                <h3 className={styles.LeftHeading}>Profile Setup</h3>
                {/* <p>We recommend you use a phone number linked to BVN</p> */}
            </div>
            <div className={styles.formWrapper}>
                <InputWrapper>
                    {errorI !== null ? (
                        <p className={styles.error}>{errorI}</p>
                    ) : null}
                    {errorM !== null ? (
                        <p className={styles.error}>{errorM}</p>
                    ) : null}
                    {bvnError !== null ? (
                        <p className={styles.error}> {bvnError}</p>
                    ) : null}

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
                    <form onSubmit={handleSubmit(actionI)}>
                        <InputWrapper>
                            <Label>
                                Enter your RC Number/Business Registration
                                Number
                            </Label>
                        </InputWrapper>
                        <FormInput
                            type="text"
                            placeholder="Your Business Registration number"
                            name="rcNumber"
                            {...register('rcNumber', {
                                required: 'RC Number is required',

                                pattern: {
                                    value: /^[A-Za-z0-9 ]+$/i,
                                    message: 'Only Alphabelts/Number allowed'
                                }
                            })}
                            value={formData.rcnumber}
                            onInput={(event) => {
                                setFormData({
                                    ...formData,
                                    rcnumber: event.target.value
                                });
                                //if (event.target.value.length == 15)
                                //  return false; //limits to 10 digit entry
                                //setRcnumber(event?.target.value); //saving input to state
                            }}
                        />
                        <div className={styles.error}>
                            {errors.rc_number?.message}
                        </div>
                        <InputWrapper>
                            <Label>Enter your TIN</Label>
                            <FormInput
                                name="tin"
                                type="text"
                                placeholder="Your Tax Identification number"
                                // {...register('tin', {
                                //     required: 'TIN is required',

                                //     pattern: {
                                //         value: /^[A-Za-z0-9 ]+$/i,
                                //         message:
                                //             'Only Alphabelts/Number allowed'
                                //     }
                                // })}
                                value={formData.tinNumber}
                                onInput={(event) => {
                                    setFormData({
                                        ...formData,
                                        tinNumber: event.target.value
                                    });
                                    //if (event.target.value.length == 9)
                                    //return false; //limits to 10 digit entry
                                    //setTinumber(event?.target.value); //saving input to state
                                }}
                            />
                            <div className={styles.error}>
                                {errors.tin?.message}
                            </div>
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
                                        value: 11,
                                        message: 'Min length is 11'
                                    },
                                    maxLength: {
                                        value: 11,
                                        message: 'Max length is 11'
                                    }
                                })}
                                value={formData.bvNumber}
                                onInput={(event) => {
                                    setFormData({
                                        ...formData,
                                        bvNumber: event.target.value
                                    });
                                    //if (event.target.value.length == 12)
                                    // return false; //limits to 10 digit entry
                                    // setNumber(event?.target.value); //saving input to state
                                }}
                            />
                            {/* <p className={styles.error}>{errorM}</p> */}
                            <div className={styles.error}>
                                {errors.bvn?.message}
                            </div>
                        </InputWrapper>
                        {/* <InputWrapper> */}
                        {/* <Label>Enter your NIN</Label> */}
                        {/* <div className={styles.errors}>
                                Dial *321# yo get your nin
                            </div> */}
                        {/* <FormInput
                                type="number"
                                placeholder="Enter Your NIN"
                                name="nin"
                                {...register('ninFalse', {
                                    required: 'NIN is required',
                                    minLength: {
                                        value: 10,
                                        message: 'Min length is 10'
                                    }
                                })}
                                value={formData.bvNumber}
                                onInput={(event) => {
                                    setFormData({
                                        ...formData,
                                        Number: event.target.value
                                    });
                                    //if (event.target.value.length == 12)
                                    //  return false; //limits to 10 digit entry
                                    //setNumber(event?.target.value); //saving input to state
                                }}
                            />
                            <div className={styles.errors}>
                                {errors.bvnFalse?.message}
                            </div>
                        </InputWrapper> */}
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
                                        onInput={(event) => {
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
                            <div className={styles.error}>
                                {errors.phone_number?.message}
                            </div>
                        </InputWrapper>
                        <InputWrapper>
                            <Label>Date of Birth</Label>
                            <FormInput
                                type="date"
                                placeholder="dd-mm-yyyy"
                                max="2004-12-31"
                                {...register('date_of_birth', {
                                    required: 'Date of birth is required',
                                    minLength: {
                                        value: 9,
                                        message: 'Min length is 9'
                                    }
                                })}
                                vallue={formData.dateOfBirth}
                                onInput={(event) => {
                                    setFormData({
                                        ...formData,
                                        dateOfBirth: event.target.value
                                    });
                                }}
                            />
                            <div className={styles.error}>
                                {errors.date_of_birth?.message}
                            </div>
                        </InputWrapper>
                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            type="submit"
                            text={'Next'}
                            err={errorM}
                            loads={loads}
                            // onClick={actionI}
                        />
                    </form>
                ) : (
                    ''
                )}
                {formData.type === false ? (
                    <form onSubmit={handleSubmit(action)}>
                        <InputWrapper>
                            <Label>Enter your BVN</Label>
                            <FormInput
                                type="number"
                                placeholder="Your BVN"
                                name="bvn"
                                {...register('bvnFalse', {
                                    required: 'BVN is required',
                                    minLength: {
                                        value: 10,
                                        message: 'Min length is 10'
                                    }
                                })}
                                value={formData.bvNumber}
                                onInput={(event) => {
                                    setFormData({
                                        ...formData,
                                        bvNumber: event.target.value
                                    });
                                    //if (event.target.value.length == 12)
                                    //  return false; //limits to 10 digit entry
                                    //setNumber(event?.target.value); //saving input to state
                                }}
                            />
                            <div className={styles.error}>
                                {errors.bvnFalse?.message}
                            </div>
                        </InputWrapper>
                        {/* <InputWrapper> */}
                        {/* <Label>Enter your NIN</Label> */}
                        {/* <div className={styles.errors}>
                                Dial *321# yo get your nin
                            </div> */}
                        {/* <FormInput
                                type="number"
                                placeholder="Enter Your NIN"
                                name="nin"
                                {...register('ninFalse', {
                                    required: 'NIN is required',
                                    minLength: {
                                        value: 10,
                                        message: 'Min length is 10'
                                    }
                                })}
                                value={formData.bvNumber}
                                onInput={(event) => {
                                    setFormData({
                                        ...formData,
                                        ninNumber: event.target.value
                                    });
                                    //if (event.target.value.length == 12)
                                    //  return false; //limits to 10 digit entry
                                    //setNumber(event?.target.value); //saving input to state
                                }}
                            />
                            <div className={styles.error}>
                                {errors.bvnFalse?.message}
                            </div> */}
                        {/* </InputWrapper> */}
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
                            <div className={styles.error}>
                                {errors.countryCode_number?.message}
                            </div>
                        </InputWrapper>
                        <InputWrapper>
                            <Label>Date of Birth</Label>
                            <FormInput
                                type="date"
                                placeholder="DD  |  MM  |  YYYY"
                                max="2004-12-31"
                                {...register('date_of_birth', {
                                    required: 'Date of birth is required',
                                    minLength: {
                                        value: 9,
                                        message: 'Min length is 9'
                                    }
                                })}
                                value={formData.dateOfBirth}
                                onInput={(event) => {
                                    setFormData({
                                        ...formData,
                                        dateOfBirth: event.target.value
                                    });
                                }}
                            />
                            <div className={styles.error}>
                                {errors.date_of_birth?.message}
                            </div>
                        </InputWrapper>
                        {/* {loading ? <Loader /> : null} */}
                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            type="submit"
                            text={'Next'}
                            err={errorM}
                            loads={loads}
                            // onClick={action}
                        />
                    </form>
                ) : null}
            </div>
        </div>
    );
};

export default RegisteredForm;
