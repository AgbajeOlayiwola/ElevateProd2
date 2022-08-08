import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import ButtonComp from '../../ReusableComponents/Button';
import { location } from '../../ReusableComponents/Data';
import {
    existingUserProfileData,
    createAccountData,
    accountStatusData
} from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../ReusableComponents/Loader';
import { useRouter } from 'next/router';
import axios from 'axios';

const StepFour = ({ title }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const account = localStorage.getItem('meta');
    const accountDetails = JSON.parse(account);
    const account1 = localStorage.getItem('account');
    const accountDetails1 = JSON.parse(account1);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { existingUserProfile, errorMessage } = useSelector(
        (state) => state.existingUserProfileReducer
    );
    const { accountStatus, errorMessages } = useSelector(
        (state) => state.accountStatusReducer
    );
    const { createAccount, errorData } = useSelector(
        (state) => state.createAccountReducer
    );
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmitNew = (data) => {
        setLoading(true);
        console.log(data);

        // const userData = {
        //     email: data.email,
        //     password: password,
        //     confirmPassword: confPassword
        // };
        dispatch(existingUserProfileData(accountDetails));
    };

    const profileTest = () => {
        if (errorMessage) {
            setError(errorMessage);
            console.log(errorMessage);
            setLoading(false);
        } else if (
            existingUserProfile.message === 'User account created succesfully'
        ) {
            setLoading(false);
            router.push('/Dashboard');
        }
    };
    useEffect(() => {
        profileTest();
    }, [errorMessage, existingUserProfile]);

    const onSubmit = async (data) => {
        setLoading(true);
        console.log(accountDetails1);

        const userData = {
            hostHeaderInfo: {
                sourceCode: 'ECOBANKMOBILE',
                affiliateCode: 'ENG',
                requestId: 'testing534267809',
                requestType: 'JSON',
                ipAddress: '10.182.199.171',
                sourceChannelId: 'MOBILE'
            },
            affCode: 'ENG',
            firstName: accountDetails1.data.userInfo.firstName,
            middleName: 'Sam',
            lastName: accountDetails1.data.userInfo.lastName,
            dob: accountDetails1.data.userInfo.dob,
            id_type: 'IDCD',
            idNo: '1234TTZN14',
            idIssuingDate: '2022-06-27',
            idExpiryDate: '2029-06-05',
            phoneNumber: accountDetails1.data.userInfo.phoneNumber,
            email: accountDetails1.data.userInfo.email,
            gender: 'MALE',
            address1: 'IKORODU LAGOS',
            address2: 'IKORODU',
            countryCode: 'NG',
            custType: 'I',
            custCategory: 'INDIVIDUAL',
            brnCode: 'A01',
            ccy: 'NGN',
            flexCustId: '',
            accountClass: 'GHSABP'
        };
        try {
            const response = await axios.post(
                'https://160.119.246.165/unifiedapis-v2/services/createdigitalaccount',
                userData
            );
            if (response) {
                const userDetail1 = {
                    hostHeaderInfo: {
                        sourceCode: 'ECOBANKMOBILE',
                        requestId: 'b5e750e6af4c1945cd54447b9d4fa3a4',
                        affiliateCode: 'ENG',
                        requestToken:
                            '7a07359d2d6ea5136cfd38a4dc303fcd81b6bacd9ac0661f99a43122cfc2166da0f1ce1dd5f6e23db1f2da2bb3e65658e1fc73acec09df3e280a027990bc7d63',
                        requestType: 'JSON',
                        ipAddress: '10.182.99.157',
                        sourceChannelId: 'MOBILE'
                    },
                    trackRef: response.reference
                };
                try {
                    const response2 = await axios.post(
                        'https://160.119.246.165/unifiedapis-v2/services/getdigitalaccount',
                        userDetail1
                    );
                    window.localStorage.setItem(
                        'accountNumber',
                        JSON.stringify(response2)
                    );
                } catch (error) {
                    console.log(error.message);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    const accountTest = () => {
        if (errorMessage) {
            setError(errorMessage);
            console.log(errorMessage);
            setLoading(false);
        } else if (
            existingUserProfile.message === 'User account created succesfully'
        ) {
            setLoading(false);
            router.push('/Dashboard');
        }
    };
    useEffect(() => {
        accountTest();
    }, [errorMessage, existingUserProfile]);
    const types = (type) => {
        setOutType(type);
    };
    const [activeBtn, setActiveBtn] = useState(true);
    const [localState, setLocalState] = useState('');
    const [localGovernment, setLocalGovernment] = useState('');
    useEffect(() => {
        location.filter((item) => {
            if (item.state === localState) {
                setLocalGovernment(item.localGoverment);
            }
        });
    }, [localState]);
    return (
        <div>
            <h1 className={styles.header}>Complete Your Profile</h1>
            {title === 'New' ? (
                <div>
                    <form onSubmit={handleSubmit(onSubmitNew)}>
                        {error ? <p className={styles.error}>{error}</p> : null}
                        <div className={styles.bord}>
                            <div className={styles.inps}>
                                <label>Enter Business Name</label>

                                <br />

                                <input
                                    placeholder="Enter Business Name"
                                    className={styles.textInput}
                                    required
                                    {...register('businessName', {
                                        required: 'Business Name is Required'
                                        // pattern: {
                                        //     // eslint-disable-next-line
                                        //     value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        //     message: 'Invalid email address'
                                        // }
                                    })}
                                />
                            </div>
                            {/* <div className={styles.inps}>
                                    <label>
                                        Enter TIN <i>(optional)</i>{' '}
                                    </label>
                                    <br />

                                    <input
                                        placeholder="Enter Tin"
                                        className={styles.textInput}
                                        required
                                        {...register('tin', {
                                            required: 'Tin is Required'
                                            // pattern: {
                                            //     // eslint-disable-next-line
                                            //     value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            //     message: 'Invalid email address'
                                            // }
                                        })}
                                    />
                                </div> */}

                            <div className={styles.inps}>
                                <label>Select Your Business Type </label>
                                {errors.email?.message}
                                <br />

                                <select>
                                    <option value="">
                                        Search Your Business Type
                                    </option>

                                    <option value="Retail business">
                                        Retail business
                                    </option>
                                    <option value="Perishable business">
                                        Perishable business
                                    </option>
                                </select>
                            </div>
                            <p className={styles.ent}>Enter Business Address</p>
                            <div className={styles.busAdd}>
                                <div className={styles.inps}>
                                    <label>Street Name </label>
                                    {errors.streetName?.message}
                                    <br />

                                    <input
                                        placeholder="Enter Street Name"
                                        className={styles.textInput}
                                        required
                                        {...register('streetName', {
                                            required: 'Street Name is Required'
                                            // pattern: {
                                            //     // eslint-disable-next-line
                                            //     value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            //     message: 'Invalid email address'
                                            // }
                                        })}
                                    />
                                </div>
                                <div className={styles.inps}>
                                    <label>State </label>
                                    {errors.email?.message}
                                    <br />

                                    <select
                                        className={styles.busInp}
                                        onChange={(event) => {
                                            setLocalState(event.target.value);
                                        }}
                                    >
                                        <option>Enter State</option>
                                        {location?.map((item, index) => {
                                            return (
                                                <option
                                                    value={item.state}
                                                    key={index}
                                                >
                                                    {item.state}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className={styles.inps}>
                                    <label>Select Your Local Government </label>
                                    {errors.email?.message}
                                    <br />

                                    <select className={styles.busInp}>
                                        <option value="">
                                            Select Local Government
                                        </option>
                                        {localGovernment
                                            ? localGovernment?.map(
                                                  (item, index) => {
                                                      return (
                                                          <option
                                                              value={item}
                                                              key={index}
                                                          >
                                                              {item}
                                                          </option>
                                                      );
                                                  }
                                              )
                                            : null}
                                    </select>
                                </div>
                                <div className={styles.inps}>
                                    <label>City </label>
                                    {errors.email?.message}
                                    <br />

                                    <input
                                        placeholder="Enter Business Name"
                                        className={styles.textInput}
                                        required
                                        {...register('businessName', {
                                            required:
                                                'Business Name is Required'
                                            // pattern: {
                                            //     // eslint-disable-next-line
                                            //     value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            //     message: 'Invalid email address'
                                            // }
                                        })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.inps}>
                            <label>
                                Enter Referal Code <i>(optional)</i>{' '}
                            </label>
                            {errors.email?.message}
                            <br />

                            <input
                                placeholder="Enter Referal Code"
                                className={styles.textInput}
                                // required
                                // {...register('email', {
                                //     required: 'Business Address is Required',
                                //     pattern: {
                                //         // eslint-disable-next-line
                                //         value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                //         message: 'Invalid email address'
                                //     }
                                // })}
                            />
                        </div>
                        <div>
                            <div className={styles.terms}>
                                <input type="checkbox" />
                                <label>
                                    I agree with Ellevate App{' '}
                                    <span>Terms and Conditions</span>
                                </label>
                            </div>
                        </div>
                        {loading ? (
                            <Loader />
                        ) : (
                            <ButtonComp
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
                                text="Update Profile"
                                type="submit"
                                // onClick={handleShowSuccessStep}
                                // onClick={handleShowFourthStep}
                            />
                        )}
                    </form>
                </div>
            ) : (
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.bord}>
                            <div className={styles.inps}>
                                <label>
                                    Enter RC Number/Business Registration Number{' '}
                                </label>

                                <br />

                                <input
                                    placeholder="Enter RC Number"
                                    className={styles.textInput}
                                    required
                                    {...register('email', {
                                        required: 'Rc Number is Required'
                                        // pattern: {
                                        //     // eslint-disable-next-line
                                        //     value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        //     message: 'Invalid email address'
                                        // }
                                    })}
                                />
                            </div>
                            <div className={styles.inps}>
                                <label>
                                    Enter TIN <i>(optional)</i>{' '}
                                </label>
                                <br />

                                <input
                                    placeholder="Enter Tin"
                                    className={styles.textInput}
                                    required
                                    {...register('tin', {
                                        required: 'Tin is Required'
                                        // pattern: {
                                        //     // eslint-disable-next-line
                                        //     value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        //     message: 'Invalid email address'
                                        // }
                                    })}
                                />
                            </div>

                            <div className={styles.inps}>
                                <label>Select Your Business Type </label>

                                <br />

                                <select>
                                    <option>Search Your Business Type</option>
                                </select>
                            </div>
                            <p className={styles.ent}>Enter Business Address</p>
                            <div className={styles.busAdd}>
                                <div className={styles.inps}>
                                    <label>Street Name </label>

                                    <br />

                                    <select className={styles.busInp}>
                                        <option>Enter Street Name</option>
                                    </select>
                                </div>
                                <div className={styles.inps}>
                                    <label>State </label>

                                    <br />

                                    <select
                                        className={styles.busInp}
                                        onChange={(event) => {
                                            setLocalState(event.target.value);
                                        }}
                                    >
                                        <option>Enter State</option>
                                        {location?.map((item, index) => {
                                            return (
                                                <option
                                                    value={item.state}
                                                    key={index}
                                                >
                                                    {item.state}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className={styles.inps}>
                                    <label>Select Your Local Government </label>
                                    {errors.email?.message}
                                    <br />

                                    <select className={styles.busInp}>
                                        <option value="">
                                            Select Local Government
                                        </option>
                                        {localGovernment
                                            ? localGovernment?.map(
                                                  (item, index) => {
                                                      return (
                                                          <option
                                                              value={item}
                                                              key={index}
                                                          >
                                                              {item}
                                                          </option>
                                                      );
                                                  }
                                              )
                                            : null}
                                    </select>
                                </div>
                                <div className={styles.inps}>
                                    <label>City </label>

                                    <br />

                                    <select className={styles.busInp}>
                                        <option>Enter City</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className={styles.inps}>
                            <label>
                                Enter Referal Code <i>(optional)</i>{' '}
                            </label>

                            <br />

                            <input
                                placeholder="Enter Referal Code"
                                className={styles.textInput}
                                required
                                // {...register('email', {
                                //     required: 'Business Address is Required',
                                //     pattern: {
                                //         // eslint-disable-next-line
                                //         value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                //         message: 'Invalid email address'
                                //     }
                                // })}
                            />
                        </div>
                        <div>
                            <div className={styles.terms}>
                                <input type="checkbox" />
                                <label>
                                    I agree with Ellevate App{' '}
                                    <span>Terms and Conditions</span>
                                </label>
                            </div>
                        </div>
                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            text="update Profile"
                            type="submit"
                            // onClick={handleShowSuccessStep}
                            // onClick={handleShowFourthStep}
                        />
                    </form>
                </div>
            )}
        </div>
    );
};

export default StepFour;
