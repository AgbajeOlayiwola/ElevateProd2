import React, { useState, useEffect } from 'react';
import ButtonComp from '../Button';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import { loadbankAsync } from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

const SingleTransfer = ({
    selfaction,
    othersaction,
    firstTitle,
    buttonText
}) => {
    const [activeBtn, setActiveBtn] = useState(false);
    const [others, setOthers] = useState(true);
    const [self, setSelf] = useState(false);
    const [bank, setBank] = useState([]);
    const dispatch = useDispatch();
    const { banks } = useSelector((state) => state.banksReducer);

    useEffect(() => {
        dispatch(loadbankAsync('ENG'));
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
            <h2>{firstTitle}</h2>
            <p className={styles.choose}>Choose Transfer Type</p>
            <div className={styles.transferHead}>
                <div
                    className={
                        others
                            ? styles.transferActive
                            : styles.transferHeadSingle
                    }
                    onClick={() => {
                        setOthers(true);
                        setSelf(false);
                    }}
                >
                    <p>Others</p>
                </div>
                <div
                    className={
                        self ? styles.transferActive : styles.transferHeadSingle
                    }
                    onClick={() => {
                        setSelf(true);
                        setOthers(false);
                    }}
                >
                    <p>To Self</p>
                </div>
            </div>
            {others && (
                <form onSubmit={handleSubmit(othersaction)}>
                    <input
                        type="text"
                        defaultValue="others"
                        {...register('others')}
                        className={styles.displayNone}
                    />
                    <div>
                        <label>Account to Debit</label>
                        <input
                            {...register('accountName', {
                                required: 'Please enter your Acount Name',
                                pattern: {
                                    value: /^[A-Za-z ]+$/i,
                                    message: 'Only Alphabelts allowed'
                                }
                            })}
                            type="text"
                            placeholder="Account to Debit"
                        />
                        <p className={styles.error}>
                            {errors?.accountName?.message}
                        </p>
                    </div>
                    <div className={styles.accountDetails}>
                        <label>Account Details to Credit</label>
                        <div className={styles.accountDetailsBody}>
                            <label>Beneficiaries</label>
                            <input
                                {...register('beneficiaries', {
                                    required: 'Please enter Beneficiary',
                                    pattern: {
                                        value: /^[A-Za-z ]+$/i,
                                        message: 'Only Alphabelts allowed'
                                    }
                                })}
                                type="text"
                                placeholder="Enter Beneficiary"
                            />
                            <p className={styles.error}>
                                {errors?.beneficiaries?.message}
                            </p>
                            <div className={styles.accountDetailSingle}>
                                <div
                                    className={styles.accountDetailSingleInput}
                                >
                                    <label> Account Number</label>
                                    <input
                                        {...register('accountNumber', {
                                            required:
                                                'Please enter  Acount Number',
                                            pattern: {
                                                value: /^[0-9 ]/i,
                                                message:
                                                    'Account Number must be a number'
                                            }
                                        })}
                                        type="number"
                                        placeholder="Enter account number here"
                                    />
                                    <p className={styles.error}>
                                        {errors?.accountNumber?.message}
                                    </p>
                                </div>
                                <div
                                    className={styles.accountDetailSingleSelect}
                                >
                                    <label>Bank</label>
                                    <select
                                        {...register('bankName', {
                                            required: 'Choose a bank'
                                        })}
                                        name="bankName"
                                    >
                                        <option value="">Select Bank</option>
                                        {bank?.map((bank, index) => {
                                            return (
                                                <option
                                                    value={bank.institutionId}
                                                    key={index}
                                                >
                                                    {bank.institutionName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {errors.bankName && (
                                        <p className={styles.error}>
                                            {errors?.bankName?.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
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
                            type="number"
                            placeholder="5,000,000,000.00"
                        />
                    </div>
                    <p className={styles.error}>{errors?.amount?.message}</p>
                    <div className={styles.narration}>
                        <label>Transfer Narration</label>
                        <input
                            {...register('narration', {
                                required: 'Please enter your Narration',
                                pattern: {
                                    value: /^[A-Za-z ]+$/i,
                                    message: 'Only Alphabelts allowed'
                                }
                            })}
                            type="text"
                            placeholder="5,000,000,000.00"
                            onChange={(e) => {
                                if (e?.target.value.length === 0) {
                                    setActiveBtn(false);
                                } else if (e?.target.value.length > 0) {
                                    setActiveBtn(true);
                                }
                            }}
                            name="narration"
                        />
                    </div>
                    <p className={styles.error}>{errors?.narration?.message}</p>
                    <div className={styles.repeat}>
                        <input type="checkbox" />
                        <p>Do you want to set this as a repeat transaction?</p>
                    </div>
                    <ButtonComp
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        text={buttonText}
                        type="submit"
                    />
                    <p className={styles.schedule}>
                        Not paying now?<span>Schedule for Later</span>
                    </p>
                </form>
            )}
            {self && (
                <form onSubmit={handleSubmit(selfaction)}>
                    <input
                        type="text"
                        defaultValue="self"
                        {...register('self')}
                        className={styles.displayNone}
                    />
                    <div>
                        <label>Account to Debit</label>
                        <input
                            {...register('accountName', {
                                required: 'Please enter your Acount Name',
                                pattern: {
                                    value: /^[A-Za-z ]+$/i,
                                    message: 'Only Alphabelts allowed'
                                }
                            })}
                            type="text"
                            placeholder="Account to Debit"
                        />
                        <p className={styles.error}>
                            {errors?.accountName?.message}
                        </p>
                    </div>
                    <div className={styles.narration}>
                        <label>Account to Credit</label>
                        <input
                            {...register('accountNumber', {
                                required:
                                    'Please enter Account Number to Credit',
                                pattern: {
                                    value: /^[0-9]/i,
                                    message:
                                        'Account Number can only be number '
                                }
                            })}
                            type="number"
                            placeholder="Enter Account Number"
                        />
                    </div>
                    <p className={styles.error}>
                        {errors?.accountNumber?.message}
                    </p>
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
                            type="number"
                            placeholder="5,000,000,000.00"
                        />
                    </div>
                    <p className={styles.error}>{errors?.amount?.message}</p>
                    <div className={styles.narration}>
                        <label>Transfer Narration</label>
                        <input
                            {...register('narration', {
                                required: 'Please enter your Narration',
                                pattern: {
                                    value: /^[A-Za-z ]+$/i,
                                    message: 'Only Alphabelts allowed'
                                }
                            })}
                            type="text"
                            placeholder="5,000,000,000.00"
                            onChange={(e) => {
                                if (e?.target.value.length === 0) {
                                    setActiveBtn(false);
                                } else if (e?.target.value.length > 0) {
                                    setActiveBtn(true);
                                }
                            }}
                            name="narration"
                        />
                    </div>
                    <p className={styles.error}>{errors?.narration?.message}</p>
                    <div className={styles.repeat}>
                        <input type="checkbox" />
                        <p>Do you want to set this as a repeat transaction?</p>
                    </div>
                    <ButtonComp
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        text={buttonText}
                        type="submit"
                    />
                    <p className={styles.schedule}>
                        Not paying now?<span>Schedule for Later</span>
                    </p>
                </form>
            )}
        </div>
    );
};

export default SingleTransfer;
