import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MakePaymentFirst from '../../../components/ReusableComponents/MakePaymentFirst';
import MakePaymentSecond from '../../../components/ReusableComponents/MakePaymentSecond';
import PaymentCard from '../../../components/ReusableComponents/PaymentCard';
import PaymentSingleBody from '../../../components/ReusableComponents/PaymentSingleBody';
import PaymentSuccess from '../../../components/ReusableComponents/PaymentSuccess';
import SchedulePayment from '../../../components/ReusableComponents/Schedulepayment';
import styles from './styles.module.css';
// import PaymentError from '../../components/ReusableComponents/PaymentError';
import { useRouter } from 'next/router';
import AccountsInfoCard from '../../../components/ReusableComponents/AccountInfoCard';
import { PaymentData } from '../../../components/ReusableComponents/Data';
import { postAirtime } from '../../../redux/actions/airtimeAction';
import { postBills } from '../../../redux/actions/billsAction';
import { getTransactionFees } from '../../../redux/actions/transactionFeesAction';
import { clearTransfer } from '../../../redux/slices/transferSlice';

const PaymentTypes = () => {
    const router = useRouter();

    const dispatch = useDispatch();
    // const [acctNum, setAcctNumm] = useState('');
    const [formType, setFormType] = useState('');
    const [formData, setFormdata] = useState({ accountNum: '' });
    const [ecobank, setEcobank] = useState('true');
    const [overlay, setOverlay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState(0);
    // const [active, setActive] = useState(true);
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
    // const [acctNummber, setAcctNumber] = useState('');

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
        if (desiredPackage !== 'undefined') {
            desiredPackageData = JSON.parse(desiredPackage);
        }
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

    //where i need to work on
    const interBankCheck = () => {
        if (interBank !== null) {
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

    const billsCheck = () => {
        if (bills !== null) {
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
        window.scrollTo(0, 0);
    }, [count]);

    useEffect(() => {
        const {
            query: { id }
        } = router;
        setLink({ id }.id);
    });
    const { profile } = useSelector((store) => store);
    const affiliate = localStorage.getItem('affiliateCode');
    useEffect(() => {
        if (link !== undefined) {
            if (profile?.user?.hasSetTransactionPin === 'N') {
                if (profile?.user?.createdFromEcobankCred === 'N') {
                    router.push({
                        pathname: '/AccountUpgrade',
                        query: { id: 'Transaction Pin' }
                    });
                } else if (profile?.user?.createdFromEcobankCred === 'Y') {
                    router.push({
                        pathname: '/Admin/Profile',
                        query: { id: 'Transaction Pin' }
                    });
                }
            } else if (profile?.user?.hasSetTransactionPin === 'Y') {
                setFormType(link.toLowerCase());
                setOverlay(true);
            }
        }
    }, [link]);
    const handleFormChange = (formTitle) => {
        setFormType(formTitle);
        setOverlay(true);
        if (profile?.user?.hasSetTransactionPin === 'N') {
            //console.log(userProfileData.createdFromEcobankCred);
            if (profile?.data?.user?.createdFromEcobankCred === 'N') {
                router.push({
                    pathname: '/AccountUpgrade',
                    query: { id: 'Transaction Pin' }
                });
            } else if (profile?.user?.createdFromEcobankCred === 'Y') {
                router.push({
                    pathname: '/Admin/Profile',
                    query: { id: 'Transaction Pin' }
                });
            }
            console.log('Test');
        } else if (profile?.data?.user?.hasSetTransactionPin === 'Y') {
            setFormType(formTitle);
            setOverlay(true);
        }
    };
    useEffect(() => {
        console.log(formType);
    }, [formType]);

    const handleClose = () => {
        setOverlay(false);
        setFormType('');
        setCount(0);
        setIsLoading(false);
        setPaymentDetails({});
        setError([]);
    };

    const buttonHandleClose = () => {
        setOverlay(false);
        setFormType('');
        setCount(0);
        setPaymentDetails({});
        setError([]);
    };

    useEffect(() => {
        setSum(
            csvData?.slice(2).reduce((a, b) => {
                return a + b.Amount;
            }, 0)
        );
    }, [csvData]);

    console.log(formType);
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
                                nextPage={() => {
                                    setCount(count + 1);
                                }}
                            />
                        );
                    case 1:
                        return (
                            <MakePaymentSecond
                                closeAction={() => {
                                    handleClose();
                                    dispatch(clearTransfer());
                                }}
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
                                    dispatch(clearTransfer());
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
                            />
                        );
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
                                forwardPage={() => {
                                    setCount(count + 1);
                                }}
                                action={(data) => {
                                    setPaymentDetails(data);
                                    setSenderDetails(data.sourceAccount);
                                    // //console.log(data);
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
                                closeAction={() => {
                                    handleClose();
                                    dispatch(clearTransfer());
                                }}
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
                                    dispatch(clearTransfer());
                                }}
                            />
                        );
                    case 2:
                        return (
                            <PaymentSuccess
                                beneName={`${
                                    csvData !== null
                                        ? csvData.slice(2).length
                                        : paymentDetails?.details?.length
                                } beneficiaries`}
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
                                backAction={() => {
                                    setCount(count - 1);
                                }}
                                formData={formData}
                                setFormdata={setFormdata}
                                overlay={overlay}
                                firstTitle={bill}
                                buttonText="Send Now"
                                closeAction={handleClose}
                                isLoading={isLoading}
                                airtimeAction={(data) => {
                                    setPaymentDetails(data);
                                    setSenderDetails(data.sourceAccount);
                                    if (bill === 'DATA') {
                                        setCount((count) => count + 1);
                                    } else {
                                        const payload = {
                                            accountId: data.sourceAccount,
                                            billerCode: data.type,
                                            transactionAmount: parseInt(
                                                data.amount,
                                                10
                                            ),
                                            transactionType: 'BILLPAY'
                                        };
                                        dispatch(getTransactionFees(payload));
                                        setIsLoading(true);
                                    }

                                    // //console.logdata);
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
                                        : bill === 'DATA'
                                        ? paymentDetails.phoneNumber
                                        : 'UTILITIES'
                                }
                                amount={
                                    bill === 'DATA'
                                        ? parseInt(
                                              paymentDetails.dataType.split(
                                                  'N'
                                              )[1],
                                              10
                                          )
                                        : parseInt(paymentDetails.amount, 10) +
                                          parseInt(transactionFee, 10)
                                }
                                title="Bills Payment"
                                charges={transactionFee}
                                recieverBank={
                                    airtimeNetData.billerDetail.billerName
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
                                            billerCode:
                                                airtimeNetData.billerDetail.billerCode.toString(),
                                            billerId:
                                                airtimeNetData.billerDetail.billerID.toString(),
                                            // productCode: airtimeNetData.name,
                                            productCode:
                                                paymentDetails.airtimeCode,
                                            mobileNo:
                                                paymentDetails.phoneNumber ===
                                                ''
                                                    ? paymentDetails.phoneNumberBene
                                                    : paymentDetails.phoneNumber,
                                            formDataValue: [
                                                {
                                                    fieldName: 'BEN_PHONE_NO',
                                                    fieldValue:
                                                        paymentDetails.phoneNumber ===
                                                        ''
                                                            ? paymentDetails.phoneNumberBene
                                                            : paymentDetails.phoneNumber,
                                                    dataType: 'string'
                                                }
                                            ]
                                        };

                                        dispatch(postAirtime(billerdata));
                                    } else {
                                        const billerData = {
                                            accountId: senderDetails,
                                            transactionPin: Object.values(data)
                                                .toString()
                                                .replaceAll(',', ''),
                                            transactionAmount:
                                                bill === 'DATA'
                                                    ? paymentDetails.dataType.split(
                                                          'N'
                                                      )[1]
                                                    : paymentDetails.amount,
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
                                        ? paymentDetails.phoneNumber === ''
                                            ? paymentDetails.phoneNumberBene
                                            : paymentDetails.phoneNumber
                                        : paymentDetails?.desiredPackage
                                }
                                accountNumber={
                                    bill === 'AIRTIME'
                                        ? paymentDetails.phoneNumber === ''
                                            ? paymentDetails.phoneNumberBene
                                            : paymentDetails.phoneNumber
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
                }
            case 'airtime or data':
                switch (count) {
                    case 0:
                        return (
                            <MakePaymentFirst
                                formData={formData}
                                setFormdata={setFormdata}
                                overlay={overlay}
                                firstTitle={'Airtime or Data'}
                                closeAction={handleClose}
                                buttonText="Send Now"
                            />
                        );
                    case 1:
                        return (
                            <MakePaymentFirst
                                backAction={() => {
                                    setCount(count - 1);
                                }}
                                formData={formData}
                                setFormdata={setFormdata}
                                overlay={overlay}
                                firstTitle={bill}
                                buttonText="Send Now"
                                closeAction={handleClose}
                                isLoading={isLoading}
                            />
                        );
                    case 2:
                        return (
                            <MakePaymentSecond
                                formData={formData}
                                setFormdata={setFormdata}
                                isLoading={isLoading}
                                closeAction={handleClose}
                                title="Airtime or Data"
                                charges={transactionFee}
                                overlay={overlay}
                            />
                        );
                    case 3:
                        return (
                            <PaymentSuccess
                                overlay={overlay}
                                error={error}
                                statusbar={status}
                                title="Airtime or Data"
                            />
                        );
                }
            case 'mobile money':
                switch (count) {
                    case 0:
                        return (
                            <MakePaymentFirst
                                formData={formData}
                                setFormdata={setFormdata}
                                overlay={overlay}
                                firstTitle={'Mobile Money'}
                                closeAction={handleClose}
                                buttonText="Send Now"
                            />
                        );
                    case 1:
                        return (
                            <MakePaymentFirst
                                backAction={() => {
                                    setCount(count - 1);
                                }}
                                formData={formData}
                                setFormdata={setFormdata}
                                overlay={overlay}
                                firstTitle={bill}
                                buttonText="Send Now"
                                closeAction={handleClose}
                                isLoading={isLoading}
                            />
                        );
                    case 2:
                        return (
                            <MakePaymentSecond
                                formData={formData}
                                setFormdata={setFormdata}
                                isLoading={isLoading}
                                closeAction={handleClose}
                                title="Airtime or Data"
                                charges={transactionFee}
                                overlay={overlay}
                            />
                        );
                    case 3:
                        return (
                            <PaymentSuccess
                                overlay={overlay}
                                error={error}
                                statusbar={status}
                                amount={paymentDetails.amount}
                                senderName={`${userProfileData.lastName} ${userProfileData.firstName}`}
                            />
                        );
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
                                    // //console.logdata);
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
                                    // //console.logdata);
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
                                    // //console.logdata);
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
        <>
            <div className={styles.allTypes}>
                <div className={styles.cov}>
                    <AccountsInfoCard
                    // userProfileData={userProfileData}
                    />
                </div>
                <div className={styles.cov}>
                    <PaymentCard title="Make Payments" type="make">
                        {affiliate === 'ENG'
                            ? PaymentData.make
                                  .filter(
                                      (item) => item.text !== 'Mobile Money'
                                  )
                                  .map((payType, index) => (
                                      <PaymentSingleBody
                                          data={payType}
                                          key={index}
                                          type="make"
                                          handleFormChange={handleFormChange}
                                      />
                                  ))
                            : PaymentData.make.map((payType, index) => (
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
            {renderForm()}
        </>
    );
};

export default PaymentTypes;
