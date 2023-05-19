import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import DashLayout from '../../components/layout/Dashboard';
import ProfileLayout from '../../components/layout/ProfileLayout';
import ArrowBackSvg from '../../components/ReusableComponents/ArrowBackSvg';
import BeneSvg from '../../components/ReusableComponents/BeneSvg';
import BvnSvg from '../../components/ReusableComponents/BvnSvg';
import Iframe from 'react-iframe';
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
import Lottie from 'react-lottie';
import animationData from '../../components/ReusableComponents/Lotties/contact-us.json';
import socialdata from '../../components/ReusableComponents/Lotties/social-media-marketing.json';
import { useDispatch, useSelector } from 'react-redux';
import { getAllComplaintGet } from '../../redux/actions/actions';
import socialdataa from '../../components/ReusableComponents/Lotties/loading.json';
import {
    getAirtimeBeneficiariesData,
    deleteAirtimeBeneficiariesData,
    getBeneficiariesData,
    deleteBeneficiariesData,
    loadViewBvn,
    loadfreezeTransactions,
    loadunfreezeTransactions,
    loadUserProfile,
    loadAccountPrimary,
    postInterBankEnquiry,
    postIntraBankEnquiry,
    loadbank,
    loadfetchRM,
    postBeneficiariesData,
    postAirtimeNetwork,
    loadsetTransactionPin,
    postAirtimeBeneficiariesData
} from '../../redux/actions/actions';
import { useForm } from 'react-hook-form';
import Loader from '../../components/ReusableComponents/Loader';
import PaymentSuccess from '../../components/ReusableComponents/PopupStyle';
import Link from 'next/link';
import { ButtonComp } from '../../components';
import { useRouter } from 'next/router';
import { FaTrash } from 'react-icons/fa';
import OutsideClick from '../../components/ReusableComponents/OutsideClick';
import StorePopup from '../../components/ReusableComponents/StorePopup';
import CloseBtnSvg from '../../components/ReusableComponents/ClosebtnSvg';
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
    const [airtimeNetworkData, setAirtimeNetworkData] = useState([]);
    const dispatch = useDispatch();
    const { getBeneficiaries } = useSelector(
        (state) => state.getBeneficiariesReducer
    );
    const { getAirtimeBeneficiaries } = useSelector(
        (state) => state.getAirtimeBeneficiariesReducer
    );
    const { deleteBeneficiaries } = useSelector(
        (state) => state.deleteBeneficiariesReducer
    );
    const { deleteAirtimeBeneficiaries } = useSelector(
        (state) => state.deleteAirtimeBeneficiariesReducer
    );
    const { setTransactionPin, setTransactionPinError } = useSelector(
        (state) => state.setTransactionPinReducer
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
    const { accountPrimarys, accountPrimaryError } = useSelector(
        (state) => state.accountPrimaryReducer
    );
    const { banks } = useSelector((state) => state.banksReducer);
    const { interBankEnquiry, errorMessageInterBankEnquiry } = useSelector(
        (state) => state.interBankEnquiryReducer
    );
    const { intraBankEnquiry, errorMessageIntraBankEnquiry } = useSelector(
        (state) => state.intraBankEnquiryReducer
    );
    const { postBeneficiaries, errorMessagepostBeneficiaries } = useSelector(
        (state) => state.postBeneficiariesReducer
    );
    const { postAirtimeBeneficiaries, errorMessagepostAirtimeBeneficiaries } =
        useSelector((state) => state.postAirtimeBeneficiariesReducer);
    const { fetchRM, fetchRMErrorMessages } = useSelector(
        (state) => state.fetchRMReducer
    );
    const { airtimeNetwork } = useSelector(
        (state) => state.airtimeNetworkReducer
    );
    const [allDisputes, setAllDisputes] = useState();
    const { getAllComplaintSuccess, getAllComplaintErrorMessage } = useSelector(
        (state) => state.getComplaintReducer
    );
    const [isLoading, setIsLoading] = useState(true);
    const socialOptions = {
        loop: true,
        autoplay: true,
        animationData: socialdata,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    useEffect(() => {
        dispatch(getAllComplaintGet());
    }, []);
    useEffect(() => {
        if (getAllComplaintSuccess !== null) {
            console.log(getAllComplaintSuccess);
            setAllDisputes(getAllComplaintSuccess?.data?.disputeRecord);
            setIsLoading(false);
        }
    }, [getAllComplaintSuccess]);

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
    const interBankEnquiryCheck = () => {
        if (interBankEnquiry !== null) {
            setInterEnquiry(interBankEnquiry);
            setActiveBtn(true);
        }
    };
    const iframeRef = useRef(null);

    useEffect(() => {
        interBankEnquiryCheck();
    }, [interBankEnquiry]);
    const intraBankEnquiryCheck = () => {
        if (intraBankEnquiry !== null) {
            setInterEnquiry(intraBankEnquiry);
            setActiveBtn(true);
        }
    };
    useEffect(() => {
        intraBankEnquiryCheck();
    }, [intraBankEnquiry]);
    const newBene = () => {
        if (postBeneficiaries !== null) {
            setOutcome(true);
            setMessage('Beneficary added successfully');
            setStatusbar('success');
            setLoading(false);
            setshowInterEnquiry(false);
            setInterEnquiry('');
            setActiveBtn(false);
        } else if (errorMessagepostBeneficiaries !== null) {
            setOutcome(true);
            setMessage(errorMessagepostBeneficiaries);
            setStatusbar('error');
            setLoading(false);
            setActiveBtn(false);
        }
    };

    useEffect(() => {
        newBene();
    }, [postBeneficiaries, errorMessagepostBeneficiaries]);
    useEffect(() => {
        if (postAirtimeBeneficiaries !== null) {
            setOutcome(true);
            setMessage('Beneficary added successfully');
            setStatusbar('success');
            setLoading(false);
            setActiveBtn(false);
        } else if (errorMessagepostAirtimeBeneficiaries !== null) {
            setOutcome(true);
            setMessage(errorMessagepostAirtimeBeneficiaries);
            setStatusbar('error');
            setLoading(false);
            setActiveBtn(false);
        }
    }, [postAirtimeBeneficiaries, errorMessagepostAirtimeBeneficiaries]);
    const transactionPin = () => {
        if (setTransactionPin !== null) {
            setMessage('Transaction Pin Set Successfully');
            setStatusbar('success');
            setOutcome(true);
            setLoading(false);
            // setOutcome('First');
        } else if (setTransactionPinError !== null) {
            setMessage(setTransactionPinError);
            setStatusbar('error');
            setOutcome(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        transactionPin();
    }, [setTransactionPin, setTransactionPinError]);

    const getAllBanksByAccount = (accountNo) => {
        //NOTE, This can be fetched from the Database
        let bankArray = `ACCESS BANK:044:000014:999044~ACCESS BANK:063:000005:999044~Citi Bank:023:000009:CITI-ACC~Fidelity Bank:070:000007:FIDELITY-ACC~First Bank of Nigeria:011:000016:FIRST-ACC~First City Monument Bank:214:000003:FCMB-ACC~GT Bank Plc:058:000013:GUARANTY-ACC~Heritage:030:000020:HERITAGE-ACC~POLARIS BANK:076:000008:POLARIS~Stanbic IBTC Bank:221:000012:STANBIC-IBTC-ACC~Standard Chartered:068:000021:STANDARD-CHARTERED~Sterling Bank:232:000001:STERLING-ACC~Union Bank:032:000018:UNION-ACC~United Bank for Africa:033:000004:UNITED-ACC~Unity Bank:215:000011:UNITY-ACC~Wema Bank:035:000017:WEMA-ACC~Zenith Bank:057:000015:ZENITH-ACC~Sun Trust Account:100:000022:SUNTRUST-ACC`;

        let bankList = [];
        let bankDets = bankArray.split('~');
        //   //console.log("bankDets", bankDets);

        for (var bankdet of bankDets) {
            let split = bankdet.split(':');
            //console.log('split', split);

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
    const isValidNUBAN = (accountNumber, bankCode) => {
        return isValidNUBANAcct(bankCode.trim() + accountNumber.trim());
    };
    const isValidNUBANAcct = (accountNumber) => {
        accountNumber = accountNumber.trim();

        if (accountNumber.length != 13) return false; // 3-digit bank code + 10-digit NUBAN

        let accountNumberDigits = accountNumber.split('');

        //   //console.log("accountNumberDigits: ", accountNumberDigits);

        let sum =
            accountNumberDigits[0] * 3 +
            accountNumberDigits[1] * 7 +
            accountNumberDigits[2] * 3 +
            accountNumberDigits[3] * 3 +
            accountNumberDigits[4] * 7 +
            accountNumberDigits[5] * 3 +
            accountNumberDigits[6] * 3 +
            accountNumberDigits[7] * 7 +
            accountNumberDigits[8] * 3 +
            accountNumberDigits[9] * 3 +
            accountNumberDigits[10] * 7 +
            accountNumberDigits[11] * 3;

        let mod = sum % 10;
        let checkDigit = mod == 0 ? mod : 10 - mod;

        return checkDigit == accountNumberDigits[12];
    };
    useEffect(() => {
        dispatch(getBeneficiariesData());
        dispatch(getAirtimeBeneficiariesData());
        dispatch(loadUserProfile());
        dispatch(loadAccountPrimary());
        // dispatch(loadbank('ENG'));
        dispatch(postAirtimeNetwork());
    }, []);
    useEffect(() => {
        if (airtimeNetwork !== null) {
            setAirtimeNetworkData(airtimeNetwork);
        }
    }, [airtimeNetwork]);
    useEffect(() => {
        setInterEnquiry('');
    }, []);
    useEffect(() => {
        if (accountPrimarys !== null) {
            setAcctNumber(accountPrimarys.accountNumber);
            const test = { accountId: accountPrimarys.accountId };
            dispatch(loadfetchRM(test));
        } else {
            setAcctNumber('Pending');
        }
    }, [accountPrimarys]);
    useEffect(() => {
        if (fetchRM !== null) {
            setRMDetails(fetchRM);
        } else if (fetchRMErrorMessages !== null) {
            setRMDetails(fetchRMErrorMessages);
        }
    }, [fetchRM, fetchRMErrorMessages]);
    useEffect(() => {
        dispatch(getBeneficiariesData());
    }, [deleteBeneficiaries, postBeneficiaries]);
    useEffect(() => {
        if (getBeneficiaries !== null) {
            setBeneficiaries(getBeneficiaries);
        }
    }, [getBeneficiaries]);
    useEffect(() => {
        dispatch(getAirtimeBeneficiariesData());
    }, [deleteAirtimeBeneficiaries, postAirtimeBeneficiaries]);
    useEffect(() => {
        if (getAirtimeBeneficiaries !== null) {
            setAirtimeBeneficiaries(getAirtimeBeneficiaries);
        }
    }, [getAirtimeBeneficiaries]);
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
        if (deleteAirtimeBeneficiaries !== null) {
            dispatch(getAirtimeBeneficiariesData());
        }
    }, [deleteAirtimeBeneficiaries]);

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
    const setTransactionPinAction = (data) => {
        setLoading(true);
        dispatch(loadsetTransactionPin(data));
    };
    const profileData = [
        {
            text: 'View Profile',
            icon: <EditProfileSvg />,
            color: '#7A7978'
        },
        userProfileData.hasSetTransactionPin === true
            ? ''
            : {
                  text: 'Set Transaction Pin',
                  icon: <ManageSignSvg />,
                  color: '#7A7978'
              },
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
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCountryNames({
                affiliateCode: 'ENG',
                baseCurrency: 'NGN',
                countryCode: '234',
                flags: {
                    svg: 'https://flagcdn.com/ng.svg',
                    png: 'https://flagcdn.com/w320/ng.png'
                },
                name: 'Nigeria'
            });
        }
    }, []);
    //console.log(countryNames.flags.svg);
    const types = (type) => {
        setOutType(type);
    };
    const typed = (type) => {
        setOutTyped(type);
    };
    const pin = (type) => {
        setOutPin(type);
    };
    const pins = (type) => {
        setOutPinn(type);
    };
    useEffect(() => {
        setMessage('');
        const {
            query: { id }
        } = router;
        setLink({ id }.id);
    }, []);
    const deleteAction = () => {
        console.log('test');
    };

    useEffect(() => {
        if (link !== undefined) {
            setText('Set Transaction Pin');
        } else {
            setText('View Profile');
        }
    }, [link]);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();
    useEffect(() => {
        const iframe = iframeRef.current;

        // Add a request header to the iframe
        iframe?.contentWindow.postMessage(
            { type: 'SET_HEADER', header: 'Authorization: Bearer TOKEN' },
            `{"channel":"SME","custId":${userProfile?.profileId},"affiliateCode":"ENG","lastactivedate":1574837056694,"appVersion":"4.0.1","languageCode":"en"}`
        );
    }, []);
    const [openDelete, setOpenDelete] = useState(false);
    const renderForm = () => {
        switch (text) {
            case 'View Profile':
                return (
                    <>
                        <h2 className={styles.title}>View Profile</h2>
                        <div className={styles.profileBodyHead}>
                            <div className={styles.profileBodyHeadImg}>
                                {!userProfileData.profileImg ? null : (
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
                                            !userProfile
                                                ? null
                                                : `${userProfile.lastName} ${userProfile.firstName}`
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
                                            {/* <p>
                                                {countryNames
                                                    ? countryNames.countryCode
                                                    : null}
                                            </p> */}
                                            <input
                                                type="number"
                                                placeholder="812 345 6789"
                                                defaultValue={
                                                    !userProfileData
                                                        ? null
                                                        : userProfileData.phoneNumber
                                                }
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
                                                {error ? (
                                                    <p className={styles.error}>
                                                        {error}
                                                    </p>
                                                ) : null}
                                                <div
                                                    className={styles.formGroup}
                                                >
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Delete Account"
                                                        {...register('delete', {
                                                            required:
                                                                'Input is Required'
                                                        })}
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
                                                            onInput={(e) => {
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
                                                                    ? 'text'
                                                                    : 'password'
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
                                                    {console.log(active)}
                                                    {loading ? (
                                                        <Loader />
                                                    ) : active ? (
                                                        <button type="submit">
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
            //                         type={outType ? 'text' : 'password'}
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
                                        <Visbility
                                            typeSet={types}
                                            input="input"
                                        />
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
                                            <Visbility
                                                typeSet={typed}
                                                input="input"
                                            />
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
            case 'RM Name and Contact Details ':
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
                                        value={RMDetails?.crm?.name}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>RM Phone Number</label>
                                    <InputTag
                                        type="text"
                                        placeholder="081 234 5678"
                                        value={
                                            RMDetails?.crm?.phone === null
                                                ? 'No Phone Number'
                                                : RMDetails?.crm.phone
                                        }
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>RM Email</label>
                                    <InputTag
                                        type="text"
                                        placeholder="081 234 5678"
                                        value={
                                            RMDetails?.crm?.email === null
                                                ? 'No Email'
                                                : RMDetails?.crm.email
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
                                <span> {userProfileData.referralCode}</span>
                            </p>
                            <h5
                                onClick={() => {
                                    {
                                        navigator.clipboard
                                            .writeText(
                                                userProfileData.referralCode
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
            case 'Set Transaction Pin':
                switch (count) {
                    case 0:
                        return (
                            <>
                                <h2 className={styles.title}>
                                    Set Transaction Pin
                                </h2>
                                <form
                                    onSubmit={handleSubmit(
                                        setTransactionPinAction
                                    )}
                                >
                                    <div className={styles.formGroup}>
                                        <label>
                                            Enter your Transaction Pin
                                        </label>
                                        <div className={styles.divs}>
                                            <input
                                                placeholder="Enter your Password"
                                                {...register('transactionPin', {
                                                    required:
                                                        'Transaction Pin is required',
                                                    minLength: {
                                                        value: 6,
                                                        message:
                                                            'Min length is 6'
                                                    },
                                                    maxLength: {
                                                        value: 6,
                                                        message:
                                                            'Max length is 6'
                                                    },
                                                    pattern: {
                                                        value: /^[0-9]/i,
                                                        message:
                                                            'Transaction Pin can only be number '
                                                    }
                                                })}
                                                name="transactionPin"
                                                type={
                                                    outPin ? 'text' : 'password'
                                                }
                                            />
                                            <Visbility
                                                typeSet={pin}
                                                input="input"
                                            />
                                        </div>
                                        <p className={styles.error}>
                                            {errors?.transactionPin?.message}
                                        </p>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Enter your Password</label>
                                        <div className={styles.divs}>
                                            <input
                                                placeholder="Enter your Password"
                                                {...register('password', {
                                                    required:
                                                        'Password is Required'
                                                })}
                                                name="password"
                                                type={
                                                    outPinn
                                                        ? 'text'
                                                        : 'password'
                                                }
                                            />
                                            <Visbility
                                                typeSet={pins}
                                                input="input"
                                            />
                                        </div>
                                        <p className={styles.error}>
                                            {errors?.password?.message}
                                        </p>
                                    </div>
                                    {loading ? (
                                        <Loader />
                                    ) : (
                                        <button>Set Transaction Pin</button>
                                    )}
                                </form>
                            </>
                        );
                }

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
                                    src="Assets/Images/rafiki.jpeg"
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
                                            //console.log(beneData);
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
                                                                // console.log(
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
                                            {userProfileData.referralCode}
                                        </span>
                                    </p>
                                    <h5
                                        onClick={() => {
                                            {
                                                navigator.clipboard
                                                    .writeText(
                                                        userProfileData.referralCode
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
                                    {isLoading ? (
                                        <Lottie
                                            options={socialOptionss}
                                            height={200}
                                            width={200}
                                        />
                                    ) : allDisputes.length === 0 ? (
                                        <>
                                            <h1 className={styles.nodisputes}>
                                                No Disputes have been lodged
                                            </h1>
                                        </>
                                    ) : (
                                        allDisputes
                                            ?.filter((item) => {
                                                const newDate = item.createAt.split(
                                                    'T'
                                                );
                                                return item;
                                            })
                                            ?.map((item, index) => {
                                                console.log(item);
                                                return item;
                                            })
                                    )}
                                </div>
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
                                {!userProfileData.profileImg ? null : (
                                    <Image
                                        src={`data:image/png;base64,${userProfileData.profileImg}`}
                                        width="100%"
                                        height="100%"
                                    />
                                )}
                            </div>
                            <div className={styles.profileBodyHeaderCont}>
                                {/* <h2>Marvelous Solutions</h2> */}
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
                                    <p>{acctNumber}</p>
                                    <h5
                                        onClick={() => {
                                            {
                                                navigator.clipboard
                                                    .writeText(acctNumber)
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
                                                    'RM Name and Contact Details '
                                                ) {
                                                    if (
                                                        RMDetails ===
                                                        'No account details found for customer'
                                                    ) {
                                                        setText('Contact us');
                                                    } else if (
                                                        RMDetails?.crm.name ===
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
        </DashLayout>
    );
};

export default Profile;
