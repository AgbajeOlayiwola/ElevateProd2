import React, { useState, useEffect } from 'react';
import ButtonComp from '../Button';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import {
    loadbank,
    postInterBankEnquiry,
    postIntraBankEnquiry
} from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import SourceSvg from '../ReusableSvgComponents/SourceSvg';
import PlusSvg from '../ReusableSvgComponents/PlusSvg';
import Beneficiary from '../Beneficiary';
import Loader from '../Loader';

const BulkTransfer = ({
    action,
    firstTitle,
    buttonText,
    bankAccounts,
    payload,
    formData,
    setFormdata,
    isLoading
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
    const { banks } = useSelector((state) => state.banksReducer);
    const { interBankEnquiry, errorMessageInterBankEnquiry } = useSelector(
        (state) => state.interBankEnquiryReducer
    );
    const { intraBankEnquiry, errorMessageIntraBankEnquiry } = useSelector(
        (state) => state.intraBankEnquiryReducer
    );
    const [number, setNumber] = useState([{ number: 1, bank: [] }]);
    const XLSX = require('xlsx');
    const isValidNUBAN = (accountNumber, bankCode) => {
        return isValidNUBANAcct(bankCode.trim() + accountNumber.trim());
    };
    const isValidNUBANAcct = (accountNumber) => {
        accountNumber = accountNumber.trim();

        if (accountNumber.length != 13) return false; // 3-digit bank code + 10-digit NUBAN

        let accountNumberDigits = accountNumber.split('');

        //   //console.log("accountNumberDigits: ", accountNumberDigits);

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
        //   //console.log("bankDets", bankDets);

        for (var bankdet of bankDets) {
            let split = bankdet.split(':');
            //console.log('split', split);

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
    useEffect(() => {
        localStorage.setItem('number', JSON.stringify(number));
    }, [number]);
    useEffect(() => {
        interBankEnquiryCheck();
    }, [interBankEnquiry, errorMessageInterBankEnquiry]);
    useEffect(() => {
        intraBankEnquiryCheck();
    }, [intraBankEnquiry, errorMessageIntraBankEnquiry]);

    useEffect(() => {
        dispatch(loadbank('ENG'));
    }, []);
    useEffect(() => {
        if (banks !== null) {
            setBank(banks);
        }
    }, [banks]);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN',
        currencyDisplay: 'narrowSymbol'
    });
    return (
        <div>
            <h2 className={styles.firstTitle}>{firstTitle}</h2>
            {/* <Beneficiary /> */}
            <form onSubmit={handleSubmit(action)}>
                <div className={styles.narration}>
                    <label className={styles.bulkLabel}>Source Account</label>
                    <select
                        name="sourceAccount"
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
                        {/* <option defaultValue={bankAccounts[0]?.accountId}>
                                {bankAccounts[0]?.accountNumber}
                            </option> */}
                        {bankAccounts?.map((accounts, index) => {
                            return (
                                <option value={accounts.accountId} key={index}>
                                    {`${
                                        accounts.accountNumber
                                    } - ${formatter.format(
                                        accounts.accountBalance
                                    )}`}
                                </option>
                            );
                        })}
                    </select>
                    <p className={styles.error}>
                        {errors?.sourceAccount?.message}
                    </p>
                </div>
                <p className={styles.beneTitle}>Beneficiary Details</p>
                {csvUpload ? (
                    <p>File Successfully uploaded!!!</p>
                ) : (
                    number?.map((e, index) => {
                        const fieldName = `details[${index}]`;
                        // let `amount${index}` = 0;
                        return (
                            <div key={index}>
                                <div className={styles.addedFormCont}>
                                    <div className={styles.formNumber}>
                                        <label className={styles.bulkLabel}>
                                            Account Number
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Account Number"
                                            {...register(
                                                `${fieldName}.accountNumber`,
                                                {
                                                    required:
                                                        'Account Number  is required',
                                                    pattern: {
                                                        value: /^[0-9]/i,
                                                        message:
                                                            'Account Number can only be number '
                                                    }
                                                }
                                            )}
                                            // value={
                                            //     payload !== undefined
                                            //         ? e.accountNumber
                                            //         : null
                                            // }
                                            onInput={(e) => {
                                                if (
                                                    e.target.value.length === 10
                                                ) {
                                                    setIndex(index);
                                                    setAcctNo(e.target.value);
                                                    const newState = number.map(
                                                        (s, indexx) => {
                                                            if (
                                                                index === indexx
                                                            ) {
                                                                return {
                                                                    number: indexx,
                                                                    bank: getAllBanksByAccount(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                };
                                                            } else {
                                                                return s;
                                                            }
                                                        }
                                                    );
                                                    setNumber(newState);
                                                }
                                            }}
                                            name={`${fieldName}.accountNumber`}
                                        />
                                    </div>
                                    <div className={styles.formBank}>
                                        <label className={styles.bulkLabel}>
                                            Choose Bank
                                        </label>
                                        <select
                                            {...register(
                                                `${fieldName}.bankName`,
                                                {
                                                    required:
                                                        'Bank name is required'
                                                }
                                            )}
                                            name={`${fieldName}.bankName`}
                                            onChange={(e) => {
                                                if (
                                                    e.target.value === 'ECOBANK'
                                                ) {
                                                    const details = {
                                                        accountNumber: acctNo
                                                    };
                                                    dispatch(
                                                        postIntraBankEnquiry(
                                                            details
                                                        )
                                                    );
                                                } else {
                                                    const details = {
                                                        destinationBankCode:
                                                            e.target.value,
                                                        accountNo: acctNo
                                                    };
                                                    dispatch(
                                                        postInterBankEnquiry(
                                                            details
                                                        )
                                                    );
                                                }
                                            }}
                                        >
                                            {/* {payload !== undefined ? (
                                                <option value={e.bankName}>
                                                    {e.bankName}
                                                </option>
                                            ) : ( */}
                                            <option value="">
                                                Select Bank
                                            </option>
                                            {/* )} */}

                                            <option value="ECOBANK">
                                                ECOBANK
                                            </option>
                                            {e?.bank?.map((item, index) => {
                                                return (
                                                    <option
                                                        value={item.bankCodes}
                                                        key={index}
                                                    >
                                                        {item.bankname}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className={styles.narration}>
                                    <label> Account Name</label>
                                    <input
                                        {...register(
                                            `${fieldName}.accountName`
                                        )}
                                        // defaultValue={...e.accountName}
                                        type="text"
                                        value={e?.number?.accountName}
                                        name={`${fieldName}.accountName`}
                                        disabled
                                        required
                                    />
                                    <p className={styles.error}>
                                        {errors?.accountNumber?.message}
                                    </p>
                                </div>

                                {diffAmount ? (
                                    <div className={styles.amountDiv}>
                                        <label className={styles.bulkLabel}>
                                            Amount
                                        </label>
                                        <input
                                            {...register(
                                                `${fieldName}.amount`,
                                                {
                                                    required:
                                                        'Amount  is required',
                                                    pattern: {
                                                        value: /^[0-9]/i,
                                                        message:
                                                            'Amount can only be number '
                                                    }
                                                }
                                            )}
                                            name={`${fieldName}.amount`}
                                            type="text"
                                            placeholder="0.00"
                                        />
                                    </div>
                                ) : null}
                            </div>
                        );
                    })
                )}

                <div className={styles.narration}>
                    <div className={styles.uploadCsv}>
                        <p>Tap to carry out up to 5 transactions</p>
                        {csvUpload ? null : (
                            <div className={styles.actionButtons}>
                                <div
                                    className={styles.plus}
                                    onClick={() => {
                                        if (
                                            number.length === 5 ||
                                            number.length > 5
                                        ) {
                                            alert(
                                                'You can only carry out 5 transactions at the same time. Use CSV file instead'
                                            );
                                        } else {
                                            setNumber((arr) => [
                                                ...arr,
                                                {
                                                    number: `${arr.length}`,
                                                    bank: []
                                                }
                                            ]);
                                        }
                                    }}
                                >
                                    <PlusSvg />
                                </div>
                                <div
                                    className={styles.minus}
                                    onClick={() => {
                                        if (
                                            number.length === 1 ||
                                            number.length < 1
                                        ) {
                                            alert('Minimum of one Beneficiary');
                                        } else {
                                            setNumber(
                                                number.filter((item) => {
                                                    return (
                                                        item !==
                                                        number[
                                                            number.length - 1
                                                        ]
                                                    );
                                                })
                                            );
                                        }
                                    }}
                                >
                                    -
                                </div>
                            </div>
                        )}
                    </div>
                    {csvUpload ? null : diffAmount ? null : (
                        <div className={styles.amountDiv}>
                            <label className={styles.bulkLabel}>Amount</label>
                            <input
                                {...register('amount', {
                                    required: 'Amount  is required',
                                    pattern: {
                                        value: /^[0-9]/i,
                                        message: 'Amount can only be number '
                                    }
                                })}
                                name="amount"
                                type="text"
                                placeholder="0.00"
                                onChange={(e) => {
                                    if (e?.target.value.length === 0) {
                                        setActiveBtn(false);
                                    } else if (e?.target.value.length > 0) {
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
                                            console.log(e.target.files[0]);
                                            if (
                                                e.target.files[0].name.split(
                                                    '.'
                                                )[1] === 'xlsm'
                                            ) {
                                                const reader = new FileReader();
                                                reader.onload = (e) => {
                                                    const data =
                                                        e.target.result;
                                                    const workbook = XLSX.read(
                                                        data,
                                                        { type: 'array' }
                                                    );
                                                    const sheetName =
                                                        workbook.SheetNames[0];
                                                    const worksheet =
                                                        workbook.Sheets[
                                                            sheetName
                                                        ];
                                                    const json =
                                                        XLSX.utils.sheet_to_json(
                                                            worksheet
                                                        );
                                                    localStorage.setItem(
                                                        'csvData',
                                                        JSON.stringify(json)
                                                    );
                                                };
                                                reader.readAsArrayBuffer(
                                                    e.target.files[0]
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
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            text={buttonText}
                            type="submit"
                            // err={errorMessageInterBankEnquiry}
                        />
                    )}
                    {/* <p className={styles.schedule}>
                        Not paying now?<span>Schedule for Later</span>
                    </p> */}
                </div>
            </form>
        </div>
    );
};

export default BulkTransfer;
