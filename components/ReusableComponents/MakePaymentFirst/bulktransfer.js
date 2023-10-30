import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    useAccountInquiryMutation,
    usePaymentbanklistMutation
} from '../../../redux/api/authApi';
import { setTransfer } from '../../../redux/slices/transferSlice';
import ButtonComp from '../Button';
import Loader from '../Loader';
import PlusSvg from '../ReusableSvgComponents/PlusSvg';
import Search from '../SearchInput';
import styles from './styles.module.css';

const BulkTransfer = ({
    action,
    firstTitle,
    buttonText,
    bankAccounts,
    payload,
    formData,
    setFormdata,
    isLoading,
    forwardPage
}) => {
    const [activeBtn, setActiveBtn] = useState(false);
    const [diffAmount, setDiffAmount] = useState(false);
    const [fileError, setFileError] = useState('');
    const [csvUpload, setCsvUpload] = useState(false);
    const [csv, setCsv] = useState();
    const [interEnquiry, setInterEnquiry] = useState([]);
    const [indexNumber, setIndex] = useState('');
    const [acctNo, setAcctNo] = useState('');
    const [bank, setBank] = useState([]);
    const dispatch = useDispatch();
    const [accountNumber, setAccountNumber] = useState();
    const [bankCode, setBankCode] = useState('');
    const [number, setNumber] = useState([{ number: 1, bank: [] }]);
    const [type, setType] = useState('Ecobank');
    const XLSX = require('xlsx');
    const isValidNUBAN = (accountNumber, bankCode) => {
        return isValidNUBANAcct(bankCode.trim() + accountNumber.trim());
    };
    const isValidNUBANAcct = (accountNumber) => {
        accountNumber = accountNumber.trim();

        if (accountNumber.length != 13) return false;

        let accountNumberDigits = accountNumber.split('');
        let sum =
            accountNumberDigits[0] * 3 +
            accountNumberDigits[1] * 7 +
            accountNumberDigits[2] * 3 +
            accountNumberDigits[3] * 3 +
            accountNumberDigits[4] * 7 +
            accountNumberDigits[5] * 3 +
            accountNumberDigits[6] * 3 +
            accountNumberDigits[7] * 7 +
            accountNumberDigits[8] * 3 +
            accountNumberDigits[9] * 3 +
            accountNumberDigits[10] * 7 +
            accountNumberDigits[11] * 3;

        let mod = sum % 10;
        let checkDigit = mod == 0 ? mod : 10 - mod;

        return checkDigit == accountNumberDigits[12];
    };
    useEffect(() => {}, []);

    const getAllBanksByAccount = (accountNo) => {
        //NOTE, This can be fetched from the Database
        let bankArray = `ACCESS BANK:044:000014:999044~ACCESS BANK:063:000005:999044~Citi Bank:023:000009:CITI-ACC~Fidelity Bank:070:000007:FIDELITY-ACC~First Bank of Nigeria:011:000016:FIRST-ACC~First City Monument Bank:214:000003:FCMB-ACC~GT Bank Plc:058:000013:GUARANTY-ACC~Heritage:030:000020:HERITAGE-ACC~POLARIS BANK:076:000008:POLARIS~Stanbic IBTC Bank:221:000012:STANBIC-IBTC-ACC~Standard Chartered:068:000021:STANDARD-CHARTERED~Sterling Bank:232:000001:STERLING-ACC~Union Bank:032:000018:UNION-ACC~United Bank for Africa:033:000004:UNITED-ACC~Unity Bank:215:000011:UNITY-ACC~Wema Bank:035:000017:WEMA-ACC~Zenith Bank:057:000015:ZENITH-ACC~Sun Trust Account:100:000022:SUNTRUST-ACC`;

        let bankList = [];
        let bankDets = bankArray.split('~');
        //   // //console.log("bankDets", bankDets);

        for (var bankdet of bankDets) {
            let split = bankdet.split(':');
            // //console.log('split', split);

            if (isValidNUBAN(accountNo, split[1])) {
                bankList.push({
                    bankname: split[0],
                    cbncode: split[1],
                    bankcode: split[2],
                    bankCodes: split[3]
                });
            }
        }

        return bankList.map((bank) => bank);
    };
    useEffect(() => {}, [number]);
    const interBankEnquiryCheck = () => {
        // setLoading((prev) => !prev);
        if (interBankEnquiry !== null) {
            const newState = number.map((e, index) => {
                if (indexNumber === index) {
                    return { ...e, number: interBankEnquiry };
                } else {
                    return e;
                }
            });
            setNumber(newState);
        } else if (errorMessageInterBankEnquiry !== null) {
            alert(errorMessageInterBankEnquiry);
        }
    };
    const intraBankEnquiryCheck = () => {
        // setLoading((prev) => !prev);
        if (intraBankEnquiry !== null) {
            const newState = number.map((e, index) => {
                if (indexNumber === index) {
                    return { ...e, number: intraBankEnquiry };
                } else {
                    return e;
                }
            });
            setNumber(newState);
        } else if (errorMessageIntraBankEnquiry !== null) {
            alert(errorMessageIntraBankEnquiry);
        }
    };

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN',
        currencyDisplay: 'narrowSymbol'
    });

    const [
        paymentbanklist,
        {
            data: paymentbanklistData,
            isLoading: paymentbanklistLoad,
            isSuccess: paymentbanklistSuccess,
            isError: paymentbanklistFalse,
            error: paymentbanklistErr,
            reset: paymentbanklistReset
        }
    ] = usePaymentbanklistMutation();

    useEffect(() => {
        paymentbanklist();
    }, []);

    const initialValues = {
        ecoSourceAccount: '',
        ecoAccountNumber: '',
        ecoAccountName: '',
        ecoSourceAccount: '',
        ecoChooseBank: '',
        ecoEnterAmount: '',
        ecoNarration: '',
        ecoAccountId: '',
        ecoCurrency: '',
        destinationBankCode: ''
    };
    const [
        accountInquiry,
        {
            data: accountInquiryData,
            isLoading: accountInquiryLoad,
            isSuccess: accountInquirySuccess,
            isError: accountInquiryFalse,
            error: accountInquiryErr,
            reset: accountInquiryReset
        }
    ] = useAccountInquiryMutation();
    // useEffect(() => {
    //     if (accountNumber) {
    //         accountInquiry({
    //             destinationBankCode:
    //                 type === 'Ecobank' ? 'ECOBANK' : selectedBank.institutionId,
    //             accountNumber: accountNumber
    //         });
    //     }
    // }, [accountNumber]);
    const [transactionsArray, setTransactionsArray] = useState([]);
    const [formValues, setFormValues] = useState(null);

    const [formFields, setFormFields] = useState([
        {
            bank: '',
            accountNumber: '',
            accountName: '',
            amount: ''
        }
    ]);

    const addFormFields = () => {
        console.log('Button clicked');
        setFormFields([
            ...formFields,
            {
                bank: '',
                accountNumber: '',
                accountName: '',
                amount: ''
            }
        ]);
    };
    useEffect(() => {
        localStorage.setItem('number', JSON.stringify(number));
    }, [number]);

    const handleAccountNumberChange = (index) => {
        const updatedFormFields = [...formFields];
        updatedFormFields[index].accountName =
            accountInquiryData?.data?.accountName;
        setFormFields(updatedFormFields);
    };
    const removeFormFields = (index) => {
        if (formFields.length > 1) {
            const updatedFormFields = [...formFields];
            updatedFormFields.splice(index, 1);
            setFormFields(updatedFormFields);
        }
    };
    const [selectedBank, setSelectedBank] = useState(null);
    const handleBankSelect = (bank) => {
        setSelectedBank(bank);
    };
    useEffect(() => {
        if (formValues) {
            // Extract values from formValues
            const {
                ecoAccountId,
                ecoSourceAccount,
                ecoCurrency,
                ecoAccountNumber,
                ecoChooseBank,
                destinationBankCode,
                ecoEnterAmount
            } = formValues;

            // Create a new transaction object
            const newTransaction = {
                accountId: ecoAccountId,
                accountNumber: ecoSourceAccount,
                beneficiaryName: accountInquiryData?.data?.accountName,
                currency: ecoCurrency,
                destinationAccountNo: ecoAccountNumber,
                isEcobankToEcobankTransaction:
                    type === 'Ecobank' ? true : false,
                transactionAmount: ecoEnterAmount,
                destinationBank:
                    type === 'Ecobank'
                        ? 'ECOBANK'
                        : selectedBank?.institutionName,
                destinationBankCode:
                    type === 'Ecobank' ? 'ECOBANK' : selectedBank?.institutionId
            };
            setTransactionsArray(
                (prevTransactions) => [...prevTransactions, newTransaction],
                () => {
                    console.log(
                        'Updated transactionsArray:',
                        transactionsArray
                    );
                }
            );
        }
    }, [formValues, transactionsArray]);
    console.log(transactionsArray);

    useEffect(() => {
        if (transactionsArray.length > 0) {
            // Dispatch the action after transactionsArray has been updated
            dispatch(setTransfer(transactionsArray));
            forwardPage();
            console.log(transactionsArray);
        }
    }, [transactionsArray]);
    const { allAccountInfo } = useSelector((store) => store);
    const handleBlur = () => {
        accountInquiry({
            destinationBankCode: selectedBank?.institutionId
                ? selectedBank?.institutionId
                : 'ECOBANK',
            accountNumber: accountNumber
        });
    };
    return (
        <div>
            <h2 className={styles.firstTitle}>{firstTitle}</h2>
            <div className={styles.other}>
                <div
                    className={
                        type === 'Ecobank'
                            ? styles.otherActive
                            : styles.otherDiv
                    }
                    onClick={() => {
                        setType('Ecobank');
                    }}
                >
                    <p> Ecobank</p>
                </div>
                <div
                    className={
                        type === 'Other' ? styles.otherActive : styles.otherDiv
                    }
                    onClick={() => {
                        setType('Other');
                        // setBeneActive();
                        // setAccountNumber('');
                        // setAmount('');
                        // setNarration('');
                        // setBankName('');
                        // setAccountName('');
                        // setInterEnquiry('');
                        // setActiveBtn(false);
                        // reset();
                    }}
                >
                    <p>Other Banks</p>
                </div>
            </div>
            {type === 'Ecobank' ? (
                <Formik
                    // validationSchema={initSchema}
                    // validateOnChange={true}
                    initialValues={initialValues}
                    onSubmit={(values, { setSubmitting }) => {
                        setFormValues(values);
                        setSubmitting(false);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        setFieldValue,
                        handleSubmit
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className={styles.narration}>
                                <label className={styles.bulkLabel}>
                                    Source Account
                                </label>
                                <select
                                    name="ecoSourceAccount"
                                    onChange={(e) => {
                                        const selectedAccount =
                                            allAccountInfo.find(
                                                (account) =>
                                                    account?.accountNo ===
                                                    e.target.value
                                            );
                                        if (selectedAccount) {
                                            setFieldValue(
                                                'ecoSourceAccount',
                                                selectedAccount?.accountNo
                                            );
                                            setFieldValue(
                                                'ecoAccountId',
                                                selectedAccount?.accountId
                                            );
                                            setFieldValue(
                                                'ecoCurrency',
                                                selectedAccount?.currency
                                            );
                                        }
                                    }}
                                >
                                    <option value="">
                                        Select Account To Use
                                    </option>
                                    {allAccountInfo
                                        .filter((account) => account?.accountNo)
                                        .map((account) => {
                                            return (
                                                <>
                                                    <option
                                                        className={
                                                            styles.accntP
                                                        }
                                                        value={
                                                            account?.accountNo
                                                        }
                                                    >
                                                        {account?.accountNo}
                                                    </option>
                                                </>
                                            );
                                        })}
                                </select>
                                <p className={styles.error}>
                                    {/* {errors?.sourceAccount?.message} */}
                                </p>
                            </div>
                            <br />
                            <br />

                            <p className={styles.beneTitle}>
                                Beneficiary Details
                            </p>
                            {csvUpload ? (
                                <p>File Successfully uploaded!!!</p>
                            ) : (
                                <div>
                                    {formFields.map((field, index) => (
                                        <div key={index}>
                                            {paymentbanklistLoad ? (
                                                <Loader />
                                            ) : (
                                                <div
                                                    className={styles.formBank}
                                                >
                                                    <label
                                                        className={
                                                            styles.bulkLabel
                                                        }
                                                    >
                                                        Choose Bank
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value="ECOBANK"
                                                        disabled
                                                    />
                                                </div>
                                            )}
                                            <br />
                                            <div className={styles.formNumber}>
                                                <label
                                                    className={styles.bulkLabel}
                                                >
                                                    Account Number
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Account Number"
                                                    onInput={(e) => {
                                                        handleAccountNumberChange(
                                                            index
                                                        );
                                                        setFieldValue(
                                                            'ecoAccountNumber',
                                                            e.target.value
                                                        );
                                                        setAccountNumber(
                                                            e.target.value
                                                        );
                                                    }}
                                                    onBlur={handleBlur}
                                                    name="ecoAccountNumber"
                                                />
                                            </div>
                                            {accountInquiryLoad ? (
                                                <Loader />
                                            ) : (
                                                <div
                                                    className={styles.narration}
                                                >
                                                    <label> Account Name</label>
                                                    <input
                                                        type="text"
                                                        value={
                                                            field.accountName
                                                        } // Set the account name
                                                        disabled
                                                        required
                                                    />
                                                    {accountInquiryErr ? (
                                                        <p
                                                            className={
                                                                styles.error
                                                            }
                                                        >
                                                            {
                                                                accountInquiryErr
                                                                    ?.data
                                                                    ?.message
                                                            }
                                                        </p>
                                                    ) : null}
                                                </div>
                                            )}
                                            <br />
                                            {diffAmount ? (
                                                <>
                                                    <div
                                                        className={
                                                            styles.amountDiv
                                                        }
                                                    >
                                                        <label
                                                            className={
                                                                styles.bulkLabel
                                                            }
                                                        >
                                                            Amount
                                                        </label>
                                                        <input
                                                            onChange={(e) => {
                                                                setFieldValue(
                                                                    'ecoEnterAmount',
                                                                    e.target
                                                                        .value
                                                                );
                                                                if (
                                                                    e.target
                                                                        .value
                                                                        .length ===
                                                                    0
                                                                ) {
                                                                    setActiveBtn(
                                                                        false
                                                                    );
                                                                } else if (
                                                                    e.target
                                                                        .value
                                                                        .length >
                                                                    0
                                                                ) {
                                                                    setActiveBtn(
                                                                        true
                                                                    );
                                                                }
                                                            }}
                                                            type="text"
                                                            placeholder="0.00"
                                                        />
                                                    </div>
                                                    <br />
                                                    <br />
                                                </>
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className={styles.narration}>
                                <div className={styles.uploadCsv}>
                                    {/* <p>Tap to carry out up to 5 transactions</p> */}
                                    {csvUpload ? null : (
                                        <div className={styles.actionButtons}>
                                            <div
                                                className={styles.plus}
                                                onClick={addFormFields}
                                            >
                                                <PlusSvg />
                                            </div>
                                            <div
                                                className={styles.minus}
                                                onClick={() =>
                                                    removeFormFields(
                                                        formFields.length - 1
                                                    )
                                                }
                                            >
                                                -
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {csvUpload ? null : diffAmount ? null : (
                                    <div className={styles.amountDiv}>
                                        <label className={styles.bulkLabel}>
                                            Amount
                                        </label>
                                        <input
                                            name="amount"
                                            type="text"
                                            placeholder="0.00"
                                            onChange={(e) => {
                                                setFieldValue(
                                                    'ecoEnterAmount',
                                                    e.target.value
                                                );
                                                if (
                                                    e?.target.value.length === 0
                                                ) {
                                                    setActiveBtn(false);
                                                } else if (
                                                    e?.target.value.length > 0
                                                ) {
                                                    setActiveBtn(true);
                                                }
                                            }}
                                        />
                                    </div>
                                )}

                                <div className={styles.saveBene}>
                                    <label className={styles.beneCheck}>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setDiffAmount(true);
                                                    setActiveBtn(true);
                                                } else if (!e.target.checked) {
                                                    setDiffAmount(false);
                                                    setActiveBtn(false);
                                                }
                                            }}
                                        />
                                        <span>
                                            <i></i>
                                        </span>
                                    </label>
                                    <p>Input Different Amount</p>
                                </div>
                                <div className={styles.amountDiv}>
                                    <p className={styles.beneTitle}>
                                        For more than 5 transaction
                                    </p>
                                    <div className={styles.uploadCsvs}>
                                        <p>
                                            <label>
                                                Tap to
                                                <input
                                                    type="file"
                                                    accept=".csv, .xlsm"
                                                    onChange={(e) => {
                                                        //  //console.log(e.target.files[0]);
                                                        if (
                                                            e.target.files[0].name.split(
                                                                '.'
                                                            )[1] === 'xlsm'
                                                        ) {
                                                            const reader =
                                                                new FileReader();
                                                            reader.onload = (
                                                                e
                                                            ) => {
                                                                const data =
                                                                    e.target
                                                                        .result;
                                                                const workbook =
                                                                    XLSX.read(
                                                                        data,
                                                                        {
                                                                            type: 'array'
                                                                        }
                                                                    );
                                                                const sheetName =
                                                                    workbook
                                                                        .SheetNames[0];
                                                                const worksheet =
                                                                    workbook
                                                                        .Sheets[
                                                                        sheetName
                                                                    ];
                                                                const json =
                                                                    XLSX.utils.sheet_to_json(
                                                                        worksheet
                                                                    );
                                                                localStorage.setItem(
                                                                    'csvData',
                                                                    JSON.stringify(
                                                                        json
                                                                    )
                                                                );
                                                            };
                                                            reader.readAsArrayBuffer(
                                                                e.target
                                                                    .files[0]
                                                            );

                                                            localStorage.removeItem(
                                                                'number'
                                                            );
                                                            setCsvUpload(true);
                                                            setActiveBtn(true);
                                                        } else {
                                                            setFileError(
                                                                'File Uploaded is Not CsV'
                                                            );
                                                        }
                                                    }}
                                                />
                                                <span> Upload CSV File</span>
                                            </label>
                                        </p>
                                        <p>{fileError}</p>
                                        <p>
                                            <a
                                                href="../../../Assets/CSV.xlsm"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download="CSV Template"
                                            >
                                                <span>Download CSV File</span>
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <ButtonComp
                                    disabled={activeBtn}
                                    active={activeBtn ? 'active' : 'inactive'}
                                    text={buttonText}
                                    type="submit"
                                    // err={errorMessageInterBankEnquiry}
                                />
                            </div>
                        </form>
                    )}
                </Formik>
            ) : (
                <Formik
                    // validationSchema={initSchema}
                    // validateOnChange={true}
                    initialValues={initialValues}
                    onSubmit={(values, { setSubmitting }) => {
                        // console.log(values);
                        setFormValues(values);

                        setSubmitting(false);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        setFieldValue,
                        handleSubmit
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className={styles.narration}>
                                <label className={styles.bulkLabel}>
                                    Source Account
                                </label>
                                <select
                                    name="ecoSourceAccount"
                                    onChange={(e) => {
                                        const selectedAccount =
                                            allAccountInfo.find(
                                                (account) =>
                                                    account?.accountNo ===
                                                    e.target.value
                                            );
                                        if (selectedAccount) {
                                            setFieldValue(
                                                'ecoSourceAccount',
                                                selectedAccount?.accountNo
                                            );
                                            setFieldValue(
                                                'ecoAccountId',
                                                selectedAccount?.accountId
                                            );
                                            setFieldValue(
                                                'ecoCurrency',
                                                selectedAccount?.currency
                                            );
                                        }
                                    }}
                                >
                                    <option value="">
                                        Select Account To Use
                                    </option>
                                    {allAccountInfo
                                        .filter((account) => account?.accountNo)
                                        .map((account) => {
                                            return (
                                                <>
                                                    <option
                                                        className={
                                                            styles.accntP
                                                        }
                                                        value={
                                                            account?.accountNo
                                                        }
                                                    >
                                                        {account?.accountNo}
                                                    </option>
                                                </>
                                            );
                                        })}
                                </select>
                                <p className={styles.error}>
                                    {/* {errors?.sourceAccount?.message} */}
                                </p>
                            </div>
                            <br />
                            <br />

                            <p className={styles.beneTitle}>
                                Beneficiary Details
                            </p>
                            {csvUpload ? (
                                <p>File Successfully uploaded!!!</p>
                            ) : (
                                <div>
                                    {formFields.map((field, index) => (
                                        <div key={index}>
                                            {paymentbanklistLoad ? (
                                                <Loader />
                                            ) : (
                                                <div
                                                    className={styles.formBank}
                                                >
                                                    <label
                                                        className={
                                                            styles.bulkLabel
                                                        }
                                                    >
                                                        Choose Bank
                                                    </label>
                                                    <Search
                                                        array={
                                                            paymentbanklistData
                                                        }
                                                        placeholder="Search for bank"
                                                        onBankSelect={
                                                            handleBankSelect
                                                        }
                                                    />
                                                </div>
                                            )}
                                            <br />
                                            <div className={styles.formNumber}>
                                                <label
                                                    className={styles.bulkLabel}
                                                >
                                                    Account Number
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Account Number"
                                                    onInput={(e) => {
                                                        handleAccountNumberChange(
                                                            index
                                                        );
                                                        setFieldValue(
                                                            'ecoAccountNumber',
                                                            e.target.value
                                                        );
                                                        setAccountNumber(
                                                            e.target.value
                                                        );
                                                    }}
                                                    onBlur={handleBlur}
                                                    name="ecoAccountNumber"
                                                />
                                            </div>
                                            {accountInquiryLoad ? (
                                                <Loader />
                                            ) : (
                                                <div
                                                    className={styles.narration}
                                                >
                                                    <label> Account Name</label>
                                                    <input
                                                        type="text"
                                                        value={
                                                            field.accountName
                                                        } // Set the account name
                                                        disabled
                                                        required
                                                    />
                                                    {accountInquiryErr ? (
                                                        <p
                                                            className={
                                                                styles.error
                                                            }
                                                        >
                                                            {
                                                                accountInquiryErr
                                                                    ?.data
                                                                    ?.message
                                                            }
                                                        </p>
                                                    ) : null}
                                                </div>
                                            )}
                                            <br />
                                            {diffAmount ? (
                                                <>
                                                    <div
                                                        className={
                                                            styles.amountDiv
                                                        }
                                                    >
                                                        <label
                                                            className={
                                                                styles.bulkLabel
                                                            }
                                                        >
                                                            Amount
                                                        </label>
                                                        <input
                                                            onChange={(e) => {
                                                                setFieldValue(
                                                                    'ecoEnterAmount',
                                                                    e.target
                                                                        .value
                                                                );
                                                                if (
                                                                    e.target
                                                                        .value
                                                                        .length ===
                                                                    0
                                                                ) {
                                                                    setActiveBtn(
                                                                        false
                                                                    );
                                                                } else if (
                                                                    e.target
                                                                        .value
                                                                        .length >
                                                                    0
                                                                ) {
                                                                    setActiveBtn(
                                                                        true
                                                                    );
                                                                }
                                                            }}
                                                            type="text"
                                                            placeholder="0.00"
                                                        />
                                                    </div>
                                                    <br />
                                                    <br />
                                                </>
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className={styles.narration}>
                                <div className={styles.uploadCsv}>
                                    {/* <p>Tap to carry out up to 5 transactions</p> */}
                                    {csvUpload ? null : (
                                        <div className={styles.actionButtons}>
                                            <div
                                                className={styles.plus}
                                                onClick={addFormFields}
                                            >
                                                <PlusSvg />
                                            </div>
                                            <div
                                                className={styles.minus}
                                                onClick={() =>
                                                    removeFormFields(
                                                        formFields.length - 1
                                                    )
                                                }
                                            >
                                                -
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {csvUpload ? null : diffAmount ? null : (
                                    <div className={styles.amountDiv}>
                                        <label className={styles.bulkLabel}>
                                            Amount
                                        </label>
                                        <input
                                            name="amount"
                                            type="text"
                                            placeholder="0.00"
                                            onChange={(e) => {
                                                setFieldValue(
                                                    'ecoEnterAmount',
                                                    e.target.value
                                                );
                                                if (
                                                    e?.target.value.length === 0
                                                ) {
                                                    setActiveBtn(false);
                                                } else if (
                                                    e?.target.value.length > 0
                                                ) {
                                                    setActiveBtn(true);
                                                }
                                            }}
                                        />
                                    </div>
                                )}

                                <div className={styles.saveBene}>
                                    <label className={styles.beneCheck}>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setDiffAmount(true);
                                                    setActiveBtn(true);
                                                } else if (!e.target.checked) {
                                                    setDiffAmount(false);
                                                    setActiveBtn(false);
                                                }
                                            }}
                                        />
                                        <span>
                                            <i></i>
                                        </span>
                                    </label>
                                    <p>Input Different Amount</p>
                                </div>
                                <div className={styles.amountDiv}>
                                    <p className={styles.beneTitle}>
                                        For more than 5 transaction
                                    </p>
                                    <div className={styles.uploadCsvs}>
                                        <p>
                                            <label>
                                                Tap to
                                                <input
                                                    type="file"
                                                    accept=".csv, .xlsm"
                                                    onChange={(e) => {
                                                        //  //console.log(e.target.files[0]);
                                                        if (
                                                            e.target.files[0].name.split(
                                                                '.'
                                                            )[1] === 'xlsm'
                                                        ) {
                                                            const reader =
                                                                new FileReader();
                                                            reader.onload = (
                                                                e
                                                            ) => {
                                                                const data =
                                                                    e.target
                                                                        .result;
                                                                const workbook =
                                                                    XLSX.read(
                                                                        data,
                                                                        {
                                                                            type: 'array'
                                                                        }
                                                                    );
                                                                const sheetName =
                                                                    workbook
                                                                        .SheetNames[0];
                                                                const worksheet =
                                                                    workbook
                                                                        .Sheets[
                                                                        sheetName
                                                                    ];
                                                                const json =
                                                                    XLSX.utils.sheet_to_json(
                                                                        worksheet
                                                                    );
                                                                localStorage.setItem(
                                                                    'csvData',
                                                                    JSON.stringify(
                                                                        json
                                                                    )
                                                                );
                                                            };
                                                            reader.readAsArrayBuffer(
                                                                e.target
                                                                    .files[0]
                                                            );

                                                            localStorage.removeItem(
                                                                'number'
                                                            );
                                                            setCsvUpload(true);
                                                            setActiveBtn(true);
                                                        } else {
                                                            setFileError(
                                                                'File Uploaded is Not CsV'
                                                            );
                                                        }
                                                    }}
                                                />
                                                <span> Upload CSV File</span>
                                            </label>
                                        </p>
                                        <p>{fileError}</p>
                                        <p>
                                            <a
                                                href="../../../Assets/CSV.xlsm"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download="CSV Template"
                                            >
                                                <span>Download CSV File</span>
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <ButtonComp
                                    disabled={activeBtn}
                                    active={activeBtn ? 'active' : 'inactive'}
                                    text={buttonText}
                                    type="submit"
                                    // err={errorMessageInterBankEnquiry}
                                />
                            </div>
                        </form>
                    )}
                </Formik>
            )}
        </div>
    );
};

export default BulkTransfer;
