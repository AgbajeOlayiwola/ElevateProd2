import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Visbility from '../../../components/ReusableComponents/Eyeysvg';
import MakePaymentBtn from '../../../components/ReusableComponents/MakePayment';
import PhoneSvg from '../../../components/ReusableComponents/PhoneSvg';
import styles from './styles.module.css';
// import withAuth from '../../components/HOC/withAuth.js';
import Link from 'next/link';
import { AiFillCheckCircle } from 'react-icons/ai';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { IoMdCopy } from 'react-icons/io';
import { MdCancel } from 'react-icons/md';
import Lottie from 'react-lottie';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ButtonComp } from '../../../components';
import Addaccounts from '../../../components/ReusableComponents/Addaccounts';
import BulkTransfer2 from '../../../components/ReusableComponents/BulkTransfSvg/bulktrans';
import Loader from '../../../components/ReusableComponents/Loader';
import socialdata from '../../../components/ReusableComponents/Lotties/loading.json';
import OtpInput from '../../../components/ReusableComponents/Otpinput';
import Overlay from '../../../components/ReusableComponents/Overlay';
import BillSvg from '../../../components/ReusableComponents/ReusableSvgComponents/BillSvg';
import TotalPendingCollections from '../../../components/ReusableComponents/ReusableSvgComponents/TotalPendingCollectionsSvg';
import TotalCollections from '../../../components/ReusableComponents/ReusableSvgComponents/Totalcollections';
import TotlaCollctionsSvg from '../../../components/ReusableComponents/ReusableSvgComponents/TotlaCollectionsFailedSvg';
import TransactionSvg from '../../../components/ReusableComponents/ReusableSvgComponents/TransactionSvg';
import SingleTrans from '../../../components/ReusableComponents/SingleTransSvg';
import TransactionStatus from '../../../components/ReusableComponents/TransactionStatus';
import AddExistinAccount from '../../../components/layout/Addaccount/AddExistingAccount';
import SelectOption from '../../../components/layout/Addaccount/SelectOption';
import StepThreeCompleteProfile1 from '../../../components/layout/NotRegisteredForms/StepThreeCompleteProfile1';
import {
    useCreateTransactionPinMutation,
    useGetAcctBalsMutation,
    useGetIdMutation,
    useGetProfileMutation,
    useSetPrimaryAcctMutation,
    useTransactionHistoryMutation,
    useTransactionsSummaryMutation
} from '../../../redux/api/authApi';
import { setAllAccountInfo } from '../../../redux/slices/allAccountInfoSlice';
import { setProfile } from '../../../redux/slices/profile';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: 'block',
                width: '63px',
                fontSize: '35px',
                boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.31)'
            }}
            onClick={onClick}
        />
    );
}
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'none', background: 'green' }}
            onClick={onClick}
        />
    );
}

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 9000,
    autoplaySpeed: 2000,
    cssEase: 'linear'
};

