import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountsInfoCard from '../../../components/ReusableComponents/AccountInfoCard';
import { PaymentData } from '../../../components/ReusableComponents/Data';
import Overlay from '../../../components/ReusableComponents/Overlay';
import PaymentTable from '../../../components/ReusableComponents/PayementTable';
import PaymentCard from '../../../components/ReusableComponents/PaymentCard';
import PaymentSingleBody from '../../../components/ReusableComponents/PaymentSingleBody';
import ReceivePaymentFirst from '../../../components/ReusableComponents/ReceivePaymentFirst';
import ReceivePaymentSecond from '../../../components/ReusableComponents/ReceivePaymentSecond';
import ReceivePaymentThird from '../../../components/ReusableComponents/ReceivePaymentThird';
import RecievePaymentStatus from '../../../components/ReusableComponents/RecievePaymentStatus';
import Share from '../../../components/ReusableComponents/Share';
import UssdFirst from '../../../components/ReusableComponents/UssdFirst';
import VirtualAccountFirst from '../../../components/ReusableComponents/VirtualAccount';
import QrFirst from '../../../components/layout/QrData';
import { loadpaylinkGen } from '../../../redux/actions/paylinkAction';
import { useEnrollQrMutation } from '../../../redux/api/authApi';
import styles from './styles.module.css';
const Collections = () => {
    const router = useRouter();
    const affiliate = localStorage.getItem('affiliateCode');
    const dispatch = useDispatch();
    const [formType, setFormType] = useState();
    // const [formData, setFormdata] = useState({ accountNum: '' });
    // const [ecobank, setEcobank] = useState('true');
    const [overlay, setOverlay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [outType, setOutType] = useState();
    const [paymentDetails, setPaymentDetails] = useState({});
    // const [interEnquiry, setInterEnquiry] = useState({});
    // const [balance, setBalance] = useState('₦ 0.00');
    const [sum, setSum] = useState(0);
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');
    const [link, setLink] = useState('');
    const [track, setTrack] = useState('');
    const [csvData, setCsvData] = useState([]);
    const [recieveLink, setRecieveLink] = useState('');
    // const [senderDetails, setSenderDetails] = useState({});
    const [userProfileData, setUserProfileData] = useState({});
    // const [acctNummber, setAcctNumber] = useState('');
    const [codes, setCodes] = useState('');
    const [errorQr, setErrorQr] = useState('');
    const { profile } = useSelector((store) => store);
    const [acctNummber, setAcctNumber] = useState('');
    const { allAccountInfo } = useSelector((store) => store);

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

    const [
        enrollQr,
        {
            data: enrollQrData,
            isLoading: enrollQrLoad,
            isSuccess: enrollQrSuccess,
            isError: enrollQrFalse,
            error: enrollQrErr,
            reset: enrollQrReset
        }
    ] = useEnrollQrMutation();
    useEffect(() => {
        setAcctNumber(
            allAccountInfo
                .filter((account) => account?.isPrimaryAccount === 'Y') // Filter by primary flag
                .map((account) => account.accountNo)
                .filter(Boolean)
        );
    }, []);
    // console.log(acctNummber[0].toString());
    useEffect(() => {
        const data = {
            email: profile?.user?.email,
            mobileNumber: profile?.user?.phoneNumber,
            merchantName: profile?.user?.firstName,
            merchantAddress: profile?.user?.address,
            area: '',
            city: '',
            accountNumber: acctNummber[0],
            nameOnQrCode: profile?.user?.firstName,

            referalCode: ''
        };
        if (profile?.user?.isQrEnrolled === 'N') {
            enrollQr(data);
        }
    }, [acctNummber]);
    const showSuccessToastMessage = () => {
        toast.success('Successfully Enrolled for QR Payments', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
        // closeAction();
    };
    useEffect(() => {
        if (enrollQrSuccess) {
            showSuccessToastMessage();
        }
    }, [enrollQrSuccess]);

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
    }, [count]);
    useEffect(() => {
        const {
            query: { id }
        } = router;
        setLink({ id }.id);

        setFormType(link.toLowerCase());
        console.log(formType);
    }, []);
    const [merchantInf, setMerchantInfo] = useState();
    const handleFormChange = (formTitle) => {
        // if (userProfileData.hasSetTransactionPin === false) {
        //     //console.log(userProfileData.createdFromEcobankCred);
        //     if (userProfileData.createdFromEcobankCred === false) {
        //         router.push({
        //             pathname: '/AccountUpgrade',
        //             query: { id: 'Transaction Pin' }
        //         });
        //     } else if (userProfileData.createdFromEcobankCred === true) {
        //         router.push({
        //             pathname: '/Admin/Profile',
        //             query: { id: 'Transaction Pin' }
        //         });
        //     }
        // } else if (userProfileData.hasSetTransactionPin === true) {
        setFormType(formTitle);
        setOverlay(true);
        // }
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

    const renderForm = () => {
        switch (formType) {
            case 'Paylink':
                switch (count) {
                    // case 0:
                    //     return (
                    //         <PaylinkStepOne
                    //             overlay={overlay}
                    //             firstTitle="Create Payment Link"
                    //             buttonText="Generate Payment Link"
                    //             closeAction={handleClose}
                    //             action={(data) => {
                    //                 // //console.logdata);
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
                                    // //console.logdata);
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
                                    // //console.logdata);
                                    setCount(count + 2);
                                }}
                                amountPaylink={paymentDetails.amount}
                                payLinkData={paylikSuccess}
                                action={() => setCount(count + 2)}
                                buttonText="Send Paylink"
                                type="Paylinks"
                                closeAction={buttonHandleClose}
                                primary={accountPrimarys.accountId}
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
                                    // //console.logdata);
                                    setCount(count - 1);
                                }}
                                type="PAYMENT_LINK"
                            />
                        );
                    case 3:
                        return (
                            <Share
                                overlay={overlay}
                                link={paylikSuccess?.paymentLink}
                                action={handleClose}
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
                                action={() => {
                                    setCount(count + 1);
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
                                ussdStatusClick={() => {
                                    setCount(5);
                                }}
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
                                    // //console.logdata);
                                    setCount(count - 2);
                                }}
                            />
                        );
                    case 5:
                        return (
                            <RecievePaymentStatus
                                // transactionId={ussdGen?.transactionId}
                                overlay={overlay}
                                action={handleClose}
                                type="USSD"
                                back={(data) => {
                                    // //console.logdata);
                                    setCount(2);
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
                                    // //console.logdata);
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
                                action={() => setCount(count + 1)}
                                error={errorQr}
                            />
                        );
                    case 2:
                        return (
                            <ReceivePaymentSecond
                                overlay={overlay}
                                title="Ecobank QR Code"
                                action={buttonHandleClose}
                                buttonText="Complete"
                                allLink={(data) => {
                                    setCount(count + 1);
                                }}
                                share={() => {
                                    setCount(count + 2);
                                }}
                                type=" Ecobank QR Code"
                                closeAction={buttonHandleClose}
                                primary={acctNummber}
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
                                    // //console.logdata);
                                    setCount(count - 1);
                                }}
                            />
                        );
                    case 4:
                        return (
                            <Share
                                title="ecoQr"
                                overlay={overlay}
                                link={`https://recievepayment.netlify.app/Payments/qr?data=${encodeURIComponent(
                                    generateQrCodeSuccess?.data.data
                                        .dynamicQRBase64
                                )}?ref=${generateQrCodeSuccess?.data.data.ref}`}
                                action={handleClose}
                            />
                        );
                }
            case 'pay via account':
                switch (count) {
                    case 0:
                        return (
                            <VirtualAccountFirst
                                overlay={overlay}
                                firstTitle="Pay via account"
                                buttonText="Next"
                                closeAction={handleClose}
                                action={(data) => {
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <ReceivePaymentFirst
                                overlay={overlay}
                                firstTitle="Pay via account"
                                buttonText="Next"
                                closeAction={handleClose}
                                action={(data) => {
                                    setCount(count + 1);
                                }}
                            />
                        );
                }
            case 'phone Pos':
                switch (count) {
                    case 0:
                        return <VirtualAccountFirst />;
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
        <div className={styles.statementCover}>
            <ToastContainer />
            <div className={styles.allTypes}>
                <div className={styles.cov}>
                    <AccountsInfoCard userProfileData={userProfileData} />
                </div>
                <div className={styles.cov}>
                    <PaymentCard title="Receive Payments" type="receive">
                        {affiliate !== 'ENG'
                            ? PaymentData.receive
                                  .filter((item) => item.text !== 'USSD only')
                                  .map((payType, index) => (
                                      <PaymentSingleBody
                                          data={payType}
                                          key={index}
                                          type="receive"
                                          handleFormChange={handleFormChange}
                                      />
                                  ))
                            : PaymentData.receive.map((payType, index) => (
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
                title="Collections History"
                test={count}
                page="Collections"
            />

            {renderForm()}
        </div>
    );
};

export default Collections;
