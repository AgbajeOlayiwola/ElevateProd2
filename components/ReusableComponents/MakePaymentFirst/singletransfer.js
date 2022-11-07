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
import BeneficiaryAvatarSvg from '../ReusableSvgComponents/BeneficiaryAvatarSvg';
import Loader from '../Loader';

const SingleTransfer = ({
    othersaction,
    firstTitle,
    buttonText,
    scheduleLater,
    isLoading,
    bankAccounts,
    beneficiaries,
    payload
}) => {
    const [activeBtn, setActiveBtn] = useState(
        Object.keys(payload).length !== 0 ? true : false
    );
    const [bank, setBank] = useState([]);
    const [beneActive, setBeneActive] = useState();
    const [showInterEnquiry, setshowInterEnquiry] = useState(false);
    // const [inputType, setinputType] = useState(true);
    const [interEnquiry, setInterEnquiry] = useState('');
    const [accountName, setAccountName] = useState(
        payload.accountName !== '' ? payload.accountName : ''
    );
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
    let bankString = `ACCESS BANK:044:000014~ACCESS BANK PLC (DIAMOND):063:000005~CITI BANK:023:000009~ECOBANK BANK:050:000010~FIDELITY BANK:070:000007~FIRST BANK OF NIGERIA:011:000016~FCMB:214:000003~GTBANK PLC:058:000013~HERITAGE:030:000020~POLARIS BANK:076:000008~STANBICIBTC BANK:221:000012~STANDARD CHARTERED:068:000021~STERLING BANK:232:000001~UNION BANK:032:000018~UNITED BANK FOR AFRICA:033:000004~UNITY BANK:215:000011~WEMA BANK:035:000017~ZENITH BANK PLC:057:000015~SUNTRUST BANK:100:000022`;

    let testNUBAN = accountNumber;

    const bankArray = bankString
        .split('~')
        .map((bankdet) => bankdet.split(':'))
        .sort((a, b) => a - b);

    const isValidNUBAN = (accountNo, bankCode) => {
        let accountNumber = (accountNo + bankCode).trim();
        if (accountNumber.length != 13) return false;
        let accountNumberDigits = Array.from(accountNumber, (x) => Number(x));

        let sumOfNumbers =
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

        let mod = sumOfNumbers % 10;

        let checkDigit = mod == 0 ? mod : 10 - mod;

        return checkDigit == accountNumberDigits[12];
    };
    useEffect(() => {
        const bankList = [];
        bankArray.map((split) => {
            // alert('Test');
            let accountNo = testNUBAN?.trim();
            let bankCode = split[1]?.trim();
            if (isValidNUBAN(accountNo, bankCode)) {
                bankList[bankList.length] = split;
                setBank(bankList);
            }
        });
    }, [accountNumber]);

    const dispatch = useDispatch();
    // const { banks } = useSelector((state) => state.banksReducer);
    const { interBankEnquiry, errorMessageInterBankEnquiry } = useSelector(
        (state) => state.interBankEnquiryReducer
    );
    const { intraBankEnquiry, errorMessageIntraBankEnquiry } = useSelector(
        (state) => state.intraBankEnquiryReducer
    );

    const interBankEnquiryCheck = () => {
        if (interBankEnquiry !== null) {
            setInterEnquiry(interBankEnquiry);
            setshowInterEnquiry(true);
        } else if (errorMessageInterBankEnquiry !== null) {
            alert(errorMessageInterBankEnquiry);
        }
    };
    useEffect(() => {
        interBankEnquiryCheck();
    }, [interBankEnquiry, errorMessageInterBankEnquiry]);

    const intraBankEnquiryCheck = () => {
        if (intraBankEnquiry !== null) {
            setInterEnquiry(intraBankEnquiry);
        } else if (errorMessageIntraBankEnquiry !== null) {
            alert(errorMessageIntraBankEnquiry);
        }
    };
    useEffect(() => {
        intraBankEnquiryCheck();
    }, [intraBankEnquiry, errorMessageIntraBankEnquiry]);
    // useEffect(() => {
    //     dispatch(loadbank('ENG'));
    // }, []);
    // useEffect(() => {
    //     if (banks !== null) {
    //         setBank(banks);
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
                        <div className={styles.beneficiaryBody}>
                            {!beneficiaries.beneficiaries?.length ? (
                                <h2>
                                    You do not have any Beneficiaries at the
                                    Moment
                                </h2>
                            ) : (
                                beneficiaries.beneficiaries
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
                                {...register('sourceAccount')}
                            >
                                {bankAccounts?.map((accounts, index) => {
                                    return (
                                        <option
                                            value={accounts.accountId}
                                            key={index}
                                        >
                                            {accounts.accountNumber}
                                        </option>
                                    );
                                })}
                            </select>
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
                                        if (e.target.value.length === 10) {
                                            const details = {
                                                accountNumber: e.target.value
                                            };
                                            dispatch(
                                                postIntraBankEnquiry(details)
                                            );
                                            setValue(
                                                'accountName',
                                                interEnquiry.accountName
                                            );
                                        } else if (
                                            e.target.value.length === 0
                                        ) {
                                            setInterEnquiry('');
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
                        {beneActive ? (
                            <div className={styles.narration}>
                                <label> Account Name</label>
                                <input
                                    {...register('accountName')}
                                    type="text"
                                    value={beneActive.beneficiaryName}
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
                                />
                                <p className={styles.error}>
                                    {errors?.accountName?.message}
                                </p>
                            </div>
                        ) : (
                            <>
                                {interEnquiry ? (
                                    <div className={styles.narration}>
                                        <label> Account Name</label>
                                        <input
                                            type="text"
                                            {...register('accountName')}
                                            value={interEnquiry.accountName}
                                            name="accountName"
                                        />
                                        <p className={styles.error}>
                                            {errors?.accountNumber?.message}
                                        </p>
                                    </div>
                                ) : null}
                            </>
                        )}
                        <div className={styles.narration}>
                            <label>Choose Bank</label>
                            {beneActive ? (
                                <input
                                    {...register('bankNameBene')}
                                    // name="bankName"
                                    type="text"
                                    value={beneActive.bankName}
                                />
                            ) : (
                                <input
                                    type="text"
                                    {...register('bankName')}
                                    value="ECOBANK"
                                />
                            )}

                            {errors.bankName && (
                                <p className={styles.error}>
                                    {errors?.bankName?.message}
                                </p>
                            )}
                        </div>
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
                                placeholder="5,000,000,000.00"
                                onInput={(e) => {
                                    setAmount(e.target.value);
                                    if (e?.target.value.length === 0) {
                                        setActiveBtn(false);
                                    } else if (e?.target.value.length > 0) {
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
                        {beneActive ? null : (
                            <div className={styles.saveBene}>
                                <label className={styles.beneCheck}>
                                    <input
                                        type="checkbox"
                                        name="beneficiary"
                                        {...register('beneficiary')}
                                    />
                                    <span>
                                        <i></i>
                                    </span>
                                </label>
                                <p>Save Beneficiary</p>
                            </div>
                        )}

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
                        <div className={styles.beneficiaryBody}>
                            {!beneficiaries.beneficiaries?.length ? (
                                <h2>
                                    You do not have any Beneficiaries at the
                                    Moment
                                </h2>
                            ) : (
                                beneficiaries.beneficiaries
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
                                {...register('sourceAccount')}
                            >
                                {bankAccounts?.map((accounts, index) => {
                                    return (
                                        <option
                                            value={accounts.accountId}
                                            key={index}
                                        >
                                            {accounts.accountNumber}
                                        </option>
                                    );
                                })}
                            </select>
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
                                        if (e.target.value.length === 10) {
                                        } else if (
                                            e.target.value.length === 0
                                        ) {
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
                        {beneActive ? (
                            <div className={styles.narration}>
                                <label> Account Name</label>
                                <input
                                    {...register('accountName')}
                                    type="text"
                                    value={beneActive.beneficiaryName}
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
                                            {errors?.accountNumber?.message}
                                        </p>
                                    </div>
                                ) : null}
                            </>
                        )}

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
                                <select
                                    {...register('bankName', {
                                        required: 'Choose a bank'
                                    })}
                                    name="bankName"
                                    onChange={(e) => {
                                        const details = {
                                            destinationBankCode: e.target.value,
                                            accountNo: accountNumber
                                        };
                                        dispatch(postInterBankEnquiry(details));
                                    }}
                                >
                                    {Object.keys(payload).length !== 0 ? (
                                        <option value={bankName}>
                                            {bankName}
                                        </option>
                                    ) : (
                                        <option value="">Select Bank</option>
                                    )}
                                    {bank?.map((bank, index) => {
                                        return (
                                            <option value={bank[0]} key={index}>
                                                {bank[0]}
                                            </option>
                                        );
                                    })}
                                </select>
                            )}

                            {errors.bankName && (
                                <p className={styles.error}>
                                    {errors?.bankName?.message}
                                </p>
                            )}
                        </div>
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
                                placeholder="5,000,000,000.00"
                                onInput={(e) => {
                                    setAmount(e.target.value);
                                    if (e?.target.value.length === 0) {
                                        setActiveBtn(false);
                                    } else if (e?.target.value.length > 0) {
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
                        {beneActive ? null : (
                            <div className={styles.saveBene}>
                                <label className={styles.beneCheck}>
                                    <input
                                        type="checkbox"
                                        name="beneficiary"
                                        {...register('beneficiary')}
                                    />
                                    <span>
                                        <i></i>
                                    </span>
                                </label>
                                <p>Save Beneficiary</p>
                            </div>
                        )}

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
