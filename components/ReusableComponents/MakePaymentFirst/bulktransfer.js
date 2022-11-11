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

const BulkTransfer = ({
    action,
    firstTitle,
    buttonText,
    bankAccounts,
    payload
}) => {
    const [activeBtn, setActiveBtn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [diffAmount, setDiffAmount] = useState(false);
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
    const [number, setNumber] = useState(
        // payload !== undefined ? payload :
        [1]
    );
    const XLSX = require('xlsx');
    // const fs = require('fs');
    useEffect(() => {}, [number]);
    const interBankEnquiryCheck = () => {
        // setLoading((prev) => !prev);
        if (interBankEnquiry !== null) {
            const newState = number.map((e, index) => {
                if (indexNumber === index) {
                    return interBankEnquiry;
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
                    return intraBankEnquiry;
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
    return (
        <div>
            <h2 className={styles.firstTitle}>{firstTitle}</h2>
            {/* <Beneficiary /> */}
            <form onSubmit={handleSubmit(action)}>
                <div className={styles.narration}>
                    <label className={styles.bulkLabel}>Source Account</label>
                    <select name="sourceAccount" {...register('sourceAccount')}>
                        {/* <option defaultValue={bankAccounts[0]?.accountId}>
                                {bankAccounts[0]?.accountNumber}
                            </option> */}
                        {bankAccounts?.map((accounts, index) => {
                            return (
                                <option value={accounts.accountId} key={index}>
                                    {accounts.accountNumber}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <p className={styles.beneTitle}>Beneficiary Details</p>
                {csvUpload ? (
                    <p>File Successfully uploaded!!!</p>
                ) : (
                    number?.map((e, index) => {
                        const fieldName = `details[${index}]`;
                        return (
                            <div key={index}>
                                <div className={styles.addedFormCont}>
                                    <div className={styles.formNumber}>
                                        <label className={styles.bulkLabel}>
                                            Account Number
                                        </label>
                                        <input
                                            type="number"
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
                                                // setAccountNumber(e.target.value);
                                                if (
                                                    e.target.value.length === 10
                                                ) {
                                                    setIndex(index);
                                                    setAcctNo(e.target.value);
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
                                            {payload !== undefined ? (
                                                <option value={e.bankName}>
                                                    {e.bankName}
                                                </option>
                                            ) : (
                                                <option value="">
                                                    Select Bank
                                                </option>
                                            )}

                                            <option value="ECOBANK">
                                                ECOBANK
                                            </option>
                                            {banks?.map((item, index) => {
                                                return (
                                                    <option
                                                        value={
                                                            item.institutionId
                                                        }
                                                        key={index}
                                                    >
                                                        {item.institutionName}
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
                                        value={e.accountName}
                                        name={`${fieldName}.accountName`}
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
                                            type="number"
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
                                                `${arr.length}`
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
                                type="number"
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
                                        onChange={(e) => {
                                            if (e.target.files) {
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
                                                setCsvUpload(true);
                                                setActiveBtn(true);
                                            }
                                        }}
                                    />
                                    <span> Upload CSV File</span>
                                </label>
                            </p>
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
                    {/* <p className={styles.schedule}>
                        Not paying now?<span>Schedule for Later</span>
                    </p> */}
                </div>
            </form>
        </div>
    );
};

export default BulkTransfer;
