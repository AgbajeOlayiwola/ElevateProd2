import React, { useEffect, useState } from 'react';
import ButtonComp from '../../ReusableComponents/Button';
import styles from './styles.module.css';

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    useBusinessSetupMutation,
    useCreateCAcctMutation,
    useGetAccountStatusMutation,
    useGetCategoriesMutation,
    useSearchRCMutation
} from '../../../redux/api/authApi';
import { setAccountNumber } from '../../../redux/slices/accountNumberSlice';
import ArrowBackSvg from '../../ReusableComponents/ArrowBackSvg';
import { lgasArr } from '../../ReusableComponents/Data';
import ProfileSetupSide from '../../ReusableComponents/ProfileSetupSide';
import DropdownSvg from '../../ReusableComponents/ReusableSvgComponents/DropdownSvg';
import SearchSvg from '../../ReusableComponents/ReusableSvgComponents/SearchSvg';

const StepFour = ({ title, action, setFormData, formData, countryNames }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        const {
            query: { pageType }
        } = router;
        setPageType({ pageType }.pageType);
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [businessCategory, setBusinessCategory] = useState([]);
    const [businessType, setBusinessType] = useState([]);
    const [business, setBusiness] = useState('');
    const [businesses, setBusinesses] = useState('');
    const [localGovernment, setLocalGovernment] = useState('');
    const [businessTest, setBusinessTest] = useState(false);
    const [businessText, setBusinessText] = useState(false);
    const [getRCFirst, setGetRCFirst] = useState(false);
    const [businessName, setBusinessName] = useState('');
    const [refferalCode, setRefferalCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [streetName, setStreetName] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [lga, setLga] = useState('');
    const [localGoverment, setLocalGoverment] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [localState, setLocalState] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [regNo, setRegNo] = useState('');
    const [refferee, setRefferee] = useState();
    const [pageType, setPageType] = useState('');
    const [phones, setPhones] = useState();
    const [bussinestCate, setBusinessCate] = useState();
    const [selectedBusinessType, setSelectedBusinessType] = useState();

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);

        // //console.logformData.type);
    };
    const [phoneNumer, setPhoneNumer] = useState();

    const [profileInfo, setProfileInfo] = useState([]);
    const account = localStorage.getItem('account');
    const accountDetails = JSON.parse(account);
    const user = localStorage.getItem('user');
    const userDetails = JSON.parse(user);

    const types = (type) => {
        setOutType(type);
    };
    const [activeBtn, setActiveBtn] = useState(true);
    const [location, setLocation] = useState([]);

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
        searchRC,
        {
            data: searchRCData,
            isLoading: searchRCLoad,
            isSuccess: searchRCSuccess,
            isError: searchRCFalse,
            error: searchRCErr,
            reset: searchRCReset
        }
    ] = useSearchRCMutation();

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

    useEffect(() => {
        location?.filter((item) => {
            if (item.state === localState) {
                setLocalGovernment(item.localGoverment);
            }
        });
    }, [localState]);

    useEffect(() => {
        if (pageType === 'New') {
            setFormData({ ...formData, type: 'false' });
        } else {
            setFormData({ ...formData, type: 'true' });
        }
    }, [formData.type]);
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

    useEffect(() => {
        getCategories(null);
    }, []);

    useEffect(() => {
        if (getCategoriesSuccess) {
            const mainCategories = Object.keys(getCategoriesData.data);
            setBusinessCate(mainCategories);
        }
    }, [getCategoriesSuccess]);
    const handleCategoryClick = (val) => {
        setSelectedCategory(val);
        setSelectedBusiness(null); // Reset selected business when a new category is selected
    };
    const handleBusinessTypeClick = (val) => {
        setSelectedBusinessType(val);
    };
    const { existingUserDetails } = useSelector((store) => store);
    const { moreAccountNumberDetails } = useSelector((store) => store);

    const createBusiness = (e) => {
        e.preventDefault();
        const data = {
            isRegistered: false,
            registerationNumber: '',
            phoneNumber: moreAccountNumberDetails?.accounts?.mobileNos,
            businessName: businessName,
            bussinessCategory: selectedCategory,
            businessType: selectedBusinessType,
            city: city,
            state: localState,
            lga: localGoverment,
            refferalCode: refferalCode,
            isExisting: true
        };
        businessSetup(data);
    };

    const createAnewBusinessAccount = (e) => {
        e.preventDefault();
        const data = {
            isRegistered: true,
            registerationNumber: callRc,
            phoneNumber: moreAccountNumberDetails?.accounts?.mobileNos,
            businessName:
                searchRCData?.data?.name ||
                moreAccountNumberDetails?.accounts?.accountName,
            bussinessCategory: selectedCategory,
            businessType: selectedBusinessType,
            city: city,
            state: localState,
            lga: localGoverment,
            refferalCode: refferalCode,
            isExisting: true
        };
        businessSetup(data);
    };
    useEffect(() => {
        if (businessSetupData && pageType !== 'New') {
            const data = {
                affiliateCode: 'ENG',
                currency: 'NGN'
            };
            createCAcct(data);
        } else if (businessSetupData && pageType === 'New') {
            dispatch(
                setAccountNumber(
                    moreAccountNumberDetails?.accounts?.accountNumber
                )
            );
            router.push('/Success');
        }
    }, [businessSetupSuccess]);
    useEffect(() => {
        if (createCAcctData) {
            getAccountStatus();
        }
    }, [createCAcctSuccess]);
    useEffect(() => {
        if (getAccountStatusData) {
            dispatch(setAccountNumber(getAccountStatusData?.data?.trackerRef));
            router.push('/Success');
        }
    }, [getAccountStatusSuccess]);

    const [callRc, setCallRc] = useState('');

    useEffect(() => {
        if (callRc?.length > 2) {
            searchRC({
                registrationNumber: callRc
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callRc]);

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
        if (createCAcctSuccess) {
            showToastIndividualSuccessMessage();
        } else if (createCAcctErr) {
            showToastIndividualErrorMessage();
        }
    }, [createCAcctSuccess, createCAcctErr]);
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
    return (
        <>
            {' '}
            <ToastContainer />
            <div className={styles.body}>
                <section className={styles.sectionI}>
                    <ProfileSetupSide text="Checkout Priceless opportunities Be ahead" />
                </section>
                <section className={styles.sectionII}>
                    <div className={styles.lastStep}>
                        <div className={styles.cardHeading}>
                            <ArrowBackSvg action={action} color="#102572" />
                            <p className={styles.error}></p>
                            <div>
                                <h3 className={styles.LeftHeading}>
                                    Complete your Profile
                                </h3>
                            </div>
                        </div>
                        {pageType === 'New' ? (
                            <div className={styles.lastContainer}>
                                <form>
                                    <div className={styles.existingUserHead}>
                                        <div
                                            className={
                                                styles.existingUserSingle
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.existingUserCont
                                                }
                                            >
                                                <label>
                                                    Enter Business Name
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Business  Name"
                                                    value={businessName}
                                                    onChange={(e) =>
                                                        setBusinessName(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div
                                                className={
                                                    styles.existingUserCont
                                                }
                                            >
                                                <label>
                                                    Select your Business
                                                    Category
                                                </label>
                                                <div
                                                    className={
                                                        styles.businessCat
                                                    }
                                                >
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
                                                            <p>
                                                                {
                                                                    selectedCategory
                                                                }
                                                            </p>
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
                                                        <p
                                                            className={
                                                                styles.error
                                                            }
                                                        >
                                                            Please Select a
                                                            business category
                                                        </p>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    styles.existingUserCont
                                                }
                                            >
                                                <label>Street Name</label>
                                                <div
                                                    className={
                                                        styles.addressNumber
                                                    }
                                                >
                                                    <input
                                                        type="text"
                                                        placeholder="101"
                                                        className={
                                                            styles.number
                                                        }
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Street Name"
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    styles.existingUserCont
                                                }
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
                                                                              item
                                                                          }
                                                                          key={
                                                                              index
                                                                          }
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
                                                        Please Select a local
                                                        government
                                                    </p>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                styles.existingUserSingle
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.existingUserCont
                                                }
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
                                                                    formData?.flag
                                                                }
                                                                alt=""
                                                            />
                                                        </span>
                                                        <p>
                                                            {
                                                                formData?.baseCurrency
                                                            }
                                                        </p>
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.phoneDetails
                                                        }
                                                    >
                                                        <p>
                                                            {
                                                                formData?.countryCode
                                                            }
                                                        </p>
                                                        <input
                                                            type="number"
                                                            placeholder="812 345 6789"
                                                            value={moreAccountNumberDetails?.accounts?.mobileNos.replace(
                                                                '234',
                                                                ''
                                                            )}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    styles.existingUserCont
                                                }
                                            >
                                                <label>
                                                    Select your Business Type
                                                </label>
                                                <div
                                                    className={
                                                        styles.businessCat
                                                    }
                                                >
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
                                                                {
                                                                    selectedBusinessType
                                                                }
                                                            </p>
                                                        ) : (
                                                            <p>
                                                                Search Business
                                                                Type
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
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                        onClick={() => {
                                                                            handleBusinessTypeClick(
                                                                                business
                                                                            ),
                                                                                setBusinessText(
                                                                                    !businessText
                                                                                );
                                                                        }}
                                                                    >
                                                                        {
                                                                            business
                                                                        }
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    )}
                                                    {!selectedBusinessType ? (
                                                        <p
                                                            className={
                                                                styles.error
                                                            }
                                                        >
                                                            Please Select a
                                                            business type
                                                        </p>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    styles.existingUserCont
                                                }
                                            >
                                                <label>State</label>
                                                <select
                                                    onChange={(event) => {
                                                        setLocalState(
                                                            event.target.value
                                                        );
                                                    }}
                                                >
                                                    <option>
                                                        Select State
                                                    </option>
                                                    {lgasArr.map(
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
                                                {!localState ? (
                                                    <p className={styles.error}>
                                                        Please Select a state
                                                    </p>
                                                ) : null}
                                            </div>
                                            <div
                                                className={
                                                    styles.existingUserCont
                                                }
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
                                                activeBtn
                                                    ? 'active'
                                                    : 'inactive'
                                            }
                                            text="New Account"
                                            type="submit"
                                            loads={businessSetupLoad}
                                            onClick={createBusiness}
                                        />
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className={styles.lastContainer}>
                                <form>
                                    <div className={styles.existingUserHead}>
                                        <div
                                            className={
                                                styles.existingUserSingle
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.existingUserCont
                                                }
                                            >
                                                <label>
                                                    Enter your RC /Business
                                                    Registration Number
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Your RC Number"
                                                    name="rcNumber"
                                                    onChange={(e) =>
                                                        setCallRc(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>

                                            <div
                                                className={
                                                    styles.existingUserCont
                                                }
                                            >
                                                <label>TIN </label>
                                                <div
                                                    className={
                                                        styles.addressNumber
                                                    }
                                                >
                                                    <input
                                                        type="text"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div
                                                className={
                                                    styles.existingUserCont
                                                }
                                            >
                                                <label>
                                                    Select your Business Type
                                                </label>
                                                <div
                                                    className={
                                                        styles.businessCat
                                                    }
                                                >
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
                                                                {
                                                                    selectedBusinessType
                                                                }
                                                            </p>
                                                        ) : (
                                                            <p>
                                                                Search Business
                                                                Type
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
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                        onClick={() => {
                                                                            handleBusinessTypeClick(
                                                                                business
                                                                            ),
                                                                                setBusinessText(
                                                                                    !businessText
                                                                                );
                                                                        }}
                                                                    >
                                                                        {
                                                                            business
                                                                        }
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    )}
                                                    {!selectedBusinessType ? (
                                                        <p
                                                            className={
                                                                styles.error
                                                            }
                                                        >
                                                            Please Select a
                                                            business type
                                                        </p>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                styles.existingUserSingle
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.existingUserCont
                                                }
                                            >
                                                <label>
                                                    Enter your Business Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        searchRCLoad
                                                            ? 'Loading...'
                                                            : searchRCData?.companyName
                                                    }
                                                    disabled
                                                />
                                            </div>
                                            <div
                                                className={
                                                    styles.existingUserCont
                                                }
                                            >
                                                <label>
                                                    Select your Business
                                                    Category
                                                </label>
                                                <div
                                                    className={
                                                        styles.businessCat
                                                    }
                                                >
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
                                                            <p>
                                                                {
                                                                    selectedCategory
                                                                }
                                                            </p>
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
                                                        <p
                                                            className={
                                                                styles.error
                                                            }
                                                        >
                                                            Please Select a
                                                            business category
                                                        </p>
                                                    ) : null}
                                                </div>
                                            </div>{' '}
                                            <div
                                                className={
                                                    styles.existingUserCont
                                                }
                                            >
                                                <label>
                                                    Enter your Business Phone
                                                    Number
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
                                                                    formData?.flag
                                                                }
                                                                alt=""
                                                            />
                                                        </span>
                                                        <p>
                                                            {
                                                                formData?.baseCurrency
                                                            }
                                                        </p>
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.phoneDetails
                                                        }
                                                    >
                                                        <p>
                                                            {' '}
                                                            +
                                                            {
                                                                formData?.countryCode
                                                            }
                                                        </p>
                                                        <input
                                                            type="number"
                                                            placeholder="812 345 6789"
                                                            value={moreAccountNumberDetails?.accounts?.mobileNos.replace(
                                                                '234',
                                                                ''
                                                            )}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.existingUserHead}>
                                        <div
                                            className={
                                                styles.existingUserSingle
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.existingUserCont
                                                }
                                            >
                                                <label>Street Name</label>
                                                <div
                                                    className={
                                                        styles.addressNumber
                                                    }
                                                >
                                                    <input
                                                        type="text"
                                                        placeholder="101"
                                                        className={
                                                            styles.number
                                                        }
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Street Name"
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    styles.existingUserCont
                                                }
                                            >
                                                <label>
                                                    Local Government Area (LGA)
                                                </label>
                                                <select
                                                    onChange={(e) =>
                                                        setLga(e.target.value)
                                                    }
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
                                                                              item
                                                                          }
                                                                          key={
                                                                              index
                                                                          }
                                                                      >
                                                                          {item}
                                                                      </option>
                                                                  );
                                                              }
                                                          )
                                                        : null}
                                                </select>
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                styles.existingUserSingle
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.existingUserCont
                                                }
                                            >
                                                <label>State</label>
                                                <select
                                                    onChange={(event) => {
                                                        setLocalState(
                                                            event.target.value
                                                        );
                                                    }}
                                                >
                                                    <option>
                                                        Select State
                                                    </option>
                                                    {lgasArr.map(
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
                                                {!localState ? (
                                                    <p className={styles.error}>
                                                        Please Select a state
                                                    </p>
                                                ) : null}
                                            </div>
                                            <div
                                                className={
                                                    styles.existingUserCont
                                                }
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
                                        <input
                                            placeholder="Enter  Code"
                                            className={styles.textInput}
                                            value={refferalCode}
                                            onChange={(e) =>
                                                setRefferalCode(e.target.value)
                                            }
                                        />
                                        {getAccountStatusLoad ||
                                        createCAcctLoad ? (
                                            <p>
                                                Account number is being created
                                            </p>
                                        ) : null}
                                        <ButtonComp
                                            disabled={activeBtn}
                                            active={
                                                activeBtn
                                                    ? 'active'
                                                    : 'inactive'
                                            }
                                            text="Save and Continue"
                                            onClick={createAnewBusinessAccount}
                                            loads={
                                                getAccountStatusLoad ||
                                                createCAcctLoad ||
                                                businessSetupLoad
                                            }
                                            type="submit"
                                        />
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
};

export default StepFour;
