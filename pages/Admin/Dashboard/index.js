import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Visbility from '../../../components/ReusableComponents/Eyeysvg';
import Levelup from '../../../components/ReusableComponents/LevelUp';
import MakePaymentBtn from '../../../components/ReusableComponents/MakePayment';
import PhoneSvg from '../../../components/ReusableComponents/PhoneSvg';
import RecievePaymentBtn from '../../../components/ReusableComponents/RecievePaymnet';
import styles from './styles.module.css';
// import withAuth from '../../components/HOC/withAuth.js';
import Link from 'next/link';
import { AiFillCheckCircle } from 'react-icons/ai';
import { IoMdCopy } from 'react-icons/io';
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
import SingleTrans from '../../../components/ReusableComponents/SingleTransSvg';
import {
    useCreateTransactionPinMutation,
    useGetAcctBalsMutation,
    useGetProfileMutation
} from '../../../redux/api/authApi';
import { setAllAccountInfo } from '../../../redux/slices/allAccountInfoSlice';
import { setProfile } from '../../../redux/slices/profile';
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
    const [balance, setBalance] = useState('********');
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
    const [copyAcctInfo, setCopyAcctInfo] = useState();
    //olayiwola agbje ola_199x
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

    useEffect(() => {
        getAcctBals();
    }, []);

    useEffect(() => {
        if (getAcctBalsSuccess) {
            setAcctNumber(
                getAcctBalsData?.data
                    .filter((account) => account?.isPrimaryAccount === 'Y') // Filter by primary flag
                    .map((account) => account.accountNo)
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
    useEffect(() => {
        setPinCondition(profile?.user?.hasSetTransactionPin);
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

    const { profile } = useSelector((store) => store);

    const handleOtpChange = (otp) => {
        setOtpValue(otp);
    };
    const showToastTransactionPinSuccessMessage = () => {
        toast.success('Transaction Pin Created', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    useEffect(() => {
        getProfile();
    }, []);

    useEffect(() => {
        if (createTransactionPinSuccess) {
            setPinCondition('Y');
            getProfile();
        }
    }, [createTransactionPinSuccess]);
    useEffect(() => {
        if (getProfileSuccess) {
            dispatch(setProfile(getProfileData?.data));

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
            <Levelup account={userProfileData} />
            <div className={styles.cove}>
                <section className={styles.sectionI}>
                    <div className={styles.Tpwh}>
                        <div className={styles.Tpwhflex}>
                            <div>
                                <TotalCollections />
                                <p>Total Outflow</p>
                                <p className={styles.Success}>outflow</p>
                            </div>
                            <div>
                                <TotalPendingCollections />
                                <p>Total Inflow</p>
                                <p className={styles.pending}>inflow</p>
                            </div>
                            <div>
                                <TotlaCollctionsSvg />
                                <p>Total Transaction</p>
                                <p className={styles.filed}>totalMoney</p>
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
                                query: { id: 'airtime or data' }
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

                            {/* {dateState === false ? (
                                <div className={styles.transactionBody}>
                                    <div>
                                        <div className={styles.transactionSvg}>
                                            <TransactionSvg />
                                        </div>
                                        <p>
                                            No transactions has been made today.
                                        </p>
                                    </div>
                                </div>
                            ) : ( */}
                            <div>
                                <div className={styles.transaction}>
                                    <div className={styles.type}>
                                        <p>transactionType</p>
                                    </div>
                                    <div className={styles.money}>
                                        <p>formattedAmount</p>
                                    </div>
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
                                        <div className={styles.statusColor}>
                                            <p>transactionStatus </p>
                                        </div>
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
                                                <h1>{balance}</h1>
                                                <Visbility
                                                    color="green"
                                                    // typeSet={types}
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
                                                <div
                                                    onClick={copyAccountNumber}
                                                >
                                                    <IoMdCopy
                                                        className={
                                                            styles.mdCopy
                                                        }
                                                    />
                                                </div>
                                            </div>
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
                            <div
                                className={styles.addAccount}
                                // onClick={openAddAccountModal}
                            >
                                +
                            </div>
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
                                                            <p>
                                                                {account?.availableBal.toLocaleString()}
                                                            </p>
                                                        </div>
                                                        <div
                                                            className={
                                                                account?.isPrimaryAccount ===
                                                                'Y'
                                                                    ? styles.success
                                                                    : styles.nothing
                                                            }
                                                        >
                                                            <AiFillCheckCircle />
                                                        </div>
                                                    </>
                                                );
                                            })}

                                        <hr className={styles.accountHr} />
                                    </>
                                )}
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
                            {/* {isLoading ? (
                                <Lottie
                                    options={socialOptions}
                                    height={200}
                                    width={200}
                                />
                            ) : (
                                tableDetails.map((item) => {
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
                            )} */}
                            {/* <TransactionStatus
                                success={success}
                                failed={failed}
                                pending={pending}
                            />
                            {tableDetails.length == 0 ? (
                                <div className={styles.transactionBody}>
                                    <div>
                                        <div className={styles.transactionSvg}>
                                            <TransactionSvg />
                                        </div>
                                        <p>
                                            No transactions has been made, click
                                            on make payment to get started.
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
                                        //  //console.log(item);
                                        const formatter = new Intl.NumberFormat(
                                            'en-US',
                                            {
                                                style: 'currency',
                                                currency: 'NGN',
                                                currencyDisplay: 'narrowSymbol'
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
                                            <> */}
                            {width >= 950 ? (
                                <div>
                                    <div className={styles.transaction}>
                                        <div className={styles.names}>
                                            {/* //             {item.paymentDirection === */}
                                            {/* //             'CREDIT' ? (
                                                    //                 <p>Self</p>
                                                    //             ) : (
                                                    //                 <p>
                                                    //                     {newBeneficiary ===
                                                    //                     ''
                                                    //                         ? item.transactionType.replace(
                                                    //                               '_',
                                                    //                               ' '
                                                    //                           ) ===
                                                    //                           'BILL PAYMENT'
                                                    //                             ? item.billerCode
                                                    //                             : ''
                                                    //                         : newBeneficiary[1] ===
                                                    //                           undefined
                                                    //                         ? newBeneficiary[0]
                                                    //                         : `${newBeneficiary[0]} ${newBeneficiary[1]}`}
                                                    //                 </p>
                                                    //             )}  */}
                                            {/* </div>
                                                            <div
                                                                className={
                                                                    styles.type
                                                                }
                                                            >
                                                                <p>
                                                                    item
                                                                </p>
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.money
                                                                }
                                                            >
                                                                <p>
                                                                  
                                                                </p>
                                                            </div>
                                                            <div
                                                                className={
                                                                    // item.transactionStatus ===
                                                                    // 'PENDING'
                                                                    //     ? styles.pending
                                                                    //     : item.transactionStatus ===
                                                                    //       'FAILED'
                                                                    //     ? 
                                                                        styles.failed
                                                                        // : styles.success
                                                                }
                                                            >
                                                                <div
                                                                    className={
                                                                        styles.statusColor
                                                                    }
                                                                >
                                                                    <p>
                                                                        
                                                                            item.transactionStatus
                                                                        
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.more
                                                                }
                                                            >
                                                                {/* <MoreAction
                                                                    isaccountId={
                                                                        item.sourceAccountId
                                                                    }
                                                                    isDirection={
                                                                        item.paymentDirection
                                                                    }
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
                                                                    dateTrans={
                                                                        item.transactionDate
                                                                    }
                                                                /> */}
                                        </div>
                                    </div>
                                    <hr className={styles.hr} />
                                </div>
                            ) : (
                                <>
                                    <div className={styles.mobileTable}>
                                        <div>
                                            <div className={styles.typeMobile}>
                                                <p>item</p>
                                            </div>
                                            <div>
                                                {/* {item.paymentDirection ===
                                                                    'CREDIT' ? (
                                                                        <p>
                                                                            Self
                                                                        </p>
                                                                    ) : (
                                                                        <p
                                                                            className={
                                                                                styles.mobileP
                                                                            }
                                                                        >
                                                                            {newBeneficiary ===
                                                                            ''
                                                                                ? item.transactionType.replace(
                                                                                      '_',
                                                                                      ' '
                                                                                  ) ===
                                                                                  'BILL PAYMENT'
                                                                                    ? item.billerCode
                                                                                    : ''
                                                                                : newBeneficiary[1] ===
                                                                                  undefined
                                                                                ? newBeneficiary[0]
                                                                                : `${newBeneficiary[0]} ${newBeneficiary[1]}`}
                                                                        </p> */}
                                                {/* )} */}
                                            </div>
                                        </div>
                                        <div className={styles.mobileStatus}>
                                            <div
                                                className={
                                                    // item.transactionStatus ===
                                                    // 'PENDING'
                                                    //     ? styles.pending
                                                    //     : item.transactionStatus ===
                                                    //       'FAILED'
                                                    //     ?
                                                    styles.failed
                                                    // : styles.success
                                                }
                                            >
                                                <div>
                                                    <div
                                                        className={
                                                            styles.statusColor
                                                        }
                                                    >
                                                        <p>transactionStatus</p>
                                                    </div>
                                                    <div
                                                        className={styles.money}
                                                    >
                                                        <p>formattedAmount</p>
                                                    </div>
                                                </div>
                                                {/* <MoreAction
                                                                        isaccountId={
                                                                            item.sourceAccountId
                                                                        }
                                                                        isDirection={
                                                                            item.paymentDirection
                                                                        }
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
                                                                        dateTrans={
                                                                            item.transactionDate
                                                                        }
                                                                    /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <hr className={styles.hrMobile} />
                                </>
                            )}

                            <div className={styles.seeAll}>
                                <Link href="/Admin/Reports">See All</Link>
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
                </section>
            </div>
        </div>
    );
};

// export default withAuth(Dashboard);
export default Dashboard;
