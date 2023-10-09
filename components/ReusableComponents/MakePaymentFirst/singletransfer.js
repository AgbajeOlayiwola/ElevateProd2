import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Lottie from 'react-lottie';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { loadbank } from '../../../redux/actions/bankAction';
import { postInterBankEnquiry } from '../../../redux/actions/interbankEnquieryAction';
import {
    useAccountInquiryMutation,
    usePaymentbanklistMutation
} from '../../../redux/api/authApi';
import ButtonComp from '../Button';
import Loader from '../Loader';
import socialdata from '../Lotties/loading.json';
import BeneficiaryAvatarSvg from '../ReusableSvgComponents/BeneficiaryAvatarSvg';
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
    setFormdata
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
    const [isLoadinggg, setIsLoadinggg] = useState(false);
    const [accountNumber, setAccountNumber] = useState(
        payload.accountNumber !== ''
            ? payload.accountNumber
            : payload.accountNumberBene !== ''
            ? payload.accountNumberBene
            : ''
    );
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

    useEffect(() => {
        dispatch(loadbank('ENG'));
    }, []);

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
    useEffect(() => {
        paymentbanklist();
    }, []);
    useEffect(() => {
        if (paymentbanklistSuccess) {
            console.log(paymentbanklistData);
        }
    }, [paymentbanklistSuccess]);
    //     {
    //     isEcobankToEcobankTransaction: false,
    //     currency: "NGN",
    //     destinationBank: "ZENITH-ACC",
    //     destinationBankCode: "ZENITH-ACC",
    //     beneficiaryName: "Emmanuel",
    //     destinationAccountNo: "1441001096741",
    //     transactionAmount: 120,
    //     narration: "some naira to Emmanuel",
    //     accountId: "8005245579",
    //     accountNumber: "8005245579"
    // }
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
        ecoChooseBank: '',
        ecoEnterAmount: '',
        ecoNarration: ''
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
                    {/* <div className={styles.beneficiary}>
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
                        </div> */}
                    {/* <div
                            className={
                                !newBeneficiaries?.length
                                    ? styles.beneficiaryBodyNo
                                    : styles.beneficiaryBody
                            }
                        > */}
                    {/* {!newBeneficiaries?.length ? (
                                <h2>
                                    You do not have any Beneficiaries at the
                                    Moment
                                </h2>
                            ) : (
                                newBeneficiaries
                                    ?.filter((item) => {
                                        if (search === '') {
                                            return item;
                                        } else if (
                                            item.beneficiaryName
                                                .toLowerCase()
                                                .includes(search.toLowerCase())
                                        ) {
                                            return item;
                                        }
                                    })
                                    .map((beneficiaries, index) => {
                                        {
                                            beneficiaries
                                                ? (beneficiaryName =
                                                      beneficiaries.beneficiaryName.split(
                                                          ' '
                                                      ))
                                                : null;
                                        }
                                        if (
                                            beneficiaries.bankName === 'ECOBANK'
                                        ) {
                                            return (
                                                <div
                                                    key={index}
                                                    className={
                                                        styles.beneficiarySingle
                                                    }
                                                    onClick={() => {
                                                        setBeneActive(
                                                            beneficiaries
                                                        );
                                                    }}
                                                >
                                                    <div
                                                        className={
                                                            styles.beneficiaryIcon
                                                        }
                                                    >
                                                        <BeneficiaryAvatarSvg />
                                                    </div>
                                                    <div>
                                                        <p
                                                            className={
                                                                styles.name
                                                            }
                                                        >
                                                            {`${beneficiaryName[0]} ${beneficiaryName[1]}`}
                                                        </p>
                                                        <p
                                                            className={
                                                                styles.benebank
                                                            }
                                                        >
                                                            {
                                                                beneficiaries.bankName
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })
                            )} */}
                    {/* </div> */}
                    {/* </div> */}
                    <Formik
                        validationSchema={initSchema}
                        // validateOnChange={true}
                        initialValues={initialValues}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values);
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
                                        onChange={(e) =>
                                            setFieldValue(
                                                'ecoSourceAccount',
                                                e.target.value
                                            )
                                        }
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
                                            if (e.target.value) {
                                                accountInquiry({
                                                    destinationBankCode:
                                                        'ECOBANK',
                                                    accountNumber:
                                                        values?.ecoAccountNumber
                                                });
                                            }

                                            // } else if (
                                            //     e.target.value.length < 10
                                            // ) {
                                            //     setInterEnquiry('');
                                            // }
                                        }}
                                        type="text"
                                        placeholder="Enter account number here"
                                    />
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
                                ) : // : beneActive ? (
                                //     <div className={styles.narration}>
                                //         <label> Account Name</label>
                                //         <input
                                //             {...register('accountName')}
                                //             type="text"
                                //             value={beneActive.beneficiaryName}
                                //         />
                                //         <p className={styles.error}>
                                //             {errors?.accountName?.message}
                                //         </p>
                                //     </div>
                                // )
                                Object.keys(payload).length !== 0 ? (
                                    <div className={styles.narration}>
                                        <label> Account Name</label>
                                        <input
                                            type="text"
                                            value={accountName}
                                        />
                                    </div>
                                ) : (
                                    <>
                                        {interEnquiry ? (
                                            <div className={styles.narration}>
                                                <label> Account Name</label>
                                                <input
                                                    type="text"
                                                    value={
                                                        interEnquiry.accountName
                                                    }
                                                    name="accountName"
                                                />
                                            </div>
                                        ) : null}
                                    </>
                                )}

                                <div className={styles.narration}>
                                    <label>Enter Amount</label>
                                    <input
                                        value={values?.ecoEnterAmount}
                                        type="number"
                                        placeholder="Enter Amount"
                                        name="ecoEnterAmount"
                                        onInput={(e) => {
                                            const inputValue = e.target.value;
                                            setFieldValue(
                                                'ecoEnterAmount',
                                                e.target.value
                                            );
                                            // setAmount(`${inputValue}.OO`);
                                            // if (e?.target.value.length === 0) {
                                            //     setActiveBtn(false);
                                            // } else if (
                                            //     e?.target.value.length > 0
                                            // ) {
                                            //     setActiveBtn(true);
                                            // }
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
                        <div
                            className={
                                !newBeneficiarieso?.length
                                    ? styles.beneficiaryBodyNo
                                    : styles.beneficiaryBody
                            }
                        >
                            {!newBeneficiarieso?.length ? (
                                <h2>
                                    You do not have any Beneficiaries at the
                                    Moment
                                </h2>
                            ) : (
                                newBeneficiarieso
                                    ?.filter((item) => {
                                        if (search === '') {
                                            return item;
                                        } else if (
                                            item.beneficiaryName
                                                .toLowerCase()
                                                .includes(search.toLowerCase())
                                        ) {
                                            return item;
                                        }
                                    })
                                    .map((beneficiaries, index) => {
                                        {
                                            beneficiaries
                                                ? (beneficiaryName =
                                                      beneficiaries.beneficiaryName.split(
                                                          ' '
                                                      ))
                                                : null;
                                        }
                                        if (
                                            beneficiaries.bankName !== 'ECOBANK'
                                        ) {
                                            return (
                                                <div
                                                    key={index}
                                                    className={
                                                        styles.beneficiarySingle
                                                    }
                                                    onClick={() => {
                                                        setBeneActive(
                                                            beneficiaries
                                                        );
                                                        setIsLoadinggg(false);
                                                    }}
                                                >
                                                    <div
                                                        className={
                                                            styles.beneficiaryIcon
                                                        }
                                                    >
                                                        <BeneficiaryAvatarSvg />
                                                    </div>
                                                    <div>
                                                        <p
                                                            className={
                                                                styles.name
                                                            }
                                                        >
                                                            {`${beneficiaryName[0]} ${beneficiaryName[1]}`}
                                                        </p>
                                                        <p
                                                            className={
                                                                styles.benebank
                                                            }
                                                        >
                                                            {
                                                                beneficiaries.bankName
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })
                            )}
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(othersaction)}>
                        <input
                            type="text"
                            {...register('type')}
                            value={type}
                            className={styles.displayNone}
                        />
                        <div className={styles.narration}>
                            <label>Source Account</label>
                            <select
                                name=""
                                id=""
                                {...register('sourceAccount', {
                                    required: 'Source Account is required'
                                })}
                                onInput={(event) => {
                                    setFormdata({
                                        ...formData,
                                        accountNum: event.target.value
                                    });
                                }}
                                // value={formData.accountNum}
                            >
                                <option value="">Select Account To Use</option>
                                {allAccountInfo
                                    .filter((account) => account.accountNo)
                                    .map((account) => {
                                        return (
                                            <>
                                                <option
                                                    className={styles.accntP}
                                                >
                                                    <p
                                                        value={
                                                            account?.accountNo
                                                        }
                                                    >
                                                        {account?.accountNo}
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
                                {errors?.sourceAccount?.message}
                            </p>
                        </div>
                        <div className={styles.narration}>
                            <label> Account Number</label>
                            {beneActive ? (
                                <input
                                    {...register('accountNumberBene')}
                                    type="number"
                                    value={beneActive.accountNumber}
                                />
                            ) : !beneActive ? (
                                <input
                                    {...register('accountNumber', {
                                        required: 'Please enter  Acount Number',
                                        pattern: {
                                            value: /^[0-9 ]/i,
                                            message:
                                                'Account Number must be a number'
                                        },
                                        minLength: {
                                            value: 10,
                                            message: 'Min length is 10'
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: 'Max length is 10'
                                        }
                                    })}
                                    value={accountNumber}
                                    onInput={(e) => {
                                        setAccountNumber(e.target.value);
                                        if (e.target.value.length < 10) {
                                            setInterEnquiry('');
                                            setshowInterEnquiry(false);
                                        }
                                    }}
                                    type="text"
                                    placeholder="Enter account number here"
                                />
                            ) : null}
                            <p className={styles.error}>
                                {errors?.accountNumber?.message}
                            </p>
                        </div>
                        <div className={styles.narration}>
                            <label>Choose Bank</label>
                            {beneActive ? (
                                <select
                                    {...register('bankNameBene')}
                                    name="bankName"
                                >
                                    <option value={beneActive.bankName}>
                                        {beneActive.bankName}
                                    </option>
                                </select>
                            ) : (
                                <>
                                    <select
                                        {...register('bankName', {
                                            required: 'Choose a bank'
                                        })}
                                        name="bankName"
                                        onChange={(e) => {
                                            setIsLoadinggg(true);
                                            const details = {
                                                destinationBankCode:
                                                    e.target.value,
                                                accountNo: accountNumber
                                            };
                                            dispatch(
                                                postInterBankEnquiry(details)
                                            );
                                        }}
                                    >
                                        <option>Select Destination Bank</option>
                                        {paymentbanklistData?.data.map(
                                            (account) => {
                                                return (
                                                    <>
                                                        <option
                                                            className={
                                                                styles.accntP
                                                            }
                                                        >
                                                            <p
                                                                value={
                                                                    account?.institutionName
                                                                }
                                                            >
                                                                {
                                                                    account?.institutionName
                                                                }
                                                            </p>
                                                            {/* <p>
                                                        {account?.availableBal.toLocaleString()}
                                                    </p> */}
                                                        </option>
                                                    </>
                                                );
                                            }
                                        )}
                                    </select>
                                    <p className={styles.error}>
                                        {errors?.bankName?.message}
                                    </p>
                                </>
                            )}

                            {errors.bankName && (
                                <p className={styles.error}>
                                    {errors?.bankName?.message}
                                </p>
                            )}
                        </div>{' '}
                        {isLoadinggg ? (
                            <Lottie
                                options={socialOptions}
                                height={100}
                                width={100}
                            />
                        ) : beneActive !== undefined ? (
                            <div className={styles.narration}>
                                <label> Account Name</label>
                                <input
                                    {...register('accountName')}
                                    type="text"
                                    value={beneActive?.beneficiaryName}
                                />
                                <p className={styles.error}>
                                    {errors?.accountName?.message}
                                </p>
                            </div>
                        ) : Object.keys(payload).length !== 0 ? (
                            <div className={styles.narration}>
                                <label> Account Name</label>
                                <input
                                    {...register('accountName')}
                                    type="text"
                                    value={accountName}
                                    readOnly
                                />
                                <p className={styles.error}>
                                    {errors?.accountName?.message}
                                </p>
                            </div>
                        ) : (
                            <>
                                {showInterEnquiry ? (
                                    <div className={styles.narration}>
                                        <label> Account Name</label>
                                        <input
                                            {...register('accountName')}
                                            type="text"
                                            value={interEnquiry.accountName}
                                        />
                                        <p className={styles.error}>
                                            {errors?.accountName?.message}
                                        </p>
                                        {errorInterBank ? (
                                            <p className={styles.error}>
                                                errorInterBank
                                            </p>
                                        ) : null}
                                    </div>
                                ) : null}
                            </>
                        )}
                        {/* <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Cant Find Bank? Enter First three letters of bank"
                                        onChange={(item) => {
                                            setBank([]);
                                            apibank?.filter((e) => {
                                                if (
                                                    e[0]
                                                        .toLowerCase()
                                                        .includes(
                                                            item.target.value.toLowerCase()
                                                        )
                                                ) {
                                                    let newBank = [];
                                                    newBank.splice(1, e);
                                                    // //console.log(newBank);
                                                    // //console.log(e);
                                                    setBank(newBank);
                                                    // //console.log(e);
                                                    // //console.log(bank);
                                                }
                                            });
                                        }}
                                    /> */}
                        <div className={styles.narration}>
                            <label>Enter Amount</label>
                            <input
                                {...register('amount', {
                                    required: 'Please enter Amount',
                                    pattern: {
                                        value: /^[0-9]/i,
                                        message: 'Amount can only be number '
                                    }
                                })}
                                value={amount}
                                type="text"
                                placeholder="Enter Amount"
                                onInput={(e) => {
                                    const inputValue = e.target.value;
                                    //  //console.log(
                                    //     parseInt(inputValue).toFixed(2)
                                    // );
                                    setAmount(inputValue);
                                    // setAmount(parseInt(inputValue).toFixed(2));
                                    if (inputValue.length === 0) {
                                        setActiveBtn(false);
                                    } else if (inputValue.length > 0) {
                                        setActiveBtn(true);
                                    }
                                }}
                            />
                            <p className={styles.error}>
                                {errors?.amount?.message}
                            </p>
                        </div>
                        <div className={styles.narration}>
                            <label>
                                Transfer Narration <span>(optional)</span>
                            </label>
                            <input
                                {...register('narration', {
                                    pattern: {
                                        value: /^[A-Za-z ]+$/i,
                                        message: 'Only Alphabelts allowed'
                                    }
                                })}
                                value={narration}
                                onInput={(e) => {
                                    setNarration(e.target.value);
                                }}
                                type="text"
                                placeholder="Enter Narration"
                                name="narration"
                            />
                            <p className={styles.error}>
                                {errors?.narration?.message}
                            </p>
                        </div>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <ButtonComp
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
                                text={buttonText}
                                type="submit"
                            />
                        )}
                        {/* <p className={styles.schedule}>
                    Not paying now?{' '}
                    <span onClick={scheduleLater}>Schedule for Later</span>
                </p> */}
                    </form>
                </>
            ) : null}
        </div>
    );
};

export default SingleTransfer;
