import React, { useState, useEffect } from 'react';
import ButtonComp from '../../../ReusableComponents/Button';
import { useForm } from 'react-hook-form';
import Card from '../../NotRegisteredForms/Card';
import Link from 'next/link';
import {
    CardContainer,
    CardHeadingBVN,
    LeftHeading,
    // SmallInstructionText,
    Label,
    FormInput,
    ResetOTP,
    InputWrapper,
    ProgressBar,
    SmallCardContainer,
    RegStatusHeading,
    ButtonWrapper,
    ToggleYes,
    ToggleNo,
    ToggleYesText,
    ToggleNoText,
    GenderWrapper,
    LastFieldAndButton,
    SelectInput
} from './styles.module';
import styles from './styles.module.css';
import Progressbar from '../../../ReusableComponents/Progressbar';
import { useDispatch, useSelector } from 'react-redux';
import {
    CompleteBusinessProfile,
    CompProfile,
    createNewUserAccount
} from '../../../../redux/actions/actions';
import { useRouter } from 'next/router';
import { location } from '../../../ReusableComponents/Data';
import axiosInstance from '../../../../redux/helper/apiClient';
import apiRoutes from '../../../../redux/helper/apiRoutes';
const StepFourCompProfile2BizDetails = ({
    handleShowSuccessStep,
    formData,
    setFormData
}) => {
    const [progress, setProgress] = useState('75%');
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    // const sendOTP = (data) => {
    //     console.log(data);
    // };
    const router = useRouter();
    const [activeBtn, setActiveBtn] = useState(false);
    const [localState, setLocalState] = useState('');
    const [localGovernment, setLocalGovernment] = useState('');
    const [accountInfo, setAccountInfo] = useState('');

    const { accountStatus, errorMessages } = useSelector(
        (state) => state.accountStatusReducer
    );
    const { isLoading, compBusprofile, errorMessage } = useSelector(
        (state) => state.completeBusProfile
    );
    const { newAccount, newAccountErrorMessage } = useSelector(
        (state) => state.newUserAccountDets
    );

    const handleSubmitIII = () => {
        const commpleteProfileData = {
            businessName: formData.bussinessName,
            businessType: formData.businessType,
            referralCode: formData.refferalCode,
            countryCode: '+234',
            phoneNumber: formData.bussinessName,
            businessAddress: formData.streetName,
            state: formData.state,
            city: formData.city,
            lga: formData.localGoverment
        };
        console.log(commpleteProfileData);
        dispatch(CompleteBusinessProfile(commpleteProfileData));
    };
    const businessProfileAction = () => {
        if (errorMessage !== '') {
            // dispatch(CompProfile());
            // do something here 1 sec after current has changed
            console.log(errorMessage);
        } else if (compBusprofile !== null) {
            const accountData = {
                affiliateCode: 'ENG',
                ccy: 'NGN'
            };
            dispatch(createNewUserAccount(accountData));
        }
    };
    const createNewAccountAction = () => {
        if (
            errorMessages ||
            newAccountErrorMessage ===
                'You already have an account with us. Please contact us for more information'
        ) {
            console.log(errorMessages);
            router.push('/Dashboard');
        } else if (accountStatus.message === 'Try Again') {
            router.push('/Account/Loading');
        } else if (accountStatus.message === 'SUCCESS') {
            router.push('/Succes');
        }
    };
    useEffect(() => {
        businessProfileAction();
    }, [errorMessage, compBusprofile]);
    useEffect(() => {
        createNewAccountAction();
    }, [errorMessages, newAccountErrorMessage, accountStatus]);
    useEffect(() => {
        location.filter((item) => {
            if (item.state === localState) {
                setLocalGovernment(item.localGoverment);
            }
        });
    }, [localState]);
    return (
        <div>
            <div>
                {/* The small card that wraps the form */}
                <div className={styles.dets}>
                    <SmallCardContainer>
                        <div style={{ marginTop: '2rem' }}>
                            <Label>Enter Business Name</Label>
                            <br />
                            <FormInput
                                type="text"
                                placeholder=" Full Business Name"
                                {...register('busnessName')}
                                value={formData.businessName}
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        bussinessName: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <div style={{ marginTop: '2rem' }}>
                            <Label>Enter Business Phone number</Label>
                            <br />
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
                        </div>
                        <div style={{ marginTop: '2rem', width: '100%' }}>
                            <Label>Select Business Type</Label>
                            <br />
                            <SelectInput
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        businessType: event.target.value
                                    });
                                }}
                            >
                                <option value="">Select Business</option>

                                <option value="Retail business">
                                    Retail business
                                </option>
                                <option value="Perishable business">
                                    Perishable business
                                </option>
                            </SelectInput>
                        </div>

                        <p className={styles.ent}>Enter Business Address</p>
                        <div className={styles.busAdd}>
                            <div className={styles.inps}>
                                <label>Address</label>
                                {errors.email?.message}
                                <br />

                                <FormInput
                                    type="text"
                                    placeholder="Address"
                                    {...register('streetName')}
                                    value={formData.streetName}
                                    onChange={(event) => {
                                        setFormData({
                                            ...formData,
                                            streetName: event.target.value
                                        });
                                        //     if (event.target.value.length == 15)
                                        //         return false; //limits to 10 digit entry
                                        //     setPhoneNumber(event?.target.value); //saving input to state
                                        // }}
                                    }}
                                />
                            </div>
                            <div className={styles.inps}>
                                <label>State </label>
                                {errors.email?.message}
                                <br />
                                <SelectInput
                                    name="State"
                                    id=""
                                    {...register('State')}
                                    value={formData.state}
                                    onChange={(event) => {
                                        setLocalState(event.target.value);
                                        setFormData({
                                            ...formData,
                                            state: event.target.value
                                        });
                                    }}
                                >
                                    <option value="">Select State</option>
                                    {location.map((item, index) => {
                                        return (
                                            <option
                                                value={item.state}
                                                key={index}
                                            >
                                                {item.state}
                                            </option>
                                        );
                                    })}
                                </SelectInput>
                            </div>
                            <div className={styles.inps}>
                                <label>Select Your Local Government </label>
                                {errors.email?.message}
                                <br />

                                <SelectInput
                                    name="localGovernment"
                                    id=""
                                    {...register('localGoverment')}
                                    onChange={(event) => {
                                        setFormData({
                                            ...formData,
                                            localGoverment: event.target.value
                                        });
                                        //     if (event.target.value.length == 15)
                                        //         return false; //limits to 10 digit entry
                                        //     setPhoneNumber(event?.target.value); //saving input to state
                                        // }}
                                    }}
                                >
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
                                </SelectInput>
                            </div>
                            <div className={styles.inps}>
                                <label>City </label>
                                {errors.email?.message}
                                <br />

                                <FormInput
                                    type="type"
                                    placeholder="City"
                                    {...register('city')}
                                    value={formData.city}
                                    onChange={(event) => {
                                        setFormData({
                                            ...formData,
                                            city: event.target.value
                                        });
                                        //     if (event.target.value.length == 15)
                                        //         return false; //limits to 10 digit entry
                                        //     setPhoneNumber(event?.target.value); //saving input to state
                                        // }}
                                    }}
                                />
                            </div>
                        </div>
                    </SmallCardContainer>
                </div>
                <LastFieldAndButton>
                    <div>
                        <Label>Enter referral code(Optional)</Label>
                        <br />
                        <FormInput
                            type="text"
                            placeholder="Enter code"
                            {...register('bvn')}
                        />
                    </div>

                    <p className={styles.ent}>Your Signature</p>
                    <div className={styles.busAdd}>
                        <div className={styles.inps}>
                            <label className={styles.signa}>
                                Kindly scan your signature or sign
                                electronically
                            </label>
                            {errors.email?.message}
                            <br />
                            <input className={styles.inputFile} type="file" />
                        </div>
                    </div>
                </LastFieldAndButton>
                {/* <Link href="/Succes"> */}
                <div>
                    <div className={styles.terms}>
                        <input
                            type="checkbox"
                            onChange={(e) => {
                                if (e.target.checked === true) {
                                    setActiveBtn(true);
                                } else {
                                    setActiveBtn(false);
                                }
                            }}
                        />
                        <label>
                            I agree with Ellevate App{' '}
                            <span>Terms and Conditions</span>
                        </label>
                    </div>
                </div>
                <ButtonComp
                    disabled={activeBtn}
                    active={activeBtn ? 'active' : 'inactive'}
                    text="Next"
                    type="button"
                    onClick={handleSubmitIII}
                    // onClick={handleShowFourthStep}
                />
                {/* </Link> */}
                {/* <RegistrationStatus>
                   
                </RegistrationStatus>{' '} */}
            </div>
        </div>
    );
};

export default StepFourCompProfile2BizDetails;
