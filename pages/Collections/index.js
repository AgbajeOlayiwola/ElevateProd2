import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashLayout from '../../components/layout/Dashboard';
import MakePaymentFirst from '../../components/ReusableComponents/MakePaymentFirst';
import MakePaymentSecond from '../../components/ReusableComponents/MakePaymentSecond';
import PaymentTable from '../../components/ReusableComponents/PayementTable';
import PaymentSuccess from '../../components/ReusableComponents/PaymentSuccess';
import ReceivePaymentFirst from '../../components/ReusableComponents/ReceivePaymentFirst';
import ReceivePaymentSecond from '../../components/ReusableComponents/ReceivePaymentSecond';
import styles from './styles.module.css';
import Image from 'next/image';
import Overlay from '../../components/ReusableComponents/Overlay';
import SchedulePayment from '../../components/ReusableComponents/Schedulepayment';
import Visbility from '../../components/ReusableComponents/Eyeysvg';
import { RWebShare } from 'react-web-share';
import {
    loadussdGen,
    getBalanceEnquiry,
    loadUserProfile,
    loadAccountPrimary,
    generateQrCodeDetails,
    loadpaylinkGen
} from '../../redux/actions/actions';
// import ChartDiv from './chartDivStyled';
// import ChartContent from './chartContentStyled';
import PaymentSingleBody from '../../components/ReusableComponents/PaymentSingleBody';
import PaymentCard from '../../components/ReusableComponents/PaymentCard';
// import PaymentError from '../../components/ReusableComponents/PaymentError';
import { useRouter } from 'next/router';
import { PaymentData } from '../../components/ReusableComponents/Data';
import CloseButton from '../../components/ReusableComponents/CloseButtonSvg';
import PaymentRepeat from '../../components/ReusableComponents/PaymentRepeat';
import ReceivePaymentThird from '../../components/ReusableComponents/ReceivePaymentThird';
import RecievePaymentShare from '../../components/ReusableComponents/ReceivePaymentShare';
import PaylinkStepOne from '../../components/layout/Paylink/StepOne';
import UssdFirst from '../../components/ReusableComponents/UssdFirst';
import Share from '../../components/ReusableComponents/Share';
import QrFirst from '../../components/layout/QrData';
import AccountsInfoCard from '../../components/ReusableComponents/AccountInfoCard';

