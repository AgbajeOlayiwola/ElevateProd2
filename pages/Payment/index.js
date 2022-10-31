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
    postAirtime,
    postInterBank,
    loadussdGen,
    getTransactionFees,
    loadussdStatus,
    postBills,
    loadbillerPlan,
    postInternalBank,
    getBalanceEnquiry,
    getBulkTransfer,
    getInternationalTransfer,
    getVerifyCurrency,
    getverifyBank,
    loadUserProfile,
    postBeneficiariesData,
    loadAccountPrimary,
    loadsetTransactionPin
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
    const { setTransactionPin, setTransactionPinError } = useSelector(
        (state) => state.setTransactionPinReducer
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
    const { transactionFees, errorMessageTransactionFees } = useSelector(
        (state) => state.transactionFeesReducer
    );
    const { internationalTransfer, errorMessageinternationalTransfer } =
        useSelector((state) => state.internationalTransferReducer);
    const { verifyBank, errorMessageverifyBank } = useSelector(
        (state) => state.verifyBankReducer
    );
    const { verifyCurrency, errorMessageverifyCurrency } = useSelector(
        (state) => state.verifyCurrencyReducer
    );

    const { postBeneficiaries } = useSelector(
        (state) => state.postBeneficiariesReducer
    );
    const { banks } = useSelector((state) => state.banksReducer);
    const { userProfile } = useSelector((state) => state.userProfileReducer);

    const dispatch = useDispatch();
    const [formType, setFormType] = useState('');
    const [ecobank, setEcobank] = useState('true');
    const [overlay, setOverlay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [transactionPinDone, setTransactionPinDone] = useState(false);
    const [count, setCount] = useState(0);
    const [active, setActive] = useState(true);
    const [outType, setOutType] = useState();
    const [transactionFee, setTransactionFee] = useState(0);
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
    const [userProfileData, setUserProfileData] = useState({});
    const [bank, setBank] = useState({});
    const [successfulTrans, setSuccessfulTrans] = useState([]);
    const [failedTrans, setFailedTrans] = useState([]);

    let airtimeData;
    let airtimeNetData = {};
    if (typeof window !== 'undefined') {
        airtimeData = window.localStorage.getItem('Airtime');
        airtimeNetData = JSON.parse(airtimeData);
    }
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

    useEffect(() => {
        if (accountPrimary !== null) {
            setSenderDetails(accountPrimary);
            let balanceData;
            balanceData = {
                accountId: accountPrimary.accountId
            };

            dispatch(getBalanceEnquiry(balanceData));
        }
    }, [accountPrimary]);
    const interBankCheck = () => {
        if (interBank !== null) {
            //console.loginterBank);
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
            setError(errorMessageussdGen);
            // setStatus('error');
        }
    };
    useEffect(() => {
        ussdGenCheck();
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
            // setStatus('error');
        }
    };
    useEffect(() => {
        ussdStatusCheck();
    }, [ussdStatus, errorMessageussdStatus]);
    const billsCheck = () => {
        if (bills !== null) {
            //console.logbills);
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
    const transactionFeesCheck = () => {
        if (transactionFees !== null) {
            //console.logbills);
            setTransactionFee(transactionFees.data.transactionFee);
            setCount((count) => count + 1);
            setIsLoading(false);
            setEcobank(false);
        } else if (errorMessageTransactionFees !== null) {
            setCount((count) => count + 2);
            setIsLoading(false);
            setError(errorMessageTransactionFees);
            setStatus('error');
        }
    };
    useEffect(() => {
        transactionFeesCheck();
    }, [transactionFees, errorMessageTransactionFees]);
    const bulkcheck = () => {
        if (bulkTransfer !== null) {
            console.log(bulkTransfer);
            if (bulkTransfer.failedTranscations.length !== 0) {
                setCount((count) => count + 1);
                setIsLoading(false);
                // setError(
                //     'Some or all of the transactions failed. Please check the Payment history for more details'
                // );
                setStatus('error');
            } else if (bulkTransfer.successfulTranscations.length !== 0) {
                setCount((count) => count + 1);
                setIsLoading(false);
                setStatus('success');
            }
            setSuccessfulTrans(bulkTransfer.successfulTranscations);
            setFailedTrans(bulkTransfer.failedTranscations);
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
            //console.logairtime);
            setCount((count) => count + 1);
            setIsLoading(false);
            setStatus('success');
        } else if (errorMessageAirtime !== null) {
            //console.logerrorMessageAirtime);
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
        if (userProfileData.hasSetTransactionPin === false) {
            router.push({
                pathname: '/AccountUpgrade',
                query: { id: 'Transaction Pin' }
            });
        } else {
            setFormType(formTitle);
            setOverlay(true);
        }
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
    let sum;
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
                                    //console.logdata);
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
                                    //console.logdata);
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
                                    //console.logdata);
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

            case 'single transfer':
                switch (count) {
                    case 0:
                        return (
                            <MakePaymentFirst
                                overlay={overlay}
                                payload={paymentDetails}
                                firstTitle="Single Transfer Payment"
                                isLoading={isLoading}
                                closeAction={handleClose}
                                buttonText="Next"
                                othersaction={(data) => {
                                    console.log(data);
                                    if (data.bankName === 'ECOBANK') {
                                        setEcobank(true);
                                        setCount(count + 1);
                                    } else if (
                                        data.bankNameBene === 'ECOBANK'
                                    ) {
                                        setEcobank(true);
                                        setCount(count + 1);
                                    } else {
                                        const payload = {
                                            accountId: senderDetails.accountId,
                                            destinationBankCode: data.bankName,
                                            transactionAmount: parseInt(
                                                data.amount,
                                                10
                                            )
                                        };
                                        dispatch(getTransactionFees(payload));
                                        setIsLoading(true);
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

                                    //console.logdata);
                                    setPaymentDetails(data);
                                }}
                                // scheduleLater={() => {
                                //     setCount(count + 4);
                                // }}
                            />
                        );
                    case 1:
                        return (
                            <MakePaymentSecond
                                closeAction={handleClose}
                                isLoading={isLoading}
                                amount={
                                    parseInt(paymentDetails.amount, 10) +
                                    parseInt(transactionFee, 10)
                                }
                                recieverName={paymentDetails.accountName}
                                sender={`${userProfileData.lastName} ${userProfileData.firstName}`}
                                recieverBank={
                                    paymentDetails.bankName === ''
                                        ? paymentDetails.bankNameBene
                                        : paymentDetails.bankName
                                }
                                overlay={overlay}
                                backAction={() => {
                                    setCount(count - 1);
                                }}
                                transferAction={(data) => {
                                    setIsLoading(true);
                                    const paymentData = {
                                        isEcobankToEcobankTransaction: ecobank,
                                        destinationBank:
                                            paymentDetails.bankName === ''
                                                ? paymentDetails.bankNameBene
                                                : paymentDetails.bankName,
                                        destinationBankCode:
                                            paymentDetails.bankName === ''
                                                ? paymentDetails.bankNameBene
                                                : paymentDetails.bankName,
                                        beneficiaryName:
                                            paymentDetails.accountName,
                                        destinationAccountNo:
                                            paymentDetails.accountNumber === ''
                                                ? paymentDetails.accountNumberBene
                                                : paymentDetails.accountNumber,
                                        transactionAmount:
                                            parseInt(
                                                paymentDetails.amount,
                                                10
                                            ) + parseInt(transactionFee, 10),
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
                                        setCount(count - 2);
                                        setIsLoading(false);
                                    } else {
                                        setCount(0);
                                        setOverlay(false);
                                        setFormType('');
                                    }
                                }}
                                title="Single Transfer Payment"
                                amount={paymentDetails.amount}
                                beneName={paymentDetails.accountName}
                                // repeatAction={() => {
                                //     setCount(count + 1);
                                // }}
                            />
                        );
                    case 3:
                        return (
                            <PaymentRepeat
                                overlay={overlay}
                                closeAction={handleClose}
                                type="Single Transfer"
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
                                payload={paymentDetails.details}
                                action={(data) => {
                                    setPaymentDetails(data);
                                    console.log(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <MakePaymentSecond
                                isLoading={isLoading}
                                closeAction={handleClose}
                                amount={
                                    paymentDetails.amount === ''
                                        ? paymentDetails.details.reduce(
                                              (a, b) => {
                                                  return +a.amount + +b.amount;
                                              }
                                          )
                                        : paymentDetails.amount *
                                          numberofBene.length
                                }
                                title="Bulk Payments"
                                // recieverName={paymentDetails.accountNumber}
                                sender={`${userProfileData.lastName} ${userProfileData.firstName}`}
                                // recieverBank={paymentDetails.bankName}
                                overlay={overlay}
                                number={numberofBene.length}
                                backAction={() => {
                                    setCount(count - 1);
                                }}
                                transferAction={(data) => {
                                    setIsLoading(true);
                                    console;
                                    const paymentData = {
                                        accountId: senderDetails.accountId,
                                        transactionPin: Object.values(data)
                                            .toString()
                                            .replaceAll(',', ''),
                                        transactions:
                                            paymentDetails.details?.map(
                                                (details, index) => {
                                                    if (
                                                        details.accountNumber ===
                                                        ''
                                                    ) {
                                                        return null;
                                                    } else {
                                                        return {
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
                                                                numberofBene[
                                                                    index
                                                                ].accountName,
                                                            destinationAccountNo:
                                                                details.accountNumber,
                                                            transactionAmount:
                                                                paymentDetails.amount ===
                                                                ''
                                                                    ? parseInt(
                                                                          details.amount,
                                                                          10
                                                                      )
                                                                    : parseInt(
                                                                          paymentDetails.amount,
                                                                          10
                                                                      ),
                                                            narration: ''
                                                        };
                                                    }
                                                }
                                            )
                                    };

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
                                successfulTrans={successfulTrans}
                                failedTrans={failedTrans}
                                number={paymentDetails.details.length}
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
                                    //console.logdata);
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
                                recieverName={
                                    bill === 'AIRTIME'
                                        ? paymentDetails.phoneNumber
                                        : 'UTILITIES'
                                }
                                amount={paymentDetails.amount}
                                title="Bills Payment"
                                recieverBank={
                                    bill === 'AIRTIME'
                                        ? airtimeNetData.name
                                        : airtimeNetData.billerDetail.billerName
                                }
                                sender={`${userProfileData.lastName} ${userProfileData.firstName}`}
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
                                    } else if (bill === 'UTILITY') {
                                        console.log(
                                            airtimeNetData.billerDetail.billerID
                                        );
                                        const billerData = {
                                            accountId: senderDetails.accountId,
                                            transactionPin: Object.values(data)
                                                .toString()
                                                .replaceAll(',', ''),
                                            transactionAmount:
                                                paymentDetails.amount,
                                            billerCode:
                                                airtimeNetData.billerDetail
                                                    .billerCode,
                                            billerId:
                                                airtimeNetData.billerDetail.billerID.toString(),
                                            productCode:
                                                airtimeNetData
                                                    .billerProductInfo[0]
                                                    .productCode,
                                            paymentDescription:
                                                paymentDetails.paymentDescription
                                        };
                                        dispatch(postBills(billerData));
                                    }
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
                                    //console.logdata);
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
                                    //console.logdata);
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
                                    //console.logdata);
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
                                {/* <RWebShare
                                    data={{
                                        text: 'Like humans, flamingos make friends for life',
                                        url: 'https://on.natgeo.com/2zHaNup',
                                        title: 'Flamingos'
                                    }}
                                    onClick={() =>
                                        console.log('shared successfully!')
                                    }
                                >
                                    <button>Share 🔗</button>
                                </RWebShare> */}
                                <Visbility color="green" typeSet={types} />
                            </div>
                            <p className={styles.avail}>Available Balance</p>
                        </div>
                        {/* <div className={styles.balanceButtons}>
                            <div className={styles.first}>
                                <p>Scheduled Payments</p>
                            </div>
                            <div className={styles.second}>
                                <p>Repeat Payments</p>
                            </div>
                        </div> */}
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

            <PaymentTable title="Payment History" test={count} />

            {renderForm()}
        </DashLayout>
    );
};

export default Payment;
