import React, { useState, useEffect } from 'react';
import ButtonComp from '../Button';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import { loadbank } from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import SourceSvg from '../ReusableSvgComponents/SourceSvg';
import PlusSvg from '../ReusableSvgComponents/PlusSvg';

const BulkTransfer = ({ action, firstTitle, buttonText }) => {
    const [activeBtn, setActiveBtn] = useState(false);
    const [bank, setBank] = useState([]);
    const dispatch = useDispatch();
    const { banks } = useSelector((state) => state.banksReducer);
    const count = 0;
    const [number, setNumber] = useState([]);
    console.log(number);
    useEffect(() => {}, [number]);

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
            <form onSubmit={handleSubmit()}>
                <h2 className={styles.firstTitle}>{firstTitle}</h2>
                <div className={styles.source}>
                    <h2>
                        Source <span>- Marvelous N******</span>
                    </h2>
                    <SourceSvg />
                </div>
                {number?.map(() => {
                    return (
                        <div className={styles.formCont}>
                            <div className={styles.formGroup}>
                                <label>Account Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter Account Number"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Choose Bank</label>
                                <select>
                                    <option value="">Select Bank</option>
                                </select>
                            </div>
                        </div>
                    );
                })}
                <div className={styles.formCont}>
                    <div className={styles.formGroup}>
                        <label>Account Number</label>
                        <input type="text" placeholder="Enter Account Number" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Choose Bank</label>
                        <select>
                            <option value="">Select Bank</option>
                        </select>
                    </div>
                    <div
                        className={styles.plus}
                        onClick={() => {
                            setNumber((arr) => [...arr, `${arr.length}`]);
                        }}
                    >
                        <PlusSvg />
                    </div>
                </div>
                <div className={styles.destinationCountry}>
                    <div>
                        <label>Select Method</label>
                        <select
                            {...register('method', {
                                required: 'Method is required'
                            })}
                            name="method"
                        >
                            <option value="">Select Method</option>
                            <option value="Input">Input Accounts</option>
                            <option value="Upload">Upload File(Excel)</option>
                        </select>
                        <p className={styles.error}>
                            {errors?.method?.message}
                        </p>
                    </div>
                    <div>
                        <label>Account to Debit</label>
                        <select
                            {...register('accountDebit', {
                                required: 'Account to Debit is required'
                            })}
                            name="accountDebit"
                        >
                            <option value="">Marvelous Solutions</option>
                            <option value="Akinfe Temitope">
                                AKinfe Temitope
                            </option>
                        </select>
                        <p className={styles.error}>
                            {errors?.accountDebit?.message}
                        </p>
                    </div>
                </div>
                <div className={styles.repeat}>
                    <input type="checkbox" />
                    <p className={styles.same}>
                        Please select if all will be the same amount
                    </p>
                </div>
                <div className={styles.accountDetails}>
                    <label>Account Details to Credit</label>
                    <div className={styles.accountDetailsBody}>
                        <div className={styles.accountDetailSingle}>
                            <div className={styles.accountDetailSingleInput}>
                                <label> Account Number 1</label>
                                <input
                                    {...register('accountNumber1', {
                                        required:
                                            'Account Number 1 is required',
                                        pattern: {
                                            value: /^[0-9]/i,
                                            message:
                                                'Account Number can only be number '
                                        }
                                    })}
                                    name="accountNumber1"
                                    type="number"
                                    placeholder="Enter account number here"
                                />
                                <p className={styles.error}>
                                    {errors?.accountNumber1?.message}
                                </p>
                            </div>
                            <div className={styles.accountDetailSingleSelect}>
                                <label>Bank</label>
                                <select
                                    {...register('bankName1', {
                                        required: 'Bank name is required'
                                    })}
                                    name="bankName1"
                                >
                                    <option value="">Select Bank</option>
                                    {banks?.map((item, index) => {
                                        return (
                                            <option
                                                value={item.institutionId}
                                                key={index}
                                            >
                                                {item.institutionName}
                                            </option>
                                        );
                                    })}
                                </select>
                                <p className={styles.error}>
                                    {errors?.bankName1?.message}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.accountDetailsBodys}>
                        <div className={styles.accountDetailSingle}>
                            <div className={styles.accountDetailSingleInput}>
                                <label> Account Number 2</label>
                                <input
                                    {...register('accountNumber2', {
                                        required:
                                            'Account Number 2 is required',
                                        pattern: {
                                            value: /^[0-9]/i,
                                            message:
                                                'Account Number can only be number '
                                        }
                                    })}
                                    name="accountNumber2"
                                    type="number"
                                    placeholder="Enter account number here"
                                />
                                <p className={styles.error}>
                                    {errors?.accountNumber2?.message}
                                </p>
                            </div>
                            <div className={styles.accountDetailSingleSelect}>
                                <label>Bank</label>
                                <select
                                    {...register('bankName2', {
                                        required: 'Bank name is required'
                                    })}
                                    name="bankName2"
                                >
                                    <option value="">Select Bank</option>
                                    {banks?.map((item, index) => {
                                        return (
                                            <option
                                                value={item.institutionId}
                                                key={index}
                                            >
                                                {item.institutionName}
                                            </option>
                                        );
                                    })}
                                </select>
                                <p className={styles.error}>
                                    {errors?.bankName2?.message}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.accountDetailsBodys}>
                        <div className={styles.accountDetailSingle}>
                            <div className={styles.accountDetailSingleInput}>
                                <label> Account Number 3</label>
                                <input
                                    {...register('accountNumber3', {
                                        required:
                                            'Account Number 3 is required',
                                        pattern: {
                                            value: /^[0-9]/i,
                                            message:
                                                'Account Number can only be number '
                                        }
                                    })}
                                    name="accountNumber3"
                                    type="number"
                                    placeholder="Enter account number here"
                                />
                                <p className={styles.error}>
                                    {errors?.accountNumber3?.message}
                                </p>
                            </div>
                            <div className={styles.accountDetailSingleSelect}>
                                <label>Bank</label>
                                <select
                                    {...register('bankName3', {
                                        required: 'Bank name is required'
                                    })}
                                    name="bankName3"
                                >
                                    <option value="">Select Bank</option>
                                    {banks?.map((item, index) => {
                                        return (
                                            <option
                                                value={item.institutionId}
                                                key={index}
                                            >
                                                {item.institutionName}
                                            </option>
                                        );
                                    })}
                                </select>
                                <p className={styles.error}>
                                    {errors?.bankName3?.message}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.narration}>
                    <label>Enter Amount</label>
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
                        placeholder="# 5,000,000,000.00"
                        onChange={(e) => {
                            if (e?.target.value.length === 0) {
                                setActiveBtn(false);
                            } else if (e?.target.value.length > 0) {
                                setActiveBtn(true);
                            }
                        }}
                    />
                    <p className={styles.error}>{errors?.amount?.message}</p>
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
        </div>
    );
};

export default BulkTransfer;
