import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import ButtonComp from '../../ReusableComponents/Button';
import {
    existingUserProfileData,
    createAccountData,
    accountStatusData,
    statesData,
    businessCategoriesData,
    CompleteBusinessProfile,
    ExCreateBusProfileSetup,
    getRCDetails
} from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../ReusableComponents/Loader';
import { useRouter } from 'next/router';
import axios from 'axios';
import Progressbar from '../../ReusableComponents/Progressbar';
import ArrowBackSvg from '../../ReusableComponents/ArrowBackSvg';
import BusinessCategory from '../../ReusableComponents/BusinessCategory';
import CircleSvg from '../../ReusableComponents/ReusableSvgComponents/CircleSvg';
import SearchSvg from '../../ReusableComponents/ReusableSvgComponents/SearchSvg';
import DropdownSvg from '../../ReusableComponents/ReusableSvgComponents/DropdownSvg';
import ProfileSetupSide from '../../ReusableComponents/ProfileSetupSide';

const StepFour = ({ title, action, setFormData, formData, countryNames }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    // const account = localStorage.getItem('meta');
    // const accountDetails = JSON.parse(account);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { existingUserProfile, errorMessage } = useSelector(
        (state) => state.existingUserProfileReducer
    );

    const {
        cacName,
        cacNameError,
        getCacName,
        getCacNameError,
        existingProfileSetupPay,
        existingProfileSetupError
    } = useSelector((state) => state.existReducer);
    const { accountStatus, errorMessages } = useSelector(
        (state) => state.accountStatusReducer
    );
    const { createAccount, errorData } = useSelector(
        (state) => state.createAccountReducer
    );
    const { businessCategories, errorDatas } = useSelector(
        (state) => state.businessCategoriesReducer
    );
    const { compBusprofile, comperrorMessage } = useSelector(
        (state) => state.completeBusinessprofileReducer
    );
    const { getRC, getRCErrorMessage } = useSelector(
        (state) => state.getRCReducer
    );

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const [businessCategory, setBusinessCategory] = useState([]);
    const [businessType, setBusinessType] = useState([]);
    const [business, setBusiness] = useState('');
    const [businesses, setBusinesses] = useState('');
    const [localGovernment, setLocalGovernment] = useState('');
    const [businessTest, setBusinessTest] = useState(false);
    const [businessText, setBusinessText] = useState(false);
    const [getRCFirst, setGetRCFirst] = useState(false);
    const { states } = useSelector((state) => state.statesReducer);
    const [businessName, setBusinessName] = useState('');
    const [refferalCode, setRefferalCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [streetName, setStreetName] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [localGoverment, setLocalGoverment] = useState('');
    const [localState, setLocalState] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [regNo, setRegNo] = useState('');
    const [refferee, setRefferee] = useState();
    //console.loglocalGoverment);
    const [phones, setPhones] = useState();

    //console.logformData.type);
    useEffect(() => {
        console.log(getRC);
        if (getRC?.data?.dataFromCac?.companyName !== undefined) {
            setBusinessName(getRC?.data?.dataFromCac?.companyName);
        } else if (getRC?.data?.reason !== undefined) {
            console.log(getRC?.data?.reason);
        }
    }, [getRC, getRCErrorMessage]);
    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);

        //console.logformData.type);
    };
    const [phoneNumer, setPhoneNumer] = useState();

    useEffect(() => {
        if (window.typeof !== 'undefined') {
            setPhones(JSON.parse(window.localStorage.getItem('account')));
        }
        if (userDetails) {
            setPhoneNumer(userDetails.phoneNumber);
        } else if (profileInfo) {
            setPhoneNumer(profileInfo.phoneNumber);
        }
    }, []);
    const [profileInfo, setProfileInfo] = useState([]);
    const account = localStorage.getItem('account');
    const accountDetails = JSON.parse(account);
    const user = localStorage.getItem('user');
    const userDetails = JSON.parse(user);
    console.log(userDetails);
    const onSubmitNew = (data) => {
        setLoading((prev) => !prev);
        const userData = {
            isRegistered: 'true',
            businessName: businessName,
            businessCategory: business,
            businessType: businesses,
            referralCode: refferalCode,
            countryCode: '+234',
            businessPhoneNumber: phoneNumer,
            street: streetName,
            state: localState,
            city: city,
            lga: localGoverment,
            refereeCode: refferalCode
            // signature: ''
        };
        dispatch(CompleteBusinessProfile(userData));
        //console.logexistingProfileSetupPay, existingProfileSetupError);
    };
    const profileTest = () => {
        //console.log(compBusprofile, comperrorMessage);
        setLoading((prev) => !prev);
        if (compBusprofile) {
            //console.logerrorMessages);
            router.push('/Verify/ExistingSuccess');
        } else if (
            comperrorMessage.message === 'your have already setup your business'
        ) {
            router.push('/Verify/ExistingSuccess');
        }

        if (businessCategories !== null) {
            setBusinessCategory(businessCategories);
        }
    };
    useEffect(() => {
        profileTest();
    }, [compBusprofile, comperrorMessage]);

    const onSubmit = (data) => {
        const userData = {
            registerationNumber: regNo,
            isRegistered: 'true',
            businessName: businessName,
            businessCategory: business,
            businessType: businesses,
            referralCode: refferalCode,
            countryCode: '+234',
            businessPhoneNumber: phoneNumer,
            street: streetName,
            state: localState,
            city: city,
            lga: localGoverment,
            refereeCode: refferalCode
            // signature: ''
        };
        dispatch(ExCreateBusProfileSetup(userData));
        //console.log(existingProfileSetupPay, existingProfileSetupError);
    };

    useEffect(() => {
        //console.log(existingProfileSetupPay, existingProfileSetupError);
        setLoading((prev) => !prev);

        if (existingProfileSetupPay) {
            //console.log(existingProfileSetupPay, existingProfileSetupError);
            if (existingProfileSetupPay.data.message === 'Successful') {
                if (formData.type !== 'true') {
                    router.push('/Verify/ExistingSuccess');
                } else {
                    router.push('/Verify/CorportateAccount');
                }
            }
        } else if (existingProfileSetupError) {
            if (
                existingProfileSetupError.response.data.message ===
                'your have already setup your business'
            ) {
                if (formData.type !== 'true') {
                    router.push('/Verify/ExistingSuccess');
                } else {
                    router.push('/Verify/CorportateAccount');
                }
            }
        }
    }, [
        existingProfileSetupPay,
        existingProfileSetupError,
        compBusprofile,
        comperrorMessage
    ]);

    const types = (type) => {
        setOutType(type);
    };
    const [activeBtn, setActiveBtn] = useState(true);
    const [location, setLocation] = useState([]);

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
    useEffect(() => {
        dispatch(businessCategoriesData());
    }, []);

    useEffect(() => {
        const account = localStorage.getItem('account');
        const accountDetails = JSON.parse(account);
        if (accountDetails?.profile !== undefined) {
            setProfileInfo(accountDetails?.profile);
        } else if (accountDetails?.user !== undefined) {
            setProfileInfo(accountDetails?.user?.profile);
        } else {
            setProfileInfo(accountDetails);
        }
        //console.logprofileInfo);
        if (businessCategories !== null) {
            setBusinessCategory(businessCategories);
        }
    }, [businessCategories]);
    useEffect(() => {
        if (title === 'New') {
            setBusinessName(
                `${profileInfo?.lastName} ${profileInfo?.firstName}`
            );
        }
    }, [profileInfo]);
    useEffect(() => {
        Object.keys(businessCategory)?.filter((item) => {
            if (item === business) {
                setBusinessType(businessCategory[item]);
            }
        });
    }, [business]);
    return (
        <div className={styles.body}>
            <section className={styles.sectionI}>
                <ProfileSetupSide text="Checkout Priceless opportunities Be ahead" />
            </section>
            <section className={styles.sectionII}>
                <div className={styles.lastStep}>
                    <div className={styles.cardHeading}>
                        <ArrowBackSvg action={action} color="#102572" />
                        <p>
                            {comperrorMessage ? comperrorMessage.message : null}
                        </p>
                        <div>
                            <h3 className={styles.LeftHeading}>
                                Complete your Profile
                            </h3>
                        </div>
                    </div>
                    {title === 'New' ? (
                        <div className={styles.lastContainer}>
                            <form onSubmit={handleSubmit(onSubmitNew)}>
                                {error ? (
                                    <p className={styles.error}>{error}</p>
                                ) : null}
                                <div className={styles.existingUserHead}>
                                    {/* <div className={styles.existingUserCont}>
                                        <label>TIN </label>
                                        <div className={styles.addressNumber}>
                                            <input type="text" required />
                                        </div>
                                    </div> */}
                                    <div className={styles.existingUserSingle}>
                                        <div
                                            className={styles.existingUserCont}
                                        >
                                            <label>Enter Business Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter Business  Name"
                                                value={businessName}
                                                onChange={(e) =>
                                                    setBusinessName(
                                                        e.target.value
                                                    )
                                                }
                                                disabled
                                            />
                                        </div>
                                        <div
                                            className={styles.existingUserCont}
                                        >
                                            <label>
                                                Select your Business Category
                                            </label>
                                            <div className={styles.businessCat}>
                                                <div
                                                    className={
                                                        styles.businessCategories
                                                    }
                                                    onClick={() => {
                                                        setBusinessTest(
                                                            !businessTest
                                                        );
                                                    }}
                                                >
                                                    <SearchSvg color="#005B82" />
                                                    {business ? (
                                                        <p>{business}</p>
                                                    ) : (
                                                        <p>
                                                            Search Business
                                                            Category
                                                        </p>
                                                    )}

                                                    <DropdownSvg />
                                                </div>
                                                {businessTest && (
                                                    <ul
                                                        className={
                                                            styles.businessGroup
                                                        }
                                                    >
                                                        {Object.keys(
                                                            businessCategory
                                                        )?.map(
                                                            (
                                                                business,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <li
                                                                        value={
                                                                            business
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                        onClick={() => {
                                                                            setBusiness(
                                                                                business
                                                                            );
                                                                            setBusinessTest(
                                                                                false
                                                                            );
                                                                        }}
                                                                    >
                                                                        {
                                                                            business
                                                                        }
                                                                    </li>
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={styles.existingUserCont}
                                        >
                                            <label>Street Name</label>
                                            <div
                                                className={styles.addressNumber}
                                            >
                                                <input
                                                    type="text"
                                                    placeholder="101"
                                                    className={styles.number}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Enter Street Name"
                                                    value={streetName}
                                                    onChange={(e) =>
                                                        setStreetName(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className={styles.existingUserCont}
                                        >
                                            <label>
                                                Local Government Area (LGA)
                                            </label>
                                            <select
                                                onChange={(e) => {
                                                    setLocalGoverment(
                                                        e.target.value
                                                    );
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
                                                                      value={
                                                                          item.lgaName
                                                                      }
                                                                      key={
                                                                          index
                                                                      }
                                                                  >
                                                                      {
                                                                          item.lgaName
                                                                      }
                                                                  </option>
                                                              );
                                                          }
                                                      )
                                                    : null}
                                            </select>
                                        </div>
                                    </div>
                                    <div className={styles.existingUserSingle}>
                                        <div
                                            className={styles.existingUserCont}
                                        >
                                            <label>
                                                Enter Business Phone Number
                                            </label>
                                            <div className={styles.phone}>
                                                <div
                                                    className={
                                                        styles.phoneHeader
                                                    }
                                                >
                                                    <span>
                                                        <img
                                                            src={
                                                                countryNames
                                                                    .flags.svg
                                                            }
                                                            alt=""
                                                        />
                                                    </span>
                                                    <p>
                                                        {
                                                            countryNames.baseCurrency
                                                        }
                                                    </p>
                                                </div>
                                                <div
                                                    className={
                                                        styles.phoneDetails
                                                    }
                                                >
                                                    {/* <p>{countryNames.countryCode}</p> */}
                                                    <input
                                                        type="number"
                                                        placeholder="812 345 6789"
                                                        // value={
                                                        //     phones.phoneNumber
                                                        // }
                                                        // {...register(
                                                        //     'countryCode_number',
                                                        //     {
                                                        //         required:
                                                        //             'Phone Number is required',
                                                        //         minLength: {
                                                        //             value: 9,
                                                        //             message:
                                                        //                 'Min length is 9'
                                                        //         }
                                                        //     }
                                                        // )}
                                                        // value={phoneNumber}
                                                        onInput={(e) =>
                                                            setPhoneNumber(
                                                                e.target.value
                                                            )
                                                        }
                                                        value={
                                                            profileInfo.phoneNumber
                                                                ? profileInfo.phoneNumber
                                                                : userDetails
                                                                ? userDetails?.phoneNumber
                                                                : phoneNumber
                                                        }
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={styles.existingUserCont}
                                        >
                                            <label>
                                                Select your Business Type
                                            </label>
                                            <div className={styles.businessCat}>
                                                <div
                                                    className={
                                                        styles.businessCategories
                                                    }
                                                    onClick={() => {
                                                        setBusinessText(
                                                            !businessText
                                                        );
                                                    }}
                                                >
                                                    <SearchSvg color="#005B82" />
                                                    {businesses ? (
                                                        <p>{businesses}</p>
                                                    ) : (
                                                        <p>
                                                            Search Business Type
                                                        </p>
                                                    )}

                                                    <DropdownSvg />
                                                </div>
                                                {businessText && (
                                                    <ul
                                                        className={
                                                            styles.businessGroup
                                                        }
                                                    >
                                                        {businessType?.map(
                                                            (
                                                                business,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <li
                                                                        value={
                                                                            business
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                        onClick={() => {
                                                                            setBusinesses(
                                                                                business
                                                                            );
                                                                            setBusinessText(
                                                                                false
                                                                            );
                                                                        }}
                                                                    >
                                                                        {
                                                                            business
                                                                        }
                                                                    </li>
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={styles.existingUserCont}
                                        >
                                            <label>State</label>
                                            <select
                                                onChange={(event) => {
                                                    setLocalState(
                                                        event.target.value
                                                    );
                                                }}
                                            >
                                                <option>Select State</option>
                                                {location?.map(
                                                    (item, index) => {
                                                        return (
                                                            <option
                                                                value={
                                                                    item.state
                                                                }
                                                                key={index}
                                                            >
                                                                {item.state}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                        </div>
                                        <div
                                            className={styles.existingUserCont}
                                        >
                                            <label>City/Town</label>
                                            <input
                                                type="text"
                                                placeholder="Enter City"
                                                value={city}
                                                onChange={(e) =>
                                                    setCity(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.existingUserSingle}>
                                    <label>
                                        Enter Referal Code <i>(optional)</i>{' '}
                                    </label>
                                    {errors.email?.message}
                                    <input
                                        placeholder="Enter  Code"
                                        className={styles.textInput}
                                        value={refferalCode}
                                        onChange={(e) =>
                                            setRefferalCode(e.target.value)
                                        }
                                    />{' '}
                                    {/* {loading ? <Loader /> : null} */}
                                    <ButtonComp
                                        disabled={activeBtn}
                                        active={
                                            activeBtn ? 'active' : 'inactive'
                                        }
                                        loads={loading}
                                        err={comperrorMessage}
                                        text="Save and Continue"
                                        type="submit"
                                        // onClick={handleShowFourthStep}
                                    />
                                </div>
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
                            </form>
                        </div>
                    ) : (
                        <div className={styles.lastContainer}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className={styles.existingUserHead}>
                                    <div className={styles.existingUserSingle}>
                                        <div
                                            className={styles.existingUserCont}
                                        >
                                            <p className={styles.error}>
                                                {getRC?.data?.reason
                                                    ? getRC?.data?.reason
                                                    : null}
                                            </p>
                                            <label>
                                                Enter your RC /Business
                                                Registration Number
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Your RC Number"
                                                name="rcNumber"
                                                {...register('rcNumber', {
                                                    required:
                                                        'RC Number is required',
                                                    minLength: {
                                                        message:
                                                            'Min length is 10'
                                                    },
                                                    pattern: {
                                                        value: /^[A-Za-z0-9 ]+$/i,
                                                        message:
                                                            'Only Alphabelts/Number allowed'
                                                    }
                                                })}
                                                onChange={(e) => {
                                                    setRegNo(e.target.value);
                                                    if (
                                                        e.target.value
                                                            .length === 9
                                                    ) {
                                                        setGetRCFirst(true);
                                                        const data = {
                                                            registerationNumber:
                                                                e.target.value
                                                        };
                                                        dispatch(
                                                            getRCDetails(data)
                                                        );
                                                    } else {
                                                        setBusinessName('');
                                                        setGetRCFirst(false);
                                                    }
                                                }}
                                                value={regNo}
                                            />

                                            <p className={styles.error}>
                                                {errors.rcNumber?.message}
                                            </p>
                                        </div>

                                        <div
                                            className={styles.existingUserCont}
                                        >
                                            <label>TIN </label>
                                            <div
                                                className={styles.addressNumber}
                                            >
                                                <input type="text" required />
                                            </div>
                                        </div>
                                        <div
                                            className={styles.existingUserCont}
                                        >
                                            <label>
                                                Enter your Business Phone Number
                                            </label>
                                            <div className={styles.phone}>
                                                <div
                                                    className={
                                                        styles.phoneHeader
                                                    }
                                                >
                                                    <span>
                                                        <img
                                                            src={
                                                                countryNames
                                                                    ?.flags.svg
                                                            }
                                                            alt=""
                                                        />
                                                    </span>
                                                    {/* <p>
                                                        {
                                                            countryNames.baseCurrency
                                                        }
                                                    </p> */}
                                                </div>
                                                <div
                                                    className={
                                                        styles.phoneDetails
                                                    }
                                                >
                                                    {/* <p>{countryNames.countryCode}</p> */}
                                                    <input
                                                        type="number"
                                                        placeholder="812 345 6789"
                                                        // {...register(
                                                        //     'phoneNumber',
                                                        //     {
                                                        //         required:
                                                        //             'Phone Number is required',
                                                        //         minLength: {
                                                        //             value: 9,
                                                        //             message:
                                                        //                 'Min length is 9'
                                                        //         }
                                                        //     }
                                                        // )}
                                                        onChange={(e) =>
                                                            setPhoneNumber(
                                                                e.target.value
                                                            )
                                                        }
                                                        value={
                                                            profileInfo.phoneNumber
                                                                ? profileInfo.phoneNumber
                                                                : phoneNumber
                                                        }
                                                        disabled
                                                        // onChange={(e) =>
                                                        //     setPhoneNumber(
                                                        //         e.target.value
                                                        //     )
                                                        // }
                                                        // value={
                                                        //     profileInfo.phoneNumber
                                                        //         ? profileInfo.phoneNumber
                                                        //         : phoneNumber
                                                        // }
                                                    />
                                                </div>
                                            </div>
                                            <p className={styles.error}>
                                                {errors.phoneNumber?.message}
                                            </p>
                                        </div>
                                        <div
                                            className={styles.existingUserCont}
                                        >
                                            <label>
                                                Select your Business Type
                                            </label>
                                            <div className={styles.businessCat}>
                                                <div
                                                    className={
                                                        styles.businessCategories
                                                    }
                                                    onClick={() => {
                                                        setBusinessText(
                                                            !businessText
                                                        );
                                                    }}
                                                >
                                                    <SearchSvg color="#005B82" />
                                                    {businesses ? (
                                                        <p>{businesses}</p>
                                                    ) : (
                                                        <p>
                                                            Search Business Type
                                                        </p>
                                                    )}

                                                    <DropdownSvg />
                                                </div>
                                                {businessText && (
                                                    <ul
                                                        className={
                                                            styles.businessGroup
                                                        }
                                                    >
                                                        {businessType?.map(
                                                            (
                                                                business,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <li
                                                                        value={
                                                                            business
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                        onClick={() => {
                                                                            setBusinesses(
                                                                                business
                                                                            );
                                                                            setBusinessText(
                                                                                false
                                                                            );
                                                                        }}
                                                                    >
                                                                        {
                                                                            business
                                                                        }
                                                                    </li>
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.existingUserSingle}>
                                        <div
                                            className={styles.existingUserCont}
                                        >
                                            <label>
                                                Enter your Business Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder={
                                                    getRCFirst
                                                        ? 'Fetching'
                                                        : 'Enter Your Business Name'
                                                }
                                                value={businessName}
                                                onChange={(e) =>
                                                    setBusinessName(
                                                        e.target.value
                                                    )
                                                }
                                                disabled
                                            />
                                        </div>
                                        <div
                                            className={styles.existingUserCont}
                                        >
                                            <label>
                                                Select your Business Category
                                            </label>
                                            <div className={styles.businessCat}>
                                                <div
                                                    className={
                                                        styles.businessCategories
                                                    }
                                                    onClick={() => {
                                                        setBusinessTest(
                                                            !businessTest
                                                        );
                                                    }}
                                                >
                                                    <SearchSvg color="#005B82" />
                                                    {business ? (
                                                        <p>{business}</p>
                                                    ) : (
                                                        <p>
                                                            Search Business
                                                            Category
                                                        </p>
                                                    )}

                                                    <DropdownSvg />
                                                </div>
                                                {businessTest && (
                                                    <ul
                                                        className={
                                                            styles.businessGroup
                                                        }
                                                    >
                                                        {Object.keys(
                                                            businessCategory
                                                        )?.map(
                                                            (
                                                                business,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <li
                                                                        value={
                                                                            business
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                        onClick={() => {
                                                                            setBusiness(
                                                                                business
                                                                            );
                                                                            setBusinessTest(
                                                                                false
                                                                            );
                                                                        }}
                                                                    >
                                                                        {
                                                                            business
                                                                        }
                                                                    </li>
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.existingUserHead}>
                                    <div className={styles.existingUserSingle}>
                                        <div
                                            className={styles.existingUserCont}
                                        >
                                            <label>Street Name</label>
                                            <div
                                                className={styles.addressNumber}
                                            >
                                                <input
                                                    type="text"
                                                    placeholder="101"
                                                    className={styles.number}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Enter Street Name"
                                                    value={streetName}
                                                    onChange={(e) =>
                                                        setStreetName(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className={styles.existingUserCont}
                                        >
                                            <label>
                                                Local Government Area (LGA)
                                            </label>
                                            <select
                                                onChange={(e) => {
                                                    setLocalGoverment(
                                                        e.target.value
                                                    );
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
                                                                      value={
                                                                          item.lgaName
                                                                      }
                                                                      key={
                                                                          index
                                                                      }
                                                                  >
                                                                      {
                                                                          item.lgaName
                                                                      }
                                                                  </option>
                                                              );
                                                          }
                                                      )
                                                    : null}
                                            </select>
                                        </div>
                                    </div>
                                    <div className={styles.existingUserSingle}>
                                        <div
                                            className={styles.existingUserCont}
                                        >
                                            <label>State</label>
                                            <select
                                                onChange={(event) => {
                                                    setLocalState(
                                                        event.target.value
                                                    );
                                                }}
                                            >
                                                <option>Select State</option>
                                                {location?.map(
                                                    (item, index) => {
                                                        return (
                                                            <option
                                                                value={
                                                                    item.state
                                                                }
                                                                key={index}
                                                            >
                                                                {item.state}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                        </div>
                                        <div
                                            className={styles.existingUserCont}
                                        >
                                            <label>City/Town</label>
                                            <input
                                                type="text"
                                                placeholder="Enter City"
                                                value={city}
                                                onChange={(e) =>
                                                    setCity(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.existingUserSingle}>
                                    <label>
                                        Enter Referal Code <i>(optional)</i>{' '}
                                    </label>
                                    {errors.email?.message}
                                    <input
                                        placeholder="Enter  Code"
                                        className={styles.textInput}
                                        value={refferalCode}
                                        onChange={(e) =>
                                            setRefferalCode(e.target.value)
                                        }
                                    />
                                    {/* {loading ? <Loader /> : null} */}
                                    <ButtonComp
                                        disabled={activeBtn}
                                        active={
                                            activeBtn ? 'active' : 'inactive'
                                        }
                                        text="Save and Continue"
                                        type="submit"
                                        loads={loading}
                                        err={existingProfileSetupError}
                                        // onClick={handleShowSuccessStep}
                                        // onClick={handleShowFourthStep}
                                    />
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default StepFour;
