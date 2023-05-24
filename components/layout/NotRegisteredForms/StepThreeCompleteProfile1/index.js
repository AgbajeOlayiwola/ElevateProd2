import React, { useState, useEffect, useSyncExternalStore } from 'react';
import ButtonComp from '../../../ReusableComponents/Button';
import { useForm } from 'react-hook-form';
import { CardHeadingBVN, LeftHeading, ButtonWrapper } from './styles.module';
import styles from './styles.module.css';
import Card from '../../NotRegisteredForms/Card';
import Progressbar from '../../../ReusableComponents/Progressbar';
import StepFourCompProfile2BizDetails from '../StepFourCompProfile2BizDetails';
import { useDispatch, useSelector } from 'react-redux';
import {
    businessCategoriesData,
    CompleteBusinessProfile,
    CompProfile,
    createNewCorpUserAccount,
    createNewUserAccount,
    loadUserProfile,
    statesData,
    type
} from '../../../../redux/actions/actions';
import { useRouter } from 'next/router';
import DropdownSvg from '../../../ReusableComponents/ReusableSvgComponents/DropdownSvg';
import SearchSvg from '../../../ReusableComponents/ReusableSvgComponents/SearchSvg';
import axiosInstance from '../../../../redux/helper/apiClient';
import apiRoutes from '../../../../redux/helper/apiRoutes';
import { getCookie } from 'cookies-next';
import Loader from '../../../ReusableComponents/Loader';
const StepThreeCompleteProfile1 = ({ formData, setFormData, action, type }) => {
    // const [progress, setProgress] = useState('75%');
    const [title, setTitle] = useState('Basic');
    const [bgcolor, setBgcolor] = useState(false);
    const [profileCont, setProfileCont] = useState([]);
    const [businessProfile, setBusinessProfile] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleShowFourthStep = () => {
        setSwitchs((prev) => !prev);
        setBgcolor((prevState) => !prevState);
    };
    const dispatch = useDispatch();

    const [checker, setChecker] = useState();
    const [localState, setLocalState] = useState('');
    const [localGovernment, setLocalGovernment] = useState('');
    const [location, setLocation] = useState([]);
    const [gender, setGender] = useState('');
    const [businessCategory, setBusinessCategory] = useState([]);
    const [businessType, setBusinessType] = useState([]);
    const [business, setBusiness] = useState('');
    const [businesses, setBusinesses] = useState('');
    const [businessTest, setBusinessTest] = useState(false);
    const [businessText, setBusinessText] = useState(false);
    const [businessError, setBusinessError] = useState(false);
    const [businessTypeError, setBusinessTypeError] = useState(false);
    const [errorMes, setErrorMes] = useState();
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [userProfiles, setUserProfiles] = useState('');
    const [alluserData, setAllUserData] = useState('');
    const { compBusprofile, comperrorMessage } = useSelector(
        (state) => state.completeBusProfileReducer
    );
    const { profile, errorMessage } = useSelector((state) => state.profile);

    const { newCorpAccount, newCorpAccountErrorMMessage } = useSelector(
        (state) => state.newuserCorpAccount
    );
    const { businessCategories, errorDatas } = useSelector(
        (state) => state.businessCategoriesReducer
    );
    const { states } = useSelector((state) => state.statesReducer);
    const { accountStatus, errorMessages } = useSelector(
        (state) => state.accountStatusReducer
    );
    const { newAccount, newAccountErrorMessage } = useSelector(
        (state) => state.newUserAccountDets
    );

    const { isLoading, userProfile } = useSelector(
        (state) => state.userProfileReducer
    );

    const router = useRouter();
    const saveFile = (e) => {
        //console.log(e.target.files[0]);
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        //console.log(file);
    };
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

    // useEffect(() => {

    // }, [businessProfile]);
    const [relaod, setReload] = useState(false);

    useEffect(() => {
        dispatch(CompProfile());
        dispatch(loadUserProfile());
        dispatch(businessCategoriesData());
    }, []);

    useEffect(() => {
        if (profile) {
            if (type === true) {
                profile.data?.map((item) => {
                    if (item.documentType === 'CAC') {
                        setFormData({
                            ...formData,
                            bussinessName: item.documentData.companyName
                        });
                        setBusinessProfile(item.documentData.companyName);
                    }
                });
            }
        }
    }, [profile]);
    useEffect(() => {
        if (userProfile) {
            setProfileCont(userProfile);
        }
    }, [userProfile]);
    useEffect(() => {
        if (type === false) {
            setFormData({
                ...formData,
                bussinessName: `${profileCont?.lastName} ${profileCont?.firstName}`
            });
        }
    }, [profileCont]);
    useEffect(() => {
        if (newAccount?.message === 'success') {
            //console.log(errorMessages);
            router.push('/Verify/Account/loading');
        } else if (
            newAccountErrorMessage ===
            'You already have an account with us. Please contact us for more information'
        ) {
            router.push('/Succes');
        }

        if (businessCategories !== null) {
            setBusinessCategory(businessCategories);
        }
    }, [businessCategories, newAccountErrorMessage, newAccount]);
    useEffect(() => {
        Object.keys(businessCategory)?.filter((item) => {
            if (item === business) {
                setBusinessType(businessCategory[item]);
            }
        });
    }, [business]);

    // if (gender === 'm') //console.log(profileCont);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    //console.log(type);

    // const uploadFile = async (e) => {
    //   const formData = new FormData();
    //   formData.append("file", file);
    //   formData.append("fileName", fileName);
    //   try {
    //     const res = await axios.post(
    //       "http://localhost:3000/upload",
    //       formData
    //     );
    //     //console.log(res);
    //   } catch (ex) {
    //     //console.log(ex);
    //   }
    // };

    const handleSubmitIII = () => {
        setLoading(true);
        const commpleteProfileData = {
            isRegistered: type,
            businessName: formData.bussinessName,
            businessCategory: business,
            businessType: businesses,
            referralCode: formData.referralCode,
            countryCode: '+234',
            businessPhoneNumber: formData.phoneNumber,
            street: formData.streetName,
            state: formData.state,
            city: formData.city,
            lga: formData.localGoverment,
            refereeCode: formData.referralCode,
            signature: file
        };
        //console.log(commpleteProfileData);
        dispatch(CompleteBusinessProfile(commpleteProfileData));
    };

    const handleSubmitReg = () => {
        setLoading(true);
        const commpleteProfileData = {
            isRegistered: type,
            businessName: formData.bussinessName,
            businessCategory: business,
            businessType: businesses,
            referralCode: formData.refferalCode,
            countryCode: '+234',
            businessPhoneNumber: formData.phoneNumber,
            street: formData.streetName,
            state: formData.state,
            city: formData.city,
            lga: formData.localGoverment,
            refereeCode: '',
            signature: file
        };
        //console.log(commpleteProfileData);
        dispatch(CompleteBusinessProfile(commpleteProfileData));
    };

    useEffect(() => {
        setLoading(false);
        //console.log(compBusprofile);
        if (compBusprofile) {
            if (
                compBusprofile.message === 'Successful' ||
                comperrorMessage.message ===
                    'You have already setup your business'
            ) {
                profile.data?.map((item) => {
                    if (type === true) {
                        router.push('/Verify/CorportateAccount');
                    } else if (type === false) {
                        router.push('/Verify/Account/loading');
                    }
                });
            }
        }
    }, [newAccount, comperrorMessage]);
    const basicAction = () => {
        //console.log(business);
        if (business === '' && businesses === '') {
            setBusinessError(true);
            setBusinessTypeError(true);
        } else if (businesses === '') {
            setBusinessTypeError(true);
        } else {
            setTitle('Other');
        }
    };

    const [activeBtn, setActiveBtn] = useState(true);
    //console.log(test);
    //console.log(type);
    return (
        <div className={styles.bodyWrapper}>
            <div className={styles.prog}>
                <CardHeadingBVN>
                    <LeftHeading>Complete your Profile</LeftHeading>
                    {/* <Imag 
                    src="/width" 
                    alt="lineImage" /> */}
                </CardHeadingBVN>

                {/* <Progressbar
                            bgcolor="#6CCF00"
                            progressCount={progress}
                            height={14}
                            progWidth="27%"
                        /> */}
            </div>
            {newAccountErrorMessage ? (
                <p className={styles.error}> {newAccountErrorMessage}</p>
            ) : null}
            {/* The small card that wraps the form */}
            <div className={styles.businessCont}>
                <ButtonWrapper>
                    <div
                        className={
                            title === 'Basic' ? styles.first : styles.second
                        }
                    >
                        <h2
                            onClick={() => {
                                setTitle('Basic');
                            }}
                        >
                            1
                        </h2>
                        <p>Basic Details</p>
                    </div>
                    <div
                        className={
                            title === 'Other' ? styles.first : styles.second
                        }
                    >
                        <h2
                            onClick={() => {
                                setTitle('Other');
                            }}
                        >
                            2
                        </h2>
                        <p>Other Details</p>
                    </div>
                </ButtonWrapper>
                <>
                    {title === 'Basic' ? (
                        <form onSubmit={handleSubmit(basicAction)}>
                            <div className={styles.nameDiv}>
                                <div className={styles.formGroups}>
                                    <label>Enter Full Name</label>
                                    <input
                                        type="text"
                                        value={
                                            profileCont.lastName !== undefined
                                                ? `${profileCont.lastName} ${profileCont.firstName}`
                                                : 'Full Name'
                                        }
                                        disabled
                                    />
                                </div>
                                {/* {alluserData[1].documentData.map(
                                    (usersData, index) => {
                                        //console.log(alluserData);
                                        return <></>;
                                    }
                                )} */}
                                <div className={styles.formGroup}>
                                    <label>Select your Gender</label>
                                    <select
                                        name=""
                                        id=""
                                        {...register('gender', {
                                            required: 'Gender is required'
                                        })}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    <p className={styles.error}>
                                        {errors.gender?.message}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.formCont}>
                                <div className={styles.formGroup}>
                                    <div className={styles.singleFormGroup}>
                                        <label>Enter Business Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Business Full Name"
                                            value={formData.bussinessName}
                                            onInput={(event) => {
                                                setFormData({
                                                    ...formData,
                                                    bussinessName:
                                                        event.target.value
                                                });
                                            }}
                                            disabled
                                        />

                                        <p className={styles.error}>
                                            {errors.businessName?.message}
                                        </p>
                                    </div>
                                    <div className={styles.singleFormGroup}>
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
                                                        Search Business Category
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
                                                        (business, index) => {
                                                            return (
                                                                <li
                                                                    value={
                                                                        business
                                                                    }
                                                                    key={index}
                                                                    onClick={() => {
                                                                        setBusiness(
                                                                            business
                                                                        );
                                                                        setBusinessTest(
                                                                            false
                                                                        );
                                                                        setBusinessError(
                                                                            false
                                                                        );
                                                                    }}
                                                                >
                                                                    {business}
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </ul>
                                            )}
                                        </div>
                                        {businessError ? (
                                            <p className={styles.error}>
                                                Busuness Category is Required
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <div className={styles.singleFormGroup}>
                                        <label>
                                            Enter your Business Phone Number
                                        </label>
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
                                            <div
                                                className={styles.phoneDetails}
                                            >
                                                <p>{formData.countryCode}</p>
                                                <input
                                                    type="number"
                                                    placeholder="812 345 6789"
                                                    // {...register(
                                                    //     'countryCode_number',
                                                    //     {
                                                    //         required:
                                                    //             'Phone number is required',
                                                    //         minLength: {
                                                    //             value: 9,
                                                    //             message:
                                                    //                 'Min length is 9'
                                                    //         }
                                                    //     }
                                                    // )}
                                                    value={formData.phoneNumber}
                                                    onInput={(event) => {
                                                        setFormData({
                                                            ...formData,
                                                            phoneNumber:
                                                                event.target
                                                                    .value
                                                        });
                                                    }}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <p className={styles.error}>
                                            {errors.countryCode_number?.message}
                                        </p>
                                    </div>
                                    <div className={styles.singleFormGroup}>
                                        <label>Select your Business Type</label>
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
                                                    <p>Search Business Type</p>
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
                                                        (business, index) => {
                                                            return (
                                                                <li
                                                                    value={
                                                                        business
                                                                    }
                                                                    key={index}
                                                                    onClick={() => {
                                                                        setBusinesses(
                                                                            business
                                                                        );
                                                                        setBusinessText(
                                                                            false
                                                                        );
                                                                        setBusinessTypeError(
                                                                            false
                                                                        );
                                                                    }}
                                                                >
                                                                    {business}
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </ul>
                                            )}
                                            {businessTypeError ? (
                                                <p className={styles.error}>
                                                    Busuness Type is Required
                                                </p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <button type="submit">Next</button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <form
                            onSubmit={handleSubmit(
                                type === true
                                    ? handleSubmitReg
                                    : handleSubmitIII
                            )}
                        >
                            <p className={styles.error}>
                                {comperrorMessage
                                    ? comperrorMessage.message
                                    : null}
                            </p>
                            <div className={styles.nameDiv}>
                                <div className={styles.formGroup}>
                                    <div>
                                        <label>Number | Street Name</label>
                                        <div className={styles.addressNumber}>
                                            <input
                                                type="text"
                                                placeholder="101"
                                                className={styles.number}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Enter Street Name"
                                                {...register('streetName', {
                                                    required:
                                                        'Street Name is required'
                                                })}
                                                onInput={(event) => {
                                                    setFormData({
                                                        ...formData,
                                                        streetName:
                                                            event.target.value
                                                    });
                                                }}
                                            />
                                        </div>
                                        <p className={styles.error}>
                                            {errors.streetName?.message}
                                        </p>
                                    </div>
                                    <div className={styles.singleFormGroup}>
                                        <label>
                                            Local Government Area (LGA)
                                        </label>
                                        <select
                                            name=""
                                            id=""
                                            {...register('localGoverment', {
                                                required:
                                                    'Local Government is required'
                                            })}
                                            onInput={(event) => {
                                                setFormData({
                                                    ...formData,
                                                    localGoverment:
                                                        event.target.value
                                                });
                                            }}
                                        >
                                            <option value="">Select LGA</option>
                                            {localGovernment
                                                ? localGovernment?.map(
                                                      (item, index) => {
                                                          return (
                                                              <option
                                                                  value={
                                                                      item.lgaName
                                                                  }
                                                                  key={index}
                                                              >
                                                                  {item.lgaName}
                                                              </option>
                                                          );
                                                      }
                                                  )
                                                : null}
                                        </select>
                                        <p className={styles.error}>
                                            {errors.localGoverment?.message}
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <div
                                        className={styles.singleFormGroup}
                                        style={{
                                            marginTop: '0px'
                                        }}
                                    >
                                        <label>State</label>
                                        <select
                                            name=""
                                            id=""
                                            {...register('state', {
                                                required: 'State is required'
                                            })}
                                            value={formData.state}
                                            onInput={(event) => {
                                                setLocalState(
                                                    event.target.value
                                                );
                                                setFormData({
                                                    ...formData,
                                                    state: event.target.value
                                                });
                                            }}
                                        >
                                            <option value="">
                                                Select State
                                            </option>
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
                                        </select>
                                        <p className={styles.error}>
                                            {errors.state?.message}
                                        </p>
                                    </div>
                                    <div className={styles.singleFormGroup}>
                                        <label>City/Town</label>
                                        <input
                                            type="text"
                                            placeholder="Enter City/Town"
                                            {...register('city', {
                                                required:
                                                    'City/Town is required'
                                            })}
                                            onInput={(event) => {
                                                setFormData({
                                                    ...formData,
                                                    city: event.target.value
                                                });
                                            }}
                                        />
                                        <p className={styles.error}>
                                            {errors.city?.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.formCont}>
                                <div className={styles.formGroup}>
                                    <div className={styles.singleFormGroup}>
                                        <label>
                                            Enter Referral Code
                                            <span>(Optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Code"
                                            onChange={(event) => {
                                                setFormData({
                                                    ...formData,
                                                    referralCode:
                                                        event.target.value
                                                });
                                            }}
                                        />
                                    </div>
                                    {/* {loading ? <Loader /> : null} */}
                                    {/* {profileCont.isBusinessRegistered ===
                                    true ? (
                                        <ButtonComp
                                            disabled={activeBtn}
                                            active={
                                                activeBtn
                                                    ? 'active'
                                                    : 'inactive'
                                            }
                                            text="Save & Continue"
                                            type="button"
                                            onClick={handleSubmitReg}
                                            // onClick={handleShowFourthStep}
                                        />
                                    ) : (
                                        <ButtonComp
                                            disabled={activeBtn}
                                            active={
                                                activeBtn
                                                    ? 'active'
                                                    : 'inactive'
                                            }
                                            text="Save & Continue"
                                            type="button"
                                            onClick={handleSubmitIII}
                                            // onClick={handleShowFourthStep}
                                        />
                                    )} */}

                                    <ButtonComp
                                        disabled={activeBtn}
                                        active={
                                            activeBtn ? 'active' : 'inactive'
                                        }
                                        text="Save & Continue"
                                        type="submit"
                                        loads={loading}
                                        err={comperrorMessage}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <div className={styles.singleFormGroup}>
                                        <label>Upload Signature</label>
                                        <div className={styles.sign}>
                                            <p>
                                                {fileName
                                                    ? fileName
                                                    : 'No file chosen...'}
                                            </p>
                                            <label>
                                                Upload
                                                <input
                                                    type="file"
                                                    placeholder="Enter Code"
                                                    onChange={saveFile}
                                                    accept="image/png, image/jpeg, application/pdf"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </>
            </div>
        </div>
    );
};

export default StepThreeCompleteProfile1;
