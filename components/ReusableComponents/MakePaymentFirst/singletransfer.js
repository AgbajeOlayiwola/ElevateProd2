import React, { useState } from 'react';
import ButtonComp from '../Button';
import styles from './styles.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const schema = yup.object().shape({
    accountName: yup.string().required('Account Name is required'),
    beneficiaries: yup.string().required('Beneficiary is required'),
    accountNumber: yup
        .number('Account Number is Should be a Number')
        .typeError('Account Number is required')
        .required(),
    amount: yup
        .number('Amount is Should be a Number')
        .typeError('Amount is required')
        .required('Amount is required'),
    narration: yup.string().required('Narration is required'),
    bankName: yup.string().required('Bank Name is required')
});

const SingleTransfer = ({ action, firstTitle, buttonText }) => {
    const [activeBtn, setActiveBtn] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: onchange,
        resolver: yupResolver(schema)
    });
    return (
        <div>
            <form onSubmit={handleSubmit(action)}>
                <h2>{firstTitle}</h2>
                <div>
                    <label>Account to Debit</label>
                    <input
                        {...register('accountName')}
                        type="text"
                        placeholder="Account to Debit"
                        name="accountName"
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
                            {...register('beneficiaries')}
                            type="text"
                            placeholder="Enter Beneficiary"
                            name="beneficiaries"
                        />
                        <p className={styles.error}>
                            {errors?.beneficiaries?.message}
                        </p>
                        <div className={styles.accountDetailSingle}>
                            <div className={styles.accountDetailSingleInput}>
                                <label> Account Number</label>
                                <input
                                    {...register('accountNumber')}
                                    type="number"
                                    placeholder="Enter account number here"
                                    name="accountNumber"
                                />
                                <p className={styles.error}>
                                    {errors?.accountNumber?.message}
                                </p>
                            </div>
                            <div className={styles.accountDetailSingleSelect}>
                                <label>Bank</label>
                                <select
                                    {...register('bankName')}
                                    name="bankName"
                                >
                                    <option value="">Select Bank</option>
                                    <option value="GTB">GTB</option>
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
                        {...register('amount')}
                        type="number"
                        placeholder="5,000,000,000.00"
                        name="amount"
                    />
                </div>
                <p className={styles.error}>{errors?.amount?.message}</p>
                <div className={styles.narration}>
                    <label>Transfer Narration</label>
                    <input
                        {...register('narration')}
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
        </div>
    );
};

export default SingleTransfer;
