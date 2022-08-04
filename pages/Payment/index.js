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
import {
    postAirtime,
    postInterBank,
    postBills,
    loadbillerPlan,
    postInternalBank,
    postInterBankEnquiry,
    getBalanceEnquiry,
    getBulkTransfer,
    getInternationalTransfer,
    getVerifyCurrency,
    getverifyBank,
    postBeneficiariesData,
    loadbank
} from '../../redux/actions/actions';
import ChartDiv from './chartDivStyled';
import ChartContent from './chartContentStyled';
import PaymentSingleBody from '../../components/ReusableComponents/PaymentSingleBody';
import PaymentCard from '../../components/ReusableComponents/PaymentCard';
// import PaymentError from '../../components/ReusableComponents/PaymentError';
import { useRouter } from 'next/router';
import { PaymentData } from '../../components/ReusableComponents/Data';

const Payment = () => {
    const router = useRouter();

    const { airtime, errorMessageAirtime } = useSelector(
        (state) => state.airtimeReducer
    );
    const { bills, errorMessageBills } = useSelector(
        (state) => state.billsReducer
    );
    const { internalBank, errorMessageInternalBank } = useSelector(
        (state) => state.internalBankReducer
    );
    const { interBank, errorMessageInterBank } = useSelector(
        (state) => state.interBankReducer
    );
    const { interBankEnquiry, errorMessageInterBankEnquiry } = useSelector(
        (state) => state.interBankEnquiryReducer
    );
    const { balanceEnquiry, errorMessageBalanceEnquiry } = useSelector(
        (state) => state.balanceEnquiryReducer
    );
    const { bulkTransfer, errorMessagebulkTransfer } = useSelector(
        (state) => state.bulkTransferReducer
    );
    const {
        internationalTransfer,
        errorMessageinternationalTransfer
    } = useSelector((state) => state.internationalTransferReducer);
    const { verifyBank, errorMessageverifyBank } = useSelector(
        (state) => state.verifyBankReducer
    );
    const { verifyCurrency, errorMessageverifyCurrency } = useSelector(
        (state) => state.verifyCurrencyReducer
    );
    const { billerPlan } = useSelector((state) => state.billerPlanReducer);

    const { postBeneficiaries } = useSelector(
        (state) => state.postBeneficiariesReducer
    );
    const { banks } = useSelector((state) => state.banksReducer);

    const dispatch = useDispatch();
    const [formType, setFormType] = useState('');
    const [overlay, setOverlay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [qr, setqr] = useState('10%');
    const [paylink, setPaylink] = useState('35%');
    const [ussd, setUssd] = useState('25%');
    const [mPOS, setMpos] = useState('30%');
    const [outType, setOutType] = useState();
    const [paymentDetails, setPaymentDetails] = useState({});
    const [interEnquiry, setInterEnquiry] = useState({});
    const [balance, setBalance] = useState('000000.00');
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');
    const [senderDetails, setSenderDetails] = useState({});
    const [bank, setBank] = useState({});
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => {
        updateState({}), [];
        alert('Hello');
    });

    useEffect(() => {
        dispatch(getBalanceEnquiry());
    }, []);
    // useEffect(() => {
    //     dispatch(loadbank('ENG'));
    // }, []);
    // useEffect(() => {
    //     if (banks !== null) {
    //         setBank(banks);
    //     }
    // }, [banks]);
    useEffect(() => {}, [interBank, errorMessageInterBank]);

    useEffect(() => {
        if (balanceEnquiry !== null) {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'NGN',
                currencyDisplay: 'narrowSymbol'
            });
            const formattedAmount = formatter.format(
                balanceEnquiry[0].availableBalance
            );
            setBalance(formattedAmount);
            setSenderDetails(balanceEnquiry[0]);
        }
    }, [balanceEnquiry]);

    useEffect(() => {
        if (interBankEnquiry !== null) {
            setInterEnquiry(interBankEnquiry);
        }
    }, [interBankEnquiry]);
    // useEffect(() => {
    //     if (interBankEnquiry !== null) {
    //         setInterEnquiry(interBankEnquiry);
    //     }
    // }, [interBankEnquiry]);
    // useEffect(() => {
    //     if (interBankEnquiry !== null) {
    //         setInterEnquiry(interBankEnquiry);
    //     }
    // }, [interBankEnquiry]);
    // useEffect(() => {
    //     if (interBankEnquiry !== null) {
    //         setInterEnquiry(interBankEnquiry);
    //     }
    // }, [interBankEnquiry]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [count]);

    useEffect(() => {}, [paymentDetails]);

    useEffect(() => {
        const {
            query: { id }
        } = router;
        if ({ id }.id !== undefined) {
            setFormType({ id }.id.toLowerCase());
            setOverlay(true);
        }
    });

    const handleFormChange = (formTitle) => {
        setFormType(formTitle);
        setOverlay(true);
    };
    const handleClose = () => {
        setOverlay(false);
        setFormType('');
        setCount(0);
    };

    const buttonHandleClose = () => {
        if (formType === 'mpos') {
            setCount(count + 1);
        } else {
            setOverlay(false);
            setFormType('');
            setCount(0);
        }
    };

    const renderForm = () => {
        switch (formType) {
            case 'paylink':
                switch (count) {
                    case 0:
                        return (
                            <ReceivePaymentFirst
                                overlay={overlay}
                                firstTitle="Create Payment Link"
                                buttonText="Generate Paylink"
                                closeAction={handleClose}
                                action={(data) => {
                                    console.log(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <ReceivePaymentSecond
                                overlay={overlay}
                                title="Payment Link Generated"
                                action={buttonHandleClose}
                                buttonText="Share Paylink"
                                type="Paylinks"
                            />
                        );
                }

            case 'ussd only':
                switch (count) {
                    case 0:
                        return (
                            <ReceivePaymentFirst
                                overlay={overlay}
                                firstTitle="Create USSD Payment Code"
                                buttonText="Share USSD code"
                                closeAction={handleClose}
                                action={(data) => {
                                    console.log(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <ReceivePaymentSecond
                                overlay={overlay}
                                title=" USSD "
                                action={buttonHandleClose}
                                buttonText="Share USSD Code"
                                type="USSD Code"
                            />
                        );
                }
            case 'ecobank qr only':
                switch (count) {
                    case 0:
                        return (
                            <ReceivePaymentFirst
                                overlay={overlay}
                                firstTitle="Create Ecobank QR Code"
                                buttonText="Share Ecobank QR Codes"
                                closeAction={handleClose}
                                action={(data) => {
                                    console.log(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <ReceivePaymentSecond
                                overlay={overlay}
                                title=" Ecobank QR Code"
                                action={buttonHandleClose}
                                buttonText="Share Ecobank QR Code"
                                type=" Ecobank QR Codes"
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
                                buttonText="Activate NFC Scanner"
                                closeAction={handleClose}
                                action={(data) => {
                                    console.log(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <ReceivePaymentSecond
                                overlay={overlay}
                                title="Confirm mPOS Payment Details"
                                action={() => {
                                    setCount(count + 1);
                                }}
                                buttonText="Activate NFC Scanner"
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

            case 'single transfer':
                switch (count) {
                    case 0:
                        return (
                            <MakePaymentFirst
                                overlay={overlay}
                                firstTitle="Single Transfer Payment"
                                closeAction={handleClose}
                                buttonText="Send Now"
                                selfaction={(data) => {
                                    console.log(data);
                                    setPaymentDetails(data);
                                    setCount(count + 1);
                                }}
                                othersaction={(data) => {
                                    if (data.bankName !== 'Ecobank') {
                                        const enquiry = {
                                            destinationBankCode: data.bankName,
                                            beneficiaryAccountNo:
                                                data.accountNumber
                                        };
                                        dispatch(postInterBankEnquiry(enquiry));
                                    }

                                    console.log(data);
                                    setPaymentDetails(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <MakePaymentSecond
                                isLoading={isLoading}
                                amount={paymentDetails.amount}
                                recieverName={paymentDetails.accountNumber}
                                sender={paymentDetails.accountName}
                                recieverBank={paymentDetails.bankName}
                                overlay={overlay}
                                transferAction={() => {
                                    // if (paymentDetails.self === 'self') {
                                    // const paymentData = {
                                    //     debitAccountNo: '4262004003',
                                    //     debitAccountType: 'A',
                                    //     creditAccountNo:
                                    //         paymentDetails.accountNumber,
                                    //     creditAccountType: 'A',
                                    //     amount: paymentDetails.amount,
                                    //     ccy: 'NGN'
                                    // };
                                    // dispatch(postInternalBank(paymentData));
                                    // if (internalBank !== null) {
                                    //     console.log(internalBank);
                                    // }
                                    // } else
                                    if (paymentDetails.others === 'others') {
                                        setIsLoading(true);
                                        if (paymentDetails.bene === true) {
                                            const newBene = {
                                                name: interEnquiry.accountName,
                                                accountNumber:
                                                    interEnquiry.accountNo,
                                                bankName:
                                                    // bank.filter(
                                                    //     (item) => {
                                                    //         if (
                                                    //             item.institutionId ===
                                                    //             paymentDetails.bankName
                                                    //         ) {
                                                    //             return item.institutionName;
                                                    //         }
                                                    //     }
                                                    // )
                                                    'Zenith Bank',
                                                bankCode:
                                                    paymentDetails.bankName
                                            };
                                            dispatch(
                                                postBeneficiariesData(newBene)
                                            );
                                        }
                                        if (
                                            paymentDetails.bankName ===
                                            'Ecobank'
                                        ) {
                                            const paymentData = {
                                                debitAccountNo:
                                                    senderDetails.accountNo,
                                                debitAccountType: 'A',
                                                creditAccountNo:
                                                    paymentDetails.accountNumber,
                                                creditAccountType: 'A',
                                                amount: paymentDetails.amount,
                                                ccy: senderDetails.ccy
                                            };
                                            dispatch(
                                                postInternalBank(paymentData)
                                            );
                                            if (internalBank !== null) {
                                                console.log(internalBank);
                                                setCount(count + 1);
                                            } else {
                                                setCount(count + 1);
                                            }
                                        } else {
                                            console.log(interEnquiry);

                                            const paymentData = {
                                                destinationBankCode:
                                                    paymentDetails.bankName,
                                                senderAccountNo:
                                                    senderDetails.accountNo,
                                                senderAccountType: 'A',
                                                senderName:
                                                    'Aderohunmu Matthew',
                                                senderPhone: '2348039219191',
                                                beneficiaryAccountNo:
                                                    interEnquiry.accountNo,
                                                beneficiaryName:
                                                    interEnquiry.accountName,
                                                narration:
                                                    paymentDetails.narration,
                                                amount: paymentDetails.amount,
                                                ccy: senderDetails.ccy
                                            };
                                            dispatch(
                                                postInterBank(paymentData)
                                            );
                                            setTimeout(() => {
                                                forceUpdate();

                                                if (interBank !== null) {
                                                    if (
                                                        interBank.message ===
                                                        'SUCCESS'
                                                    ) {
                                                        console.log(interBank);
                                                        setCount(
                                                            (count) => count + 1
                                                        );
                                                        setIsLoading(false);
                                                        setStatus('success');
                                                    } else if (
                                                        interBank.message !==
                                                        'SUCCESS'
                                                    ) {
                                                        setCount(
                                                            (count) => count + 1
                                                        );
                                                        setIsLoading(false);
                                                        setError(
                                                            interBank.message
                                                        );
                                                        setStatus(error);
                                                    }
                                                } else if (
                                                    errorMessageInterBank !==
                                                    null
                                                ) {
                                                    setCount(
                                                        (count) => count + 1
                                                    );
                                                    setIsLoading(false);
                                                    setStatus(error);
                                                    setError(
                                                        errorMessageInterBank
                                                    );
                                                }
                                            }, 3000);
                                            console.log(errorMessageInterBank);
                                        }
                                    }
                                }}
                            />
                        );
                    case 2:
                        return (
                            <PaymentSuccess
                                statusbar={status}
                                error={error}
                                overlay={overlay}
                                action={() => {
                                    setCount(0);
                                    setOverlay(false);
                                    setFormType('');
                                }}
                                title="Single Transfer Payment"
                                amount={paymentDetails.amount}
                                beneName={paymentDetails.accountNumber}
                            />
                        );
                }

            case 'bulk transfer':
                switch (count) {
                    case 0:
                        return (
                            <MakePaymentFirst
                                overlay={overlay}
                                firstTitle="Bulk Payments"
                                closeAction={handleClose}
                                buttonText="Send Now"
                                action={(data) => {
                                    // const enquiry1 = {
                                    //     destinationBankCode: data.bankName1,
                                    //     beneficiaryAccountNo:
                                    //         data.accountNumber1
                                    // };
                                    // dispatch(postInterBankEnquiry(enquiry1));
                                    // const enquiry2 = {
                                    //     destinationBankCode: data.bankName2,
                                    //     beneficiaryAccountNo:
                                    //         data.accountNumber2
                                    // };
                                    // dispatch(postInterBankEnquiry(enquiry1));
                                    // if (
                                    //     paymentDetails.accountNumber3 !== '' &&
                                    //     paymentDetails.bankName3 !== ''
                                    // ) {
                                    //     const enquiry3 = {
                                    //         destinationBankCode: data.bankName3,
                                    //         beneficiaryAccountNo:
                                    //             data.accountNumber3
                                    //     };
                                    //     dispatch(
                                    //         postInterBankEnquiry(enquiry3)
                                    //     );
                                    // }
                                    // dispatch(postInterBankEnquiry(enquiry1));
                                    // dispatch(postInterBankEnquiry(enquiry2));

                                    setPaymentDetails(data);

                                    console.log(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <MakePaymentSecond
                                amount={paymentDetails.amount}
                                recieverName={paymentDetails.accountNumber}
                                sender={paymentDetails.accountName}
                                recieverBank={paymentDetails.bankName}
                                overlay={overlay}
                                transferAction={() => {
                                    const paymentData = {
                                        senderAccountNo: '1823020500',
                                        senderAccountType: 'A',
                                        senderName: 'Aderohunmu Matthew',
                                        senderPhone: '2348039219191',
                                        destinations: [
                                            {
                                                destinationBankCode:
                                                    'ZENITH-ACC',
                                                beneficiaryAccountNo:
                                                    '2252999745',
                                                beneficiaryName:
                                                    'CHIJIOKE NWANKWO',
                                                narration: 'salary',
                                                // amount: paymentDetails.amount,
                                                amount: '120.00',
                                                ccy: 'NGN'
                                            },
                                            {
                                                destinationBankCode:
                                                    'ZENITH-ACC',
                                                beneficiaryAccountNo:
                                                    '2252999740',
                                                beneficiaryName:
                                                    'CHIJIOKE NWANKWO',
                                                narration: 'salary',
                                                amount: '100.00',
                                                ccy: 'NGN'
                                            }
                                        ]
                                    };
                                    if (
                                        paymentDetails.accountNumber3 !== '' &&
                                        paymentDetails.bankName3 !== ''
                                    ) {
                                        paymentData.destinations.push({
                                            destinationBankCode: 'ZENITH-ACC',
                                            beneficiaryAccountNo: '2252999740',
                                            beneficiaryName: 'CHIJIOKE NWANKWO',
                                            narration: 'salary',
                                            amount: '110.00',
                                            ccy: 'NGN'
                                        });
                                    }
                                    dispatch(getBulkTransfer(paymentData));
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 2:
                        return (
                            <PaymentSuccess
                                overlay={overlay}
                                action={() => {
                                    setCount(0);
                                    setOverlay(false);
                                    setFormType('');
                                }}
                                title="Bulk Payment"
                                amount={paymentDetails.amount}
                            />
                        );
                }

            case 'bills payment':
                switch (count) {
                    case 0:
                        return (
                            <MakePaymentFirst
                                overlay={overlay}
                                firstTitle="Bill Payment"
                                closeAction={handleClose}
                                buttonText="Send Now"
                                action={(data) => {
                                    setPaymentDetails(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        console.log(paymentDetails);
                        return (
                            <MakePaymentSecond
                                recieverName={paymentDetails.billerType}
                                amount={paymentDetails.amount}
                                number={paymentDetails.phoneNumber}
                                title="Bills Payment"
                                recieverBank={paymentDetails.billerCategory}
                                sender={paymentDetails.billerPlan}
                                refNuber={paymentDetails.billerDetail}
                                overlay={overlay}
                                transferAction={() => {
                                    if (
                                        paymentDetails.billerType === 'AIRTIME'
                                    ) {
                                        dispatch(
                                            loadbillerPlan(
                                                paymentDetails.billerCategory
                                            )
                                        );
                                        if (billerPlan !== null) {
                                            console.log(
                                                billerPlan.billerDetail.billerID
                                            );
                                            const billerData = {
                                                amount: paymentDetails.amount,
                                                ccy:
                                                    billerPlan
                                                        .billerProductInfo[0]
                                                        .ccy,
                                                billerCode:
                                                    billerPlan.billerDetail
                                                        .billerCode,
                                                billerID: String(
                                                    billerPlan.billerDetail
                                                        .billerID
                                                ),
                                                sourceAccount: '8100467021',
                                                sourceAccountType: 'X',
                                                productCode:
                                                    billerPlan
                                                        .billerProductInfo[0]
                                                        .productCode,
                                                customerName: String(
                                                    paymentDetails.acountDebit
                                                ),
                                                mobileNo: '2348111380591',
                                                formDataValue: [
                                                    {
                                                        fieldName:
                                                            'BEN_PHONE_NO',
                                                        fieldValue:
                                                            paymentDetails.phoneNumber,
                                                        dataType: 'string'
                                                    }
                                                ]
                                            };
                                            dispatch(postAirtime(billerData));
                                        }
                                        if (airtime !== null) {
                                            console.log(airtime);
                                            setCount(count + 1);
                                        } else if (
                                            errorMessageAirtime !== null
                                        ) {
                                            console.log(errorMessageAirtime);
                                            setError(errorMessageAirtime);
                                            setCount(count + 1);
                                        }
                                    } else {
                                        dispatch(
                                            loadbillerPlan(
                                                paymentDetails.billerCategory
                                            )
                                        );
                                        if (billerPlan !== null) {
                                            const billerData = {
                                                amount: paymentDetails.amount,
                                                ccy:
                                                    billerPlan
                                                        .billerProductInfo[0]
                                                        .ccy,
                                                billerCode:
                                                    billerPlan.billerDetail
                                                        .billerCode,
                                                billerID: String(
                                                    billerPlan.billerDetail
                                                        .billerID
                                                ),
                                                sourceAccount: '8100467021',
                                                sourceAccountType: 'X',
                                                productCode:
                                                    billerPlan
                                                        .billerProductInfo[0]
                                                        .productCode,
                                                customerName: String(
                                                    paymentDetails.acountDebit
                                                ),
                                                customerRefNo: String(
                                                    paymentDetails.billerDetail
                                                ),
                                                paymentDescription: 'Testing',
                                                mobileNo: '2348111380591',
                                                formDataValue: [
                                                    {
                                                        fieldName:
                                                            'BEN_PHONE_NO',
                                                        fieldValue:
                                                            paymentDetails.phoneNumber,
                                                        dataType: 'string'
                                                    }
                                                ]
                                            };
                                            dispatch(postBills(billerData));
                                        }
                                        if (errorMessageBills !== null) {
                                            console.log(errorMessageBills);
                                            setError(errorMessageBills);
                                            setCount(count + 1);
                                        }
                                        if (bills !== null) {
                                            console.log(bills);
                                            setCount(count + 1);
                                        }
                                    }
                                }}
                            />
                        );
                    case 2:
                        // switch (error) {
                        //     case null:
                        return (
                            <PaymentSuccess
                                overlay={overlay}
                                action={() => {
                                    setCount(0);
                                    setOverlay(false);
                                    setFormType('');
                                }}
                                title="Bill Payment"
                                // paymentType="AIRTIME"
                                paymentType={paymentDetails.billerType}
                                number={paymentDetails.phoneNumber}
                                amount={paymentDetails.amount}
                            />
                        );
                    //     case !null:
                    //         return console.log(error);
                    //     // <PaymentError
                    //     //     overlay={overlay}
                    //     //     errorPass={error}
                    //     // />
                    // }
                }

            case 'fx transfer ':
                switch (count) {
                    case 0:
                        return (
                            <MakePaymentFirst
                                overlay={overlay}
                                firstTitle="Foreign Transfer Payments"
                                closeAction={handleClose}
                                buttonText="Send Now"
                                action={(data) => {
                                    console.log(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <MakePaymentSecond
                                overlay={overlay}
                                transferAction={(data) => {
                                    console.log(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 2:
                        return (
                            <PaymentSuccess
                                overlay={overlay}
                                action={() => {
                                    setCount(0);
                                    setOverlay(false);
                                    setFormType('');
                                }}
                                country="Nigeria"
                                title="Foreign Transfer Payments"
                            />
                        );
                }

            default:
        }
    };
    const types = (type) => {
        setOutType(type);
    };
    return (
        <DashLayout>
            <div className={styles.greencard}>
                <div className={styles.greencardDetails}>
                    <div>
                        <Image
                            src="/Assets/Images/clock.png"
                            width="100%"
                            height="100%"
                        />
                    </div>
                    <div>
                        <h3>Introducing Scheduled Payments</h3>
                        <p>
                            You can now schedule your transfer for a later time
                            or date by selecting
                            <span> ‘Schedule for later’ </span> when you make
                            payments.
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.cov}>
                <div className={styles.whiteboard}>
                    <p className={styles.percentage}>
                        <span>73%</span>payment transactions completed
                        successfully today.
                    </p>
                    <div className={styles.chart}>
                        <ChartDiv width={qr} bg="#3CE312" zIndex="4"></ChartDiv>
                        <ChartDiv
                            width={paylink}
                            bg="#69940D"
                            zIndex="3"
                        ></ChartDiv>
                        <ChartDiv
                            width={ussd}
                            bg="#6CCF00"
                            zIndex="2"
                        ></ChartDiv>
                        <ChartDiv
                            width={mPOS}
                            bg="#C4D344"
                            zIndex="1"
                        ></ChartDiv>
                    </div>
                    <div className={styles.chartdetails}>
                        <ChartContent width={qr} color="#3CE312">
                            <p>QR</p>
                            <h4>{qr}</h4>
                        </ChartContent>
                        <ChartContent width={paylink} color="#69940D">
                            <p>Paylink</p>
                            <h4>{paylink}</h4>
                        </ChartContent>
                        <ChartContent width={ussd} color="#6CCF00">
                            <p>USSD</p>
                            <h4>{ussd}</h4>
                        </ChartContent>
                        <ChartContent width={mPOS} color="#C4D344">
                            <p>Phone POS</p>
                            <h4>{mPOS}</h4>
                        </ChartContent>
                    </div>
                </div>
                <div className={styles.whiteboard}>
                    <div className={styles.balance}>
                        <div>
                            <div className={styles.visibility}>
                                <p className={styles.thousand}>
                                    {outType ? '*******' : balance}
                                </p>
                                <Visbility color="green" typeSet={types} />
                            </div>
                            <p className={styles.avail}>Available Balance</p>
                        </div>
                        <div className="">
                            <Image
                                src="/Assets/Images/bagmoney.png "
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </div>
                </div>
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
                <PaymentCard title="Make Payments" type="make">
                    {PaymentData.make.map((payType, index) => (
                        <PaymentSingleBody
                            data={payType}
                            key={index}
                            type="make"
                            handleFormChange={handleFormChange}
                        />
                    ))}
                </PaymentCard>
            </div>

            <PaymentTable title="Payment History" />

            {renderForm()}
        </DashLayout>
    );
};

export default Payment;
