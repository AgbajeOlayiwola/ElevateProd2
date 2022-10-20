import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import DashLayout from '../../components/layout/Dashboard';
import ProfileLayout from '../../components/layout/ProfileLayout';
import ArrowBackSvg from '../../components/ReusableComponents/ArrowBackSvg';
import BeneSvg from '../../components/ReusableComponents/BeneSvg';
import BvnSvg from '../../components/ReusableComponents/BvnSvg';
import CheckedSvg from '../../components/ReusableComponents/CheckedSvg';
import Visbility from '../../components/ReusableComponents/Eyeysvg';
import InputTag from '../../components/ReusableComponents/Input';
import ManageBeneSingle from '../../components/ReusableComponents/ManageBene';
import ManageLimit from '../../components/ReusableComponents/ManageLimit1';
import ManageLimit2 from '../../components/ReusableComponents/ManageLimit2';
import ManageLimitSvg from '../../components/ReusableComponents/ManageLimitSvg';
import ManageSignSvg from '../../components/ReusableComponents/ManageSignSvg';
import ProfileSingle from '../../components/ReusableComponents/ProfileSingle';
import AddSvg from '../../components/ReusableComponents/ReusableSvgComponents/AddSvg';
import ContactSvg from '../../components/ReusableComponents/ReusableSvgComponents/ContactSvg';
import EditProfileSvg from '../../components/ReusableComponents/ReusableSvgComponents/EditProfileSvg';
import LogoutSvg from '../../components/ReusableComponents/ReusableSvgComponents/LogoutSvg';
import RmSvg from '../../components/ReusableComponents/RmSvg';
import ShareSvg from '../../components/ReusableComponents/ShareSvg';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    getBeneficiariesData,
    deleteBeneficiariesData,
    loadViewBvn,
    loadfreezeTransactions,
    loadunfreezeTransactions,
    loadUserProfile,
    loadAccountPrimary,
    postInterBankEnquiry,
    loadbank,
    postBeneficiariesData
} from '../../redux/actions/actions';
import { useForm } from 'react-hook-form';
import Loader from '../../components/ReusableComponents/Loader';
import PaymentSuccess from '../../components/ReusableComponents/PopupStyle';

