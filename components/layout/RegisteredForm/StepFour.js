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
    businessCategoriesData
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

const StepFour = ({ title, action }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const account = localStorage.getItem('meta');
    const accountDetails = JSON.parse(account);

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
    const { businessCategories, errorDatas } = useSelector(
        (state) => state.businessCategoriesReducer
    );

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmitNew = (data) => {
        setLoading(true);
        console.log(data);

        dispatch(existingUserProfileData(accountDetails));
    };
    const profileTest = () => {
        if (errorMessage === 'Account already exists') {
            router.push('/Succes/AccountSuccess');
        } else if (errorMessage) {
            setError(errorMessage);
            console.log(errorMessage);
            setLoading(false);
        } else if (
            existingUserProfile.message === 'User account created succesfully'
        ) {
            setLoading(false);
            router.push('/Succes/Success');
        }
    };
    useEffect(() => {
        profileTest();
    }, [errorMessage, existingUserProfile]);
    const onSubmit = (data) => {
        setLoading(true);
        let name;
        accountDetails.fullName === null
            ? name === null
            : (name = accountDetails.fullName.split(' '));
        const userData = {
            affiliateCode: 'ENG',
            firstName: name === undefined ? 'Akinfe' : name[0],
            middleName:
                name === undefined
                    ? 'I'
                    : name[2] === undefined
                    ? 'I'
                    : name[2],
            lastName: name === undefined ? 'Temitope' : name[1],
            password: accountDetails.password,
            dob: '1998-08-10',
            id_type: 'IDCD',
            idNo: '1234TTZN14',
            idIssuingDate: '2022-06-27',
            idExpiryDate: '2029-06-05',
            phoneNumber:
                accountDetails.phoneNumber === undefined
                    ? accountDetails.phone
                    : accountDetails.phoneNumber,
            email:
                accountDetails.email === null
                    ? 'topeakinfe@gmail.com'
                    : accountDetails.email,
            gender: 'MALE',
            address1: 'AKure',
            address2: 'IKORODU',
            countryCode: 'NG',
            custType: 'I',
            custCategory: 'INDIVIDUAL',
            brnCode: 'A01',
            ccy: 'NGN',
            flexCustId: '',
            accountClass: 'GHSABP'
        };
        dispatch(createAccountData(userData));
    };

    const newAccountTest = () => {
        console.log(createAccount);
        if (errorData === 'User already Exists') {
            router.push('/Succes/AccountSuccess');
        } else if (errorData) {
            setError(errorData);
            console.log(errorData);
            setLoading(false);
        } else if (createAccount.statusCode === 200) {
            console.log(createAccount);
            dispatch(accountStatusData(createAccount.data.userId));
            localStorage.setItem(
                'userId',
                JSON.stringify(createAccount.data.userId)
            );
            localStorage.setItem(
                'token',
                JSON.stringify(createAccount.data.token)
            );
        }
    };
    useEffect(() => {
        newAccountTest();
    }, [errorData, createAccount]);

    const newAccountTest1 = () => {
        console.log(accountStatus);
        if (errorMessages) {
            setError(errorMessages);
            console.log(errorMessages);
            setLoading(false);
        } else if (accountStatus.message === 'Try Again') {
            router.push('/Verify/ExistingAccount');
        } else if (accountStatus.message === 'SUCCESS') {
            window.localStorage.setItem(
                'accountNumber',
                JSON.stringify(accountStatus.data)
            );
            router.push('/Verify/ExistingSuccess');
        }
    };
    useEffect(() => {
        newAccountTest1();
    }, [errorMessages, accountStatus]);

    const types = (type) => {
        setOutType(type);
    };
    const [activeBtn, setActiveBtn] = useState(true);
    const [location, setLocation] = useState([]);
    const [localState, setLocalState] = useState('');
    const [localGovernment, setLocalGovernment] = useState('');
    const [businessCategory, setBusinessCategory] = useState([]);
    const [businessType, setBusinessType] = useState([]);
    const [business, setBusiness] = useState('');
    const [businesses, setBusinesses] = useState('');
    const [businessTest, setBusinessTest] = useState(false);
    const [businessText, setBusinessText] = useState(false);
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
    useEffect(() => {
        dispatch(businessCategoriesData());
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
    }, [business]);
    return (
        <div className={styles.body}>
            <section className={styles.sectionI}>
                <ProfileSetupSide text="Checkout Priceless opportunities Be ahead" />
            </section>
            <section className={styles.sectionII}>
                <div className={styles.lastStep}>
                    <div className={styles.cardHeading}>
                        <ArrowBackSvg action={action} />
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
                                    <div className={styles.existingUserSingle}>
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
                                                    <SearchSvg />
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
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className={styles.existingUserCont}
                                        >
                                            <label>
                                                Local Government Area (LGA)
                                            </label>
                                            <select>
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
                                                    <SearchSvg />
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
                                    />{' '}
                                    {loading ? (
                                        <Loader />
                                    ) : (
                                        <ButtonComp
                                            disabled={activeBtn}
                                            active={
                                                activeBtn
                                                    ? 'active'
                                                    : 'inactive'
                                            }
                                            text="Save and Continue"
                                            type="submit"
                                            // onClick={handleShowSuccessStep}
                                            // onClick={handleShowFourthStep}
                                        />
                                    )}
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
                                            <label>
                                                Enter your RC Number/Business
                                                Registration Number
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Your RC Number"
                                            />
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
                                                    <SearchSvg />
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
                                                    <SearchSvg />
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
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className={styles.existingUserCont}
                                        >
                                            <label>
                                                Local Government Area (LGA)
                                            </label>
                                            <select>
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
                                    />{' '}
                                    {loading ? (
                                        <Loader />
                                    ) : (
                                        <ButtonComp
                                            disabled={activeBtn}
                                            active={
                                                activeBtn
                                                    ? 'active'
                                                    : 'inactive'
                                            }
                                            text="Save and Continue"
                                            type="submit"
                                            // onClick={handleShowSuccessStep}
                                            // onClick={handleShowFourthStep}
                                        />
                                    )}
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

//   <div className={styles.bord}>
//       <div className={styles.inps}>
//           {errors.businessName?.message}
//           <label>Enter Business Name</label>

//           <br />

//           <input
//               placeholder="Enter Business Name"
//               className={styles.textInput}
//               required
//               {...register('businessName', {
//                   required: 'Business Name is Required',
//                   pattern: {
//                       // eslint-disable-next-line
//                       value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//                       message: 'Invalid email address'
//                   }
//               })}
//           />
//       </div>
//       <div className={styles.inps}>
//                                     <label>
//                                         Enter TIN <i>(optional)</i>{' '}
//                                     </label>
//                                     <br />

//                                     <input
//                                         placeholder="Enter Tin"
//                                         className={styles.textInput}
//                                         required
//                                         {...register('tin', {
//                                             required: 'Tin is Required'
//                                             // pattern: {
//                                             //     // eslint-disable-next-line
//                                             //     value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//                                             //     message: 'Invalid email address'
//                                             // }
//                                         })}
//                                     />
//                                 </div>

//       <div className={styles.inps}>
//           <label>Select Your Business Type </label>
//           {errors.email?.message}
//           <br />

//           <select>
//               <option value="">Search Your Business Type</option>

//               <option value="Retail business">Retail business</option>
//               <option value="Perishable business">Perishable business</option>
//           </select>
//       </div>
//       <p className={styles.ent}>Enter Business Address</p>
//       <div className={styles.busAdd}>
//           <div className={styles.inps}>
//               <label>Address </label>
//               {errors.streetName?.message}
//               <br />

//               <input
//                   placeholder="407  Bornoway"
//                   className={styles.textInput}
//                   required
//                   {...register('streetName', {
//                       required: 'Address is Required',
//                       pattern: {
//                           // eslint-disable-next-line
//                           value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//                           message: 'Invalid email address'
//                       }
//                   })}
//               />
//           </div>
//           <div className={styles.inps}>
//               <label>State </label>
//               {errors.email?.message}
//               <br />

//               <select
//                   className={styles.busInp}
//                   onChange={(event) => {
//                       setLocalState(event.target.value);
//                   }}
//               >
//                   <option>Enter State</option>
//                   {location?.map((item, index) => {
//                       return (
//                           <option value={item.state} key={index}>
//                               {item.state}
//                           </option>
//                       );
//                   })}
//               </select>
//           </div>
//           <div className={styles.inps}>
//               <label>Select Your Local Government </label>
//               {errors.email?.message}
//               <br />

//               <select className={styles.busInp}>
//                   <option value="">Select Local Government</option>
//                   {localGovernment
//                       ? localGovernment?.map((item, index) => {
//                             return (
//                                 <option value={item.lgaName} key={index}>
//                                     {item.lgaName}
//                                 </option>
//                             );
//                         })
//                       : null}
//               </select>
//           </div>
//           <div className={styles.inps}>
//               <label>City </label>
//               {errors.city?.message}
//               <br />

//               <input
//                   placeholder="Enter City"
//                   className={styles.textInput}
//                   {...register('city', {
//                       required: 'City is Required',
//                       pattern: {
//                           // eslint-disable-next-line
//                           value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//                           message: 'Invalid email address'
//                       }
//                   })}
//               />
//           </div>
//       </div>
//   </div>;
{
    /* <div className={styles.bord}>
                                    <div className={styles.inps}>
                                        <label>
                                            Enter RC Number/Business
                                            Registration Number
                                        </label>

                                        <br />

                                        <input
                                            placeholder="Enter RC Number"
                                            className={styles.textInput}
                                            {...register('rcNumber', {
                                                required:
                                                    'RC Number is Required'
                                                maxLength: {
                                                    value: 15,
                                                    message:
                                                        'RC Number  cannot be more than 15 digits'
                                                },
                                                minLength: {
                                                    value: 15,
                                                    message:
                                                        'RC Number  cannot be more than 15 digits'
                                                }
                                                pattern: {
                                                    // eslint-disable-next-line
                                                    value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: 'Invalid email address'
                                                }
                                            })}
                                            type="text"
                                        />
                                        <p className={styles.error}>
                                            {errors.rcNumber?.message}
                                        </p>
                                    </div>
                                    <div className={styles.inps}>
                                        <label>
                                            Enter TIN <i>(optional)</i>{' '}
                                        </label>
                                        <br />

                                        <input
                                            placeholder="Enter Tin"
                                            className={styles.textInput}
                                        />
                                    </div>

                                    <div className={styles.inps}>
                                <label>Select Your Business Category </label>

                                <br />

                                <select
                                    onChange={(e) => {
                                        setBusiness(e.target.value);
                                    }}
                                >
                                    <option>
                                        Search Your Business Category
                                    </option>
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
                            <div className={styles.inps}>
                                <label>Select Your Business Type </label>

                                <br />

                                <select>
                                    <option>Select Your Business Type</option>
                                    {businessType?.map((business, index) => {
                                        return (
                                            <option
                                                value={business}
                                                key={index}
                                            >
                                                {business}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                                    <BusinessCategory />
                                    <p className={styles.ent}>
                                        Enter Business Address
                                    </p>
                                    <div className={styles.busAdd}>
                                        <div className={styles.inps}>
                                            <label>Address </label>

                                            <br />

                                            <input
                                                type="text"
                                                placeholder="407  Bornoway"
                                                className={styles.textInput}
                                            />
                                        </div>
                                        <div className={styles.inps}>
                                            <label>State </label>

                                            <br />

                                            <select
                                                className={styles.busInp}
                                                onChange={(event) => {
                                                    setLocalState(
                                                        event.target.value
                                                    );
                                                }}
                                            >
                                                <option>Enter State</option>
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
                                        <div className={styles.inps}>
                                            <label>
                                                Select Your Local Government{' '}
                                            </label>
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
                                        <div className={styles.inps}>
                                            <label>City </label>

                                            <br />

                                            <input
                                                type="text"
                                                placeholder="Enter City"
                                                className={styles.textInput}
                                            />
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
                                        {...register('email', {
                                            required: 'Business Address is Required',
                                            pattern: {
                                                // eslint-disable-next-line
                                                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: 'Invalid email address'
                                            }
                                        })}
                                    />
                                </div>
                                <div>
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
                                </div> */
}
