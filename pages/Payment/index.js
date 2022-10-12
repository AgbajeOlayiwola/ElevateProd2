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
import { getCookie } from 'cookies-next';
import {
    postAirtime,
    postInterBank,
    loadussdGen,
    loadussdStatus,
    postBills,
    loadbillerPlan,
    postInternalBank,
    getBalanceEnquiry,
    getBulkTransfer,
    getInternationalTransfer,
    getVerifyCurrency,
    getverifyBank,
    postBeneficiariesData,
    loadAccountPrimary
} from '../../redux/actions/actions';
import ChartDiv from './chartDivStyled';
import ChartContent from './chartContentStyled';
import PaymentSingleBody from '../../components/ReusableComponents/PaymentSingleBody';
import PaymentCard from '../../components/ReusableComponents/PaymentCard';
// import PaymentError from '../../components/ReusableComponents/PaymentError';
import { useRouter } from 'next/router';
import { PaymentData } from '../../components/ReusableComponents/Data';
import CloseButton from '../../components/ReusableComponents/CloseButtonSvg';
import PaymentRepeat from '../../components/ReusableComponents/PaymentRepeat';

const Payment = () => {
    const router = useRouter();

    const { airtime, errorMessageAirtime } = useSelector(
        (state) => state.airtimeReducer
    );
    const { accountPrimary, accountPrimaryError } = useSelector(
        (state) => state.accountPrimaryReducer
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
    const { ussdGen, errorMessageussdGen } = useSelector(
        (state) => state.ussdGenReducer
    );
    const { ussdStatus, errorMessageussdStatus } = useSelector(
        (state) => state.ussdStatusReducer
    );
    const { balanceEnquiry, errorMessageBalanceEnquiry } = useSelector(
        (state) => state.balanceEnquiryReducer
    );
    const { bulkTransfer, errorMessagebulkTransfer } = useSelector(
        (state) => state.bulkTransferReducer
    );
    const { internationalTransfer, errorMessageinternationalTransfer } =
        useSelector((state) => state.internationalTransferReducer);
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
    const [ecobank, setEcobank] = useState('true');
    const [overlay, setOverlay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [active, setActive] = useState(true);
    const [outType, setOutType] = useState();
    const [paymentDetails, setPaymentDetails] = useState({});
    const [interEnquiry, setInterEnquiry] = useState({});
    const [balance, setBalance] = useState('₦ 0.00');
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');
    const [link, setLink] = useState('');
    const [track, setTrack] = useState('');
    const [recieveLink, setRecieveLink] = useState('');
    const [bill, setBill] = useState('');
    const [senderDetails, setSenderDetails] = useState({});
    const [bank, setBank] = useState({});
    let userProfile;
    let userProfileData = {};
    if (typeof window !== 'undefined') {
        userProfile = window.localStorage.getItem('user');
        userProfileData = JSON.parse(userProfile);
    }
    let airtimeData;
    let airtimeNetData = {};
    if (typeof window !== 'undefined') {
        airtimeData = window.localStorage.getItem('Airtime');
        airtimeNetData = JSON.parse(airtimeData);
    }
    useEffect(() => {
        dispatch(loadAccountPrimary());
    }, []);

    useEffect(() => {
        if (accountPrimary !== null) {
            setSenderDetails(accountPrimary);
            setBalance(accountPrimary.accountBalance);
        }
    }, [accountPrimary]);
    const interBankCheck = () => {
        if (interBank !== null) {
            console.log(interBank);
            setCount((count) => count + 1);
            setIsLoading(false);
            setStatus('success');
        } else if (errorMessageInterBank !== null) {
            setCount((count) => count + 1);
            setIsLoading(false);
            setError(errorMessageInterBank);
            setStatus('error');
        }
    };
    useEffect(() => {
        interBankCheck();
    }, [interBank, errorMessageInterBank]);
    const ussdGenCheck = () => {
        if (ussdGen !== null) {
            console.log(ussdGen);
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
            setError(errorMessageussdGen);
            // setStatus('error');
        }
    };
    useEffect(() => {
        ussdGenCheck();
    }, [ussdGen, errorMessageussdGen]);
    const ussdStatusCheck = () => {
        if (ussdStatus !== null) {
            console.log(ussdStatus);
            setCount((count) => count + 1);
            setIsLoading(false);
            // setStatus('success');
        } else if (errorMessageussdStatus !== null) {
            // setCount((count) => count + 1);
            setIsLoading(false);
            setError(errorMessageussdStatus);
            // setStatus('error');
        }
    };
    useEffect(() => {
        ussdStatusCheck();
    }, [ussdStatus, errorMessageussdStatus]);
    const billsCheck = () => {
        if (bills !== null) {
            console.log(bills);
            setCount((count) => count + 1);
            setIsLoading(false);
            setStatus('success');
        } else if (errorMessageBills !== null) {
            setCount((count) => count + 1);
            setIsLoading(false);
            setError(errorMessageBills);
            setStatus('error');
        }
    };
    useEffect(() => {
        billsCheck();
    }, [bills, errorMessageBills]);
    const bulkcheck = () => {
        if (bulkTransfer !== null) {
            console.log(bulkTransfer);
            setCount((count) => count + 1);
            setIsLoading(false);
            setStatus('success');
        } else if (errorMessagebulkTransfer !== null) {
            setCount((count) => count + 1);
            setIsLoading(false);
            setError(errorMessagebulkTransfer);
            setStatus('error');
        }
    };
    useEffect(() => {
        bulkcheck();
    }, [bulkTransfer, errorMessagebulkTransfer]);
    const airtimeCheck = () => {
        if (airtime !== null) {
            console.log(airtime);
            setCount((count) => count + 1);
            setIsLoading(false);
            setStatus('success');
        } else if (errorMessageAirtime !== null) {
            console.log(errorMessageAirtime);
            setCount((count) => count + 1);
            setIsLoading(false);
            setError(errorMessageAirtime);
            setStatus('error');
        }
    };
    useEffect(() => {
        airtimeCheck();
    }, [airtime, errorMessageAirtime]);

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
            setFormType(link.toLowerCase());
            setOverlay(true);
        }
    }, [link]);
    const handleFormChange = (formTitle) => {
        setFormType(formTitle);
        setOverlay(true);
    };
    const handleClose = () => {
        setOverlay(false);
        setFormType('');
        setCount(0);
        setIsLoading(false);
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
                                buttonText="Next"
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
                                buttonText="Send Paylink"
                                type="Paylinks"
                                closeAction={buttonHandleClose}
                            />
                        );
                }

            case 'ussd only':
                switch (count) {
                    case 0:
                        return (
                            <ReceivePaymentFirst
                                overlay={overlay}
                                isLoading={isLoading}
                                firstTitle="Create USSD Payment Code"
                                buttonText="Next"
                                closeAction={handleClose}
                                action={(data) => {
                                    console.log(data);
                                    setPaymentDetails(data);
                                    const ussdData = {
                                        amount: parseInt(data.amount, 10),
                                        accountId: senderDetails.accountId,
                                        nameOfPayment: data.accountName,
                                        paymentDescription: data.description
                                    };
                                    setIsLoading(true);
                                    dispatch(loadussdGen(ussdData));
                                }}
                            />
                        );
                    case 1:
                        return (
                            <ReceivePaymentSecond
                                overlay={overlay}
                                amount={paymentDetails.amount}
                                link={recieveLink}
                                track={track}
                                title=" USSD "
                                action={buttonHandleClose}
                                buttonText="Share USSD Code"
                                type="USSD Code"
                                closeAction={buttonHandleClose}
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
                                buttonText="Next"
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
                                title="Ecobank QR Code"
                                action={buttonHandleClose}
                                buttonText="Next"
                                type=" Ecobank QR Code"
                                closeAction={buttonHandleClose}
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

            case 'single transfer':
                switch (count) {
                    case 0:
                        return (
                            <MakePaymentFirst
                                overlay={overlay}
                                firstTitle="Single Transfer Payment"
                                isLoading={isLoading}
                                closeAction={handleClose}
                                buttonText="Next"
                                othersaction={(data) => {
                                    if (data.bankName === 'Ecobank') {
                                        setEcobank(true);
                                    } else {
                                        setEcobank(false);
                                        setInterEnquiry({
                                            accountName: 'Aderohunmu Matthew'
                                        });
                                        setIsLoading(false);
                                        setCount(count + 1);
                                    }
                                    if (data.beneficiary === true) {
                                        const beneficiaryData = {
                                            beneficiaryName: data.accountName,
                                            accountNumber: data.accountNumber,
                                            bankName: data.bankName,
                                            bankCode: data.bankName
                                        };
                                        dispatch(
                                            postBeneficiariesData(
                                                beneficiaryData
                                            )
                                        );
                                    }

                                    console.log(data);
                                    setPaymentDetails(data);
                                }}
                                scheduleLater={() => {
                                    setCount(count + 4);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <MakePaymentSecond
                                closeAction={handleClose}
                                isLoading={isLoading}
                                amount={paymentDetails.amount}
                                recieverName={interEnquiry.accountName}
                                sender={`${userProfileData.profile.lastName} ${userProfileData.profile.firstName}`}
                                recieverBank={paymentDetails.bankName}
                                overlay={overlay}
                                backAction={() => {
                                    setCount(count - 1);
                                }}
                                transferAction={(data) => {
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
                                            bankCode: paymentDetails.bankName
                                        };
                                        dispatch(
                                            postBeneficiariesData(newBene)
                                        );
                                    }
                                    console.log(interEnquiry);

                                    const paymentData = {
                                        isEcobankToEcobankTransaction: ecobank,
                                        destinationBank:
                                            paymentDetails.bankName,
                                        destinationBankCode:
                                            paymentDetails.bankName,
                                        beneficiaryName:
                                            paymentDetails.accountName,
                                        destinationAccountNo:
                                            paymentDetails.accountNumber,
                                        transactionAmount: parseInt(
                                            paymentDetails.amount,
                                            10
                                        ),
                                        narration: paymentDetails.narration,
                                        transactionPin: Object.values(data)
                                            .toString()
                                            .replaceAll(',', ''),
                                        accountId: senderDetails.accountId
                                    };

                                    dispatch(postInterBank(paymentData));
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
                                    if (status === 'error') {
                                        setCount(count - 1);
                                        setIsLoading(false);
                                    } else {
                                        setCount(0);
                                        setOverlay(false);
                                        setFormType('');
                                    }
                                }}
                                title="Single Transfer Payment"
                                amount={paymentDetails.amount}
                                beneName={interEnquiry.accountName}
                                repeatAction={() => {
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 3:
                        return (
                            <PaymentRepeat
                                overlay={overlay}
                                closeAction={handleClose}
                            />
                        );
                    case 4:
                        return (
                            <SchedulePayment
                                overlay={overlay}
                                action={() => {
                                    setCount(count - 4);
                                    // setFormType('');
                                }}
                                closeAction={handleClose}
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
                                    console.log(paymentDetails.details);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <MakePaymentSecond
                                isLoading={isLoading}
                                closeAction={handleClose}
                                amount={paymentDetails.amount}
                                title="Bulk Payments"
                                // recieverName={paymentDetails.accountNumber}
                                sender={paymentDetails.accountName}
                                // recieverBank={paymentDetails.bankName}
                                overlay={overlay}
                                number={
                                    paymentDetails.details === undefined
                                        ? 1
                                        : paymentDetails.details.length + 1
                                }
                                transferAction={(data) => {
                                    setIsLoading(true);
                                    const paymentData = {
                                        accountId: paymentDetails.sourceAccount,
                                        transactionPin: Object.values(data)
                                            .toString()
                                            .replaceAll(',', ''),
                                        transactions: [
                                            {
                                                isEcobankToEcobankTransaction:
                                                    paymentDetails.firstBank ===
                                                    'Ecobank'
                                                        ? true
                                                        : false,
                                                destinationBank:
                                                    paymentDetails.firstBank,
                                                destinationBankCode:
                                                    paymentDetails.firstBank,
                                                beneficiaryName:
                                                    'HIJIOKE   NWANKWO',
                                                destinationAccountNo:
                                                    paymentDetails.firstAccountNumber,
                                                transactionAmount:
                                                    paymentDetails.amount,
                                                narration: ''
                                            }
                                        ]
                                    };
                                    paymentDetails.details === undefined
                                        ? null
                                        : paymentDetails.details?.map(
                                              (details, index) => {
                                                  paymentData.transactions.push(
                                                      {
                                                          isEcobankToEcobankTransaction:
                                                              details.bankName ===
                                                              'Ecobank'
                                                                  ? true
                                                                  : false,
                                                          destinationBank:
                                                              details.bankName,
                                                          destinationBankCode:
                                                              details.bankName,
                                                          beneficiaryName:
                                                              'HIJIOKE   NWANKWO',
                                                          destinationAccountNo:
                                                              details.accountNumber,
                                                          transactionAmount:
                                                              paymentDetails.amount,
                                                          narration: ''
                                                      }
                                                  );
                                              }
                                          );
                                    dispatch(getBulkTransfer(paymentData));
                                }}
                            />
                        );
                    case 2:
                        return (
                            <PaymentSuccess
                                error={error}
                                statusbar={status}
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
                                arrowAction={(e) => {
                                    setBill(e.target.outerText);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <MakePaymentFirst
                                overlay={overlay}
                                firstTitle={bill}
                                buttonText="Send Now"
                                closeAction={handleClose}
                                // dataAction={(data) => {
                                // setCount(count + 1);
                                //     setPaymentDetails(data);
                                // }}
                                airtimeAction={(data) => {
                                    setCount(count + 1);
                                    setPaymentDetails(data);
                                    console.log(data);
                                }}
                                // scheduleLater={() => {
                                //     setCount(count + 3);
                                // }}
                            />
                        );
                    case 2:
                        return (
                            <MakePaymentSecond
                                isLoading={isLoading}
                                closeAction={handleClose}
                                recieverName={paymentDetails.phoneNumber}
                                amount={paymentDetails.amount}
                                title="Bills Payment"
                                recieverBank={airtimeNetData.name}
                                sender={userProfileData.profile.preferredName}
                                overlay={overlay}
                                transferAction={(data) => {
                                    setIsLoading(true);
                                    if (bill === 'AIRTIME') {
                                        setIsLoading(true);
                                        const billerdata = {
                                            amount: paymentDetails.amount,
                                            transactionPin: Object.values(data)
                                                .toString()
                                                .replaceAll(',', ''),
                                            accountId: senderDetails.accountId,
                                            billerCode: airtimeNetData.name,
                                            billerId: airtimeNetData.id,
                                            productCode: airtimeNetData.code,
                                            mobileNo:
                                                paymentDetails.phoneNumber,
                                            formDataValue: [
                                                {
                                                    fieldName: 'BEN_PHONE_NO',
                                                    fieldValue: 2348111380591,
                                                    dataType: 'string'
                                                }
                                            ],
                                            beneficiaryName: 'optional',
                                            paymentDescription: 'optional'
                                        };

                                        dispatch(postAirtime(billerdata));
                                    }
                                    // else {
                                    //     dispatch(
                                    //         loadbillerPlan(
                                    //             paymentDetails.billerCategory
                                    //         )
                                    //     );
                                    //     if (billerPlan !== null) {
                                    //         const billerData = {
                                    //             amount: paymentDetails.amount,
                                    //             ccy: billerPlan
                                    //                 .billerProductInfo[0].ccy,
                                    //             billerCode:
                                    //                 billerPlan.billerDetail
                                    //                     .billerCode,
                                    //             billerID: String(
                                    //                 billerPlan.billerDetail
                                    //                     .billerID
                                    //             ),
                                    //             sourceAccount:
                                    //                 senderDetails.accountNo,
                                    //             sourceAccountType: 'A',
                                    //             productCode:
                                    //                 billerPlan
                                    //                     .billerProductInfo[0]
                                    //                     .productCode,
                                    //             customerName: String(
                                    //                 paymentDetails.acountDebit
                                    //             ),
                                    //             customerRefNo: String(
                                    //                 paymentDetails.billerDetail
                                    //             ),
                                    //             paymentDescription: 'Testing',
                                    //             mobileNo: '2348111380591',
                                    //             formDataValue: [
                                    //                 {
                                    //                     fieldName:
                                    //                         'BEN_PHONE_NO',
                                    //                     fieldValue:
                                    //                         paymentDetails.phoneNumber,
                                    //                     dataType: 'string'
                                    //                 }
                                    //             ]
                                    //         };
                                    //         dispatch(postBills(billerData));
                                    //     }
                                    // }
                                }}
                            />
                        );
                    case 3:
                        return (
                            <PaymentSuccess
                                overlay={overlay}
                                error={error}
                                statusbar={status}
                                action={() => {
                                    setCount(0);
                                    setOverlay(false);
                                    setFormType('');
                                }}
                                title="Bill Payment"
                                paymentType={paymentDetails.billerType}
                                number={paymentDetails.phoneNumber}
                                amount={paymentDetails.amount}
                            />
                        );
                    case 4:
                        return (
                            <SchedulePayment
                                overlay={overlay}
                                action={() => {
                                    setCount(0);
                                    setFormType('');
                                }}
                                closeAction={handleClose}
                            />
                        );
                }

            case 'fx transfer ':
                switch (count) {
                    case 0:
                        return (
                            <MakePaymentFirst
                                overlay={overlay}
                                firstTitle="Foreign Transfer"
                                closeAction={handleClose}
                                buttonText="Send Now"
                                action={(data) => {
                                    console.log(data);
                                    setCount(count + 1);
                                }}
                                scheduleLater={() => {
                                    setCount(count + 4);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <MakePaymentFirst
                                overlay={overlay}
                                type={'two'}
                                firstTitle="Foreign Transfer"
                                closeAction={handleClose}
                                buttonText="Send Now"
                                secondAction={(data) => {
                                    console.log(data);
                                    setCount(count + 1);
                                }}
                                scheduleLater={() => {
                                    setCount(count + 3);
                                }}
                            />
                        );
                    case 2:
                        return (
                            <MakePaymentSecond
                                overlay={overlay}
                                closeAction={handleClose}
                                transferAction={(data) => {
                                    console.log(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 3:
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
                    case 4:
                        return (
                            <SchedulePayment
                                overlay={overlay}
                                action={() => {
                                    setCount(0);
                                    setFormType('');
                                }}
                                closeAction={handleClose}
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
        <DashLayout page="Payments">
            {active && (
                <div className={styles.greencard}>
                    <div className={styles.greencardDetails}>
                        <div>
                            <Image
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
            )}

            <div className={styles.cov}>
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
                        <div className={styles.balanceButtons}>
                            <div className={styles.first}>
                                <p>Scheduled Payments</p>
                            </div>
                            <div className={styles.second}>
                                <p>Repeat Payments</p>
                            </div>
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
