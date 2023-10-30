import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Iframe from 'react-iframe';
import Lottie from 'react-lottie';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ButtonComp } from '../../../components';
import ArrowBackSvg from '../../../components/ReusableComponents/ArrowBackSvg';
import BeneSvg from '../../../components/ReusableComponents/BeneSvg';
import BvnSvg from '../../../components/ReusableComponents/BvnSvg';
import CloseBtnSvg from '../../../components/ReusableComponents/ClosebtnSvg';
import { affiliateCountries } from '../../../components/ReusableComponents/Data';
import Visbility from '../../../components/ReusableComponents/Eyeysvg';
import InputTag from '../../../components/ReusableComponents/Input';
import Loader from '../../../components/ReusableComponents/Loader';
import animationData from '../../../components/ReusableComponents/Lotties/contact-us.json';
import socialdataa from '../../../components/ReusableComponents/Lotties/loading.json';
import socialdata from '../../../components/ReusableComponents/Lotties/social-media-marketing.json';
import ManageBeneSingle from '../../../components/ReusableComponents/ManageBene';
import OtpInput from '../../../components/ReusableComponents/Otpinput';
import OutsideClick from '../../../components/ReusableComponents/OutsideClick';
import PaymentSuccess from '../../../components/ReusableComponents/PopupStyle';
import ProfileSingle from '../../../components/ReusableComponents/ProfileSingle';
import AddSvg from '../../../components/ReusableComponents/ReusableSvgComponents/AddSvg';
import ContactSvg from '../../../components/ReusableComponents/ReusableSvgComponents/ContactSvg';
import EditProfileSvg from '../../../components/ReusableComponents/ReusableSvgComponents/EditProfileSvg';
import RmSvg from '../../../components/ReusableComponents/RmSvg';
import ShareSvg from '../../../components/ReusableComponents/ShareSvg';
import StorePopup from '../../../components/ReusableComponents/StorePopup';
import ProfileLayout from '../../../components/layout/ProfileLayout';
import { deleteAirtimeBeneficiariesData } from '../../../redux/actions/deleteAirtimeBeneficiariesAction';
import { deleteBeneficiariesData } from '../../../redux/actions/deleteBeneficiariesAction';
import { loadfreezeTransactions } from '../../../redux/actions/freezeTransactionAction';
import { postInterBankEnquiry } from '../../../redux/actions/interbankEnquieryAction';
import { postBeneficiariesData } from '../../../redux/actions/postBeneficiariesAction';
import { loadunfreezeTransactions } from '../../../redux/actions/unfreezeTransactionAction';
import {
    useGetRelationshipManagerMutation,
    useVerifyTransactionPinMutation
} from '../../../redux/api/authApi';
import styles from './styles.module.css';
const Profile = () => {
    const router = useRouter();
    const [activeBtn, setActiveBtn] = useState(false);
    const [type, setType] = useState('Account');
    const [loading, setLoading] = useState(false);
    const [outcome, setOutcome] = useState(false);
    const [freeze, setFreeze] = useState();
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [statusbar, setStatusbar] = useState('');
    const [alertType, setAlertType] = useState('');
    const [link, setLink] = useState('');
    const [bvn, setBvn] = useState('');
    const [acctNumber, setAcctNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [count, setCount] = useState(0);
    const [outType, setOutType] = useState();
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [airtimebeneficiaries, setAirtimeBeneficiaries] = useState([]);
    const [bene, setBene] = useState('');
    const [userProfileData, setUserProfileData] = useState([]);
    const [outTyped, setOutTyped] = useState();
    const [outPin, setOutPin] = useState();
    const [outPinn, setOutPinn] = useState();
    const [RMDetails, setRMDetails] = useState();
    const [bank, setBank] = useState([]);
    const [interEnquiry, setInterEnquiry] = useState('');
    const [showinterEnquiry, setshowInterEnquiry] = useState(false);
    const [rafiki, setRafiki] = useState(false);
    const [active, setActive] = useState(false);
    const [profileImg, setProfileImg] = useState('');
    const [airtimeNetworkData, setAirtimeNetworkData] = useState([]);
    const [copyAcctInfo, setCopyAcctInfo] = useState();
    const [alert, setAlert] = useState(false);
    const [otpValue, setOtpValue] = useState('');
    const affiliate = localStorage.getItem('affiliateCode');
    const [countryCodes, setCountryCodes] = useState([]);
    const [flags, setFlags] = useState([]);
    const dispatch = useDispatch();

    const socialOptions = {
        loop: true,
        autoplay: true,
        animationData: socialdata,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const [deleteAccountEmail, setDeleteAccountEmail] = useState();
    const [deleteAccountPassword, setDeleteAccountPassword] = useState();
    const [deleteAccountError, setDeleteAccountError] = useState();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const socialOptionss = {
        loop: true,
        autoplay: true,
        animationData: socialdataa,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const getAllBanksByAccount = (accountNo) => {
        //NOTE, This can be fetched from the Database
        let bankArray = `ACCESS BANK:044:000014:999044~ACCESS BANK:063:000005:999044~Citi Bank:023:000009:CITI-ACC~Fidelity Bank:070:000007:FIDELITY-ACC~First Bank of Nigeria:011:000016:FIRST-ACC~First City Monument Bank:214:000003:FCMB-ACC~GT Bank Plc:058:000013:GUARANTY-ACC~Heritage:030:000020:HERITAGE-ACC~POLARIS BANK:076:000008:POLARIS~Stanbic IBTC Bank:221:000012:STANBIC-IBTC-ACC~Standard Chartered:068:000021:STANDARD-CHARTERED~Sterling Bank:232:000001:STERLING-ACC~Union Bank:032:000018:UNION-ACC~United Bank for Africa:033:000004:UNITED-ACC~Unity Bank:215:000011:UNITY-ACC~Wema Bank:035:000017:WEMA-ACC~Zenith Bank:057:000015:ZENITH-ACC~Sun Trust Account:100:000022:SUNTRUST-ACC`;

        let bankList = [];
        let bankDets = bankArray.split('~');
        //   // //console.log("bankDets", bankDets);

        for (var bankdet of bankDets) {
            let split = bankdet.split(':');
            // //console.log('split', split);

            if (isValidNUBAN(accountNo, split[1])) {
                bankList.push({
                    bankname: split[0],
                    cbncode: split[1],
                    bankcode: split[2],
                    bankCodes: split[3]
                });
            }
        }

        return bankList.map((bank) => bank);
    };

    const profileData = [
        {
            text: 'View Profile',
            icon: <EditProfileSvg />,
            color: '#7A7978'
        },
        // userProfileData.hasSetTransactionPin === true
        //     ? ''
        //     :
        // {
        //     text: 'Update Transaction Pin',
        //     icon: <ManageSignSvg />,
        //     color: '#7A7978'
        // },
        // {
        //     text: 'Referral Code',
        //     icon: <EditProfileSvg />,
        //     color: '#7A7978'
        // },

        {
            text: 'Manage Beneficiaries',
            icon: <BeneSvg />,
            color: '#7A7978'
        },
        // {
        //     text: 'Manage Limit',
        //     icon: <ManageLimitSvg />,
        //     color: '#7A7978'
        // },
        {
            text: 'Bank ID Number',
            icon: <BvnSvg />,
            color: '#7A7978'
        },
        {
            text: 'Relationship managers Name and Contact Details',
            icon: <RmSvg />,
            color: '#7A7978'
        },
        // {
        //     text: 'Manage Signatories',
        //     icon: <ManageSignSvg />,
        //     color: '#7A7978'
        // },
        {
            text: 'All Disputes',
            icon: <ShareSvg color="#102572" />,
            color: '#7A7978'
        },
        {
            text: 'Contact us',
            icon: <ContactSvg />,
            color: '#7A7978'
        },
        {
            text: 'Share App/Refer a Friend',
            icon: <ShareSvg color="#102572" />,
            color: '#7A7978'
        }
        // {
        //     text: 'Delete Account',
        //     icon: <FaTrash />,
        //     color: 'red'
        // }
    ];
    const [countryNames, setCountryNames] = useState();
    const [searchItem, setSearchItem] = useState('');
    const [beneType, setBeneType] = useState('Account');

    const types = (type) => {
        setOutType(type);
    };
    const typed = (type) => {
        setOutTyped(type);
    };
    const pin = (type) => {
        setOutPin(type);
    };

    const { allAccountInfo } = useSelector((store) => store);
    console.log(allAccountInfo);
    function countries(affiliate) {
        const selectedCountries = affiliateCountries.filter(
            (country) => country.affiliateCode === affiliate
        );

        const selectedCountryCodes = selectedCountries.map(
            (country) => country.countryCode
        );
        const selectedFlags = selectedCountries.map((country) => country.flags);

        setCountryCodes(selectedCountryCodes);
        setFlags(selectedFlags);
    }
    console.log(countryCodes, flags);
    useEffect(() => {
        countries(affiliate);
        setAcctNumber(
            allAccountInfo
                .filter((account) => account?.isPrimaryAccount === 'Y') // Filter by primary flag
                .map((account) => account.accountNo)
                .filter(Boolean)
        );
    }, []);
    const [
        verifyTransactionPin,
        {
            data: verifyTransactionPinData,
            isLoading: verifyTransactionPinLoad,
            isSuccess: verifyTransactionPinSuccess,
            isError: verifyTransactionPinFalse,
            error: verifyTransactionPinErr,
            reset: verifyTransactionPinReset
        }
    ] = useVerifyTransactionPinMutation();
    const [
        getRelationshipManager,
        {
            data: getRelationshipManagerData,
            isLoading: getRelationshipManagerLoad,
            isSuccess: getRelationshipManagerSuccess,
            isError: getRelationshipManagerFalse,
            error: getRelationshipManagerErr,
            reset: getRelationshipManagerReset
        }
    ] = useGetRelationshipManagerMutation();

    useEffect(() => {
        getRelationshipManager({ accountNo: allAccountInfo[0]?.accountNo });
    }, []);

    const showVerifyTransactionPinErrorMessage = () => {
        toast.error('Error Vrifying Transaction Pin', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    useEffect(() => {
        if (verifyTransactionPinErr) {
            showVerifyTransactionPinErrorMessage();
        }
    }, [verifyTransactionPinErr]);
    const handleViewBvn = (e) => {
        e.preventDefault();
        verifyTransactionPin({
            transactionPin: otpValue
        });
    };
    const handleOtpChange = (otp) => {
        setOtpValue(otp);
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();
    const { profile } = useSelector((store) => store);

    console.log(profile);
    const [openDelete, setOpenDelete] = useState(false);
    const renderForm = () => {
        switch (text) {
            case 'View Profile':
                return (
                    <>
                        <h2 className={styles.title}>View Profile</h2>
                        <div className={styles.profileBodyHead}>
                            <div className={styles.profileBodyHeadImg}>
                                {!profileImg.image ? null : (
                                    <Image
                                        src={`data:image/png;base64,${profileImg.image}`}
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
                                        value={`${profile?.user?.lastName} ${profile?.user?.firstName}`}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Email Address</label>
                                    <InputTag
                                        type="email"
                                        placeholder="babatuneabiodun@gmail.com"
                                        value={profile?.user?.email}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Phone Number</label>
                                    <div className={styles.phone}>
                                        <div className={styles.phoneHeader}>
                                            <span>
                                                <img
                                                    src={flags[0]?.svg}
                                                    alt=""
                                                />
                                            </span>
                                            <p>{countryCodes}</p>
                                        </div>
                                        <div className={styles.phoneDetails}>
                                            <input
                                                type="number"
                                                placeholder="812 345 6789"
                                                defaultValue={profile?.user?.phoneNumber.replace(
                                                    '234',
                                                    ''
                                                )}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={styles.deleteAccount}
                                onClick={() => setOpenDelete((prev) => !prev)}
                            >
                                <p>Delete Account</p>
                            </div>
                            {openDelete ? (
                                <OutsideClick
                                    onClickOutside={() => {
                                        setOpenDelete(false);
                                    }}
                                >
                                    <StorePopup overlay={true}>
                                        <div className={styles.deleteInner}>
                                            <div className={styles.cancel}>
                                                <CloseBtnSvg
                                                    action={() =>
                                                        setOpenDelete(
                                                            (prev) => !prev
                                                        )
                                                    }
                                                />
                                            </div>

                                            <form
                                                onSubmit={handleSubmit(
                                                    deleteAction
                                                )}
                                            >
                                                <h2 className={styles.title}>
                                                    Delete Account
                                                </h2>
                                                <div className={styles.bvn}>
                                                    <p>
                                                        We are sorry to see you
                                                        go, but we understand
                                                        that you may want to
                                                        delete your account.
                                                        Before you proceed with
                                                        this decision, please
                                                        note that all of your
                                                        data will be permanently
                                                        erased from our system.
                                                        This includes your
                                                        personal information,
                                                        account settings, and
                                                        any content or activity
                                                        associated with your
                                                        account. Once your
                                                        account is deleted, it
                                                        cannot be recovered. If
                                                        you change your mind,
                                                        you will need to create
                                                        a new account and start
                                                        from scratch. Enter your
                                                        email below to confirm
                                                        account deletion
                                                    </p>
                                                </div>
                                                <div className={styles.bvn}>
                                                    <p>
                                                        You wont be able to
                                                        recover account once
                                                        deleted
                                                    </p>
                                                </div>
                                                {deleteAccountError ? (
                                                    <p className={styles.error}>
                                                        {deleteAccountError}
                                                    </p>
                                                ) : null}
                                                <div
                                                    className={styles.formGroup}
                                                >
                                                    <input
                                                        value={
                                                            deleteAccountEmail
                                                        }
                                                        type="email"
                                                        placeholder="Enter your Email"
                                                        {...register('delete', {
                                                            required:
                                                                'Input is Required'
                                                        })}
                                                        onChange={(e) =>
                                                            setDeleteAccountEmail(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <p className={styles.error}>
                                                        {
                                                            errors?.delete
                                                                ?.message
                                                        }
                                                    </p>
                                                </div>
                                                <div
                                                    className={styles.formGroup}
                                                >
                                                    <div
                                                        className={styles.divs}
                                                    >
                                                        <input
                                                            placeholder="Enter your Password"
                                                            {...register(
                                                                'deletePassword',
                                                                {
                                                                    required:
                                                                        'Password is Required'
                                                                }
                                                            )}
                                                            value={
                                                                deleteAccountPassword
                                                            }
                                                            onInput={(e) => {
                                                                setDeleteAccountPassword(
                                                                    e.target
                                                                        .value
                                                                );
                                                                if (
                                                                    e?.target
                                                                        .value
                                                                        .length ===
                                                                    0
                                                                ) {
                                                                    setActive(
                                                                        false
                                                                    );
                                                                } else if (
                                                                    e?.target
                                                                        .value
                                                                        .length >
                                                                    0
                                                                ) {
                                                                    setActive(
                                                                        true
                                                                    );
                                                                }
                                                            }}
                                                            name="deletePassword"
                                                            type={
                                                                outType
                                                                    ? 'password'
                                                                    : 'text'
                                                            }
                                                        />
                                                        <Visbility
                                                            typeSet={types}
                                                            input="input"
                                                        />
                                                    </div>
                                                    <p className={styles.error}>
                                                        {
                                                            errors
                                                                ?.deletePassword
                                                                ?.message
                                                        }
                                                    </p>
                                                </div>

                                                <div
                                                    className={
                                                        styles.deleteButton
                                                    }
                                                >
                                                    {loading ? (
                                                        <Loader />
                                                    ) : active ? (
                                                        <button
                                                            onClick={() => {
                                                                // deleteAccount
                                                                setDeleteCondition(
                                                                    true
                                                                );
                                                            }}
                                                            type="submit"
                                                        >
                                                            Delete
                                                        </button>
                                                    ) : (
                                                        <button
                                                            type="submit"
                                                            className={
                                                                styles.disabled
                                                            }
                                                            disabled
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                </div>
                                                {deleteCondition ? (
                                                    <div
                                                        className={
                                                            styles.deleteConfirmation
                                                        }
                                                    >
                                                        <p>
                                                            Are You Sure You
                                                            Want To Delete Your
                                                            Account
                                                        </p>
                                                        <div
                                                            className={
                                                                styles.deleteButtons
                                                            }
                                                        >
                                                            <button
                                                                onClick={
                                                                    deleteAccount
                                                                }
                                                            >
                                                                Yes
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    setDeleteCondition(
                                                                        false
                                                                    )
                                                                }
                                                            >
                                                                No
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : null}
                                            </form>
                                        </div>
                                    </StorePopup>
                                </OutsideClick>
                            ) : null}
                        </div>
                    </>
                );
            // case 'Manage Limit':
            //     return (
            //         <form
            //             onSubmit={handleSubmit(() => {
            //                 setOutcome(true);
            //                 setMessage('Limit saved Successfully');
            //                 setStatusbar('success');
            //             })}
            //         >
            //             <h2 className={styles.title}>Manage Limit</h2>
            //             <div className={styles.formGroup}>
            //                 <label>Limit Type </label>
            //                 <select
            //                     {...register('limitType', {
            //                         required: 'Limit Type is Required'
            //                     })}
            //                 >
            //                     {/* <option value="Mpos Limit">Mpos Limit</option> */}
            //                     <option value="Transaction Limit">
            //                         Transaction Limit
            //                     </option>
            //                 </select>
            //             </div>
            //             <div className={styles.formGroup}>
            //                 <label>Add Limit </label>
            //                 <input
            //                     type="text"
            //                     placeholder="Add Limit"
            //                     {...register('limit', {
            //                         required: 'Limit is Required'
            //                     })}
            //                 />
            //             </div>
            //             <p className={styles.error}>{errors?.limit?.message}</p>
            //             <div className={styles.formGroup}>
            //                 <label>Enter your Password</label>
            //                 <div className={styles.divs}>
            //                     <input
            //                         placeholder="Enter your Password"
            //                         {...register('limitpassword', {
            //                             required: 'Password is Required'
            //                         })}
            //                         name="limitpassword"
            //                         type={outType ?  'password' : 'text'}
            //                     />
            //                     <Visbility typeSet={types} />
            //                 </div>
            //                 <p className={styles.error}>
            //                     {errors?.limitpassword?.message}
            //                 </p>
            //             </div>
            //             <div className={styles.profileBody}>
            //                 <button type="submit">Add Limit</button>
            //             </div>
            //         </form>
            //     );

            case 'Bank ID Number':
                switch (count) {
                    case 0:
                        return (
                            <form onSubmit={handleViewBvn}>
                                <h2 className={styles.title}>
                                    View my Bank ID Number
                                </h2>
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
                                    <p>Enter Transaction Pin to view bvn</p>
                                    <div className={styles.trans}>
                                        <OtpInput
                                            onOtpChange={handleOtpChange}
                                            otpfields={6}
                                        />
                                    </div>
                                </div>
                                {verifyTransactionPinSuccess ? (
                                    <div className={styles.formGroup}>
                                        <label>Your BVN</label>
                                        <div className={styles.divs}>
                                            <input
                                                value={profile?.user?.idNumber}
                                                type={
                                                    outTyped
                                                        ? 'password'
                                                        : 'text'
                                                }
                                            />
                                            <Visbility
                                                typeSet={typed}
                                                input="input"
                                            />
                                        </div>
                                    </div>
                                ) : null}
                                <div className={styles.bvnButton}>
                                    {verifyTransactionPinLoad ? (
                                        <Loader />
                                    ) : (
                                        <button type="submit">
                                            View my{' '}
                                            {affiliate === 'ENG'
                                                ? 'BVN'
                                                : 'iD Number'}
                                        </button>
                                    )}
                                </div>
                            </form>
                        );
                }
            case 'Relationship managers Name and Contact Details':
                switch (count) {
                    case 0:
                        return (
                            <>
                                <div>
                                    <Lottie
                                        options={defaultOptions}
                                        height={200}
                                        width={200}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>RM Name</label>
                                    <InputTag
                                        type="text"
                                        placeholder="Babatune Abiodun"
                                        value={
                                            getRelationshipManagerData?.data
                                                ?.rmName
                                        }
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>RM Phone Number</label>
                                    <InputTag
                                        type="text"
                                        placeholder="081 234 5678"
                                        value={
                                            getRelationshipManagerData?.data
                                                ?.rmPhoneNumber === null
                                                ? 'No Phone Number'
                                                : getRelationshipManagerData
                                                      ?.data?.rmPhoneNumber
                                        }
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>RM Email</label>
                                    <InputTag
                                        type="text"
                                        placeholder="081 234 5678"
                                        value={
                                            getRelationshipManagerData?.data
                                                ?.rmEmail === null
                                                ? 'No Email'
                                                : getRelationshipManagerData
                                                      ?.data?.rmEmail
                                        }
                                    />
                                </div>
                            </>
                        );
                }
            case 'Referral Code':
                return (
                    <div>
                        <h2 className={styles.title}>Referral Code</h2>
                        <div className={styles.referralCont}>
                            <p className={styles.referralCode}>
                                Your Referral Code is:
                                <span> {profile?.user?.referralCode}</span>
                            </p>
                            <h5
                                onClick={() => {
                                    {
                                        navigator.clipboard
                                            .writeText(
                                                profile?.user?.referralCode
                                            )
                                            .then(() => {
                                                alert('Copied');
                                            });
                                    }
                                }}
                            >
                                copy
                            </h5>
                        </div>
                    </div>
                );

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
            // case 'Update Transaction Pin':
            //     switch (count) {
            //         case 0:
            //             return (
            //                 <>
            //                     <h2 className={styles.title}>
            //                         Update Transaction Pin
            //                     </h2>
            //                     <form>

            //                         {loading ? (
            //                             <Loader />
            //                         ) : (
            //                             <button>Set Transaction Pin</button>
            //                         )}
            //                     </form>
            //                 </>
            //             );
            //     }

            case 'Contact us':
                switch (count) {
                    case 0:
                        return (
                            <div>
                                <div className={styles.name}>
                                    <div className={styles.Hello}>
                                        <h2>
                                            Hello {userProfileData.firstName}
                                        </h2>
                                        <p>How can we help you</p>
                                    </div>
                                </div>
                                <img
                                    src="/Assets/Images/rafiki.jpeg"
                                    alt="Rafiki"
                                    className={styles.rafiki}
                                />
                                <button
                                    onClick={() => {
                                        setRafiki(true);
                                    }}
                                >
                                    Chat With us
                                </button>
                                <div>
                                    <div className={styles.contactEmail}>
                                        <div className={styles.contactUs}>
                                            Contact Us
                                        </div>
                                        <p>
                                            Email: engcontactcenter@ecobank.com
                                        </p>
                                    </div>
                                    <hr />
                                    <div className={styles.contactWeb}>
                                        <div></div>
                                        <p>
                                            OUR WEBSITE:
                                            <Link href="https://www.ecobank.com">
                                                https://www.ecobank.com
                                            </Link>
                                        </p>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        );
                }
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
                                            setBeneType('Account');
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
                                            setBeneType('Airtime and Data');
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
                                        onChange={(e) => {
                                            setSearchItem(e.target.value);
                                        }}
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
                                                    {beneficiaries.beneficiaries
                                                        ?.filter((item) => {
                                                            if (
                                                                searchItem ===
                                                                ''
                                                            ) {
                                                                return item;
                                                            } else if (
                                                                item.beneficiaryName
                                                                    .toLowerCase()
                                                                    .includes(
                                                                        searchItem.toLowerCase()
                                                                    )
                                                            ) {
                                                                return item;
                                                            }
                                                        })
                                                        ?.map(
                                                            (
                                                                account,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <ManageBeneSingle
                                                                        beneAccount={
                                                                            account.bankName
                                                                        }
                                                                        beneName={
                                                                            account.beneficiaryName
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
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
                                                                            setBeneType(
                                                                                'Account'
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

                                            {!airtimebeneficiaries
                                                .phoneNumberBeneficiaries
                                                ?.length ? (
                                                <h2 className={styles.dontHave}>
                                                    You do not have any
                                                    Beneficiary at the moment
                                                </h2>
                                            ) : (
                                                <>
                                                    {airtimebeneficiaries.phoneNumberBeneficiaries?.map(
                                                        (account, index) => {
                                                            return (
                                                                <ManageBeneSingle
                                                                    beneAccount={
                                                                        account.mobileNetwork
                                                                    }
                                                                    beneName={
                                                                        account.name
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
                                                                        setBeneType(
                                                                            'Airtime and Data'
                                                                        );
                                                                    }}
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
                                </div>
                                <form
                                    onSubmit={handleSubmit((data) => {
                                        if (beneType === 'Account') {
                                            setLoading(true);
                                            const beneData = {
                                                beneficiaryName:
                                                    interEnquiry.accountName,
                                                accountNumber:
                                                    data.accountNumber,
                                                bankName: data.bankName,
                                                bankCode: data.bankName
                                            };
                                            // //console.log(beneData);
                                            dispatch(
                                                postBeneficiariesData(beneData)
                                            );
                                        } else if (
                                            beneType === 'Airtime and Data'
                                        ) {
                                            const airtimeData = {
                                                phoneNumber: data.phoneNumber,
                                                mobileNetwork: data.network,
                                                name: data.name
                                            };
                                            dispatch(
                                                postAirtimeBeneficiariesData(
                                                    airtimeData
                                                )
                                            );
                                        }
                                    })}
                                >
                                    <div className={styles.beneForm}>
                                        {beneType === 'Account' ? (
                                            <>
                                                <div
                                                    className={styles.formGroup}
                                                >
                                                    <label>
                                                        Account Number
                                                    </label>
                                                    <input
                                                        {...register(
                                                            'accountNumber',
                                                            {
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
                                                            }
                                                        )}
                                                        onInput={(e) => {
                                                            if (
                                                                e.target.value
                                                                    .length ===
                                                                10
                                                            ) {
                                                                setBank(
                                                                    getAllBanksByAccount(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                );
                                                                setAccountNumber(
                                                                    e.target
                                                                        .value
                                                                );
                                                            } else if (
                                                                e.target.value
                                                                    .length < 10
                                                            ) {
                                                                setInterEnquiry(
                                                                    ''
                                                                );
                                                                setshowInterEnquiry(
                                                                    false
                                                                );
                                                                setBank([]);
                                                            }
                                                        }}
                                                        type="number"
                                                        placeholder="Enter account number here"
                                                    />
                                                </div>
                                                <p className={styles.error}>
                                                    {
                                                        errors?.accountNumber
                                                            ?.message
                                                    }
                                                </p>
                                                {showinterEnquiry ? (
                                                    <div
                                                        className={
                                                            styles.formGroup
                                                        }
                                                    >
                                                        <label>
                                                            Account Name
                                                        </label>
                                                        <input
                                                            {...register(
                                                                'accountName'
                                                            )}
                                                            type="text"
                                                            value={
                                                                interEnquiry.accountName
                                                            }
                                                            placeholder="Loading..."
                                                        />
                                                        <p
                                                            className={
                                                                styles.error
                                                            }
                                                        >
                                                            {
                                                                errors
                                                                    ?.accountNumber
                                                                    ?.message
                                                            }
                                                        </p>
                                                    </div>
                                                ) : null}
                                                <div
                                                    className={styles.formGroup}
                                                >
                                                    <label>Choose Bank</label>
                                                    <select
                                                        {...register(
                                                            'bankName',
                                                            {
                                                                required:
                                                                    'Choose a bank'
                                                            }
                                                        )}
                                                        name="bankName"
                                                        onChange={(e) => {
                                                            setshowInterEnquiry(
                                                                true
                                                            );
                                                            if (
                                                                e.target
                                                                    .value ===
                                                                'ECOBANK'
                                                            ) {
                                                                const details =
                                                                    {
                                                                        accountNumber:
                                                                            accountNumber
                                                                    };
                                                                dispatch(
                                                                    postIntraBankEnquiry(
                                                                        details
                                                                    )
                                                                );
                                                            } else {
                                                                const details =
                                                                    {
                                                                        destinationBankCode:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        accountNo:
                                                                            accountNumber
                                                                    };
                                                                dispatch(
                                                                    postInterBankEnquiry(
                                                                        details
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <option value="">
                                                            Select Bank
                                                        </option>
                                                        <option value="ECOBANK">
                                                            ECOBANK
                                                        </option>
                                                        {bank?.map(
                                                            (bank, index) => {
                                                                return (
                                                                    <option
                                                                        value={
                                                                            bank.bankCodes
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {
                                                                            bank.bankname
                                                                        }
                                                                    </option>
                                                                );
                                                            }
                                                        )}
                                                    </select>
                                                </div>
                                            </>
                                        ) : beneType === 'Airtime and Data' ? (
                                            <>
                                                <div
                                                    className={styles.formGroup}
                                                >
                                                    <label> Phone Number</label>
                                                    <input
                                                        {...register(
                                                            'phoneNumber',
                                                            {
                                                                required:
                                                                    'Phone Number is required'
                                                            }
                                                        )}
                                                        type="text"
                                                        placeholder="Enter Phone Number"
                                                        // value={
                                                        //     interEnquiry.accountName
                                                        // }
                                                    />
                                                    {/* <p className={styles.error}>
                                                    {
                                                        errors?.accountNumber
                                                            ?.message
                                                    }
                                                </p> */}
                                                </div>
                                                <div
                                                    className={styles.formGroup}
                                                >
                                                    <label> Network</label>
                                                    <select
                                                        name=""
                                                        id=""
                                                        {...register(
                                                            'network',
                                                            {
                                                                required:
                                                                    'Network is required'
                                                            }
                                                        )}
                                                    >
                                                        <option value="">
                                                            Select Network
                                                        </option>
                                                        {airtimeNetworkData.networks?.map(
                                                            (item, index) => {
                                                                if (
                                                                    item.name ===
                                                                    'SOCHIENGMTN'
                                                                ) {
                                                                    return null;
                                                                } else {
                                                                    return (
                                                                        <option
                                                                            value={
                                                                                item.name
                                                                            }
                                                                        >
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </option>
                                                                    );
                                                                }
                                                            }
                                                        )}
                                                    </select>
                                                    {/* <p className={styles.error}>
                                                    {
                                                        errors?.accountNumber
                                                            ?.message
                                                    }
                                                </p> */}
                                                    <div
                                                        className={
                                                            styles.formGroup
                                                        }
                                                    >
                                                        <label>Name</label>
                                                        <input
                                                            {...register(
                                                                'name',
                                                                {
                                                                    required:
                                                                        'Name is required'
                                                                }
                                                            )}
                                                            type="text"
                                                            placeholder="Enter Name"
                                                            // value={
                                                            //     interEnquiry.accountName
                                                            // }
                                                            onInput={(e) => {
                                                                const inputValue =
                                                                    e.target
                                                                        .value;
                                                                //  //console.log(
                                                                //     parseInt(inputValue).toFixed(2)
                                                                // );
                                                                // setAmount(parseInt(inputValue).toFixed(2));
                                                                if (
                                                                    inputValue.length ===
                                                                    0
                                                                ) {
                                                                    setActiveBtn(
                                                                        false
                                                                    );
                                                                } else if (
                                                                    inputValue.length >
                                                                    0
                                                                ) {
                                                                    setActiveBtn(
                                                                        true
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                        {/* <p className={styles.error}>
                                                    {
                                                        errors?.accountNumber
                                                            ?.message
                                                    }
                                                </p> */}
                                                    </div>
                                                </div>
                                            </>
                                        ) : null}

                                        <div
                                            className={styles.profileBodyButton}
                                        >
                                            {loading ? (
                                                <Loader />
                                            ) : (
                                                <ButtonComp
                                                    text="Create Beneficiary"
                                                    type="submit"
                                                    disabled={activeBtn}
                                                    active={
                                                        activeBtn
                                                            ? 'active'
                                                            : 'inactive'
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </>
                        );
                }
            case 'Share App/Refer a Friend':
                switch (count) {
                    case 0:
                        return (
                            <>
                                <div>
                                    <Lottie
                                        options={socialOptions}
                                        height={400}
                                        width={400}
                                    />
                                </div>
                                <p className={styles.toGet}>
                                    To get started, simply copy and share your
                                    unique referral code with as many people as
                                    possible. You can share it via social media,
                                    email, text, or even by word of mouth.
                                    Remember, the more people who use your code,
                                    the greater the rewards youll receive. So
                                    dont hesitate to spread the word and tell
                                    everyone you know about our product or
                                    service. Thank you for helping us grow and
                                    for being a valuable member of our
                                    community. If you have any questions or
                                    concerns, please dont hesitate to contact
                                    us.
                                </p>
                                <div className={styles.referralCont}>
                                    <p className={styles.referralCode}>
                                        Your Referral Code is:
                                        <span>
                                            {' '}
                                            {profile?.user?.referralCode}
                                        </span>
                                    </p>
                                    <h5
                                        onClick={() => {
                                            {
                                                navigator.clipboard
                                                    .writeText(
                                                        profile?.user
                                                            ?.referralCode
                                                    )
                                                    .then(() => {
                                                        alert('Copied');
                                                    });
                                            }
                                        }}
                                    >
                                        copy
                                    </h5>
                                </div>
                            </>
                        );
                }
            case 'All Disputes':
                switch (count) {
                    case 0:
                        return (
                            <>
                                <div className={styles.statementCover}>
                                    <h1 className={styles.nodisputesHeading}>
                                        All Disputes
                                    </h1>
                                    <div className={styles.TableDetailHeader}>
                                        <div className={styles.beneficiary}>
                                            Create At
                                        </div>
                                        <p className={styles.amount}>
                                            Case Type
                                        </p>
                                        {/* <p className={styles.bank}>Bank/Network</p> */}

                                        <div className={styles.more}>
                                            Description
                                        </div>
                                    </div>

                                    <>
                                        <h1 className={styles.nodisputes}>
                                            No Disputes have been lodged
                                        </h1>
                                    </>
                                </div>
                            </>
                        );
                }
        }
    };

    return (
        // <DashLayout page="Profile Management">
        <>
            <ToastContainer />
            <ProfileLayout
                head={
                    <>
                        <div className={styles.profileHeaderHead}>
                            <div className={styles.profileHeaderImg}>
                                {!profileImg.image ? null : (
                                    <Image
                                        src={`data:image/png;base64,${profileImg.image}`}
                                        width="100%"
                                        height="100%"
                                    />
                                )}
                            </div>
                            <div className={styles.profileBodyHeaderCont}>
                                {/* <h2>Marvelous Solutions</h2> */}
                                <p>
                                    {`${profile?.user?.lastName} ${profile?.user?.firstName}`}
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
                                    <p>{allAccountInfo[0]?.accountNo}</p>
                                    {alert ? (
                                        <p>Copied to Clipboard</p>
                                    ) : (
                                        <h5
                                            onClick={() => {
                                                {
                                                    navigator.clipboard
                                                        .writeText(
                                                            `Account Name -${profile?.user?.lastName} ${profile?.user?.firstName}
        Account No. - ${allAccountInfo[0]?.accountNo}
        Bank Name - Ecobank `
                                                        )
                                                        .then(() => {
                                                            setAlert(true);
                                                            setTimeout(() => {
                                                                setAlert(false);
                                                            }, 1500);
                                                        });
                                                }
                                            }}
                                        >
                                            copy
                                        </h5>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            {profileData.map((item, index) => {
                                if (item === '') {
                                    return null;
                                } else {
                                    return (
                                        <ProfileSingle
                                            key={index}
                                            profileText={item?.text}
                                            icon={item?.icon}
                                            index={index}
                                            activeText={text}
                                            action={() => {
                                                if (
                                                    item.text ===
                                                    'Relationship managers Name and Contact Details '
                                                ) {
                                                    if (
                                                        RMDetails ===
                                                        'No account details found for customer'
                                                    ) {
                                                        setText('Contact us');
                                                    } else if (
                                                        RMDetails?.crm?.name ===
                                                        null
                                                    ) {
                                                        setText('Contact us');
                                                    } else {
                                                        setText(item.text);
                                                    }
                                                } else {
                                                    setText(item.text);
                                                }

                                                reset();
                                                setCount(0);
                                                setBvn('');
                                                setshowInterEnquiry;
                                            }}
                                            color={item?.color}
                                        />
                                    );
                                }
                            })}
                        </div>
                    </>
                }
            >
                {rafiki ? (
                    <OutsideClick
                        onClickOutside={() => {
                            setRafiki(false);
                        }}
                    >
                        <div className={styles.chatWithUs}>
                            <div
                                onClick={() => {
                                    setRafiki(false);
                                }}
                            >
                                <CloseBtnSvg />
                            </div>
                            <Iframe
                                url="https://ice.ecobank.com/chatbotui"
                                ref={iframeRef}
                                width="540px"
                                height="520px"
                                id=""
                                className=""
                                display="block"
                                position="relative"
                            />
                        </div>
                    </OutsideClick>
                ) : null}
                {renderForm()}
                {/* <h1
                    className={styles.chatWitUsBt}
                    onClick={() => {
                        setRafiki((prev) => !prev);
                    }}
                >
                    Chat With Us
                </h1> */}
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
                        if (beneType === 'Account') {
                            dispatch(deleteBeneficiariesData(bene));
                            setOutcome(false);
                            setBeneType('Account');
                            setType('Account');
                        } else if (beneType === 'Airtime and Data') {
                            dispatch(deleteAirtimeBeneficiariesData(bene));
                            setOutcome(false);
                            setBeneType('Account');
                            setType('Account');
                        }
                    }}
                    action={
                        statusbar === 'error'
                            ? () => {
                                  setOutcome(false);
                              }
                            : statusbar === 'success'
                            ? () => {
                                  setOutcome(false);
                                  setCount(count - 1);
                                  //   setText('View Profile');
                                  reset();
                              }
                            : null
                    }
                />
            ) : null}
            {/* </DashLayout> */}
        </>
    );
};

export default Profile;