const Collections = () => {
    const router = useRouter();
    const { accountPrimarys, accountPrimaryError } = useSelector(
        (state) => state.accountPrimaryReducer
    );
    const { ussdGen, errorMessageussdGen } = useSelector(
        (state) => state.ussdGenReducer
    );
    const { ussdStatus, errorMessageussdStatus } = useSelector(
        (state) => state.ussdStatusReducer
    );
    const { balanceEnquiry, errorMessageBalanceEnquiry } = useSelector(
        (state) => state.balanceEnquiryReducer
    );
    const { transactionFees, errorMessageTransactionFees } = useSelector(
        (state) => state.transactionFeesReducer
    );
    const { generateQrCodeSuccess, generateQrCodeError } = useSelector(
        (state) => state.generateQrInfo
    );
    const { paylikSuccess, payLinkerrorMessage } = useSelector(
        (state) => state.payLinkGenReducer
    );

    const { userProfile } = useSelector((state) => state.userProfileReducer);
    const { bankAccounts, bankAccountErrorMessages } = useSelector(
        (state) => state.bankAccountsReducer
    );

    const dispatch = useDispatch();
    const [formType, setFormType] = useState('');
    const [formData, setFormdata] = useState({ accountNum: '' });
    const [ecobank, setEcobank] = useState('true');
    const [overlay, setOverlay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [outType, setOutType] = useState();
    const [paymentDetails, setPaymentDetails] = useState({});
    const [interEnquiry, setInterEnquiry] = useState({});
    const [balance, setBalance] = useState('₦ 0.00');
    const [sum, setSum] = useState(0);
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');
    const [link, setLink] = useState('');
    const [track, setTrack] = useState('');
    const [csvData, setCsvData] = useState([]);
    const [recieveLink, setRecieveLink] = useState('');
    const [senderDetails, setSenderDetails] = useState({});
    const [userProfileData, setUserProfileData] = useState({});
    const [acctNummber, setAcctNumber] = useState('');
    const [codes, setCodes] = useState('');
    const [errorQr, setErrorQr] = useState('');

    let airtimeData;
    let airtimeNetData = {};
    if (typeof window !== 'undefined') {
        airtimeData = window.localStorage.getItem('Airtime');
        airtimeNetData = JSON.parse(airtimeData);
    }
    let desiredPackage;
    let desiredPackageData = {};
    if (typeof window !== 'undefined') {
        desiredPackage = window.localStorage.getItem('DesiredPackage');
        desiredPackageData = JSON.parse(desiredPackage);
    }
    let csvType = [];
    useEffect(() => {
        csvType = JSON.parse(localStorage.getItem('csvData'));
        setCsvData(csvType);
        let x = csvType?.slice(2).reduce((a, b) => {
            return a + b.Amount;
        }, 0);
        setSum(x);
    }, [count]);

    let number;
    let numberofBene = {};
    if (typeof window !== 'undefined') {
        number = window.localStorage.getItem('number');
        numberofBene = JSON.parse(number);
    }
    useEffect(() => {
        dispatch(loadAccountPrimary());
        dispatch(loadUserProfile());
    }, []);
    useEffect(() => {
        if (userProfile !== null) {
            setUserProfileData(userProfile);
        }
    }, [userProfile]);
    useEffect(() => {
        if (balanceEnquiry !== null) {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'NGN',
                currencyDisplay: 'narrowSymbol'
            });
            const formattedAmount = formatter.format(
                balanceEnquiry.availableBalance
            );
            setBalance(formattedAmount);
        }
    }, [balanceEnquiry]);
    //where i need to work on
    useEffect(() => {
        console.log(accountPrimarys);
        console.log(bankAccounts);
        console.log(formData.accountNum);
        setSenderDetails(accountPrimarys);
        console.log(senderDetails);
        Object.keys(bankAccounts)?.map((accountNo) => {
            if (bankAccounts[accountNo].accountNumber == formData.accountNum) {
                // setAcctNumber(accountPrimarys);
                let balanceData;
                balanceData = {
                    accountId: bankAccounts[accountNo].accountId
                };
                setSenderDetails(accountPrimarys.accountId);
                // console.log(senderDetails.accountId);
                dispatch(getBalanceEnquiry(balanceData));
            } else {
                setAcctNumber('Pending');
            }
        });
    }, [formData.accountNum]);
    const ussdGenCheck = () => {
        if (ussdGen !== null) {
            //console.logussdGen);
            setRecieveLink(ussdGen.paymentReference);
            setTrack(ussdGen.transactionId);
            setCount((count) => count + 1);
            // const ussdStatus = {
            //     transactionRef: ussdGen.transactionId
            // };
            // dispatch(loadussdStatus(ussdStatus));
            setIsLoading(false);
            // setStatus('success');
        } else if (errorMessageussdGen !== null) {
            // setCount((count) => count + 1);
            setIsLoading(false);
            setError(errorMessageussdGen.response.data.message);
            console.log(error);
            // setStatus('error');
        }
    };
    const payLinkCheck = () => {
        console.log(paylikSuccess);
        if (paylikSuccess !== null) {
            console.log(paylikSuccess);
            setCount((count) => count + 1);
            setIsLoading(false);
            setStatus('success');
        } else if (payLinkerrorMessage !== null) {
            // setCount((count) => count + 1);
            setIsLoading(false);
            setErrorQr(payLinkerrorMessage.response.data.message[0]);
            setStatus('error');
        }
    };
    useEffect(() => {
        payLinkCheck();
    }, [paylikSuccess, payLinkerrorMessage]);
    const qrCheck = () => {
        if (generateQrCodeSuccess !== null) {
            console.log(generateQrCodeSuccess);
            setCount((count) => count + 1);
            setIsLoading(false);
            setStatus('success');
        } else if (generateQrCodeError !== null) {
            // setCount((count) => count + 1);
            setIsLoading(false);
            setErrorQr(generateQrCodeError.response.data.message);
            setStatus('error');
        }
    };
    useEffect(() => {
        qrCheck();
    }, [generateQrCodeSuccess, generateQrCodeError]);
    useEffect(() => {
        ussdGenCheck();
        // console.log(error.response.data.message[0]);
    }, [ussdGen, errorMessageussdGen]);
    const ussdStatusCheck = () => {
        if (ussdStatus !== null) {
            //console.logussdStatus);
            setCount((count) => count + 1);
            setIsLoading(false);
            // setStatus('success');
        } else if (errorMessageussdStatus !== null) {
            // setCount((count) => count + 1);
            setIsLoading(false);
            setError(errorMessageussdStatus);
            console.log(error);
            // setStatus('error');
        }
    };
    useEffect(() => {
        ussdStatusCheck();
    }, [ussdStatus, errorMessageussdStatus]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [count]);

    useEffect(() => {}, [paymentDetails]);

    useEffect(() => {
        const {
            query: { id }
        } = router;
        setLink({ id }.id);
    });

    useEffect(() => {
        if (link !== undefined) {
            if (userProfileData.hasSetTransactionPin === false) {
                if (userProfileData.createdFromEcobankCred === false) {
                    router.push({
                        pathname: '/AccountUpgrade',
                        query: { id: 'Transaction Pin' }
                    });
                } else if (userProfileData.createdFromEcobankCred === true) {
                    router.push({
                        pathname: '/Profile',
                        query: { id: 'Transaction Pin' }
                    });
                }
            } else if (userProfileData.hasSetTransactionPin === true) {
                setFormType(link.toLowerCase());
                setOverlay(true);
            }
        }
    }, [link]);
    const handleFormChange = (formTitle) => {
        if (userProfileData.hasSetTransactionPin === false) {
            console.log(userProfileData.createdFromEcobankCred);
            if (userProfileData.createdFromEcobankCred === false) {
                router.push({
                    pathname: '/AccountUpgrade',
                    query: { id: 'Transaction Pin' }
                });
            } else if (userProfileData.createdFromEcobankCred === true) {
                router.push({
                    pathname: '/Profile',
                    query: { id: 'Transaction Pin' }
                });
            }
        } else if (userProfileData.hasSetTransactionPin === true) {
            setFormType(formTitle);
            setOverlay(true);
        }
    };
    const handleClose = () => {
        setOverlay(false);
        setFormType('');
        setCount(0);
        setIsLoading(false);
        setPaymentDetails({});
        setError([]);
        setErrorQr([]);
    };

    const buttonHandleClose = () => {
        if (formType === 'mpos') {
            setCount(count + 1);
        } else {
            setOverlay(false);
            setFormType('');
            setCount(0);
            setPaymentDetails({});
            setError([]);
            setErrorQr([]);
        }
    };
    console.log(csvData);
    console.log(sum);

    useEffect(() => {
        setSum(
            csvData?.slice(2).reduce((a, b) => {
                return a + b.Amount;
            }, 0)
        );
    }, [csvData]);
    const [randomString, setRandomString] = useState('');
    function generateRandomString() {
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 10; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }
        return result;
    }

    const bankCode = [
        {
            bankName: 'GTBank',
            bankCode: '*737*',
            bankID: '000'
        },
        {
            bankName: 'First Bank',
            bankCode: '*894*',
            bankID: '000'
        },
        {
            bankName: 'Zenith Bank',
            bankCode: '*966*',
            bankID: '000'
        },
        {
            bankName: 'UBA',
            bankCode: '*919*',
            bankID: '000'
        },
        {
            bankName: 'Stanbic Bank',
            bankCode: '*909*',
            bankID: '000'
        },
        {
            bankName: 'Sterling Bank',
            bankCode: '*822*',
            bankID: '000'
        },
        {
            bankName: 'Unity Bank',
            bankCode: '*7799*',
            bankID: '000'
        },
        {
            bankName: 'Keystone Bank',
            bankCode: '*7111*',
            bankID: '000'
        },
        {
            bankName: 'Fidelity Bank',
            bankCode: '*770*',
            bankID: '000'
        },
        {
            bankName: 'Ecobank',
            bankCode: '*326*',
            bankID: '000'
        },
        {
            bankName: 'Wema Bank',
            bankCode: '*945*',
            bankID: '000'
        },
        {
            bankName: 'Access Bank',
            bankCode: '*901*',
            bankID: '000'
        },
        {
            bankName: 'Access (Diamond )',
            bankCode: '*426*',
            bankID: '000'
        },
        {
            bankName: 'FCMB',
            bankCode: '*329*',
            bankID: '000'
        },
        {
            bankName: 'Heritage Bank',
            bankCode: '*745*',
            bankID: '000'
        },
        {
            bankName: 'Union Bank',
            bankCode: '*826*',
            bankID: '000'
        },
        {
            bankName: 'VFD MFB',
            bankCode: '*5037*',
            bankID: '000'
        },
        {
            bankName: 'Rubies (Highstreet) MFB',
            bankCode: '*7797*',
            bankID: '000'
        },
        {
            bankName: 'Globus bank',
            bankCode: '*989*',
            bankID: '000'
        },
        {
            bankName: 'Kuda Bank',
            bankCode: '*5593*',
            bankID: '000'
        }
    ];
    useEffect(() => {
        if (formType === 'ussd only') {
            bankCode?.filter((item) => {
                if (item.bankName === paymentDetails.bank) {
                    setCodes(
                        item?.bankCode + item?.bankID + '*' + recieveLink + '#'
                    );
                }
            });
        }
        console.log(formType);
    }, [count]);
    const renderForm = () => {
        switch (formType) {
            case 'paylink':
                switch (count) {
                    // case 0:
                    //     return (
                    //         <PaylinkStepOne
                    //             overlay={overlay}
                    //             firstTitle="Create Payment Link"
                    //             buttonText="Generate Payment Link"
                    //             closeAction={handleClose}
                    //             action={(data) => {
                    //                 //console.logdata);
                    //                 setCount(count + 1);
                    //             }}
                    //             createLink={() => setCount(count + 2)}
                    //         />
                    //     );
                    // case 0:
                    //     return (
                    //         <RecievePaymentShare
                    //             overlay={overlay}
                    //             closeAction={handleClose}
                    //         />
                    //     );
                    case 0:
                        return (
                            <ReceivePaymentFirst
                                overlay={overlay}
                                firstTitle="Create Payment Link"
                                buttonText="Generate Payment Link"
                                closeAction={handleClose}
                                action={(data) => {
                                    //console.logdata);
                                    setPaymentDetails(data);
                                    const paylinkData = {
                                        allowPartialPayments: true,
                                        amount: parseInt(
                                            data?.amount,
                                            10
                                        ).toString(),
                                        accountId: accountPrimarys?.accountId,
                                        description: data?.description,
                                        discountPercent: 10,
                                        dueDate: '09-MAR-2096',
                                        minimumPartialAmount: '10000'
                                    };
                                    setIsLoading(true);
                                    dispatch(loadpaylinkGen(paylinkData));
                                }}
                                type="Payment Link"
                            />
                        );
                    case 1:
                        return (
                            <ReceivePaymentSecond
                                overlay={overlay}
                                title="Payment Link Generated"
                                allLink={(data) => {
                                    //console.logdata);
                                    setCount(count + 1);
                                }}
                                amountPaylink={paymentDetails.amount}
                                payLinkData={paylikSuccess}
                                action={buttonHandleClose}
                                buttonText="Send Paylink"
                                type="Paylinks"
                                closeAction={buttonHandleClose}
                            />
                        );

                    case 2:
                        return (
                            <ReceivePaymentThird
                                overlay={overlay}
                                title="View all Payment Links"
                                action={buttonHandleClose}
                                buttonText="Send Paylink"
                                closeAction={(data) => {
                                    //console.logdata);
                                    setCount(count - 1);
                                }}
                                type="PAYMENT_LINK"
                            />
                        );
                }

            case 'ussd only':
                switch (count) {
                    case 0:
                        return (
                            <UssdFirst
                                overlay={overlay}
                                action={() => {
                                    setCount(count + 1);
                                }}
                                closeAction={handleClose}
                                share={() => {
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <ReceivePaymentFirst
                                overlay={overlay}
                                isLoading={isLoading}
                                firstTitle="Create USSD Payment Code"
                                buttonText="Generate USSD Codes"
                                closeAction={handleClose}
                                action={(data) => {
                                    //console.logdata);
                                    setPaymentDetails(data);
                                    const ussdData = {
                                        amount: parseInt(data?.amount, 10),
                                        accountId: accountPrimarys?.accountId,
                                        nameOfPayment: data?.accountName,
                                        paymentDescription: data?.description
                                    };
                                    setIsLoading(true);
                                    dispatch(loadussdGen(ussdData));
                                }}
                                type="USSD String"
                                typeAction={() => {
                                    setCount(count - 1);
                                }}
                                error={error}
                            />
                        );
                    case 2:
                        return (
                            <ReceivePaymentSecond
                                overlay={overlay}
                                amount={paymentDetails.amount}
                                link={codes}
                                allLink={() => {
                                    setCount(4);
                                }}
                                track={track}
                                title="USSD"
                                action={() => {
                                    setCount(count + 1);
                                }}
                                buttonText="Share USSD Code"
                                type="USSD Code"
                                closeAction={buttonHandleClose}
                                info={paymentDetails.description}
                            />
                        );
                    case 3:
                        return (
                            <Share
                                overlay={overlay}
                                link={codes}
                                action={handleClose}
                            />
                        );
                    case 4:
                        return (
                            <ReceivePaymentThird
                                overlay={overlay}
                                title="View all USSD Links"
                                action={buttonHandleClose}
                                buttonText="Send Qr"
                                type="USSD"
                                closeAction={(data) => {
                                    //console.logdata);
                                    setCount(count - 1);
                                }}
                            />
                        );
                }
            case 'ecobank qr only':
                switch (count) {
                    case 0:
                        return (
                            <QrFirst
                                overlay={overlay}
                                moveToNext={(data) => {
                                    //console.logdata);
                                    setCount(count + 1);
                                }}
                                closeAction={buttonHandleClose}
                            />
                        );
                    case 1:
                        return (
                            <ReceivePaymentFirst
                                isLoading={isLoading}
                                overlay={overlay}
                                firstTitle="Create Ecobank QR Code"
                                buttonText="Generate Ecobank QR Codes"
                                closeAction={handleClose}
                                action={(data) => {
                                    //console.logdata);
                                    const generateQrCodeData = {
                                        amount: `${data.amount}`,
                                        productName: `${data.accountName}`,
                                        nameOfPayment: `${data.accountName}`,
                                        productCode: `${generateRandomString()}`,
                                        description: `${data.description}`
                                    };
                                    setIsLoading(true);
                                    dispatch(
                                        generateQrCodeDetails(
                                            generateQrCodeData
                                        )
                                    );
                                }}
                                error={errorQr}
                            />
                        );
                    case 2:
                        return (
                            <ReceivePaymentSecond
                                overlay={overlay}
                                title="Ecobank QR Code"
                                action={buttonHandleClose}
                                buttonText="Next"
                                allLink={(data) => {
                                    //console.logdata);
                                    setCount(count + 1);
                                }}
                                data={generateQrCodeSuccess}
                                type=" Ecobank QR Code"
                                closeAction={buttonHandleClose}
                            />
                        );
                    case 3:
                        return (
                            <ReceivePaymentThird
                                overlay={overlay}
                                title="View all Qr Links"
                                action={buttonHandleClose}
                                buttonText="Send Qr"
                                type="Qr"
                                closeAction={(data) => {
                                    //console.logdata);
                                    setCount(count - 1);
                                }}
                            />
                        );
                }
            case 'phone pos':
                switch (count) {
                    case 0:
                        return (
                            <ReceivePaymentFirst
                                overlay={overlay}
                                firstTitle="Use Mobile POS"
                                buttonText="Next"
                                closeAction={handleClose}
                                action={(data) => {
                                    //console.logdata);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <ReceivePaymentSecond
                                overlay={overlay}
                                title="Confirm mPOS Payment Details"
                                action={buttonHandleClose}
                                buttonText="Activate NFC Scanner"
                                closeAction={buttonHandleClose}
                            />
                        );
                    case 2:
                        return (
                            <Overlay overlay={overlay}>
                                <div className={styles.NFCScanner}>
                                    <h2>
                                        Complete Transaction on Mobile Phone
                                    </h2>
                                    <p>
                                        Note that this will be completed on your
                                        mobile phone which is serving as your
                                        POS.
                                    </p>
                                    <button onClick={buttonHandleClose}>
                                        Activate NFC Scanner
                                    </button>
                                </div>
                            </Overlay>
                            // <SchedulePayment />
                        );
                }

            default:
        }
    };
    const types = (type) => {
        setOutType(type);
    };
    return (
        <DashLayout page="Collections">
            <div className={styles.statementCover}>
                {/* {active && (
                <div className={styles.greencard}>
                    <div className={styles.greencardDetails}>
                        <div>
                            <img
                                src="/Assets/Images/clock.png"
                                width="47px"
                                height="55px"
                            />
                        </div>
                        <div className={styles.detailsText}>
                            <h3>Introducing Scheduled Payments</h3>
                            <p>
                                You can now schedule your transfer for a later
                                time or date by selecting
                                <span> ‘Schedule for later’ </span> when you
                                make payments.
                            </p>
                        </div>
                    </div>
                    <CloseButton
                        color="#A5A5A5"
                        action={() => {
                            setActive(false);
                        }}
                        classes={styles.closeButton}
                    />
                </div>
            )} */}
                <div className={styles.allTypes}>
                    <div className={styles.cov}>
                        <AccountsInfoCard />
                        {/* <div className={styles.balanceButtons}>
                            <div className={styles.first}>
                                <p>Scheduled Payments</p>
                            </div>
                            <div className={styles.second}>
                                <p>Repeat Payments</p>
                            </div>
                        </div> */}
                    </div>
                    <div className={styles.cov}>
                        <PaymentCard title="Receive Payments" type="receive">
                            {PaymentData.receive.map((payType, index) => (
                                <PaymentSingleBody
                                    data={payType}
                                    key={index}
                                    type="receive"
                                    handleFormChange={handleFormChange}
                                />
                            ))}
                        </PaymentCard>
                    </div>
                </div>
                <PaymentTable
                    title="Payment History"
                    test={count}
                    page="Collections"
                />

                {renderForm()}
            </div>
        </DashLayout>
    );
};

export default Collections;
