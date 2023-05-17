import React, { useState, useEffect } from 'react';
import DashLayout from '../../components/layout/Dashboard';
import styles from './styles.module.css';
import Visbility from '../../components/ReusableComponents/Eyeysvg';
import PhoneSvg from '../../components/ReusableComponents/PhoneSvg';
import LoansSvg from '../../components/ReusableComponents/LoansSvg';
import Invoice from '../../components/ReusableComponents/InvoiceSvg';
import MposSvg from '../../components/ReusableComponents/mPOSSvg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { useRouter } from 'next/router';
import 'slick-carousel/slick/slick-theme.css';
import Levelup from '../../components/ReusableComponents/LevelUp';
import LineChart from '../../components/ReusableComponents/Chart/LineChart';
import Piechart from '../../components/ReusableComponents/Chart/Piechart';
import { OtherAccounts } from '../../components/ReusableComponents/Data';
import MakePaymentBtn from '../../components/ReusableComponents/MakePayment';
import RecievePaymentBtn from '../../components/ReusableComponents/RecievePaymnet';
// import withAuth from '../../components/HOC/withAuth.js';
import {
    getBalanceEnquiry,
    loadUserProfile,
    loadAccountPrimary,
    getTransactionElevate,
    bankAccountsData,
    getTransactionHistory,
    getDisputCategOryTypeGen
} from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import TransactionSvg from '../../components/ReusableComponents/ReusableSvgComponents/TransactionSvg';
import EcobankQRSvg from '../../components/ReusableComponents/EcobankQRSvg';
import Ussd from '../../components/ReusableComponents/UssdSvg';
import SingleTrans from '../../components/ReusableComponents/SingleTransSvg';
import PaymentSuccess from '../../components/ReusableComponents/PopupStyle';
import Link from 'next/link';
import Paylink2 from '../../components/ReusableComponents/PaylinkSvg/paylink';
import AccountUpgrade from '../AccountUpgrade';
import withAuth from '../../components/HOC/withAuth';
import Popup from '../../components/layout/Popup';
import DropdownSvg from '../../components/ReusableComponents/ReusableSvgComponents/DropdownSvg';
import TotalCollections from '../../components/ReusableComponents/ReusableSvgComponents/Totalcollections';
import TotalPendingCollections from '../../components/ReusableComponents/ReusableSvgComponents/TotalPendingCollectionsSvg';
import TotlaCollctionsSvg from '../../components/ReusableComponents/ReusableSvgComponents/TotlaCollectionsFailedSvg';
import MoreAction from '../../components/ReusableComponents/MoreAction';
import TransactionStatus from '../../components/ReusableComponents/TransactionStatus';
import { IoMdCopy } from 'react-icons/io';
import Lottie from 'react-lottie';
import socialdata from '../../components/ReusableComponents/Lotties/loading.json';
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
    const [balance, setBalance] = useState('......');
    const [tableDetails, setTableDetails] = useState([]);
    const [userProfileData, setUserProfileData] = useState([]);
    const [dateState, setDateState] = useState(false);
    const [acctNum, setAcctNumm] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [acctNumber, setAcctNumber] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [inflow, setInflow] = useState(formatter.format(0));
    const [outflow, setOutflow] = useState(formatter.format(0));
    const [totalMoney, setTotalMMoney] = useState(formatter.format(0));
    const { transactionElevate, errorMessageTransactionElevate } = useSelector(
        (state) => state.transactionElevateReducer
    );
    const { transactionHistory, errorMessageTransactionHistory } = useSelector(
        (state) => state.transactionHistoryReducer
    );
    const { balanceEnquiry, errorMessageBalanceEnquiry } = useSelector(
        (state) => state.balanceEnquiryReducer
    );
    const { accountPrimarys, accountPrimaryError } = useSelector(
        (state) => state.accountPrimaryReducer
    );
    const { bankAccounts, bankAccountErrorMessages } = useSelector(
        (state) => state.bankAccountsReducer
    );
    const {
        getDisputCategOryTypeSuccess,
        getDisputCategOryTypeErrorMessage
    } = useSelector((state) => state.getDisputeTypeReducer);

    const { userProfile } = useSelector((state) => state.userProfileReducer);

    const types = (type) => {
        setOutType(type);
    };
    const [pageSrchIndex, setPageSrchIndex] = useState(0);
    const [numOfRecords, setNumOfRecords] = useState(10);
    const [disputes, setDisputes] = useState();
    const [acctInfoNum, setAcctInfoNum] = useState();
    const [accountNumberTest, setAccountNumberTest] = useState();
    const [accountBalanceTest, setAccountBalanceTest] = useState();
    useEffect(() => {
        setDisputes(getDisputCategOryTypeSuccess);
    }, [getDisputCategOryTypeSuccess]);

    useEffect(() => {
        setAcctInfoNum(accountPrimarys?.accountNumber);
        let balanceData;
        balanceData = {
            accountId: accountPrimarys?.accountId
        };
        dispatch(getBalanceEnquiry(balanceData));
        // if (balanceEnquiry) {
        //     setAccountBalanceTest(balanceEnquiry?.availableBalance);
        // }
    }, [accountPrimarys]);
    useEffect(() => {
        if (balanceEnquiry !== null) {
            const formattedAmount = formatter.format(
                balanceEnquiry.availableBalance
            );
            setBalance(formattedAmount);
        }
    }, [balanceEnquiry]);
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

    useEffect(() => {
        dispatch(bankAccountsData());
        dispatch(loadAccountPrimary());
        dispatch(loadUserProfile());

        dispatch(getTransactionHistory(pageSrchIndex, numOfRecords));
        getCurrentDate();
        getDateXDaysAgo(2);
        dispatch(getDisputCategOryTypeGen());
    }, []);
    useEffect(() => {
        setAcctNumm(accountPrimarys?.accountNumber);
    }, [accountPrimarys]);
    useEffect(() => {
        Object.keys(bankAccounts)?.map((accountNo) => {
            if (bankAccounts[accountNo].accountNumber === acctNum) {
                setAcctNumber(accountPrimarys);
                let balanceData;
                balanceData = {
                    accountId: bankAccounts[accountNo].accountId
                };
                dispatch(getBalanceEnquiry(balanceData));
            } else {
                setAcctNumber('Pending');
            }
        });
    }, [acctNum]);
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
        //console.log(prevPath);
    }

    useEffect(() => {
        // console.log(accountPrimarys);
        // setAcctNumm(accountPrimarys?.accountNumber);
        // const balanceData = {
        //     accountId: accountPrimarys?.accountId
        // };
        // dispatch(getBalanceEnquiry(balanceData));
        Object.keys(bankAccounts)?.map((accountNo) => {
            if (bankAccounts[accountNo].accountNumber === acctNum) {
                setAcctNumber(accountPrimarys);
                let balanceData;
                balanceData = {
                    accountId: bankAccounts[accountNo].accountId
                };
                dispatch(getBalanceEnquiry(balanceData));
            } else {
                setAcctNumber('Pending');
            }
        });
        if (userProfile !== null) {
            setUserProfileData(userProfile);
        }
        if (userProfile !== null) {
            setUserProfileData(userProfile);
        }

        //console.log('upgrade check', accountUpgrade);
    }, [userProfile, acctNum]);

    const current = new Date();
    const date = `${current.getFullYear()}-${
        current.getMonth() + 1
    }-0${current.getDate()}`;
    useEffect(() => {
        if (transactionHistory !== null) {
            let one = 0;
            let two = 0;
            setIsLoading(false);
            setTableDetails(transactionHistory.transactions);
            transactionHistory.transactions
                .filter((item) => {
                    if (item.paymentDirection === 'CREDIT') {
                        return item;
                    }
                })
                .reduce((a, b) => {
                    setInflow(formatter.format(a));
                    one = a;
                    return a + +b.transactionAmount;
                }, 0);
            transactionHistory.transactions
                .filter((item) => {
                    if (item.paymentDirection === 'DEBIT') {
                        return item;
                    }
                })
                .reduce((a, b) => {
                    setOutflow(formatter.format(a));
                    two = a;
                    return a + +b.transactionAmount;
                }, 0);
            setTotalMMoney(formatter.format(one + two));
            const newDate = transactionHistory.transactions[0]?.transactionDate?.split(
                'T'
            );
            if (newDate[0] == time) {
                setDateState(true);
            } else {
                setDateState(false);
            }

            // tableDetails.data?.map((item) => {
            //     //console.log(item.transactionDate);
            // });
        }
    }, [transactionHistory]);
    console.log(bankAccounts);

    useEffect(() => {}, [pending, success, failed]);
    //console.log(newDate[0]);
    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }
    const copyAccountNumber = () => {
        console.log('copy');
        copyTextToClipboard(`Account Number is ${acctNum} `)
            .then(() => {
                // If successful, update the isCopied state value
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <DashLayout page="Dashboard">
            <div className={styles.statementCover}>
                <Levelup account={userProfileData} />
                <div className={styles.cove}>
                    <section className={styles.sectionI}>
                        <div className={styles.Tpwh}>
                            <div className={styles.Tpwhflex}>
                                <div>
                                    <TotalCollections />
                                    <p>Total Outflow</p>
                                    <p className={styles.Success}>{outflow}</p>
                                </div>
                                <div>
                                    <TotalPendingCollections />
                                    <p>Total Inflow</p>
                                    <p className={styles.pending}>{inflow}</p>
                                </div>
                                <div>
                                    <TotlaCollctionsSvg />
                                    <p>Total</p>
                                    <p className={styles.filed}>{totalMoney}</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.otherTrans}>
                            <p>Quick Transaction</p>
                        </div>
                        <div className={styles.divCover}>
                            <Link
                                href={{
                                    pathname: '/Payment',
                                    query: { id: 'Single Transfer' }
                                }}
                            >
                                <div className={styles.dinCLass}>
                                    <div className={styles.svg}>
                                        <SingleTrans />
                                    </div>
                                    <p className={styles.name}>
                                        Single Transfer
                                    </p>
                                </div>
                            </Link>
                            <Link
                                href={{
                                    pathname: '/Payment',
                                    query: { id: 'Bills Payment' }
                                }}
                            >
                                <div className={styles.dinCLass}>
                                    <div className={styles.svg}>
                                        <PhoneSvg />
                                    </div>
                                    <p className={styles.name}>
                                        {' '}
                                        Airtime & Data
                                    </p>
                                </div>
                            </Link>
                            <Link
                                href={{
                                    pathname: '/Collections',
                                    query: { id: 'Ecobank QR Only' }
                                }}
                            >
                                <div className={styles.dinCLass}>
                                    <div className={styles.svg}>
                                        <EcobankQRSvg />
                                    </div>
                                    <p className={styles.name}>
                                        Ecobank QR Code
                                    </p>
                                </div>
                            </Link>
                            <Link
                                href={{
                                    pathname: '/Collections',
                                    query: { id: 'USSD only' }
                                }}
                            >
                                <div className={styles.dinCLass}>
                                    <div className={styles.svg}>
                                        <Ussd />
                                    </div>
                                    <p className={styles.name}>USSD</p>
                                </div>
                            </Link>
                        </div>
                        <div className={styles.btmI}>
                            <div className={styles.btmItop}>
                                <h2 className={styles.transP}>
                                    Transactions Today
                                </h2>
                                {/* <div className={styles.payEco}>
                            <div className={styles.svgTxt}
                                <div className={styles.svgCov}>
                                    <Paylink2 />
                                </div>
                                <div>
                                    <p className={styles.payp}>Paylink</p>
                                    <h5 className={styles.h5}>₦24,000,000</h5>
                                </div>
                            </div>
                            <div className={styles.svgTxt}>
                                <div className={styles.svgCov}>
                                    <EcobankQRSvg />
                                </div>
                                <div>
                                    <p className={styles.ecop}>Ecobank QR</p>
                                    <h5 className={styles.h5}>₦24,000,000</h5>
                                </div>
                            </div>
                        </div> */}

                                {dateState === false ? (
                                    <div className={styles.transactionBody}>
                                        <div>
                                            <div
                                                className={
                                                    styles.transactionSvg
                                                }
                                            >
                                                <TransactionSvg />
                                            </div>
                                            <p>
                                                No transactions has been made
                                                today.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    tableDetails
                                        ?.filter((item) => {
                                            const newDate = item.transactionDate.split(
                                                'T'
                                            );
                                            return (
                                                newDate[0] >= rangeDate &&
                                                newDate[0] <= time
                                            );
                                        })
                                        ?.map((item, index) => {
                                            const formatter = new Intl.NumberFormat(
                                                'en-US',
                                                {
                                                    style: 'currency',
                                                    currency: 'NGN',
                                                    currencyDisplay:
                                                        'narrowSymbol'
                                                }
                                            );
                                            const formattedAmount = formatter.format(
                                                item.transactionAmount
                                            );
                                            let newBeneficiary;
                                            if (item.receiversName === null) {
                                                newBeneficiary = '';
                                            } else {
                                                newBeneficiary = item?.receiversName?.split(
                                                    ' '
                                                );
                                            }
                                            // {
                                            //     //console.log(item);
                                            // }
                                            return (
                                                <div key={index}>
                                                    <div
                                                        className={
                                                            styles.transaction
                                                        }
                                                    >
                                                        {/* <div className={styles.names}>
                                                    <p>
                                                        {`${newBeneficiary[0]} ${newBeneficiary[1]}`}
                                                    </p>
                                                </div> */}
                                                        <div
                                                            className={
                                                                styles.type
                                                            }
                                                        >
                                                            <p>
                                                                {item.transactionType.replace(
                                                                    '_',
                                                                    ' '
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div
                                                            className={
                                                                styles.money
                                                            }
                                                        >
                                                            <p>
                                                                {
                                                                    formattedAmount
                                                                }
                                                            </p>
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
                                                                        item.transactionStatus
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr className={styles.hr} />
                                                </div>
                                            );
                                        })
                                )}
                            </div>
                        </div>
                        {/* <LineChart />  */}
                    </section>
                    <section className={styles.sectionII}>
                        <div className={styles.moneyCont}>
                            <div className={styles.card}>
                                <div className={styles.cardRight}>
                                    <div className={styles.moneyBody}>
                                        <div className={styles.moneybodyDiv}>
                                            <div>
                                                <div
                                                    className={styles.cardMone}
                                                >
                                                    <h1>
                                                        {outType
                                                            ? '*******'
                                                            : accountBalanceTest
                                                            ? accountBalanceTest
                                                            : balance}
                                                    </h1>
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
                                                <div
                                                    className={styles.assctDrop}
                                                >
                                                    <p>
                                                        {acctInfoNum != null
                                                            ? acctInfoNum
                                                            : acctNum}
                                                    </p>
                                                    {/* <select
                                                        className={
                                                            styles.accountNumbers
                                                        }
                                                        value={acctNum}
                                                        onChange={(e) => {
                                                            setAcctNumm(
                                                                e.target.value
                                                            );
                                                        }}
                                                    >
                                                        <option>
                                                            Select Account
                                                            Number
                                                        </option>
                                                        {Object.keys(
                                                            bankAccounts
                                                        )?.map(
                                                            (
                                                                accountNo,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <>
                                                                        <option
                                                                            value={
                                                                                bankAccounts[
                                                                                    accountNo
                                                                                ]
                                                                                    .accountNumber
                                                                            }
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {
                                                                                bankAccounts[
                                                                                    accountNo
                                                                                ]
                                                                                    .accountNumber
                                                                            }
                                                                        </option>
                                                                    </>
                                                                );
                                                            }
                                                        )}
                                                    </select>{' '} */}
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
                                                    <div
                                                        onClick={
                                                            copyAccountNumber
                                                        }
                                                    >
                                                        <IoMdCopy
                                                            className={
                                                                styles.mdCopy
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                {/* <p className={styles.accountNumber}>
                                                {acctNumber.accountNumber}
                                            </p> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.recMak}>
                                        <RecievePaymentBtn />
                                        <MakePaymentBtn />
                                    </div>
                                </div>
                                <div className={styles.bagMoney}>
                                    <img src="/Assets/Images/bagmoney.png" />
                                </div>
                            </div>

                            <div className={styles.otherAccounts}>
                                <h2>Other Accounts</h2>
                                <div className={styles.accountsALl}>
                                    {bankAccounts?.map((accountNo, index) => {
                                        if (
                                            acctInfoNum ===
                                            accountNo.accountNumber
                                        )
                                            return null;
                                        else if (
                                            acctNum === accountNo.accountNumber
                                        ) {
                                            return null;
                                        } else {
                                            return (
                                                <>
                                                    <div
                                                        key={index}
                                                        className={
                                                            styles.accntP
                                                        }
                                                    >
                                                        <p
                                                            onClick={(e) => {
                                                                setAccountBalanceTest(
                                                                    null
                                                                ),
                                                                    setAcctInfoNum(
                                                                        null
                                                                    ),
                                                                    setAcctNumm(
                                                                        accountNo.accountNumber
                                                                    );
                                                            }}
                                                        >
                                                            {
                                                                accountNo.accountNumber
                                                            }
                                                        </p>
                                                        <p>
                                                            {
                                                                accountNo.customerType
                                                            }{' '}
                                                            Account
                                                        </p>
                                                    </div>
                                                    <hr
                                                        className={
                                                            styles.accountHr
                                                        }
                                                    />
                                                </>
                                            );
                                        }
                                    })}
                                    {/* <div className={styles.otherAccountsDiv}>
                                        <button>+Add New</button>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        <Slider {...settings}>
                            {/* <div>
                                <img src="/Assets/Images/1.png" />
                            </div> */}
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
                                {isLoading ? (
                                    <Lottie
                                        options={socialOptions}
                                        height={200}
                                        width={200}
                                    />
                                ) : (
                                    tableDetails.map((item) => {
                                        if (
                                            item.transactionStatus === 'SUCCESS'
                                        ) {
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
                                {tableDetails.length == 0 ? (
                                    <div className={styles.transactionBody}>
                                        <div>
                                            <div
                                                className={
                                                    styles.transactionSvg
                                                }
                                            >
                                                <TransactionSvg />
                                            </div>
                                            <p>
                                                No transactions has been made,
                                                click on make payment to get
                                                started.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    tableDetails
                                        ?.filter((item) => {
                                            const newDate = item.transactionDate.split(
                                                'T'
                                            );
                                            return item;
                                        })
                                        ?.map((item, index) => {
                                            const formatter = new Intl.NumberFormat(
                                                'en-US',
                                                {
                                                    style: 'currency',
                                                    currency: 'NGN',
                                                    currencyDisplay:
                                                        'narrowSymbol'
                                                }
                                            );
                                            const formattedAmount = formatter.format(
                                                item.transactionAmount
                                            );
                                            let newBeneficiary;
                                            if (item.receiver === null) {
                                                newBeneficiary = '';
                                            } else {
                                                newBeneficiary = item?.receiver?.split(
                                                    ' '
                                                );
                                            }
                                            return (
                                                <div key={index}>
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
                                                            {item.paymentDirection ===
                                                            'CREDIT' ? (
                                                                <p>Self</p>
                                                            ) : (
                                                                <p>
                                                                    {newBeneficiary ===
                                                                    ''
                                                                        ? ''
                                                                        : newBeneficiary[1] ===
                                                                          undefined
                                                                        ? newBeneficiary[0]
                                                                        : `${newBeneficiary[0]} ${newBeneficiary[1]}`}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles.type
                                                            }
                                                        >
                                                            <p>
                                                                {item.transactionType.replace(
                                                                    '_',
                                                                    ' '
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div
                                                            className={
                                                                styles.money
                                                            }
                                                        >
                                                            <p>
                                                                {
                                                                    formattedAmount
                                                                }
                                                            </p>
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
                                                                        item.transactionStatus
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={
                                                                styles.more
                                                            }
                                                        >
                                                            <MoreAction
                                                                transactionAmount={
                                                                    formattedAmount
                                                                }
                                                                transactionStatus={
                                                                    item.transactionStatus
                                                                }
                                                                transactionTitle={
                                                                    item.transactionType
                                                                }
                                                                disputes={
                                                                    disputes
                                                                }
                                                                narration={
                                                                    item.narration
                                                                }
                                                                destinationBank={
                                                                    item.receiver
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <hr className={styles.hr} />
                                                </div>
                                            );
                                        })
                                )}
                                <div className={styles.seeAll}>
                                    <Link href="/Reports">See All</Link>
                                </div>
                            </div>
                            {/* <div className={styles.btmIII}>
                            <p className={styles.paylink}>Other Accounts</p>
                            
                            {OtherAccounts.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={styles.othAccount}
                                    >
                                        <p>{item.ammount}</p>
                                        <p>{item.account}</p>
                                    </div>
                                );
                            })}
                        </div> */}
                        </div>
                        {/* <div className={styles.cards}>
                        <Slider
                            {...settings}
                        >
                            <div>
                                <div className={styles.cardI}>
                                    <div>
                                        <h2>
                                            Explore unlimited possibilities with
                                            Ecobank Digital
                                        </h2>
                                        <p>
                                            <i>
                                                Open your Xpress account
                                                instantly on your mobile
                                            </i>
                                        </p>
                                    </div>
                                    <img src="Assets/Images/beardedman.png" />
                                </div>
                            </div>
                            <div>
                                <div className={styles.cardII}>
                                    <img src="Assets/Images/List.png" />
                                    <div>
                                        <h2>Send an e-Invoice easily</h2>
                                        <p>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit ...
                                        </p>
                                        <p>
                                            <i>Create e-Invoice now {'>'}</i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div> */}
                    </section>
                </div>
                {/* {accountUpgrade ? <h1>sawdrftyu</h1> : null} */}
            </div>
        </DashLayout>
    );
};

// export default withAuth(Dashboard);
export default Dashboard;