const Profile = () => {
    const [type, setType] = useState('Account');
    const [loading, setLoading] = useState(false);
    const [outcome, setOutcome] = useState(false);
    const [freeze, setFreeze] = useState();
    const [text, setText] = useState('View Profile');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [statusbar, setStatusbar] = useState('');
    const [alertType, setAlertType] = useState('');
    const [bvn, setBvn] = useState('');
    const [acctNumber, setAcctNumber] = useState('');
    const [count, setCount] = useState(0);
    const [outType, setOutType] = useState();
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [bene, setBene] = useState('');
    const [userProfileData, setUserProfileData] = useState([]);
    const [outTyped, setOutTyped] = useState();
    const [bank, setBank] = useState([]);
    const [interEnquiry, setInterEnquiry] = useState('');
    const dispatch = useDispatch();
    const { getBeneficiaries } = useSelector(
        (state) => state.getBeneficiariesReducer
    );
    const { deleteBeneficiaries } = useSelector(
        (state) => state.deleteBeneficiariesReducer
    );
    const { viewBvn, errorMessageviewBvn } = useSelector(
        (state) => state.viewBvnReducer
    );
    const { freezeTransactions, errormessageFreeze } = useSelector(
        (state) => state.freezeTransactionsReducer
    );
    const { unfreezeTransactions, errormessage } = useSelector(
        (state) => state.unfreezeTransactionsReducer
    );
    const { userProfile } = useSelector((state) => state.userProfileReducer);
    const { accountPrimary, accountPrimaryError } = useSelector(
        (state) => state.accountPrimaryReducer
    );
    const { banks } = useSelector((state) => state.banksReducer);
    const { interBankEnquiry, errorMessageInterBankEnquiry } = useSelector(
        (state) => state.interBankEnquiryReducer
    );
    const { postBeneficiaries, errorMessagepostBeneficiaries } = useSelector(
        (state) => state.postBeneficiariesReducer
    );

    const interBankEnquiryCheck = () => {
        if (interBankEnquiry !== null) {
            setInterEnquiry(interBankEnquiry);
        }
    };
    useEffect(() => {
        interBankEnquiryCheck();
    }, [interBankEnquiry]);
    const newBene = () => {
        if (postBeneficiaries !== null) {
            setOutcome(true);
            setMessage('Beneficary added successfully');
            setStatusbar('success');
            setLoading(false);
        } else if (errorMessagepostBeneficiaries !== null) {
            setOutcome(true);
            setMessage(errorMessagepostBeneficiaries);
            setStatusbar('error');
            setLoading(false);
        }
    };

    useEffect(() => {
        newBene();
    }, [postBeneficiaries, errorMessagepostBeneficiaries]);
    useEffect(() => {
        if (banks !== null) {
            setBank(banks);
        }
    }, [banks]);
    useEffect(() => {
        dispatch(getBeneficiariesData());
        dispatch(loadUserProfile());
        dispatch(loadAccountPrimary());
        dispatch(loadbank('ENG'));
    }, []);

    useEffect(() => {
        setInterEnquiry('');
    }, []);
    useEffect(() => {
        if (accountPrimary !== null) {
            setAcctNumber(accountPrimary);
        } else {
            setAcctNumber('Pending');
        }
    }, [accountPrimary]);
    useEffect(() => {
        if (getBeneficiaries !== null) {
            setBeneficiaries(getBeneficiaries);
        }
    }, [getBeneficiaries, deleteBeneficiaries]);
    useEffect(() => {
        if (userProfile !== null) {
            setUserProfileData(userProfile);
            setFreeze(userProfile.freezeTransactions);
        }
    }, [userProfile]);
    useEffect(() => {
        if (deleteBeneficiaries !== null) {
            dispatch(getBeneficiariesData());
        }
    }, [deleteBeneficiaries]);

    useEffect(() => {
        if (freezeTransactions !== null) {
            setFreeze(true);
        } else if (errormessageFreeze !== null) {
            setFreeze(false);
        }
    }, [freezeTransactions]);
    useEffect(() => {
        if (unfreezeTransactions !== null) {
            setFreeze(false);
        } else if (errormessage !== null) {
            setFreeze(true);
        }
    }, [unfreezeTransactions]);
    const bvnAction = (data) => {
        setLoading(true);
        setError('');
        setBvn('');
        const bvnData = {
            dateOfBirth: data.date,
            password: data.bvnPassword
        };
        dispatch(loadViewBvn(bvnData));
    };

    const viewBvnAction = () => {
        if (viewBvn !== null) {
            setLoading(false);
            setBvn(viewBvn.data.bvn);
        } else if (errorMessageviewBvn !== null) {
            setLoading(false);
            setError(errorMessageviewBvn);
        }
    };

    useEffect(() => {
        viewBvnAction();
    }, [viewBvn, errorMessageviewBvn]);
    const profileData = [
        {
            text: 'View Profile',
            icon: <EditProfileSvg />,
            color: '#7A7978'
        },
        {
            text: 'Manage Beneficiaries',
            icon: <BeneSvg />,
            color: '#7A7978'
        },
        {
            text: 'Manage Limit',
            icon: <ManageLimitSvg />,
            color: '#7A7978'
        },
        {
            text: 'Bank Verification Number (BVN)',
            icon: <BvnSvg />,
            color: '#7A7978'
        },
        {
            text: 'RM Name and Contact Details ',
            icon: <RmSvg />,
            color: '#7A7978'
        },
        // {
        //     text: 'Manage Signatories',
        //     icon: <ManageSignSvg />,
        //     color: '#7A7978'
        // },

        {
            text: 'Contact us',
            icon: <ContactSvg />,
            color: '#7A7978'
        },
        {
            text: 'Share App/Refer a Friend',
            icon: <ShareSvg color="#102572" />,
            color: '#7A7978'
        },
        {
            text: 'Log Out',
            icon: <LogoutSvg />,
            color: '#FF0000'
        }
    ];
    const benes = {
        account: [],
        airtime: [],
        signatories: []
    };
    const [countryName, setCountryName] = useState();
    const [countryNames, setCountryNames] = useState();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCountryName(window.localStorage.getItem('country'));
        }
    }, []);
    useEffect(() => {
        if (countryName !== undefined) {
            setCountryNames(JSON.parse(countryName));
        }
    }, [countryName]);
    // console.log(countryNames.flags.svg);
    const types = (type) => {
        setOutType(type);
    };
    const typed = (type) => {
        setOutTyped(type);
    };
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const renderForm = () => {
        switch (text) {
            case 'View Profile':
                return (
                    <>
                        <h2 className={styles.title}>View Profile</h2>
                        <div className={styles.profileBodyHead}>
                            <div className={styles.profileBodyHeadImg}>
                                {!userProfileData ? null : (
                                    <Image
                                        src={`data:image/png;base64,${userProfileData.profileImg}`}
                                        width="100%"
                                        height="100%"
                                    />
                                )}
                            </div>
                            <div className={styles.groupForm}>
                                <div className={styles.formGroup}>
                                    <label>Full Name</label>
                                    <InputTag
                                        type="text"
                                        placeholder="Babatune Abiodun"
                                        value={
                                            !userProfileData
                                                ? null
                                                : `${userProfileData.lastName} ${userProfileData.firstName}`
                                        }
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Email Address</label>
                                    <InputTag
                                        type="email"
                                        placeholder="babatuneabiodun@gmail.com"
                                        value={
                                            !userProfileData
                                                ? null
                                                : userProfileData.email
                                        }
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Phone Number</label>
                                    <div className={styles.phone}>
                                        <div className={styles.phoneHeader}>
                                            <span>
                                                <img
                                                    src={
                                                        countryNames
                                                            ? countryNames.flags
                                                                  .svg
                                                            : null
                                                    }
                                                    alt=""
                                                />
                                            </span>
                                            <p>
                                                {countryNames
                                                    ? countryNames.baseCurrency
                                                    : null}
                                            </p>
                                        </div>
                                        <div className={styles.phoneDetails}>
                                            <p>
                                                {countryNames
                                                    ? countryNames.countryCode
                                                    : null}
                                            </p>
                                            <input
                                                type="number"
                                                placeholder="812 345 6789"
                                                value={
                                                    !userProfileData
                                                        ? null
                                                        : userProfileData.phoneNumber
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                );
            case 'Manage Limit':
                return (
                    <form
                        onSubmit={handleSubmit(() => {
                            setOutcome(true);
                            setMessage('Limit saved Successfully');
                            setStatusbar('success');
                        })}
                    >
                        <h2 className={styles.title}>Manage Limit</h2>
                        <div className={styles.formGroup}>
                            <label>Limit Type </label>
                            <select
                                {...register('limitType', {
                                    required: 'Limit Type is Required'
                                })}
                            >
                                <option value="Mpos Limit">Mpos Limit</option>
                                <option value="Transaction Limit">
                                    Transaction Limit
                                </option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Add Limit </label>
                            <input
                                type="text"
                                placeholder="Add Limit"
                                {...register('limit', {
                                    required: 'Limit is Required'
                                })}
                            />
                        </div>
                        <p className={styles.error}>{errors?.limit?.message}</p>
                        <div className={styles.formGroup}>
                            <label>Enter your Password</label>
                            <div className={styles.divs}>
                                <input
                                    placeholder="Enter your Password"
                                    {...register('limitpassword', {
                                        required: 'Password is Required'
                                    })}
                                    name="limitpassword"
                                    type={outType ? 'text' : 'password'}
                                />
                                <Visbility typeSet={types} />
                            </div>
                            <p className={styles.error}>
                                {errors?.limitpassword?.message}
                            </p>
                        </div>
                        <div className={styles.profileBody}>
                            <button type="submit">Add Limit</button>
                        </div>
                    </form>
                );

            case 'Bank Verification Number (BVN)':
                switch (count) {
                    case 0:
                        return (
                            <form onSubmit={handleSubmit(bvnAction)}>
                                <h2 className={styles.title}>View my BVN</h2>
                                <div className={styles.bvn}>
                                    <p>
                                        Kindly enter your details below to view
                                        the BVN tied to your Ellevate account.
                                    </p>
                                </div>
                                {error ? (
                                    <p className={styles.error}>{error}</p>
                                ) : null}
                                <div className={styles.formGroup}>
                                    <label>Date of Birth</label>
                                    <input
                                        type="date"
                                        placeholder="DD  |  MM  |  YYYY"
                                        {...register('date', {
                                            required: 'DOB is Required'
                                        })}
                                    />
                                    <p className={styles.error}>
                                        {errors?.date?.message}
                                    </p>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Enter your Password</label>
                                    <div className={styles.divs}>
                                        <input
                                            placeholder="Enter your Password"
                                            {...register('bvnPassword', {
                                                required: 'Password is Required'
                                            })}
                                            name="bvnPassword"
                                            type={outType ? 'text' : 'password'}
                                        />
                                        <Visbility typeSet={types} />
                                    </div>
                                    <p className={styles.error}>
                                        {errors?.bvnPassword?.message}
                                    </p>
                                </div>
                                {bvn ? (
                                    <div className={styles.formGroup}>
                                        <label>Your BVN</label>
                                        <div className={styles.divs}>
                                            <input
                                                value={bvn}
                                                type={
                                                    outTyped
                                                        ? 'password'
                                                        : 'text'
                                                }
                                            />
                                            <Visbility typeSet={typed} />
                                        </div>
                                    </div>
                                ) : null}
                                <div className={styles.bvnButton}>
                                    {loading ? (
                                        <Loader />
                                    ) : (
                                        <button type="submit">
                                            View my BVN
                                        </button>
                                    )}
                                </div>
                            </form>
                        );
                }

            // case 'Manage Signatories':
            //     switch (count) {
            //         case 0:
            //             return (
            //                 <>
            //                     <h2 className={styles.title}>
            //                         Manage Signatories
            //                     </h2>
            //                     <div className={styles.sign}>
            //                         <p>
            //                             Please see below signatories to your
            //                             Ellevate account.
            //                         </p>
            //                     </div>
            //                     <div className={styles.signBody}>
            //                         {!bene.signatories.length ? (
            //                             <h2 className={styles.dontHave}>
            //                                 You do not have signatories yet
            //                             </h2>
            //                         ) : (
            //                             <>
            //                                 {bene.signatories?.map(
            //                                     (sign, index) => {
            //                                         return (
            //                                             <ManageLimit
            //                                                 fname={sign.name}
            //                                                 mail={sign.mail}
            //                                                 key={index}
            //                                             />
            //                                         );
            //                                     }
            //                                 )}
            //                             </>
            //                         )}

            //                         <div className={styles.signButton}>
            //                             <button
            //                                 onClick={() => {
            //                                     setCount(count + 1);
            //                                 }}
            //                             >
            //                                 Add New
            //                             </button>
            //                         </div>
            //                     </div>
            //                 </>
            //             );
            //         case 1:
            //             return (
            //                 <>
            //                     <h2 className={styles.title}>
            //                         <span>
            //                             <ArrowBackSvg
            //                                 action={() => {
            //                                     setCount(count - 1);
            //                                 }}
            //                                 color="#102572"
            //                             />
            //                         </span>
            //                         Manage Signatory
            //                     </h2>
            //                     <div className={styles.beneForm}>
            //                         <div className={styles.signForm}>
            //                             <div className={styles.midBeneForm}>
            //                                 <div className={styles.formGroup}>
            //                                     <label>Enter Email</label>
            //                                     <InputTag
            //                                         type="email"
            //                                         placeholder="Enter email here"
            //                                     />
            //                                 </div>
            //                             </div>
            //                             <div className={styles.midBeneForm}>
            //                                 <div className={styles.formGroup}>
            //                                     <label>
            //                                         Enter your Business Phone
            //                                         Number
            //                                     </label>
            //                                     <div className={styles.phone}>
            //                                         <div
            //                                             className={
            //                                                 styles.phoneHeader
            //                                             }
            //                                         >
            //                                             <span>
            //                                                 {/* <img
            //                                                 src={
            //                                                     countryNames
            //                                                         .flags.svg
            //                                                 }
            //                                                 alt=""
            //                                             /> */}
            //                                             </span>
            //                                             <p>
            //                                                 {/* {
            //                                                 countryNames.baseCurrency
            //                                             } */}
            //                                             </p>
            //                                         </div>
            //                                         <div
            //                                             className={
            //                                                 styles.phoneDetails
            //                                             }
            //                                         >
            //                                             {/* <p>{countryNames.countryCode}</p> */}
            //                                             <input
            //                                                 type="number"
            //                                                 placeholder="812 345 6789"
            //                                             />
            //                                         </div>
            //                                     </div>
            //                                 </div>
            //                             </div>
            //                         </div>
            //                         <div className={styles.signForm}>
            //                             <div className={styles.midBeneForm}>
            //                                 <div className={styles.formGroup}>
            //                                     <label>Enter BVN</label>
            //                                     <input
            //                                         type="email"
            //                                         placeholder="Enter your BVN"
            //                                     />
            //                                 </div>
            //                             </div>
            //                         </div>
            //                     </div>
            //                     <div className={styles.signRights}>
            //                         <p>
            //                             Select sigining rights to be assigned to
            //                             this user
            //                         </p>
            //                         <div className={styles.signRightSingle}>
            //                             <div>
            //                                 <label>
            //                                     <input
            //                                         type="checkbox"
            //                                         name="toSign"
            //                                         value="To Sign"
            //                                     />
            //                                     <span>
            //                                         <CheckedSvg />
            //                                     </span>
            //                                 </label>

            //                                 <p>To Sign</p>
            //                             </div>
            //                         </div>
            //                         <div className={styles.signRightSingle}>
            //                             <div>
            //                                 <label>
            //                                     <input
            //                                         type="checkbox"
            //                                         name="viewBalances"
            //                                         value="View Balances"
            //                                     />
            //                                     <span>
            //                                         <CheckedSvg />
            //                                     </span>
            //                                 </label>

            //                                 <p>View Balances</p>
            //                             </div>
            //                         </div>
            //                         <div className={styles.signRightSingle}>
            //                             <div>
            //                                 <label>
            //                                     <input
            //                                         type="checkbox"
            //                                         name="viewBalances"
            //                                         value="Transacting (able to move money)"
            //                                     />
            //                                     <span>
            //                                         <CheckedSvg />
            //                                     </span>
            //                                 </label>

            //                                 <p>
            //                                     Transacting (able to move money)
            //                                 </p>
            //                             </div>
            //                         </div>
            //                         <div className={styles.signRightSingle}>
            //                             <div>
            //                                 <label>
            //                                     <input
            //                                         type="checkbox"
            //                                         name="viewBalances"
            //                                         value="Manage Account"
            //                                     />
            //                                     <span>
            //                                         <CheckedSvg />
            //                                     </span>
            //                                 </label>

            //                                 <p>Manage Account</p>
            //                             </div>
            //                         </div>
            //                         <div className={styles.profileBodyButton}>
            //                             <button>Create Signatory</button>
            //                         </div>
            //                     </div>
            //                 </>
            //             );
            //         case 2:
            //             return (
            //                 <PaymentSuccess
            //                     overlay={overlay}
            //                     type="profile"
            //                     action={() => {
            //                         setOverlay(false);
            //                         setCount(0);
            //                         setText('');
            //                     }}
            //                     heading="New Signatory Successful"
            //                     body="Ayomide James has been added to your Signatory"
            //                 />
            //             );
            //     }
            case 'Manage Beneficiaries':
                switch (count) {
                    case 0:
                        return (
                            <>
                                <div className={styles.beneficiaryHead}>
                                    <h2>Manage Beneficiaries</h2>
                                    <div
                                        className={styles.add}
                                        onClick={() => {
                                            setCount(count + 1);
                                        }}
                                    >
                                        <AddSvg />
                                        <p>Add</p>
                                    </div>
                                </div>
                                <div className={styles.beneficiaryHeader}>
                                    <div
                                        className={
                                            type === 'Account'
                                                ? styles.active
                                                : styles.beneficiaryHeaderDiv
                                        }
                                        onClick={() => {
                                            setType('Account');
                                        }}
                                    >
                                        <p>Account</p>
                                    </div>
                                    <div
                                        className={
                                            type === 'Airtime'
                                                ? styles.active
                                                : styles.beneficiaryHeaderDiv
                                        }
                                        onClick={() => {
                                            setType('Airtime');
                                        }}
                                    >
                                        <p>Airtime/Data</p>
                                    </div>
                                </div>
                                <div className={styles.search}>
                                    <img
                                        src="../Assets/Svgs/search.svg"
                                        alt=""
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search Beneficiaries"
                                    />
                                </div>
                                <div className={styles.beneficiaryBody}>
                                    {type === 'Account' ? (
                                        <>
                                            {/* <p className={styles.text}>A</p> */}
                                            {!beneficiaries.beneficiaries
                                                ?.length ? (
                                                <h2 className={styles.dontHave}>
                                                    You do not have any
                                                    Beneficiary at the moment
                                                </h2>
                                            ) : (
                                                <>
                                                    {beneficiaries.beneficiaries?.map(
                                                        (account, index) => {
                                                            return (
                                                                <ManageBeneSingle
                                                                    beneAccount={
                                                                        account.bankName
                                                                    }
                                                                    beneName={
                                                                        account.beneficiaryName
                                                                    }
                                                                    key={index}
                                                                    deleteAction={() => {
                                                                        setOutcome(
                                                                            true
                                                                        );
                                                                        setMessage(
                                                                            'Are you sure you want to Delete'
                                                                        );
                                                                        setStatusbar(
                                                                            'error'
                                                                        );
                                                                        setAlertType(
                                                                            'bene'
                                                                        );
                                                                        setBene(
                                                                            account.beneficiaryId
                                                                        );
                                                                    }}
                                                                />
                                                            );
                                                        }
                                                    )}
                                                </>
                                            )}
                                        </>
                                    ) : type === 'Airtime' ? (
                                        <>
                                            {/* <p className={styles.text}>A</p> */}
                                            {!benes.airtime.length ? (
                                                <h2 className={styles.dontHave}>
                                                    You do not have any
                                                    Beneficiary at the moment
                                                </h2>
                                            ) : (
                                                <>
                                                    {bene.airtime?.map(
                                                        (account, index) => {
                                                            return (
                                                                <ManageBeneSingle
                                                                    beneAccount={
                                                                        account.account
                                                                    }
                                                                    beneName={
                                                                        account.name
                                                                    }
                                                                    key={index}
                                                                />
                                                            );
                                                        }
                                                    )}
                                                </>
                                            )}
                                        </>
                                    ) : null}
                                </div>
                            </>
                        );
                    case 1:
                        return (
                            <>
                                <div className={styles.beneficiaryHead}>
                                    <h2>
                                        <span>
                                            <ArrowBackSvg
                                                action={() => {
                                                    setCount(count - 1);
                                                }}
                                                color="#102572"
                                            />
                                        </span>
                                        Manage Beneficiaries
                                    </h2>
                                    <div
                                        className={styles.add}
                                        // onClick={() => {
                                        //     setCount(count + 1);
                                        // }}
                                    >
                                        <AddSvg />
                                        <p>Add</p>
                                    </div>
                                </div>
                                <form
                                    onSubmit={handleSubmit((data) => {
                                        setLoading(true);
                                        const beneData = {
                                            beneficiaryName: data.accountName,
                                            accountNumber: data.accountNumber,
                                            bankName: data.bankName,
                                            bankCode: data.bankName
                                        };
                                        dispatch(
                                            postBeneficiariesData(beneData)
                                        );
                                    })}
                                >
                                    <div className={styles.beneForm}>
                                        <div className={styles.formGroup}>
                                            <label>
                                                Choose Beneficiary Type
                                            </label>
                                            <select name="" id="">
                                                <option value="">
                                                    Select Type
                                                </option>
                                                <option value="Account">
                                                    Account
                                                </option>
                                                <option value="Airtime and Data">
                                                    Airtime and Data
                                                </option>
                                            </select>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Account Number</label>
                                            <input
                                                {...register('accountNumber', {
                                                    required:
                                                        'Please enter  Acount Number',
                                                    pattern: {
                                                        value: /^[0-9 ]/i,
                                                        message:
                                                            'Account Number must be a number'
                                                    },
                                                    minLength: {
                                                        value: 10,
                                                        message:
                                                            'Min length is 10'
                                                    },
                                                    maxLength: {
                                                        value: 10,
                                                        message:
                                                            'Max length is 10'
                                                    }
                                                })}
                                                onInput={(e) => {
                                                    if (
                                                        e.target.value
                                                            .length === 10
                                                    ) {
                                                        const details = {
                                                            accountNumber:
                                                                e.target.value
                                                        };
                                                        dispatch(
                                                            postInterBankEnquiry(
                                                                details
                                                            )
                                                        );
                                                        console.log();
                                                    }
                                                }}
                                                type="number"
                                                placeholder="Enter account number here"
                                            />
                                        </div>
                                        <p className={styles.error}>
                                            {errors?.accountNumber?.message}
                                        </p>
                                        {interEnquiry ? (
                                            <div className={styles.formGroup}>
                                                <label> Account Name</label>
                                                <input
                                                    {...register('accountName')}
                                                    type="text"
                                                    value={
                                                        interEnquiry.accountName
                                                    }
                                                />
                                                <p className={styles.error}>
                                                    {
                                                        errors?.accountNumber
                                                            ?.message
                                                    }
                                                </p>
                                            </div>
                                        ) : null}
                                        <div className={styles.formGroup}>
                                            <label>Choose Bank</label>
                                            <select
                                                {...register('bankName', {
                                                    required: 'Choose a bank'
                                                })}
                                                name="bankName"
                                            >
                                                <option value="">
                                                    Select Bank
                                                </option>
                                                <option value="Ecobank">
                                                    ECOBANK
                                                </option>
                                                {bank?.map((bank, index) => {
                                                    return (
                                                        <option
                                                            value={
                                                                bank.institutionId
                                                            }
                                                            key={index}
                                                        >
                                                            {
                                                                bank.institutionName
                                                            }
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <div
                                            className={styles.profileBodyButton}
                                        >
                                            {loading ? (
                                                <Loader />
                                            ) : (
                                                <button type="submit">
                                                    Create Beneficiary
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </>
                        );
                }
        }
    };
    return (
        <DashLayout page="Profile Management">
            <ProfileLayout
                head={
                    <>
                        <div className={styles.profileHeaderHead}>
                            <div className={styles.profileHeaderImg}>
                                {!userProfileData ? null : (
                                    <Image
                                        src={`data:image/png;base64,${userProfileData.profileImg}`}
                                        width="100%"
                                        height="100%"
                                    />
                                )}
                            </div>
                            <div className={styles.profileBodyHeaderCont}>
                                <h2>Marvelous Solutions</h2>
                                <p>
                                    {!userProfileData
                                        ? null
                                        : `${userProfileData.lastName} ${userProfileData.firstName}`}
                                </p>
                            </div>
                        </div>
                        <div className={styles.subProfileHead}>
                            <div className={styles.freezeAccount}>
                                <p>Freeze Account</p>
                                <div className={styles.saveBene}>
                                    <label
                                        className={
                                            freeze
                                                ? styles.beneChecked
                                                : styles.beneCheck
                                        }
                                    >
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                if (!freeze) {
                                                    dispatch(
                                                        loadfreezeTransactions()
                                                    );
                                                } else if (freeze) {
                                                    dispatch(
                                                        loadunfreezeTransactions()
                                                    );
                                                }
                                            }}
                                        />
                                        <span>
                                            <i></i>
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className={styles.accountNumber}>
                                <h4>Account Number</h4>
                                <div className={styles.accountNumberCopy}>
                                    <p>{acctNumber.accountNumber}</p>
                                    <h5>copy</h5>
                                </div>
                            </div>
                        </div>
                        <div>
                            {profileData.map((item, index) => {
                                return (
                                    <ProfileSingle
                                        key={index}
                                        profileText={item.text}
                                        icon={item.icon}
                                        index={index}
                                        action={() => {
                                            setText(item.text);
                                            // setOverlay(true);
                                            setCount(0);
                                            setBvn('');
                                        }}
                                        color={item.color}
                                    />
                                );
                            })}
                        </div>
                    </>
                }
            >
                {renderForm()}
            </ProfileLayout>
            {outcome ? (
                <PaymentSuccess
                    body={message}
                    error={message}
                    statusbar={statusbar}
                    type={alertType}
                    overlay="true"
                    text="Continue"
                    actionNo={() => {
                        setOutcome(false);
                    }}
                    actionYes={() => {
                        dispatch(deleteBeneficiariesData(bene));
                        setOutcome(false);
                    }}
                    action={
                        statusbar === 'error'
                            ? () => {
                                  setOutcome(false);
                              }
                            : statusbar === 'success'
                            ? () => {
                                  setOutcome(false);
                                  setText('View Profile');
                              }
                            : null
                    }
                />
            ) : null}
        </DashLayout>
    );
};

export default Profile;
