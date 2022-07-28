import React, { useState } from 'react';
import ButtonComp from '../../../ReusableComponents/Button';
// import { RegisteredCardWrapper } from './styles.module';
import { useForm } from 'react-hook-form';
import { Label, FormInput, InputWrapper } from './styles.module';
import Progressbar from '../../../ReusableComponents/Progressbar';
import styles from './styles.module.css';

const RegisteredForm = () => {
    const [progress, setProgress] = useState('25%');
    const [switchs, setSwitch] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);
    const [bgcolor, setBgcolor] = useState(false);
    const [number, setNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [tinumber, setTinumber] = useState('');
    const [rcnumber, setRcnumber] = useState('');
    const [activeBtn, setActiveBtn] = useState(true);

    const handleShowSecondStep = () => {
        setShowSecondStep(true);
        setShowFirstStep(false);
    };
    const handleRegistrationStatus = () => {
        setIsRegistered(true);
        setBgcolor((prevState) => !prevState);
    };
    const switchRegistrationStatus = () => {
        setIsRegistered(false);
        setBgcolor((prevState) => !prevState);
    };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <div className={styles.cardHeading}>
                    <h3 className={styles.LeftHeading}>Profile Setup</h3>
                    <Progressbar
                        bgcolor="#6CCF00"
                        progressCount={progress}
                        height={14}
                        progWidth="27%"
                    />
                    {/* <Imag
                    src="/width"
                    alt="lineImage" /> */}
                </div>
                <p
                    style={{
                        fontWeight: '400',
                        fontSize: '16px',
                        lineHeight: '19px',
                        color: '#3E3E3E'
                    }}
                >
                    Is your business registered?
                </p>
                <div className={styles.ButtonWrapper}>
                    <span
                        className={styles.ToggleNo}
                        onClick={switchRegistrationStatus}
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
                        onClick={handleRegistrationStatus}
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
                {isRegistered ? (
                    <>
                        <div>
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
                                value={rcnumber}
                                onChange={(event) => {
                                    if (event.target.value.length == 15)
                                        return false; //limits to 10 digit entry
                                    setRcnumber(event?.target.value); //saving input to state
                                }}
                            />
                            <div className="errors">
                                {errors.rc_number?.message}
                            </div>
                        </div>
                        <InputWrapper>
                            <Label>Enter your TIN</Label>
                            <br />
                            <FormInput
                                name="tin"
                                type="number"
                                placeholder="Your Tax Identification number"
                                {...register('tin')}
                                value={tinumber}
                                onChange={(event) => {
                                    if (event.target.value.length == 9)
                                        return false; //limits to 10 digit entry
                                    setTinumber(event?.target.value); //saving input to state
                                }}
                            />
                            <div className="errors">{errors.tin?.message}</div>
                        </InputWrapper>

                        <InputWrapper>
                            <Label>Enter your BVN</Label>
                            <br />
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
                                value={number}
                                onChange={(event) => {
                                    if (event.target.value.length == 12)
                                        return false; //limits to 10 digit entry
                                    setNumber(event?.target.value); //saving input to state
                                }}
                            />
                            <div className="errors">{errors.bvn?.message}</div>
                        </InputWrapper>
                        <InputWrapper>
                            <label>Phone Number</label>
                            <br />
                            <FormInput
                                type="number"
                                placeholder="+234 812 345 6789"
                                {...register('phone_number', {
                                    required: 'BVN is required',
                                    minLength: {
                                        value: 9,
                                        message: 'Min length is 9'
                                    }
                                })}
                                value={phoneNumber}
                                onChange={(event) => {
                                    if (event.target.value.length == 15)
                                        return false; //limits to 10 digit entry
                                    setPhoneNumber(event?.target.value); //saving input to state
                                }}
                            />
                            <div className="errors">
                                {errors.phone_number?.message}
                            </div>
                        </InputWrapper>
                        <InputWrapper>
                            <label>Date of Birth</label>
                            <br />
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
                            <br />
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
                                value={number}
                                onChange={(event) => {
                                    if (event.target.value.length == 12)
                                        return false; //limits to 10 digit entry
                                    setNumber(event?.target.value); //saving input to state
                                }}
                            />
                            <div className="errors">{errors.bvn?.message}</div>
                        </InputWrapper>
                        <InputWrapper>
                            <label>Phone Number</label>
                            <br />
                            <FormInput
                                type="number"
                                placeholder="+234 812 345 6789"
                                {...register('phone_number', {
                                    required: 'BVN is required',
                                    minLength: {
                                        value: 9,
                                        message: 'Min length is 9'
                                    }
                                })}
                                value={phoneNumber}
                                onChange={(event) => {
                                    if (event.target.value.length == 15)
                                        return false; //limits to 10 digit entry
                                    setPhoneNumber(event?.target.value); //saving input to state
                                }}
                            />
                            <div className="errors">
                                {errors.phone_number?.message}
                            </div>
                        </InputWrapper>
                        <InputWrapper>
                            <label>Date of Birth</label>
                            <br />
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
                            />
                            <div className="errors">
                                {errors.date_of_birth?.message}
                            </div>
                        </InputWrapper>
                    </>
                ) : (
                    ''
                )}
            </form>
        </div>
    );
};

export default RegisteredForm;
