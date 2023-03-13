//I commented out line 176
import React, { useState, useEffect } from 'react';
import ButtonComp from '../../../ReusableComponents/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
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
    businessCategoriesData,
    CompleteBusinessProfile,
    CompProfile,
    createNewCorpUserAccount,
    createNewUserAccount,
    statesData
} from '../../../../redux/actions/actions';
import { useRouter } from 'next/router';
import axiosInstance from '../../../../redux/helper/apiClient';
import apiRoutes from '../../../../redux/helper/apiRoutes';
import CircleSvg from '../../../ReusableComponents/ReusableSvgComponents/CircleSvg';
import BusinessCategory from '../../../ReusableComponents/BusinessCategory';
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
    //     //console.log(data);
    // };
    const router = useRouter();
    const [activeBtn, setActiveBtn] = useState(true);
    const [localState, setLocalState] = useState('');
    const [localGovernment, setLocalGovernment] = useState('');
    const [location, setLocation] = useState([]);
    const [accountInfo, setAccountInfo] = useState('');
    const [registered, setRegistered] = useState();
    const [profileCont, setProfileCont] = useState([]);
    const { accountStatus, errorMessages } = useSelector(
        (state) => state.accountStatusReducer
    );
    const { isLoading, compBusprofile, errorMessage } = useSelector(
        (state) => state.completeBusProfile
    );
    const { newAccount, newAccountErrorMessage } = useSelector(
        (state) => state.newUserAccountDets
    );
    const { businessCategories, errorDatas } = useSelector(
        (state) => state.businessCategoriesReducer
    );
    const { newCorpAccount, newCorpAccountErrorMessage } = useSelector(
        (state) => state.newuserCorpAccount
    );
    const { profile } = useSelector((state) => state.profile);

    const [businessCategory, setBusinessCategory] = useState([]);
    const [businessType, setBusinessType] = useState([]);
    const [business, setBusiness] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmitIII = () => {
        setLoading(true);
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
        //console.log(commpleteProfileData);
        dispatch(CompleteBusinessProfile(commpleteProfileData));

        const accountData = {
            affiliateCode: 'ENG',
            ccy: 'NGN'
        };
        dispatch(createNewUserAccount(accountData));
    };
    const businessProfileAction = () => {
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
        //console.log(commpleteProfileData);
        dispatch(CompleteBusinessProfile(commpleteProfileData));

        const accountData = {
            affiliateCode: 'ENG',
            ccy: 'NGN'
        };
        dispatch(createNewUserAccount(accountData));
    };

    const createCorpAccount = () => {
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
        //console.log(commpleteProfileData);
        dispatch(CompleteBusinessProfile(commpleteProfileData));

        const accountData = {
            affiliateCode: 'ENG',
            ccy: 'NGN'
        };

        dispatch(createNewCorpUserAccount(accountData));
    };

    const createNewAccountAction = () => {
        if (
            errorMessages ||
            newAccountErrorMessage ===
                'You already have an account with us. Please contact us for more information'
        ) {
            //console.log(errorMessages);
            router.push('../Verify/Account/loading');
        } else if (accountStatus.message === 'Try Again') {
            router.push('../Verify/Account/loading');
        } else if (accountStatus.message === 'SUCCESS') {
            router.push('/Succes');
        }
    };

    useEffect(() => {
        dispatch(businessCategoriesData());
        // dispatch(CompProfile());
    }, []);
    useEffect(() => {
        if (businessCategories !== null) {
            setBusinessCategory(businessCategories);
        }
    }, [businessCategories]);
    useEffect(() => {
        Object.keys(businessCategory)?.filter((item) => {
            if (item === business) {
                setBusinessType(businessCategory[item]);
            }
        });

        // setProfileCont(profile.data);
        //console.log(profileCont.isBusinessRegistered);
        // createCorp();
    }, [business, profile]);

    useEffect(() => {
        businessProfileAction();
        createNewAccountAction();
    }, [errorMessages, newAccountErrorMessage, accountStatus]);
    const { states } = useSelector((state) => state.statesReducer);
    useEffect(() => {
        dispatch(statesData());
    }, []);
    const newStates = () => {
        if (states !== null) {
            setLocation(states);
        }
    };
    useEffect(() => {
        newStates();
    }, [states]);
    useEffect(() => {
        location?.filter((item) => {
            if (item.state === localState) {
                setLocalGovernment(item.localGoverment);
            }
        });
    }, [localState]);

    //registered businerss
    const [errorMes, setErrorMes] = useState();
    const handleSubmitReg = () => {
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
        //console.log(commpleteProfileData);
        dispatch(CompleteBusinessProfile(commpleteProfileData));

        const accountData = {
            affiliateCode: 'ENG',
            ccy: 'NGN'
        };
        axiosInstance
            .post(`${apiRoutes.corpNewUser}`, accountData)
            .then((response) => {
                //console.log('create New Account', response.data);
            })
            .catch((error) => {
                //console.log(
                //     'create new account Error:',
                //     error.response.data.message
                // );
                setErrorMes(error.response.data.message);
            });

        if (
            errorMes ===
            'You already have an account with us. Please contact us for more information'
        ) {
            router.push('/Succes');
        }
    };
    return (
        <div className={styles.businessCont}>
            <div>
                {/* The small card that wraps the form */}
                <div className={styles.dets}>
                    <SmallCardContainer>
                        <div style={{ marginTop: '2rem' }}>
                            <Label>Enter Business Name</Label>
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
                            <div className={styles.phone}>
                                <div className={styles.phoneHeader}>
                                    <span>
                                        <img src={formData.flag} alt="" />
                                    </span>
                                    <p>{formData.baseCurrency}</p>
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
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: '2rem', width: '100%' }}>
                            <Label>Select Your Business Category </Label>
                            <select
                                onChange={(e) => {
                                    setBusiness(e.target.value);
                                }}
                            >
                                <option>Business Category</option>
                                {Object.keys(businessCategory)?.map(
                                    (business, index) => {
                                        return (
                                            <option
                                                value={business}
                                                key={index}
                                            >
                                                {business}
                                            </option>
                                        );
                                    }
                                )}
                            </select>
                        </div>
                        <div style={{ marginTop: '2rem', width: '100%' }}>
                            <Label>Select Your Business Type </Label>

                            <select
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        businessType: event.target.value
                                    });
                                }}
                            >
                                <option>Select Your Business Type</option>
                                {businessType?.map((business, index) => {
                                    return (
                                        <option value={business} key={index}>
                                            {business}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <p className={styles.ent}>Enter Business Address</p>
                        <div className={styles.busAdd}>
                            <div className={styles.inps}>
                                <Label>Street Name</Label>
                                <div className={styles.addressNumber}>
                                    <input
                                        type="text"
                                        placeholder="101"
                                        className={styles.number}
                                    />
                                    <FormInput
                                        type="text"
                                        placeholder="Street Name"
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
                            </div>
                            <div className={styles.inps}>
                                <Label>State </Label>
                                {errors.email?.message}{' '}
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
                                <Label>Select Your Local Government </Label>
                                {errors.email?.message}
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
                                                          value={item.lgaName}
                                                          key={index}
                                                      >
                                                          {item.lgaName}
                                                      </option>
                                                  );
                                              }
                                          )
                                        : null}
                                </SelectInput>
                            </div>
                            <div className={styles.inps}>
                                <Label>City </Label>
                                {errors.email?.message}
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
                            <Label className={styles.signa}>
                                Kindly scan your signature or sign
                                electronically
                            </Label>
                            {errors.email?.message}
                            <input className={styles.inputFile} type="file" />
                        </div>
                    </div>
                </LastFieldAndButton>
                {/* <Link href="/Succes"> */}
                {/* <div>
                    <div className={styles.terms}>
                        <CircleSvg
                            action={() => {
                                setActiveBtn(!activeBtn);
                            }}
                            circleStatus={activeBtn}
                        />
                        <label>
                            I agree with Ellevate App
                            <span>Terms and Conditions</span>
                        </label>
                    </div>
                </div> */}
                {profileCont.isBusinessRegistered === true ? (
                    <ButtonComp
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        text="Next"
                        type="button"
                        onClick={handleSubmitReg}
                        // onClick={handleShowFourthStep}
                    />
                ) : (
                    <ButtonComp
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        text="Next"
                        type="button"
                        onClick={handleSubmitIII}
                        // onClick={handleShowFourthStep}
                    />
                )}
                {/* </Link> */}
                {/* <RegistrationStatus>
                   
                </RegistrationStatus>{' '} */}
            </div>
        </div>
    );
};

export default StepFourCompProfile2BizDetails;
