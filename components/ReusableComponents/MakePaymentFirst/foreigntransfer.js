import React, { useState } from 'react';
import ButtonComp from '../Button';
import styles from './styles.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const schema = yup.object().shape({
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
    bankName: yup.string().required('Bank Name is required'),
    transferType: yup.string().required('Transfer Type is required'),
    destinationCountry: yup
        .string()
        .required('Destination Country is required'),
    accountDebit: yup.string().required('Account details is required')
});

const ForeignTransfer = ({ action, firstTitle, buttonText }) => {
    const [activeBtn, setActiveBtn] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });
    return (
        <div>
            <form onSubmit={handleSubmit(action)}>
                <h2>{firstTitle}</h2>
                <div className={styles.destinationCountry}>
                    <div>
                        <label>Destination Country</label>
                        <select
                            {...register('destinationCountry')}
                            name="destinationCountry"
                        >
                            <option value="">Nigeria</option>
                            <option value="Nigeria">Nigeria</option>
                        </select>
                        <p className={styles.error}>
                            {errors?.destinationCountry?.message}
                        </p>
                    </div>
                    <div>
                        <label>Transfer Type</label>
                        <select
                            {...register('transferType')}
                            name="transferType"
                        >
                            <option value="">others </option>
                            <option value="Bank Transfer">
                                Bank Transfer{' '}
                            </option>
                        </select>
                        <p className={styles.error}>
                            {errors?.transferType?.message}
                        </p>
                    </div>
                </div>
                <div className={styles.accountDetails}>
                    <label>Enter Destinaton Account Details</label>
                    <div className={styles.accountDetailsBody}>
                        <label>Beneficiaries</label>
                        <input
                            {...register('beneficiaries')}
                            name="beneficiaries"
                            type="text"
                            placeholder="Enter Beneficiary"
                        />
                        <p className={styles.error}>
                            {errors?.beneficiaries?.message}
                        </p>
                        <div className={styles.accountDetailSingle}>
                            <div className={styles.accountDetailSingleInput}>
                                <label> Account Number</label>
                                <input
                                    {...register('accountNumber')}
                                    name="accountNumber"
                                    type="text"
                                    placeholder="Enter account number here"
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
                                <p className={styles.error}>
                                    {errors?.bankName?.message}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.EnterAmount}>
                    <div>
                        <label>Enter Amount</label>
                        <input
                            {...register('amount')}
                            name="amount"
                            type="text"
                            placeholder="5,000,000,000.00"
                        />
                        <p className={styles.error}>
                            {errors?.amount?.message}
                        </p>
                    </div>
                    <div>
                        <label>Account to Debit</label>
                        <select
                            {...register('accountDebit')}
                            name="accountDebit"
                        >
                            <option value="">Marvelous Solutions</option>
                            <option value="Akinfe Temitope">
                                Akinfe Temitope
                            </option>
                        </select>
                        <p className={styles.error}>
                            {errors?.accountDebit?.message}
                        </p>
                    </div>
                </div>
                <div className={styles.narration}>
                    <label>Transfer Narration</label>
                    <input
                        {...register('narration')}
                        name="narration"
                        type="text"
                        placeholder="5,000,000,000.00"
                        onChange={(e) => {
                            if (e?.target.value.length === 0) {
                                setActiveBtn(false);
                            } else if (e?.target.value.length > 0) {
                                setActiveBtn(true);
                            }
                        }}
                    />
                </div>
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

export default ForeignTransfer;
