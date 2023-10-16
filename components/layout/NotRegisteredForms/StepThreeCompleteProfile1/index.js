import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ButtonComp from '../../../ReusableComponents/Button';
import { ButtonWrapper, CardHeadingBVN, LeftHeading } from './styles.module';
import styles from './styles.module.css';

import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    useBusinessSetupMutation,
    useCreateCAcctMutation,
    useCreateIAcctMutation,
    useGetAccountStatusMutation,
    useGetCategoriesMutation,
    useGetProfileMutation
} from '../../../../redux/api/authApi';
import { setAccountNumber } from '../../../../redux/slices/accountNumberSlice';
import { lgasArr } from '../../../ReusableComponents/Data';
import DropdownSvg from '../../../ReusableComponents/ReusableSvgComponents/DropdownSvg';
import SearchSvg from '../../../ReusableComponents/ReusableSvgComponents/SearchSvg';
const StepThreeCompleteProfile1 = ({ formData, setFormData, action, type }) => {
    // local states;
    const [title, setTitle] = useState('Basic');
    const [bgcolor, setBgcolor] = useState(false);
    const [localState, setLocalState] = useState('');
    const [profileCont, setProfileCont] = useState([]);
    const [localGovernment, setLocalGovernment] = useState('');
    const [lga, setLga] = useState('');
    const [location, setLocation] = useState([]);
    const [business, setBusiness] = useState('');
    const [businessType, setBusinessType] = useState([]);
    const [selectedBusinessType, setSelectedBusinessType] = useState();
    const [businesses, setBusinesses] = useState('');
    const [businessTest, setBusinessTest] = useState(false);
    const [businessText, setBusinessText] = useState(false);
    const [bussinestCate, setBusinessCate] = useState();
    const [fileName, setFileName] = useState('');
    const [profile, setProfile] = useState('');
    const [activeBtn, setActiveBtn] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [bName, setBName] = useState();
    const [city, setCity] = useState();
    const [address, setAddress] = useState();
    const [refferalCode, setRefferalCode] = useState();
    const [relaod, setReload] = useState(false);
    const [formError, setFormError] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    //
    const [
        getProfile,
        {
            data: getProfileData,
            isLoading: getProfileLoad,
            isSuccess: getProfileSuccess,
            isError: getProfileFalse,
            error: getProfileErr,
            reset: getProfileReset
        }
    ] = useGetProfileMutation();
    const [
        getCategories,
        {
            data: getCategoriesData,
            isLoading: getCategoriesLoad,
            isSuccess: getCategoriesSuccess,
            isError: getCategoriesFalse,
            error: getCategoriesErr,
            reset: getCategoriesReset
        }
    ] = useGetCategoriesMutation();

    const [
        businessSetup,
        {
            data: businessSetupData,
            isLoading: businessSetupLoad,
            isSuccess: businessSetupSuccess,
            isError: businessSetupFalse,
            error: businessSetupErr,
            reset: businessSetupReset
        }
    ] = useBusinessSetupMutation();
    const [
        createIAcct,
        {
            data: createIAcctData,
            isLoading: createIAcctLoad,
            isSuccess: createIAcctSuccess,
            isError: createIAcctFalse,
            error: createIAcctErr,
            reset: createIAcctReset
        }
    ] = useCreateIAcctMutation();
    const [
        createCAcct,
        {
            data: createCAcctData,
            isLoading: createCAcctLoad,
            isSuccess: createCAcctSuccess,
            isError: createCAcctFalse,
            error: createCAcctErr,
            reset: createCAcctReset
        }
    ] = useCreateCAcctMutation();
    const [
        getAccountStatus,
        {
            data: getAccountStatusData,
            isLoading: getAccountStatusLoad,
            isSuccess: getAccountStatusSuccess,
            isError: getAccountStatusFalse,
            error: getAccountStatusErr,
            reset: getAccountStatusReset
        }
    ] = useGetAccountStatusMutation();
    const dispatch = useDispatch();
    useEffect(() => {
        if (selectedCategory) {
            setBusinessType(getCategoriesData?.data[selectedCategory]);
        }
    }, [selectedCategory]);
    useEffect(() => {
        lgasArr?.filter((item) => {
            if (item.state === localState) {
                setLocalGovernment(item.lgas);
            }
        });
    }, [localState]);

    // useEffect(() => {
    //     if (businessSetupData) {
    //         if (localStorage.getItem('regprofilesetupdata') && type === false) {
    //             createCAcct();
    //         } else {
    //             const data = {
    //                 affiliateCode: 'ENG',
    //                 currency: 'NGN'
    //             };
    //             createIAcct(data);
    //         }
    //     }
    // }, [businessSetupSuccess]);
    useEffect(() => {
        getProfile(null);
        getCategories(null);
    }, []);

    useEffect(() => {
        if (getProfileSuccess) {
            setProfile(getProfileData);
            console.log(getProfileData);
        }
    }, [getProfileSuccess]);

    useEffect(() => {
        if (getCategoriesSuccess) {
            const mainCategories = Object.keys(getCategoriesData.data);
            // Set the state for BusinessCate
            setBusinessCate(mainCategories);
        }
    }, [getCategoriesSuccess]);
    useEffect(() => {
        const storedData = localStorage.getItem('profilesetupdata');
        const profileSetupData = JSON.parse(storedData);
        //attach rc name to local storage on liveness test
        if (profileSetupData?.rcName) {
            setBName(profileSetupData?.rcName);
        }
    }, [getProfileSuccess, bName]);

    const router = useRouter();

    const nextPage = (e) => {
        e.preventDefault();
        setTitle('Other');
    };

    const [base64String, setBase64String] = useState();
    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const uploadedBase64String = event.target.result;
                setBase64String(uploadedBase64String); // Store base64 string in state
                setFileName(file?.name); // Store file name in state
            };

            reader.readAsDataURL(file);
        }
    };
    const validateForm = () => {
        let isValid = true;

        // Validate signature
        if (
            profile?.user == undefined ||
            address?.length <= 0 ||
            city?.length <= 0 ||
            !base64String
        ) {
            setFormError(true);
            isValid = false;
        }

        return isValid;
    };
    const handleSubmitIII = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            const data = {
                firstName: profile?.user?.firstName || firstName,
                lastName: profile?.user?.lastName || lastName,
                gender: gender,
                isRegistered: type,
                businessName: bName || `${lastName} ${firstName}`,
                businessPhoneNumber: profile?.user?.phoneNumber,
                businessType: selectedBusinessType,
                businessCategory: selectedCategory,
                street: address,
                state: localState,
                city: city,
                lga: lga,
                dateIncorporated: null,
                countryCode: formData?.countryCode,
                refereeCode: refferalCode,
                signature: base64String
            };
            businessSetup(data);
        }
    };

    const basicAction = () => {};
    useEffect(() => {
        if (businessSetupSuccess && type === false) {
            const data = {
                affiliateCode: 'ENG',
                currency: 'NGN'
            };
            createIAcct(data);
        } else if (businessSetupSuccess && type === true) {
            const data = {
                affiliateCode: 'ENG',
                currency: 'NGN'
            };
            createCAcct(data);
        }
    }, [businessSetupSuccess]);
    const handleCategoryClick = (val) => {
        setSelectedCategory(val);
        setSelectedBusiness(null); // Reset selected business when a new category is selected
    };
    const handleBusinessTypeClick = (val) => {
        setSelectedBusinessType(val);
    };
    useEffect(() => {
        if (createCAcctSuccess) {
            getAccountStatus();
        }
    }, [createCAcctSuccess]);
    useEffect(() => {
        if (createIAcctSuccess) {
            getAccountStatus();
        }
    }, [createIAcctSuccess]);
    useEffect(() => {
        if (getAccountStatusData) {
            dispatch(setAccountNumber(getAccountStatusData?.data?.trackerRef));
            router.push('/Success');
        }
    }, [getAccountStatusSuccess]);
    const showToastMessage = () => {
        toast.error('Thre was ann error creating business', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    useEffect(() => {
        if (businessSetupErr) {
            showToastMessage();
        }
    }, [businessSetupErr]);

    const showToastSuccessMessage = () => {
        toast.success('Account Creation Underway.', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const showToastErrorMessage = () => {
        toast.error('Business Setup Failed', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    useEffect(() => {
        if (businessSetupSuccess) {
            showToastSuccessMessage();
        } else if (businessSetupErr) {
            showToastErrorMessage();
        }
    }, [businessSetupSuccess, businessSetupErr]);

    const showToastIndividualSuccessMessage = () => {
        toast.success('Getting Account Status.', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const showToastIndividualErrorMessage = () => {
        toast.error('Error Creating Account, Try Again', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    useEffect(() => {
        if (createIAcctSuccess) {
            showToastIndividualSuccessMessage();
        } else if (createIAcctErr) {
            showToastIndividualErrorMessage();
        }
    }, [createIAcctSuccess, createIAcctErr]);
    const showToastAccountStatusErrorMessage = () => {
        toast.error('Error Fetching Account Status', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    useEffect(() => {
        if (getAccountStatusErr) {
            showToastAccountStatusErrorMessage();
        }
    }, [getAccountStatusErr]);
    const affiliate = localStorage.getItem('affiliateCode');
    console.log(affiliate);
    return (
        <div className={styles.bodyWrapper}>
            <ToastContainer />
            <div className={styles.prog}>
                <CardHeadingBVN>
                    <LeftHeading>Complete your Profile</LeftHeading>
                </CardHeadingBVN>
            </div>

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
                        <>
                            <div className={styles.nameDiv}>
                                <div className={styles.formGroups}>
                                    <label>Enter Last Name</label>
                                    {getProfileData?.user?.lastName ? (
                                        <input
                                            type="text"
                                            value={
                                                getProfileData?.user?.lastName
                                                    ? `${getProfileData?.user?.lastName}`
                                                    : 'Full Name'
                                            }
                                            disabled
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                            placeholder="Last Name"
                                        />
                                    )}
                                </div>
                                <div className={styles.formGroups}>
                                    <label>Enter First Name</label>
                                    {getProfileData?.user?.firstName ? (
                                        <input
                                            type="text"
                                            value={
                                                getProfileData?.user?.lastName
                                                    ? `${getProfileData?.user?.firstName}`
                                                    : 'Full Name'
                                            }
                                            disabled
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                            placeholder="First Name"
                                        />
                                    )}
                                </div>
                                {/* {alluserData[1].documentData.map(
                                    (usersData, index) => {
                                        return <></>;
                                    }
                                )} */}
                            </div>
                            <div className={styles.formGroup}>
                                <label>Select your Gender</label>
                                <select
                                    name=""
                                    id=""
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className={styles.formCont}>
                                <div className={styles.formGroup}>
                                    <div className={styles.singleFormGroup}>
                                        <label>Enter Business Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Business Full Name"
                                            value={
                                                bName
                                                    ? bName
                                                    : `${getProfileData?.user?.firstName} ${getProfileData?.user?.lastName}`
                                                    ? `${lastName} ${firstName}`
                                                    : ''
                                            }
                                            disabled
                                        />
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
                                                {selectedCategory ? (
                                                    <p>{selectedCategory}</p>
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
                                                    {bussinestCate
                                                        ? bussinestCate?.map(
                                                              (
                                                                  category,
                                                                  index
                                                              ) => {
                                                                  return (
                                                                      <li
                                                                          key={
                                                                              index
                                                                          }
                                                                          onClick={() => {
                                                                              handleCategoryClick(
                                                                                  category
                                                                              ),
                                                                                  setBusinessTest(
                                                                                      !businessTest
                                                                                  );
                                                                          }}
                                                                      >
                                                                          {
                                                                              category
                                                                          }
                                                                      </li>
                                                                  );
                                                              }
                                                          )
                                                        : null}
                                                </ul>
                                            )}
                                            {!selectedCategory ? (
                                                <p className={styles.error}>
                                                    Please Select a business
                                                    category
                                                </p>
                                            ) : null}
                                        </div>
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
                                                    value={
                                                        getProfileData?.user
                                                            ?.phoneNumber
                                                    }
                                                    disabled
                                                />
                                            </div>
                                        </div>
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
                                                {selectedBusinessType ? (
                                                    <p>
                                                        {selectedBusinessType}
                                                    </p>
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
                                                        (business, index) => (
                                                            <li
                                                                key={index}
                                                                onClick={() => {
                                                                    handleBusinessTypeClick(
                                                                        business
                                                                    ),
                                                                        setBusinessText(
                                                                            !businessText
                                                                        );
                                                                }}
                                                            >
                                                                {business}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                            {!selectedBusinessType ? (
                                                <p className={styles.error}>
                                                    Please Select a business
                                                    type
                                                </p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <button type="submit" onClick={nextPage}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {formError ? (
                                <p className={styles.error}>
                                    {' '}
                                    Please fill all The forms
                                </p>
                            ) : null}
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
                                                value={address}
                                                onChange={(e) =>
                                                    setAddress(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.singleFormGroup}>
                                        <label>
                                            Local Government Area (LGA)
                                        </label>
                                        <select
                                            name=""
                                            id=""
                                            onChange={(e) =>
                                                setLga(e.target.value)
                                            }
                                        >
                                            <option value="">Select LGA</option>
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
                                        {!lga ? (
                                            <p className={styles.error}>
                                                Please Select a local government
                                            </p>
                                        ) : null}
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
                                            value={formData.state}
                                            onChange={(event) =>
                                                setLocalState(
                                                    event.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select State
                                            </option>
                                            {lgasArr.map((item, index) => {
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

                                        {!localState ? (
                                            <p className={styles.error}>
                                                Please Select a state
                                            </p>
                                        ) : null}
                                    </div>
                                    <div className={styles.singleFormGroup}>
                                        <label>City/Town</label>
                                        <input
                                            type="text"
                                            value={city}
                                            onChange={(e) =>
                                                setCity(e.target.value)
                                            }
                                            placeholder="Enter City/Town"
                                        />
                                    </div>
                                    {city?.length <= 0 ? (
                                        <p className={styles.error}>
                                            Please Fill In city
                                        </p>
                                    ) : null}
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
                                            value={refferalCode}
                                            onChange={(e) =>
                                                setRefferalCode(e.target.value)
                                            }
                                            placeholder="Enter Code"
                                        />
                                    </div>

                                    <ButtonComp
                                        disabled={activeBtn}
                                        active={
                                            activeBtn ? 'active' : 'inactive'
                                        }
                                        text="Save & Continue"
                                        type="submit"
                                        onClick={handleSubmitIII}
                                        loads={
                                            businessSetupLoad ||
                                            createCAcctLoad ||
                                            createIAcctLoad ||
                                            getAccountStatusLoad
                                        }
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
                                                    onChange={handleImageUpload}
                                                    accept="image/png, image/jpeg, application/pdf"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            </div>
        </div>
    );
};

export default StepThreeCompleteProfile1;