const Dashboard = () => {
    const dispatch = useDispatch();
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN',
        currencyDisplay: 'narrowSymbol'
    });
    const router = useRouter();
    const [outType, setOutType] = useState();
    const [time, setTime] = useState();
    const [rangeDate, setRangeDate] = useState();
    let success = 0;
    let pending = 0;
    let failed = 0;
    const [accountUpgrade, setAccountUpgrade] = useState(true);
    const [addAcct, setAddAcct] = useState(false);
    const affiliate = localStorage.getItem('affiliateCode');
    const [balance, setBalance] = useState(0.0);
    const { profile } = useSelector((store) => store);
    console.log(profile);
    const [isCopied, setIsCopied] = useState(false);
    const [acctNumber, setAcctNumber] = useState('');
    const [currency, setCurrency] = useState();
    const [copyAcctInfo, setCopyAcctInfo] = useState();
    const [alert, setAlert] = useState(false);
    //olayiwola agbje ola_199x
    const [page, setPage] = useState(0);
    const [
        getAcctBals,
        {
            data: getAcctBalsData,
            isLoading: getAcctBalsLoad,
            isSuccess: getAcctBalsSuccess,
            isError: getAcctBalsFalse,
            error: getAcctBalsErr,
            reset: getAcctBalsReset
        }
    ] = useGetAcctBalsMutation();
    const [
        getId,
        {
            data: getIdData,
            isLoading: getIdLoad,
            isSuccess: getIdSuccess,
            isError: getIdFalse,
            error: getIdErr,
            reset: getIdReset
        }
    ] = useGetIdMutation();
    const [
        setPrimaryAcct,
        {
            data: setPrimaryAcctData,
            isLoading: setPrimaryAcctLoad,
            isSuccess: setPrimaryAcctSuccess,
            isError: setPrimaryAcctFalse,
            error: setPrimaryAcctErr,
            reset: setPrimaryAcctReset
        }
    ] = useSetPrimaryAcctMutation();
    const [
        transactionHistory,
        {
            data: transactionHistoryData,
            isLoading: transactionHistoryLoad,
            isSuccess: transactionHistorySuccess,
            isError: transactionHistoryFalse,
            error: transactionHistoryErr,
            reset: transactionHistoryReset
        }
    ] = useTransactionHistoryMutation();
    const showToastAddSuccessMessage = () => {
        toast.success('Account number successfully added', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const conditionalComponent = () => {
        switch (page) {
            case 0:
                return (
                    <SelectOption
                        moveToAddNew={() => setPage(1)}
                        moveToAddExisting={() => setPage(2)}
                    />
                );
            case 1:
                return (
                    <AddExistinAccount
                        id={getIdData?.data?.customerId}
                        close={() => {
                            setAddAcct((prev) => !prev),
                                showToastAddSuccessMessage();
                        }}
                    />
                );
            case 2:
                return (
                    <StepThreeCompleteProfile1
                        type={
                            profile?.user?.customerCategory === 'INDIVIDUAL'
                                ? true
                                : false
                        }
                    />
                );
        }
    };

    useEffect(() => {
        getAcctBals();
        transactionsSummary(null);
    }, []);
    useEffect(() => {
        if (setPrimaryAcctSuccess) {
            getAcctBals();
        }
    }, [setPrimaryAcctSuccess]);

    useEffect(() => {
        if (getAcctBalsSuccess) {
            setAcctNumber(
                getAcctBalsData?.data
                    .filter((account) => account?.isPrimaryAccount === 'Y') // Filter by primary flag
                    .map((account) => account.accountNo)
                    .filter(Boolean)
            );
            setCurrency(
                getAcctBalsData?.data
                    .filter((account) => account?.isPrimaryAccount === 'Y') // Filter by primary flag
                    .map((account) => account.currency)
                    .filter(Boolean)
            );
            setBalance(
                getAcctBalsData?.data
                    .filter((account) => account?.isPrimaryAccount === 'Y') // Filter by primary flag
                    .map((account) => account?.availableBal)
                    .filter(Boolean)
            );
            dispatch(setAllAccountInfo(getAcctBalsData?.data));
        }
        if (acctNumber) {
            getId({
                accountNo: acctNumber[0]
            });
        }
    }, [getAcctBalsSuccess]);
    const socialOptions = {
        loop: true,
        autoplay: true,
        animationData: socialdata,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const getCurrentDate = () => {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        setTime(
            `${year}-${month < 10 ? `0${month}` : `${month}`}-${
                date < 10 ? `0${date}` : `${date}`
            }`
        );
    };
    const getDateXDaysAgo = (numOfDays, date = new Date()) => {
        const daysAgo = new Date();

        daysAgo.setDate(date.getDate() - numOfDays);
        let dates = daysAgo.getDate();
        let month = daysAgo.getMonth() + 1;
        let year = daysAgo.getFullYear();
        setRangeDate(
            `${year}-${month < 10 ? `0${month}` : `${month}`}-${
                dates < 10 ? `0${dates}` : `${dates}`
            }`
        );
    };

    const [previousRoute, setPreviousRoute] = useState('');
    useEffect(() => storePathValues, [router.asPath]);
    function storePathValues() {
        const storage = globalThis?.sessionStorage;
        if (!storage) return;
        // Set the previous path as the value of the current path.
        var prevPath = storage.getItem('currentPath');
        storage.setItem('prevPath', prevPath);
        // Set the current path value by looking at the browser's location object.
        storage.setItem('currentPath', globalThis.location.pathname);
        setPreviousRoute(prevPath);
        // //console.log(prevPath);
    }
    const [pinCondition, setPinCondition] = useState();
    const current = new Date();

    const copyAccountNumber = () => {};
    const [overlay, setOverlay] = useState(false);
    const openAddAccountModal = () => {
        setOverlay(true);
    };
    // resize the screen
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        console.log(width);
    };
    const types = (type) => {
        setOutType(type);
    };
    useEffect(() => {
        setPinCondition(profile?.user?.hasSetTransactionPin);
        transactionHistory({
            limit: 12,
            fromDate: '',
            toDate: '',
            order: 'DESC',
            filter: {
                type: '',
                field: '',
                value: ''
            }
        });
    }, []);

    useEffect(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, [width]);

    // resize the screen
    const [
        createTransactionPin,
        {
            data: createTransactionPinData,
            isLoading: createTransactionPinLoad,
            isSuccess: createTransactionPinSuccess,
            isError: createTransactionPinFalse,
            error: createTransactionPinErr,
            reset: createTransactionPinReset
        }
    ] = useCreateTransactionPinMutation();
    const [
        transactionsSummary,
        {
            data: transactionsSummaryData,
            isLoading: transactionsSummaryLoad,
            isSuccess: transactionsSummarySuccess,
            isError: transactionsSummaryFalse,
            error: transactionsSummaryErr,
            reset: transactionsSummaryReset
        }
    ] = useTransactionsSummaryMutation();
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
    const [otpValue, setOtpValue] = useState('');

    const handleOtpChange = (otp) => {
        setOtpValue(otp);
    };
    const showToastTransactionPinSuccessMessage = () => {
        toast.success('Transaction Pin Created', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    useEffect(() => {
        getProfile(null);
    }, []);
    useEffect(() => {
        if (getProfileSuccess) {
            dispatch(setProfile(getProfileData));
        }
    }, [getProfileSuccess]);
    useEffect(() => {
        if (createTransactionPinSuccess) {
            setPinCondition('Y');
            getProfile(null);
        }
    }, [createTransactionPinSuccess]);
    useEffect(() => {
        if (getProfileSuccess) {
            dispatch(setProfile(getProfileData));
            showToastTransactionPinSuccessMessage();
        }
    }, [getProfileSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();
        createTransactionPin({
            transactionPin: otpValue
        });
    };

    console.log(profile);
    return (
        <div className={styles.statementCover}>
            <ToastContainer />
            {addAcct ? (
                <div className={styles.overlay}>
                    <div className={styles.overlayBg}>
                        <div className={styles.back}>
                            <p>
                                <FaArrowLeftLong onClick={() => setPage(0)} />
                            </p>
                            <p
                                onClick={() => {
                                    setAddAcct((prev) => !prev), setPage(0);
                                }}
                            >
                                <MdCancel />{' '}
                            </p>
                        </div>
                        {conditionalComponent()}
                    </div>
                </div>
            ) : null}
            {pinCondition === 'N' ? (
                <div className={styles.overlay}>
                    <form onSubmit={handleSubmit} className={styles.handleForm}>
                        <div className={styles.inner}>
                            <div className={styles.inn}>
                                {createTransactionPinErr ? (
                                    <p className={styles.error}>
                                        Error Setting Transaction Pin
                                    </p>
                                ) : null}
                                <h3>Create a transaction pin</h3>
                                <div className={styles.trans}>
                                    <OtpInput
                                        onOtpChange={handleOtpChange}
                                        otpfields={6}
                                    />
                                </div>
                                <ButtonComp
                                    text="Create Transaction Pin"
                                    type="submit"
                                    disabled={true}
                                    active={'active'}
                                    loads={
                                        getProfileLoad ||
                                        createTransactionPinLoad
                                    }
                                />
                            </div>
                        </div>
                    </form>
                </div>
            ) : null}
            {/* <Levelup account={userProfileData} /> */}
            <div className={styles.cove}>
                <section className={styles.sectionI}>
                    <div className={styles.Tpwh}>
                        <div className={styles.Tpwhflex}>
                            <div>
                                <TotalCollections />
                                <p>Total Outflow</p>
                                <p className={styles.Success}>
                                    {getSymbolFromCurrency(
                                        countryToCurrency[
                                            `${affiliate?.substring(1)}`
                                        ]
                                    )}
                                    {transactionsSummaryLoad ? (
                                        <Loader />
                                    ) : (
                                        parseFloat(
                                            transactionsSummaryData?.data
                                                ?.total_outflow || 0
                                        ).toLocaleString('en-US')
                                    )}
                                </p>
                            </div>
                            <div>
                                <TotalPendingCollections />
                                <p>Total Inflow</p>
                                <p className={styles.pending}>
                                    {getSymbolFromCurrency(
                                        countryToCurrency[
                                            `${affiliate?.substring(1)}`
                                        ]
                                    )}
                                    {transactionsSummaryLoad ? (
                                        <Loader />
                                    ) : (
                                        parseFloat(
                                            transactionsSummaryData?.data
                                                ?.total_inflow || 0
                                        ).toLocaleString('en-US')
                                    )}
                                </p>
                            </div>
                            <div>
                                <TotlaCollctionsSvg />
                                <p>Total Transaction</p>
                                <p className={styles.filed}>
                                    {getSymbolFromCurrency(
                                        countryToCurrency[
                                            `${affiliate?.substring(1)}`
                                        ]
                                    )}
                                    {transactionsSummaryLoad ? (
                                        <Loader />
                                    ) : (
                                        parseFloat(
                                            transactionsSummaryData?.data
                                                ?.total_transaction_amount || 0
                                        ).toLocaleString('en-US')
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.otherTrans}>
                        <p>Quick Transaction</p>
                    </div>
                    <div className={styles.divCover}>
                        <Link
                            href={{
                                pathname: '/Admin/Payment',
                                query: { id: 'Single Transfer' }
                            }}
                        >
                            <div className={styles.dinCLass}>
                                <div className={styles.svg}>
                                    <SingleTrans />
                                </div>
                                <p className={styles.name}>Single Transfer</p>
                            </div>
                        </Link>
                        <Link
                            href={{
                                pathname: '/Admin/Payment',
                                query: { id: 'airtime or data' }
                            }}
                        >
                            <div className={styles.dinCLass}>
                                <div className={styles.svg}>
                                    <PhoneSvg />
                                </div>
                                <p className={styles.name}> Airtime & Data</p>
                            </div>
                        </Link>
                        <Link
                            href={{
                                pathname: '/Admin/Payment',
                                query: { id: 'bills payment' }
                            }}
                        >
                            <div className={styles.dinCLass}>
                                <div className={styles.svg}>
                                    <BillSvg />
                                </div>
                                <p className={styles.name}>Bills Payment</p>
                            </div>
                        </Link>
                        <Link
                            href={{
                                pathname: '/Admin/Payment',
                                query: { id: 'Bulk Transfer' }
                            }}
                        >
                            <div className={styles.dinCLass}>
                                <div className={styles.svg}>
                                    <BulkTransfer2 />
                                </div>
                                <p className={styles.name}>Bulk Transfer</p>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.btmI}>
                        <div className={styles.btmItop}>
                            <h2 className={styles.transP}>
                                Transactions Today
                            </h2>
                            <div className={styles.transactionSvg}>
                                <TransactionSvg />
                                <p>No transactions have been done</p>
                            </div>
                            {/* {dateState === false ? (
                                <div className={styles.transactionBody}>
                                    <div>
                                        <div className={styles.transactionSvg}>
                                        
                                        </div>
                                        <p>
                                            No transactions has been made today.
                                        </p>
                                    </div>
                                </div>
                            ) : ( */}

                            <div>
                                <div className={styles.transaction}>
                                    <p className={styles.noTrans}>
                                        No Transactions Have Been Performed
                                        Today
                                    </p>
                                    {/* <div className={styles.type}>
                                        <p>transactionType</p>
                                    </div> */}
                                    {/* <div className={styles.money}>
                                        <p>formattedAmount</p>
                                    </div> */}
                                    <div
                                    // className={
                                    //     item.transactionStatus ===
                                    //     'PENDING'
                                    //         ? styles.pending
                                    //         : item.transactionStatus ===
                                    //           'FAILED'
                                    //         ? styles.failed
                                    //         : styles.success
                                    // }
                                    >
                                        {/* <div className={styles.statusColor}>
                                            <p>transactionStatus </p>
                                        </div> */}
                                    </div>
                                </div>

                                <hr className={styles.hr} />
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.sectionII}>
                    <div className={styles.moneyCont}>
                        <div className={styles.card}>
                            <div className={styles.cardRight}>
                                <div className={styles.moneyBody}>
                                    <div className={styles.moneybodyDiv}>
                                        <div>
                                            <div className={styles.cardMone}>
                                                {currency}
                                                {outType ? (
                                                    <h1>********</h1>
                                                ) : (
                                                    <h1>
                                                        {parseFloat(
                                                            balance
                                                        ).toLocaleString(
                                                            'en-US'
                                                        )}
                                                    </h1>
                                                )}
                                                <Visbility
                                                    color="green"
                                                    typeSet={types}
                                                />
                                            </div>
                                            <p className={styles.avail}>
                                                Available Balance
                                            </p>
                                        </div>
                                        <div>
                                            <p
                                                className={
                                                    styles.accountDetails
                                                }
                                            >
                                                Account Number
                                            </p>
                                            <div className={styles.assctDrop}>
                                                <p>{acctNumber}</p>

                                                <div>
                                                    {isCopied ? (
                                                        <div
                                                            className={
                                                                styles.coppied
                                                            }
                                                        >
                                                            Copied!
                                                        </div>
                                                    ) : null}
                                                </div>
                                                {alert ? (
                                                    <p>Copied to Clipboard</p>
                                                ) : (
                                                    <div
                                                        onClick={() => {
                                                            {
                                                                navigator.clipboard
                                                                    .writeText(
                                                                        `Account Name -${profile?.user?.lastName} ${profile?.user?.firstName}
        Account No. - ${acctNumber}
        Bank Name - Ecobank `
                                                                    )
                                                                    .then(
                                                                        () => {
                                                                            setAlert(
                                                                                true
                                                                            );
                                                                            setTimeout(
                                                                                () => {
                                                                                    setAlert(
                                                                                        false
                                                                                    );
                                                                                },
                                                                                1500
                                                                            );
                                                                        }
                                                                    );
                                                            }
                                                        }}
                                                    >
                                                        <IoMdCopy
                                                            className={
                                                                styles.mdCopy
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.recMak}>
                                    {/* <RecievePaymentBtn /> */}
                                    <MakePaymentBtn />
                                </div>
                            </div>
                            <div className={styles.bagMoney}>
                                <img src="/Assets/Images/bagmoney.png" />
                            </div>
                        </div>

                        <div className={styles.otherAccounts}>
                            <h2>Other Accounts</h2>

                            <Overlay overlay={overlay}>
                                <Addaccounts
                                    close={() => {
                                        setOverlay(false);
                                    }}
                                />
                                <Addaccounts
                                    close={() => {
                                        setOverlay(false);
                                    }}
                                />
                            </Overlay>
                            <div className={styles.accountsALl}>
                                {getAcctBalsLoad ? (
                                    <Loader />
                                ) : (
                                    <>
                                        {getAcctBalsData?.data
                                            .filter(
                                                (account) => account.accountNo
                                            )
                                            .map((account) => {
                                                return (
                                                    <>
                                                        <div
                                                            className={
                                                                styles.accntP
                                                            }
                                                        >
                                                            <p
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    setCopyAcctInfo(
                                                                        account?.accountNo
                                                                    );
                                                                }}
                                                            >
                                                                {
                                                                    account?.accountNo
                                                                }
                                                            </p>

                                                            <div
                                                                className={
                                                                    styles.symb
                                                                }
                                                            >
                                                                <p>
                                                                    {
                                                                        account?.currency
                                                                    }
                                                                </p>
                                                                {outType ? (
                                                                    <p>
                                                                        ******
                                                                    </p>
                                                                ) : (
                                                                    <p>
                                                                        {account?.availableBal ===
                                                                        ''
                                                                            ? 0
                                                                            : parseFloat(
                                                                                  account?.availableBal
                                                                              ).toLocaleString(
                                                                                  'en-US'
                                                                              )}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={
                                                                account?.isPrimaryAccount ===
                                                                'Y'
                                                                    ? styles.success
                                                                    : styles.nothing
                                                            }
                                                        >
                                                            <AiFillCheckCircle
                                                                onClick={() => {
                                                                    setPrimaryAcct(
                                                                        {
                                                                            accountNo:
                                                                                account?.accountNo
                                                                        }
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                    </>
                                                );
                                            })}

                                        <hr className={styles.accountHr} />
                                    </>
                                )}
                                <div
                                    className={styles.addAccount}
                                    onClick={setAddAcct}
                                >
                                    Add Account
                                </div>
                            </div>
                        </div>
                    </div>

                    <Slider {...settings}>
                        <div className={styles.sliderImage}>
                            <img
                                src="/Assets/Images/2.png"
                                width={250}
                                height={100}
                            />
                        </div>
                        <div className={styles.sliderImage}>
                            <img
                                src="/Assets/Images/3.png"
                                width={250}
                                height={100}
                            />
                        </div>
                        <div className={styles.sliderImage}>
                            <img
                                src="/Assets/Images/4.png"
                                width={250}
                                height={100}
                            />
                        </div>
                        <div className={styles.sliderImage}>
                            <img
                                src="/Assets/Images/5.png"
                                width={250}
                                height={100}
                            />
                        </div>
                    </Slider>
                    <div className={styles.btm}>
                        <div className={styles.btmII}>
                            <div className={styles.btmIIp}>
                                <p>Recent Transactions</p>
                            </div>

                            {transactionHistoryLoad ? (
                                <Lottie
                                    options={socialOptions}
                                    height={200}
                                    width={200}
                                />
                            ) : (
                                transactionHistoryData?.data.map((item) => {
                                    if (item.transactionStatus === 'SUCCESS') {
                                        success += 1;
                                    } else if (
                                        item.transactionStatus === 'PENDING'
                                    ) {
                                        pending = pending + 1;
                                    } else if (
                                        item.transactionStatus === 'FAILED'
                                    ) {
                                        failed += 1;
                                    }
                                })
                            )}
                            <TransactionStatus
                                success={success}
                                failed={failed}
                                pending={pending}
                            />
                            {transactionHistoryData?.data.length == 0 ? (
                                <div className={styles.transactionBody}>
                                    <div className={styles.transactionSvg}>
                                        <TransactionSvg />
                                        <p>No transactions have been done</p>
                                    </div>
                                </div>
                            ) : (
                                transactionHistoryData?.data
                                    ?.filter((item) => {
                                        const newDate =
                                            item.transactionDate.split('T');
                                        return item;
                                    })
                                    ?.map((item, index) => {
                                        return (
                                            <>
                                                {width >= 950 ? (
                                                    <div>
                                                        <div
                                                            className={
                                                                styles.transaction
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.names
                                                                }
                                                            >
                                                                {/* {item.paymentDirection ===
                                                                'CREDIT' ? (
                                                                    <p>Self</p>
                                                                ) : ( */}
                                                                <p>
                                                                    {item?.transactionType.replace(
                                                                        '_',
                                                                        ' '
                                                                    )}
                                                                </p>
                                                                {/* )} */}
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.type
                                                                }
                                                            >
                                                                <p>
                                                                    {getSymbolFromCurrency(
                                                                        countryToCurrency[
                                                                            `${affiliate?.substring(
                                                                                1
                                                                            )}`
                                                                        ]
                                                                    )}{' '}
                                                                    {parseFloat(
                                                                        item.transactionAmount
                                                                    ).toLocaleString(
                                                                        'en-US'
                                                                    )}
                                                                </p>
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.type
                                                                }
                                                            >
                                                                <p>
                                                                    {
                                                                        item?.beneficiary
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.money
                                                                }
                                                            >
                                                                <p></p>
                                                            </div>
                                                            <div
                                                                className={
                                                                    item.transactionStatus ===
                                                                    'PENDING'
                                                                        ? styles.pending
                                                                        : item.transactionStatus ===
                                                                          'FAILED'
                                                                        ? styles.failed
                                                                        : styles.success
                                                                }
                                                            >
                                                                <div
                                                                    className={
                                                                        styles.statusColor
                                                                    }
                                                                >
                                                                    <p>
                                                                        {
                                                                            item?.transactionStatus
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr
                                                            className={
                                                                styles.hr
                                                            }
                                                        />
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div
                                                            className={
                                                                styles.mobileTable
                                                            }
                                                        >
                                                            <div>
                                                                <div
                                                                    className={
                                                                        styles.typeMobile
                                                                    }
                                                                >
                                                                    <p>
                                                                        {' '}
                                                                        {
                                                                            item?.beneficiary
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p
                                                                        className={
                                                                            styles.mobileP
                                                                        }
                                                                    >
                                                                        {item?.transactionType.replace(
                                                                            '_',
                                                                            ' '
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.mobileStatus
                                                                }
                                                            >
                                                                <div
                                                                    className={
                                                                        item.transactionStatus ===
                                                                        'PENDING'
                                                                            ? styles.pending
                                                                            : item.transactionStatus ===
                                                                              'FAILED'
                                                                            ? styles.failed
                                                                            : styles.success
                                                                    }
                                                                >
                                                                    <div>
                                                                        <div
                                                                            className={
                                                                                styles.statusColor
                                                                            }
                                                                        >
                                                                            <p>
                                                                                {
                                                                                    item?.transactionStatus
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            className={
                                                                                styles.money
                                                                            }
                                                                        >
                                                                            <p>
                                                                                {getSymbolFromCurrency(
                                                                                    countryToCurrency[
                                                                                        `${affiliate?.substring(
                                                                                            1
                                                                                        )}`
                                                                                    ]
                                                                                )}{' '}
                                                                                {parseFloat(
                                                                                    item.transactionAmount
                                                                                ).toLocaleString(
                                                                                    'en-US'
                                                                                )}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr
                                                            className={
                                                                styles.hrMobile
                                                            }
                                                        />
                                                        <div
                                                            className={
                                                                styles.seeAll
                                                            }
                                                        >
                                                            <Link href="/Admin/Reports">
                                                                See All
                                                            </Link>
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        );
                                    })
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

// export default withAuth(Dashboard);
export default Dashboard;
