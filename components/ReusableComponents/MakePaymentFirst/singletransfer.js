import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Lottie from 'react-lottie';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import { loadbank } from '../../../redux/actions/bankAction';
import {
    useAccountInquiryMutation,
    usePaymentFetchtransactionfeeMutation,
    usePaymentbanklistMutation
} from '../../../redux/api/authApi';
import { setTransfer } from '../../../redux/slices/transferSlice';
import ButtonComp from '../Button';
import Loader from '../Loader';
import socialdata from '../Lotties/loading.json';
import Search from '../SearchInput';
import styles from './styles.module.css';
const SingleTransfer = ({
    othersaction,
    firstTitle,
    buttonText,
    scheduleLater,
    isLoading,
    bankAccounts,
    beneficiaries,
    payload,
    formData,
    setFormdata,
    nextPage
}) => {
    const [activeBtn, setActiveBtn] = useState(
        Object.keys(payload).length !== 0 ? true : false
    );
    const [bank, setBank] = useState([]);
    const [apibank, setApiBank] = useState([]);
    const [errorInterBank, setErrorInterBank] = useState('');
    const [errorIntraBank, setErrorIntraBank] = useState('');
    const [beneActive, setBeneActive] = useState();
    const [showInterEnquiry, setshowInterEnquiry] = useState(false);
    const [newBeneficiaries, setNewBeneficiaries] = useState([]);
    const [newBeneficiarieso, setNewBeneficiarieso] = useState([]);
    // const [inputType, setinputType] = useState(true);
    const [interEnquiry, setInterEnquiry] = useState('');
    const [accountName, setAccountName] = useState(
        payload.accountName !== '' ? payload.accountName : ''
    );
    const formRef = useRef();
    const [currency, setCurrency] = useState();
    const [transfers, setTransfers] = useState([]);
    const [isLoadinggg, setIsLoadinggg] = useState(false);
    const [accountNumber, setAccountNumber] = useState(
        payload.accountNumber !== ''
            ? payload.accountNumber
            : payload.accountNumberBene !== ''
            ? payload.accountNumberBene
            : ''
    );
    const [bankCode, setBankCode] = useState('');
    const [bankName, setBankName] = useState(
        payload.bankName !== ''
            ? payload.bankName
            : payload.bankNameBene !== ''
            ? payload.bankNameBene
            : ''
    );
    const [narration, setNarration] = useState(
        payload.narration !== '' ? payload.narration : ''
    );

    const [amount, setAmount] = useState(
        payload.amount !== '' ? payload.amount : ''
    );
    const [search, setSearch] = useState('');
    const [type, setType] = useState(
        payload.type === ''
            ? 'Ecobank'
            : payload.type === 'Ecobank'
            ? payload.type
            : payload.type === 'Other'
            ? payload.type
            : 'Ecobank'
    );
    // const [beneficiaries, setBeneficiaries] = useState([]);
    const isValidNUBAN = (accountNumber, bankCode) => {
        return isValidNUBANAcct(bankCode.trim() + accountNumber.trim());
    };
    const isValidNUBANAcct = (accountNumber) => {
        accountNumber = accountNumber.trim();

        if (accountNumber.length != 13) return false; // 3-digit bank code + 10-digit NUBAN

        let accountNumberDigits = accountNumber.split('');

        //   // //console.log("accountNumberDigits: ", accountNumberDigits);

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
    const socialOptions = {
        loop: true,
        autoplay: true,
        animationData: socialdata,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN',
        currencyDisplay: 'narrowSymbol'
    });
    // const getAllBanksByAccount = (accountNo) => {
    //     //NOTE, This can be fetched from the Database
    //     let bankArray = `ACCESS BANK:044:000014:999044~ACCESS BANK:063:000005:999044~Citi Bank:023:000009:CITI-ACC~Fidelity Bank:070:000007:FIDELITY-ACC~First Bank of Nigeria:011:000016:FIRST-ACC~First City Monument Bank:214:000003:FCMB-ACC~GT Bank Plc:058:000013:GUARANTY-ACC~Heritage:030:000020:HERITAGE-ACC~POLARIS BANK:076:000008:POLARIS~Stanbic IBTC Bank:221:000012:STANBIC-IBTC-ACC~Standard Chartered:068:000021:STANDARD-CHARTERED~Sterling Bank:232:000001:STERLING-ACC~Union Bank:032:000018:UNION-ACC~United Bank for Africa:033:000004:UNITED-ACC~Unity Bank:215:000011:UNITY-ACC~Wema Bank:035:000017:WEMA-ACC~Zenith Bank:057:000015:ZENITH-ACC~Sun Trust Account:100:000022:SUNTRUST-ACC`;
    //     let bankList = [];
    //     let bankDets = bankArray.split('~');
    //     for (var bankdet of bankDets) {
    //         let split = bankdet.split(':');
    //         if (isValidNUBAN(accountNo, split[1])) {
    //             bankList.push({
    //                 bankname: split[0],
    //                 cbncode: split[1],
    //                 bankcode: split[2],
    //                 bankCodes: split[3]
    //             });
    //         }
    //     }

    //     return bankList.map((bank) => bank);
    // };

    const dispatch = useDispatch();
    const handleInputChange = (value) => {
        // You can perform any other actions here if needed
        setAccountNumber(value);
    };
    // const debouncedInputChange = debounce(handleInputChange, 1000);

    useEffect(() => {
        dispatch(loadbank('ENG'));
    }, []);
    const [selectedBank, setSelectedBank] = useState(null);
    const handleBankSelect = (bank) => {
        setSelectedBank(bank);
    };
    // console.log(accountInquiryErr);
    useEffect(() => {
        setNewBeneficiarieso([]);
        setNewBeneficiaries([]);
        if (type === 'Other') {
            beneficiaries.beneficiaries?.filter((item) => {
                if (item.bankName !== 'ECOBANK') {
                    setNewBeneficiarieso((arr) => [...arr, item]);
                }
            });
        }
        if (type === 'Ecobank') {
            beneficiaries.beneficiaries?.filter((item) => {
                if (item.bankName === 'ECOBANK') {
                    setNewBeneficiaries((arr) => [...arr, item]);
                }
            });
        }
    }, [beneficiaries, type]);
    // useEffect(() => {
    //     if (banks !== null) {
    //         setApiBank(banks);
    //     }
    // }, [banks]);
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
    } = useForm();
    useEffect(() => {
        setInterEnquiry('');
    }, []);

    let beneficiaryName;
    const { allAccountInfo } = useSelector((store) => store);
    const { profile } = useSelector((store) => store);
    console.log(profile);
    // paymentbanklist;
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

    const [
        paymentFetchtransactionfee,
        {
            data: paymentFetchtransactionfeeData,
            isLoading: paymentFetchtransactionfeeLoad,
            isSuccess: paymentFetchtransactionfeeSuccess,
            isError: paymentFetchtransactionfeeFalse,
            error: paymentFetchtransactionfeeErr,
            reset: paymentFetchtransactionfeeReset
        }
    ] = usePaymentFetchtransactionfeeMutation();
    const showBulkErrorToastMessage = () => {
        toast.error('Error Fetching Transaction Fee', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
        // closeAction();
    };
    const { transfer } = useSelector((store) => store);
    useEffect(() => {
        if (paymentFetchtransactionfeeErr) {
            showBulkErrorToastMessage();
        }
    }, [paymentFetchtransactionfeeErr]);

    useEffect(() => {
        paymentbanklist();
    }, []);
    useEffect(() => {
        if (paymentbanklistSuccess) {
            console.log(paymentbanklistData);
        }
    }, [paymentbanklistSuccess]);

    useEffect(() => {
        if (paymentFetchtransactionfeeSuccess) {
            const data = {
                isEcobankToEcobankTransaction: false,
                currency: formRef?.current?.values?.ecoCurrency,
                destinationBank: formRef?.current?.values?.ecoChooseBank,
                destinationAccountNo:
                    formRef?.current?.values?.ecoAccountNumber,
                beneficiaryName: accountInquiryData?.data?.accountName,
                destinationBank: selectedBank?.institutionName,
                destinationBankCode: selectedBank?.institutionId,
                transactionAmount: formRef?.current?.values?.ecoEnterAmount,
                narration: formRef?.current?.values?.ecoEnterAmount,
                accountId: formRef?.current?.values?.ecoAccountId,
                accountNumber: formRef?.current?.values?.ecoSourceAccount,
                totalCharge: paymentFetchtransactionfeeData?.data?.totalCharge
            };

            dispatch(setTransfer(data));
            nextPage();
        }
    }, [paymentFetchtransactionfeeSuccess]);
    const handleBlur = () => {
        accountInquiry({
            destinationBankCode: selectedBank?.institutionId
                ? selectedBank?.institutionId
                : 'ECOBANK',
            accountNumber: accountNumber
        });
    };
    const initSchema = yup.object().shape({
        ecoSourceAccount: yup.string().required('Source Account.'),
        ecoAccountNumber: yup.string().required('Input account number'),
        // ecoAccountName: yup.string().required('Input Account Name'),
        // ecoChooseBank: yup.string().required('Choose a bank'),
        ecoEnterAmount: yup.string().required('Enter Amount')
    });

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
    return (
        <div>
            <ToastContainer />
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
                        setAccountNumber('');
                        setInterEnquiry('');
                        setAmount('');
                        setNarration('');
                        setAccountName('');
                        reset();
                        setBeneActive();
                        setActiveBtn(false);
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
                        setBeneActive();
                        setAccountNumber('');
                        setAmount('');
                        setNarration('');
                        setBankName('');
                        setAccountName('');
                        setInterEnquiry('');
                        setActiveBtn(false);
                        reset();
                    }}
                >
                    <p>Other Banks</p>
                </div>
            </div>
            {type === 'Ecobank' ? (
                <>
                    <Formik
                        validationSchema={initSchema}
                        // validateOnChange={true}
                        innerRef={formRef}
                        initialValues={initialValues}
                        onSubmit={(values, { setSubmitting }) => {
                            // console.log(values);
                            const data = {
                                isEcobankToEcobankTransaction: true,
                                currency: values?.ecoCurrency,
                                destinationBank: 'ECOBANK',
                                destinationBankCode: 'ECOBANK',
                                beneficiaryName:
                                    accountInquiryData?.data?.accountName,
                                destinationAccountNo: values?.ecoAccountNumber,
                                transactionAmount: values?.ecoEnterAmount,
                                narration: values?.ecoEnterAmount,
                                accountId: values?.ecoAccountId,
                                accountNumber: values?.ecoSourceAccount
                            };
                            nextPage();
                            console.log(data);
                            dispatch(setTransfer(data));

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
                                <input
                                    type="text"
                                    value={type}
                                    className={styles.displayNone}
                                />

                                <div className={styles.narration}>
                                    <label>Source Account</label>
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
                                            .filter(
                                                (account) => account.accountNo
                                            )
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
                                                            <p>
                                                                {
                                                                    account?.accountNo
                                                                }
                                                            </p>
                                                            {/* <p>
                                                        {account?.availableBal.toLocaleString()}
                                                    </p> */}
                                                        </option>
                                                    </>
                                                );
                                            })}
                                    </select>
                                    <p className={styles.error}>
                                        {errors ? (
                                            <>{errors?.ecoSourceAccount}</>
                                        ) : null}
                                    </p>
                                </div>
                                <div className={styles.narration}>
                                    <label>Choose Bank</label>
                                    {beneActive ? (
                                        <input
                                            // name="bankName"
                                            type="text"
                                            value={beneActive.bankName}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            onChange={(e) => {
                                                setFieldValue(
                                                    'ecoChooseBank',
                                                    e.target.value
                                                );
                                            }}
                                            value="ECOBANK"
                                        />
                                    )}
                                    <p className={styles.error}>
                                        {errors ? (
                                            <>{errors?.ecoChooseBank}</>
                                        ) : null}
                                    </p>
                                </div>
                                <div className={styles.narration}>
                                    <label>Account Number</label>
                                    <input
                                        value={values?.ecoAccountNumber}
                                        name="ecoAccountNumber"
                                        onInput={(e) => {
                                            setFieldValue(
                                                'ecoAccountNumber',
                                                e.target.value
                                            );
                                            setAccountNumber(e.target.value);
                                        }}
                                        onBlur={handleBlur}
                                        type="text"
                                        placeholder="Enter account number here"
                                    />
                                    {accountInquiryErr ? (
                                        <p className={styles.error}>
                                            {accountInquiryErr?.data?.message}
                                        </p>
                                    ) : null}
                                    <p className={styles.error}>
                                        {errors ? (
                                            <>{errors?.ecoAccountNumber}</>
                                        ) : null}
                                    </p>
                                </div>
                                {accountInquiryLoad ? (
                                    <Lottie
                                        options={socialOptions}
                                        height={100}
                                        width={100}
                                    />
                                ) : (
                                    <div className={styles.narration}>
                                        <label> Account Name</label>
                                        <input
                                            type="text"
                                            value={
                                                accountInquiryData?.data
                                                    ?.accountName
                                            }
                                        />
                                    </div>
                                )}

                                <div className={styles.narration}>
                                    <label>Enter Amount</label>
                                    <input
                                        value={values?.ecoEnterAmount}
                                        type="number"
                                        placeholder="Enter Amount"
                                        name="ecoEnterAmount"
                                        onChange={(e) => {
                                            const inputValue = e.target.value;
                                            setFieldValue(
                                                'ecoEnterAmount',
                                                e.target.value
                                            );
                                            if (inputValue?.length === 0) {
                                                setActiveBtn(false);
                                            } else if (inputValue?.length > 0) {
                                                setActiveBtn(true);
                                            }
                                        }}
                                    />
                                    <p className={styles.error}>
                                        {errors ? (
                                            <>{errors?.ecoEnterAmount}</>
                                        ) : null}
                                    </p>
                                </div>
                                <div className={styles.narration}>
                                    <label>
                                        Transfer Narration{' '}
                                        <span>(optional)</span>
                                    </label>
                                    <input
                                        value={values.ecoNarration}
                                        onInput={(e) => {
                                            setFieldValue(
                                                'ecoNarration',
                                                e.target.value
                                            );
                                        }}
                                        type="text"
                                        placeholder="Enter Narration"
                                        name="ecoNarration"
                                    />
                                </div>

                                <ButtonComp
                                    disabled={activeBtn}
                                    active={activeBtn ? 'active' : 'inactive'}
                                    text={buttonText}
                                    type="submit"
                                />
                            </form>
                        )}
                    </Formik>
                </>
            ) : type === 'Other' ? (
                <>
                    <div className={styles.beneficiary}>
                        <div className={styles.beneficiaryHeader}>
                            <h2>Beneficiaries</h2>

                            <div className={styles.beneficiarySearch}>
                                <img src="../Assets/Svgs/search.svg" alt="" />
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
                                    placeholder="Search Beneficiary"
                                />
                            </div>
                        </div>
                        <div className={styles.beneficiaryBodyNo}>
                            <h2>
                                You do not have any Beneficiaries at the Moment
                            </h2>
                        </div>
                    </div>
                    <Formik
                        validationSchema={initSchema}
                        // validateOnChange={true}
                        initialValues={initialValues}
                        innerRef={formRef}
                        onSubmit={(values, { setSubmitting }) => {
                            // console.log(values);

                            const transferFee = {
                                transactionType: 'INTERBANK',
                                amount: values?.ecoEnterAmount,
                                sourceAccount: values?.ecoSourceAccount,
                                sourceAccountType: 'A',
                                receiverAccountNumber: values?.ecoAccountNumber,
                                senderPhoneNumber: profile?.user?.phoneNumber,
                                sourceAccountCcy: values?.ecoCurrency,
                                udf1: selectedBank?.institutionId,
                                udf2: '',
                                udf3: ''
                            };
                            paymentFetchtransactionfee(transferFee);
                            setTransfers(data);
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
                                <input
                                    type="text"
                                    value={type}
                                    className={styles.displayNone}
                                />
                                <div className={styles.narration}>
                                    <label>Source Account</label>
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
                                            .filter(
                                                (account) => account.accountNo
                                            )
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
                                                            <p>
                                                                {
                                                                    account?.accountNo
                                                                }
                                                            </p>
                                                        </option>
                                                    </>
                                                );
                                            })}
                                    </select>
                                    {/* <p className={styles.error}>
                                        {errors?.sourceAccount?.message}
                                    </p> */}
                                </div>
                                <div className={styles.narration}>
                                    {paymentbanklistLoad ? (
                                        <Loader />
                                    ) : (
                                        <div className={styles.formBank}>
                                            <label className={styles.bulkLabel}>
                                                Choose Bank
                                            </label>
                                            <Search
                                                array={paymentbanklistData}
                                                placeholder="Search for bank"
                                                onBankSelect={handleBankSelect}
                                            />
                                        </div>
                                    )}
                                    <p className={styles.error}>
                                        {errors ? (
                                            <>{errors?.ecoChooseBank}</>
                                        ) : null}
                                    </p>
                                </div>
                                <div className={styles.narration}>
                                    <label>Account Number</label>
                                    <input
                                        value={values?.ecoAccountNumber}
                                        name="ecoAccountNumber"
                                        onInput={(e) => {
                                            setFieldValue(
                                                'ecoAccountNumber',
                                                e.target.value
                                            );
                                            setAccountNumber(e.target.value);
                                        }}
                                        onBlur={handleBlur}
                                        type="text"
                                        placeholder="Enter account number here"
                                    />
                                    {accountInquiryErr ? (
                                        <p className={styles.error}>
                                            {accountInquiryErr?.data?.message}
                                        </p>
                                    ) : null}
                                    <p className={styles.error}>
                                        {errors ? (
                                            <>{errors?.ecoAccountNumber}</>
                                        ) : null}
                                    </p>
                                </div>
                                {accountInquiryLoad ? (
                                    <Lottie
                                        options={socialOptions}
                                        height={100}
                                        width={100}
                                    />
                                ) : (
                                    <div className={styles.narration}>
                                        <label> Account Name</label>
                                        <input
                                            type="text"
                                            value={
                                                accountInquiryData?.data
                                                    ?.accountName
                                            }
                                        />
                                    </div>
                                )}

                                <div className={styles.narration}>
                                    <label>Enter Amount</label>
                                    <input
                                        value={values?.ecoEnterAmount}
                                        type="text"
                                        placeholder="Enter Amount"
                                        name="ecoEnterAmount"
                                        onInput={(e) => {
                                            const inputValue = e.target.value;
                                            setFieldValue(
                                                'ecoEnterAmount',
                                                e.target.value
                                            );
                                            if (inputValue?.length === 0) {
                                                setActiveBtn(false);
                                            } else if (inputValue?.length > 0) {
                                                setActiveBtn(true);
                                            }
                                        }}
                                    />
                                </div>
                                <p className={styles.error}>
                                    {errors ? (
                                        <>{errors?.ecoEnterAmount}</>
                                    ) : null}
                                </p>
                                <div className={styles.narration}>
                                    <label>
                                        Transfer Narration{' '}
                                        <span>(optional)</span>
                                    </label>
                                    <input
                                        value={narration}
                                        onInput={(e) => {
                                            setNarration(e.target.value);
                                        }}
                                        type="text"
                                        placeholder="Enter Narration"
                                        name="narration"
                                    />
                                    {/* <p className={styles.error}>
                                        {errors?.narration?.message}
                                    </p> */}
                                </div>

                                <ButtonComp
                                    disabled={activeBtn}
                                    active={activeBtn ? 'active' : 'inactive'}
                                    text={buttonText}
                                    loads={paymentFetchtransactionfeeLoad}
                                    type="submit"
                                />
                            </form>
                        )}
                    </Formik>
                </>
            ) : null}
        </div>
    );
};

export default SingleTransfer;
