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
    getTransactionFees,
    postBills,
    getBalanceEnquiry,
    getBulkTransfer,
    loadUserProfile,
    postBeneficiariesData,
    loadAccountPrimary,
    bankAccountsData
} from '../../redux/actions/actions';
// import ChartDiv from './chartDivStyled';
// import ChartContent from './chartContentStyled';
import PaymentSingleBody from '../../components/ReusableComponents/PaymentSingleBody';
import PaymentCard from '../../components/ReusableComponents/PaymentCard';
// import PaymentError from '../../components/ReusableComponents/PaymentError';
import { useRouter } from 'next/router';
import { PaymentData } from '../../components/ReusableComponents/Data';
import AccountsInfoCard from '../../components/ReusableComponents/AccountInfoCard';

const Payment = () => {
    const router = useRouter();

    const { airtime, errorMessageAirtime } = useSelector(
        (state) => state.airtimeReducer
    );
    const { accountPrimarys, accountPrimaryError } = useSelector(
        (state) => state.accountPrimaryReducer
    );
    const { bills, errorMessageBills } = useSelector(
        (state) => state.billsReducer
    );
    const { interBank, errorMessageInterBank } = useSelector(
        (state) => state.interBankReducer
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

    const { verifyCurrency, errorMessageverifyCurrency } = useSelector(
        (state) => state.verifyCurrencyReducer
    );

    const { postBeneficiaries } = useSelector(
        (state) => state.postBeneficiariesReducer
    );
    const { userProfile } = useSelector((state) => state.userProfileReducer);
    const { bankAccounts, bankAccountErrorMessages } = useSelector(
        (state) => state.bankAccountsReducer
    );

    const dispatch = useDispatch();
    const [acctNum, setAcctNumm] = useState('');
    const [formType, setFormType] = useState('');
    const [formData, setFormdata] = useState({ accountNum: '' });
    const [ecobank, setEcobank] = useState('true');
    const [overlay, setOverlay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [active, setActive] = useState(true);
    const [outType, setOutType] = useState();
    const [transactionFee, setTransactionFee] = useState(0);
    const [paymentDetails, setPaymentDetails] = useState({});
    const [balance, setBalance] = useState('₦ 0.00');
    const [sum, setSum] = useState(0);
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');
    const [link, setLink] = useState('');
    const [csvData, setCsvData] = useState([]);
    const [bill, setBill] = useState('');
    const [senderDetails, setSenderDetails] = useState({});
    const [userProfileData, setUserProfileData] = useState({});
    const [successfulTrans, setSuccessfulTrans] = useState([]);
    const [failedTrans, setFailedTrans] = useState([]);
    const [acctNummber, setAcctNumber] = useState('');
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
    // useEffect(() => {
    //     if (items) {
    //         setCsvData(items);

    //         console.log(items);
    //     } else {
    //         // alert('Hello');
    //     }
    //     return () => {
    //         setCsvData(items);
    //     };
    // }, [items, count]);

    let number;
    let numberofBene = {};
    if (typeof window !== 'undefined') {
        number = window.localStorage.getItem('number');
        numberofBene = JSON.parse(number);
    }
    useEffect(() => {
        dispatch(bankAccountsData());
        dispatch(loadAccountPrimary());
        dispatch(loadUserProfile());
    }, []);
    useEffect(() => {
        console.log(accountPrimarys);
        if (userProfile !== null) {
            setUserProfileData(userProfile);
        }
    }, [userProfile]);
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
        Object.keys(bankAccounts)?.map((accountNo) => {
            if (bankAccounts[accountNo].accountNumber == formData.accountNum) {
                // setAcctNumber(accountPrimarys);
                let balanceData;
                balanceData = {
                    accountId: bankAccounts[accountNo].accountId
                };
                // console.log(senderDetails.accountId);
                dispatch(getBalanceEnquiry(balanceData));
            } else {
                setAcctNumber('Pending');
            }
        });
    }, [formData.accountNum]);
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
            //console.log(bulkTransfer);
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
        setOverlay(false);
        setFormType('');
        setCount(0);
        setPaymentDetails({});
        setError([]);
        setErrorQr([]);
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
    const renderForm = () => {
        switch (formType) {
            case 'single transfer':
                switch (count) {
                    case 0:
                        return (
                            <MakePaymentFirst
                                overlay={overlay}
                                payload={paymentDetails}
                                formData={formData}
                                setFormdata={setFormdata}
                                firstTitle="Single Transfer Payment"
                                isLoading={isLoading}
                                closeAction={handleClose}
                                buttonText="Next"
                                othersaction={(data) => {
                                    console.log(data);
                                    setSenderDetails(data.sourceAccount);
                                    console.log(senderDetails);
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
                                            accountId: data.sourceAccount,
                                            destinationBankCode:
                                                data.bankName === ''
                                                    ? data.bankNameBene
                                                    : data.bankName,
                                            transactionAmount: parseInt(
                                                data.amount,
                                                10
                                            ),
                                            transactionType: 'INTERBANK'
                                        };
                                        dispatch(getTransactionFees(payload));
                                        setIsLoading(true);
                                    }
                                    // if (data.beneficiary === true) {
                                    //     const beneficiaryData = {
                                    //         beneficiaryName: data.accountName,
                                    //         accountNumber: data.accountNumber,
                                    //         bankName: data.bankName,
                                    //         bankCode: data.bankName
                                    //     };
                                    //     dispatch(
                                    //         postBeneficiariesData(
                                    //             beneficiaryData
                                    //         )
                                    //     );
                                    // }
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
                                formData={formData}
                                setFormData={setFormdata}
                                isLoading={isLoading}
                                title="Single Transfer"
                                charges={transactionFee}
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
                                    if (data.beneficiary === true) {
                                        const beneficiaryData = {
                                            beneficiaryName:
                                                paymentDetails.accountName,
                                            accountNumber:
                                                paymentDetails.accountNumber,
                                            bankName: paymentDetails.bankName,
                                            bankCode: paymentDetails.bankName
                                        };
                                        dispatch(
                                            postBeneficiariesData(
                                                beneficiaryData
                                            )
                                        );
                                    }
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
                                        //change back to int
                                        transactionAmount: (
                                            parseInt(
                                                paymentDetails.amount,
                                                10
                                            ) + parseInt(transactionFee, 10)
                                        ).toString(),
                                        narration: paymentDetails.narration,
                                        transactionPin:
                                            data.beneficiary === true
                                                ? Object.values(data)
                                                      .toString()
                                                      .replace('true', '')
                                                      .replaceAll(',', '')
                                                : Object.values(data)
                                                      .toString()
                                                      .replace('false', '')
                                                      .replaceAll(',', ''),
                                        accountId: senderDetails
                                    };

                                    dispatch(postInterBank(paymentData));
                                }}
                            />
                        );
                    case 2:
                        return (
                            <PaymentSuccess
                                statusbar={status}
                                accountNumber={
                                    paymentDetails.accountNumber === ''
                                        ? paymentDetails.accountNumberBene
                                        : paymentDetails.accountNumber
                                }
                                narration={paymentDetails.narration}
                                senderName={`${userProfileData.lastName} ${userProfileData.firstName}`}
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
                                        setPaymentDetails({});
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
                    // case 3:
                    //     return (
                    //         <PaymentRepeat
                    //             overlay={overlay}
                    //             closeAction={handleClose}
                    //             type="Single Transfer"
                    //         />
                    //     );
                    // case 4:
                    // return (
                    //     <SchedulePayment
                    //         overlay={overlay}
                    //         action={() => {
                    //             setCount(count - 4);
                    //             // setFormType('');
                    //         }}
                    //         closeAction={handleClose}
                    //     />
                    // );
                }

            case 'bulk transfer':
                switch (count) {
                    case 0:
                        return (
                            <MakePaymentFirst
                                formData={formData}
                                setFormdata={setFormdata}
                                overlay={overlay}
                                firstTitle="Bulk Payments"
                                closeAction={handleClose}
                                buttonText="Send Now"
                                payload={paymentDetails.details}
                                action={(data) => {
                                    setPaymentDetails(data);
                                    setSenderDetails(data.sourceAccount);
                                    //console.log(data);
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <MakePaymentSecond
                                formData={formData}
                                setFormdata={setFormdata}
                                isLoading={isLoading}
                                closeAction={handleClose}
                                amount={
                                    csvData !== null
                                        ? 'sum'
                                        : paymentDetails.amount === ''
                                        ? paymentDetails.details.reduce(
                                              (a, b) => {
                                                  return a + +b.amount;
                                              },
                                              0
                                          )
                                        : paymentDetails.amount *
                                          numberofBene.length
                                }
                                title="Bulk Payments"
                                // charges={csvData === null?: csvData.slice(2).map((item)=>{

                                // })}
                                // recieverName={paymentDetails.accountNumber}
                                sender={`${userProfileData.lastName} ${userProfileData.firstName}`}
                                // recieverBank={paymentDetails.bankName}
                                overlay={overlay}
                                number={
                                    csvData !== null
                                        ? csvData.slice(2).length
                                        : numberofBene?.length
                                }
                                backAction={() => {
                                    setCount(count - 1);
                                }}
                                transferAction={(data) => {
                                    setIsLoading(true);
                                    const paymentData = {
                                        accountId: senderDetails,
                                        transactionPin: Object.values(data)
                                            .toString()
                                            .replaceAll(',', ''),
                                        transactions:
                                            csvData !== null
                                                ? csvData.slice(2).map((e) => {
                                                      return {
                                                          isEcobankToEcobankTransaction:
                                                              e.bankName ===
                                                              'Ecobank'
                                                                  ? true
                                                                  : false,
                                                          destinationBank:
                                                              e.Bank,
                                                          destinationBankCode:
                                                              e.Bank ===
                                                              'ACCESS BANK'
                                                                  ? '999044'
                                                                  : e.Bank ===
                                                                    'Citi Bank'
                                                                  ? 'CITI-ACC'
                                                                  : e.Bank ===
                                                                    'Fidelity Bank'
                                                                  ? 'FIDELITY-ACC'
                                                                  : e.Bank ===
                                                                    'First Bank of Nigeria'
                                                                  ? 'FIRST-ACC'
                                                                  : e.Bank ===
                                                                    'First City Monument Bank'
                                                                  ? 'FCMB-ACC'
                                                                  : e.Bank ===
                                                                    'GT Bank Plc'
                                                                  ? 'GUARANTY-ACC'
                                                                  : e.Bank ===
                                                                    'Heritage'
                                                                  ? 'HERITAGE-ACC'
                                                                  : e.Bank ===
                                                                    'Stanbic IBTC Bank'
                                                                  ? 'STANBIC-IBTC-ACC'
                                                                  : e.Bank ===
                                                                    'Standard Chartered'
                                                                  ? 'STANDARD-CHARTERED'
                                                                  : e.Bank ===
                                                                    'Sterling Bank'
                                                                  ? 'STERLING-ACC'
                                                                  : e.Bank ===
                                                                    'Union Bank'
                                                                  ? 'UNION-ACC'
                                                                  : e.Bank ===
                                                                    'United Bank for Africa'
                                                                  ? 'UNITED-ACC'
                                                                  : e.Bank ===
                                                                    'Unity Bank'
                                                                  ? 'UNITY-ACC'
                                                                  : e.Bank ===
                                                                    'Wema Bank'
                                                                  ? 'WEMA-ACC'
                                                                  : e.Bank ===
                                                                    'Zenith Bank'
                                                                  ? 'ZENITH-ACC'
                                                                  : null,
                                                          beneficiaryName:
                                                              e.BeneName,
                                                          destinationAccountNo:
                                                              e.AccountNo,
                                                          transactionAmount:
                                                              parseInt(
                                                                  e.Amount,
                                                                  10
                                                              ).toString(),
                                                          narration: e.narration
                                                      };
                                                  })
                                                : paymentDetails.details?.map(
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
                                                                      ].number
                                                                          .accountName,
                                                                  destinationAccountNo:
                                                                      details.accountNumber,
                                                                  transactionAmount:
                                                                      paymentDetails.amount ===
                                                                      ''
                                                                          ? parseInt(
                                                                                details.amount,
                                                                                10
                                                                            ).toString()
                                                                          : parseInt(
                                                                                paymentDetails.amount,
                                                                                10
                                                                            ).toString(),
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
                                    if (status === 'error') {
                                        setCount(count - 2);
                                        setIsLoading(false);
                                    } else {
                                        setCount(0);
                                        setOverlay(false);
                                        setFormType('');
                                        localStorage.removeItem('number');
                                        localStorage.removeItem('csvData');
                                    }
                                }}
                                successfulTrans={successfulTrans}
                                failedTrans={failedTrans}
                                number={
                                    csvData !== null
                                        ? csvData.slice(2).length
                                        : paymentDetails?.details?.length
                                }
                                title="Bulk Payment"
                                amount={
                                    csvData === null
                                        ? paymentDetails.amount === ''
                                            ? paymentDetails.details.reduce(
                                                  (a, b) => {
                                                      return a + +b.amount;
                                                  },
                                                  0
                                              )
                                            : paymentDetails.amount *
                                              numberofBene.length
                                        : sum
                                }
                                senderName={`${userProfileData.lastName} ${userProfileData.firstName}`}
                            />
                        );
                }

            case 'bills payment':
                switch (count) {
                    case 0:
                        return (
                            <MakePaymentFirst
                                formData={formData}
                                setFormdata={setFormdata}
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
                                formData={formData}
                                setFormdata={setFormdata}
                                overlay={overlay}
                                firstTitle={bill}
                                buttonText="Send Now"
                                closeAction={handleClose}
                                isLoading={isLoading}
                                // dataAction={(data) => {
                                // setCount(count + 1);
                                //     setPaymentDetails(data);
                                // }}
                                airtimeAction={(data) => {
                                    setPaymentDetails(data);
                                    setSenderDetails(data.sourceAccount);
                                    const payload = {
                                        accountId: data.sourceAccount,
                                        billerCode:
                                            bill === 'AIRTIME'
                                                ? airtimeNetData.code
                                                : airtimeNetData?.billerDetail
                                                      ?.billerCode,
                                        transactionAmount: parseInt(
                                            data.amount,
                                            10
                                        ),
                                        transactionType: 'BILLPAY'
                                    };
                                    dispatch(getTransactionFees(payload));
                                    setIsLoading(true);
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
                                formData={formData}
                                setFormdata={setFormdata}
                                isLoading={isLoading}
                                closeAction={handleClose}
                                recieverName={
                                    bill === 'AIRTIME'
                                        ? paymentDetails.phoneNumber === ''
                                            ? paymentDetails.phoneNumberBene
                                            : paymentDetails.phoneNumber
                                        : 'UTILITIES'
                                }
                                amount={
                                    parseInt(paymentDetails.amount, 10) +
                                    parseInt(transactionFee, 10)
                                }
                                title="Bills Payment"
                                charges={transactionFee}
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
                                            amount: parseInt(
                                                paymentDetails.amount,
                                                10
                                            ),
                                            transactionPin: Object.values(data)
                                                .toString()
                                                .replaceAll(',', ''),
                                            accountId: senderDetails,
                                            billerCode: airtimeNetData.code,
                                            billerId: airtimeNetData.id,
                                            // productCode: airtimeNetData.name,
                                            productCode:
                                                airtimeNetData.name ===
                                                'MTN Nigeria'
                                                    ? 'MTN-ANY'
                                                    : airtimeNetData.name ===
                                                      'GLO Nigeria'
                                                    ? 'GLO-ANY'
                                                    : airtimeNetData.name ===
                                                      'Airtel Nigeria'
                                                    ? 'AIRTEL-ANY'
                                                    : airtimeNetData.name ===
                                                      'Etisalat Nigeria'
                                                    ? 'ETISALAT-ANY'
                                                    : null,
                                            mobileNo:
                                                paymentDetails.phoneNumber ===
                                                ''
                                                    ? paymentDetails.phoneNumberBene
                                                    : paymentDetails.phoneNumber
                                        };

                                        dispatch(postAirtime(billerdata));
                                    } else {
                                        const billerData = {
                                            accountId: senderDetails,
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
                                                desiredPackageData.productCode,
                                            paymentDescription:
                                                desiredPackageData.productDescription,
                                            formDataValue: [
                                                {
                                                    fieldName:
                                                        airtimeNetData
                                                            .billFormData[0]
                                                            .fieldTitle,
                                                    fieldValue:
                                                        paymentDetails.paymentDescription,
                                                    dataType: 'string'
                                                }
                                            ]
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
                                    if (status === 'error') {
                                        setCount(count - 2);
                                        setIsLoading(false);
                                    } else {
                                        setCount(0);
                                        setOverlay(false);
                                        setFormType('');
                                        setPaymentDetails({});
                                    }
                                }}
                                title="Bill Payment"
                                beneName={
                                    bill === 'AIRTIME'
                                        ? paymentDetails.phoneNumber
                                        : paymentDetails?.desiredPackage
                                }
                                accountNumber={
                                    bill === 'AIRTIME'
                                        ? paymentDetails.phoneNumber
                                        : paymentDetails.paymentDescription
                                }
                                paymentType={paymentDetails.billerType}
                                number={
                                    paymentDetails.phoneNumber === ''
                                        ? paymentDetails.phoneNumberBene
                                        : paymentDetails.phoneNumber
                                }
                                amount={paymentDetails.amount}
                                senderName={`${userProfileData.lastName} ${userProfileData.firstName}`}
                            />
                        );
                    // case 4:
                    //     return (
                    //         <SchedulePayment
                    //             overlay={overlay}
                    //             action={() => {
                    //                 setCount(0);
                    //                 setFormType('');
                    //             }}
                    //             closeAction={handleClose}
                    //         />
                    //     );
                }

            case 'fx transfer ':
                switch (count) {
                    case 0:
                        return (
                            <MakePaymentFirst
                                formData={formData}
                                setFormdata={setFormdata}
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
                                formData={formData}
                                setFormdata={setFormdata}
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
                                formData={formData}
                                setFormdata={setFormdata}
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
                </div>
                <PaymentTable
                    title="Payment History"
                    test={count}
                    page="Payments"
                />

                {renderForm()}
            </div>
        </DashLayout>
    );
};

export default Payment;
