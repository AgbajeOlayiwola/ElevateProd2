import React, { useState, useRef, useEffect } from 'react';
import ButtonComp from '../Button';
import styles from './styles.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const schema = yup.object().shape({
    accountName: yup.string().required(),
    beneficiaries: yup.string().required(),
    accountNumber: yup.number().positive().required(),
    accountNumber1: yup.number().positive().required(),
    accountNumber2: yup.number().positive().required(),
    accountNumber3: yup.number().positive().required(),
    amount: yup.number().positive().required(),
    narration: yup.string().required(),
    bankName: yup.string().required(),
    destinationCountry: yup.string().required(),
    transferType: yup.string().required(),
    paymentType: yup.string().required(),
    billerType: yup.string().required(),
    billerCategory: yup.string().required(),
    billerDetail: yup.string().required(),
    billerPlan: yup.string().required(),
    method: yup.string().required(),
    accountDebit: yup.string().required()
});

const MakePaymentFirst = ({ firstTitle, closeAction, buttonText, action }) => {
    const [activeBtn, setActiveBtn] = useState(false);
    const myref = useRef();
    useEffect(() => {
        myref.current.scrollTo(0, 0);
        window.scrollTo(0, 0);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    return (
        <div className={styles.firstDiv} ref={myref}>
            <div className={styles.firstBody}>
                {firstTitle === 'Single Transfer Payment' ? (
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
                                {errors ? (
                                    <p className={styles.error}>
                                        {errors.accountName?.message}
                                    </p>
                                ) : null}
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
                                    {errors ? (
                                        <p className={styles.error}>
                                            {errors.beneficiaries?.message}
                                        </p>
                                    ) : null}
                                    <div className={styles.accountDetailSingle}>
                                        <div
                                            className={
                                                styles.accountDetailSingleInput
                                            }
                                        >
                                            <label> Account Number</label>
                                            <input
                                                {...register('accountNumber')}
                                                type="text"
                                                placeholder="Enter account number here"
                                                name="accountNumber"
                                            />
                                            {errors ? (
                                                <p className={styles.error}>
                                                    {
                                                        errors.accountNumber
                                                            ?.message
                                                    }
                                                </p>
                                            ) : null}
                                        </div>
                                        <div
                                            className={
                                                styles.accountDetailSingleSelect
                                            }
                                        >
                                            <label>Bank</label>
                                            <select
                                                {...register('bankName')}
                                                name="bankName"
                                            >
                                                <option>Select Bank</option>
                                                <option value="GTB">GTB</option>
                                            </select>
                                            {errors ? (
                                                <p className={styles.error}>
                                                    {errors.bankName?.message}
                                                </p>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.narration}>
                                <label>Enter Amount</label>
                                <input
                                    {...register('amount')}
                                    type="text"
                                    placeholder="5,000,000,000.00"
                                    name="amount"
                                />
                            </div>
                            {errors ? (
                                <p className={styles.error}>
                                    {errors.amount?.message}
                                </p>
                            ) : null}
                            <div className={styles.narration}>
                                <label>Transfer Narration</label>
                                <input
                                    {...register('narration')}
                                    type="text"
                                    placeholder="5,000,000,000.00"
                                    onChange={(e) => {
                                        if (e?.target.value.length > 0) {
                                            setActiveBtn(true);
                                        }
                                    }}
                                    name="narration"
                                />
                            </div>
                            {errors ? (
                                <p className={styles.error}>
                                    {errors.narration?.message}
                                </p>
                            ) : null}
                            <div className={styles.repeat}>
                                <input type="checkbox" />
                                <p>
                                    Do you want to set this as a repeat
                                    transaction?
                                </p>
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
                ) : firstTitle === 'Foreign Transfer Payments' ? (
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
                                        <option value="">
                                            <span>
                                                <img
                                                    src="../../Assets/Svgs/flag.svg"
                                                    alt=""
                                                />
                                            </span>
                                            Nigeria
                                        </option>
                                    </select>
                                    {errors ? (
                                        <p className={styles.error}>
                                            {errors.destinationCountry?.message}
                                        </p>
                                    ) : null}
                                </div>
                                <div>
                                    <label>Transfer Type</label>
                                    <select
                                        {...register('transferType')}
                                        name="transferType"
                                    >
                                        <option value="">others </option>
                                    </select>
                                    {errors ? (
                                        <p className={styles.error}>
                                            {errors.transferType?.message}
                                        </p>
                                    ) : null}
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
                                    {errors ? (
                                        <p className={styles.error}>
                                            {errors.beneficiaries?.message}
                                        </p>
                                    ) : null}
                                    <div className={styles.accountDetailSingle}>
                                        <div
                                            className={
                                                styles.accountDetailSingleInput
                                            }
                                        >
                                            <label> Account Number</label>
                                            <input
                                                {...register('accountNumber')}
                                                name="accountNumber"
                                                type="text"
                                                placeholder="Enter account number here"
                                            />
                                            {errors ? (
                                                <p className={styles.error}>
                                                    {
                                                        errors.accountNumber
                                                            ?.message
                                                    }
                                                </p>
                                            ) : null}
                                        </div>
                                        <div
                                            className={
                                                styles.accountDetailSingleSelect
                                            }
                                        >
                                            <label>Bank</label>
                                            <select
                                                {...register('bankName')}
                                                name="bankName"
                                            >
                                                <option>Select Bank</option>
                                            </select>
                                            {errors ? (
                                                <p className={styles.error}>
                                                    {errors.bankName?.message}
                                                </p>
                                            ) : null}
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
                                    {errors ? (
                                        <p className={styles.error}>
                                            {errors.amount?.message}
                                        </p>
                                    ) : null}
                                </div>
                                <div>
                                    <label>Account to Debit</label>
                                    <select
                                        {...register('debitAccount')}
                                        name="debitAccount"
                                    >
                                        <option value="">
                                            Marvelous Solutions
                                        </option>
                                    </select>
                                    {errors ? (
                                        <p className={styles.error}>
                                            {errors.debitAccount?.message}
                                        </p>
                                    ) : null}
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
                                        if (e?.target.value.length > 0) {
                                            setActiveBtn(true);
                                        }
                                    }}
                                />
                            </div>
                            {errors ? (
                                <p className={styles.error}>
                                    {errors.narration?.message}
                                </p>
                            ) : null}
                            <div className={styles.repeat}>
                                <input type="checkbox" />
                                <p>
                                    Do you want to set this as a repeat
                                    transaction?
                                </p>
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
                ) : firstTitle === 'Bulk Payments' ? (
                    <div>
                        <form onSubmit={handleSubmit(action)}>
                            <h2>{firstTitle}</h2>
                            <div className={styles.destinationCountry}>
                                <div>
                                    <label>Select Method</label>
                                    <select
                                        {...register('method')}
                                        name="method"
                                    >
                                        <option value="">Input Accounts</option>
                                        <option value="Transfer">
                                            Transfer
                                        </option>
                                    </select>
                                    {errors ? (
                                        <p className={styles.error}>
                                            {errors.method?.message}
                                        </p>
                                    ) : null}
                                </div>
                                <div>
                                    <label>Account to Debit</label>
                                    <select
                                        {...register('accountDebit')}
                                        name="accountDebit"
                                    >
                                        <option value="">
                                            Marvelous Solutions
                                        </option>
                                        <option value="Akinfe Temitope">
                                            AKinfe Temitope
                                        </option>
                                    </select>
                                    {errors ? (
                                        <p className={styles.error}>
                                            {errors.accountDebit?.message}
                                        </p>
                                    ) : null}
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
                                        <div
                                            className={
                                                styles.accountDetailSingleInput
                                            }
                                        >
                                            <label> Account Number 1</label>
                                            <input
                                                {...register('accountNUmber1')}
                                                name="accountNumber1"
                                                type="text"
                                                placeholder="Enter account number here"
                                            />
                                            {errors ? (
                                                <p className={styles.error}>
                                                    {
                                                        errors.accountNumber1
                                                            ?.message
                                                    }
                                                </p>
                                            ) : null}
                                        </div>
                                        <div
                                            className={
                                                styles.accountDetailSingleSelect
                                            }
                                        >
                                            <label>Bank</label>
                                            <select
                                                {...register('bankName')}
                                                name="bankName"
                                            >
                                                <option>Select Bank</option>
                                                <option value="GTB">GTB</option>
                                            </select>
                                            {errors ? (
                                                <p className={styles.error}>
                                                    {errors.bankName?.message}
                                                </p>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.accountDetailsBodys}>
                                    <div className={styles.accountDetailSingle}>
                                        <div
                                            className={
                                                styles.accountDetailSingleInput
                                            }
                                        >
                                            <label> Account Number 2</label>
                                            <input
                                                {...register('accountNumber2')}
                                                name="accountNumber2"
                                                type="text"
                                                placeholder="Enter account number here"
                                            />
                                            {errors ? (
                                                <p className={styles.error}>
                                                    {
                                                        errors.accountNumber2
                                                            ?.message
                                                    }
                                                </p>
                                            ) : null}
                                        </div>
                                        <div
                                            className={
                                                styles.accountDetailSingleSelect
                                            }
                                        >
                                            <label>Bank</label>
                                            <select
                                                {...register('bankName')}
                                                name="bankName"
                                            >
                                                <option>Select Bank</option>
                                                <option value="FCMB">
                                                    FCMB
                                                </option>
                                            </select>
                                            {errors ? (
                                                <p className={styles.error}>
                                                    {errors.bankName?.message}
                                                </p>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.accountDetailsBodys}>
                                    <div className={styles.accountDetailSingle}>
                                        <div
                                            className={
                                                styles.accountDetailSingleInput
                                            }
                                        >
                                            <label> Account Number 3</label>
                                            <input
                                                {...register('accountNumber3')}
                                                name="accountNumber3"
                                                type="text"
                                                placeholder="Enter account number here"
                                            />
                                            {errors ? (
                                                <p className={styles.error}>
                                                    {
                                                        errors.accountNumber3
                                                            ?.message
                                                    }
                                                </p>
                                            ) : null}
                                        </div>
                                        <div
                                            className={
                                                styles.accountDetailSingleSelect
                                            }
                                        >
                                            <label>Bank</label>
                                            <select
                                                {...register('bankName')}
                                                name="bankName"
                                            >
                                                <option>Select Bank</option>
                                                <option value="JAIZ">
                                                    JAIZ
                                                </option>
                                            </select>
                                            {errors ? (
                                                <p className={styles.error}>
                                                    {errors.bankName?.message}
                                                </p>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.narration}>
                                <label>Enter Amount</label>
                                <input
                                    {...register('amount')}
                                    name="amount"
                                    type="text"
                                    placeholder="# 5,000,000,000.00"
                                    onChange={(e) => {
                                        if (e?.target.value.length > 0) {
                                            setActiveBtn(true);
                                        }
                                    }}
                                />
                                {errors ? (
                                    <p className={styles.error}>
                                        {errors.amount?.message}
                                    </p>
                                ) : null}
                            </div>
                            <div className={styles.repeat}>
                                <input type="checkbox" />
                                <p>
                                    Do you want to set this as a repeat
                                    transaction?
                                </p>
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
                ) : (
                    <div>
                        <form onSubmit={handleSubmit(action)}>
                            <h2>{firstTitle}</h2>
                            <div className={styles.destinationCountry}>
                                <div>
                                    <label>Payment Type</label>
                                    <select
                                        {...register('paymentType')}
                                        name="paymentType"
                                    >
                                        <option value="">
                                            Single Transfer
                                        </option>
                                    </select>
                                </div>
                                {errors ? (
                                    <p className={styles.error}>
                                        {errors.paymentType?.message}
                                    </p>
                                ) : null}
                                <div>
                                    <label>Account to Debit</label>
                                    <select
                                        {...register('accountDebit')}
                                        name="accountDebit"
                                    >
                                        <option value="">
                                            Marvelous Solutions
                                        </option>
                                    </select>
                                    {errors ? (
                                        <p className={styles.error}>
                                            {errors.accountDebit?.message}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                            <div className={styles.accountDetails}>
                                <label>Please choose Biller Details</label>
                                <div className={styles.accountDetailsBody}>
                                    <div className={styles.billerType}>
                                        <label>Choose Biller Type</label>
                                        <select
                                            {...register('billerType')}
                                            name="billerType"
                                        >
                                            <option>Select Biller</option>
                                        </select>
                                        {errors ? (
                                            <p className={styles.error}>
                                                {errors.billerType?.message}
                                            </p>
                                        ) : null}
                                    </div>
                                    <div className={styles.billerCategory}>
                                        <label>Choose Category</label>
                                        <select
                                            {...register('billerCategory')}
                                            name="billerCategory"
                                        >
                                            <option>Select Category</option>
                                        </select>
                                        {errors ? (
                                            <p className={styles.error}>
                                                {errors.billerCategory?.message}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.accountDetails}>
                                <label>Please choose Biller Details</label>
                                <div className={styles.accountDetailsBody}>
                                    <div className={styles.billerType}>
                                        <label>
                                            Ref. number (i.e. smartcard no,
                                            meter no, etc)
                                        </label>
                                        <input
                                            {...register('billerDetail')}
                                            name="billerDetail"
                                            type="text"
                                            placeholder="Enter account number here"
                                        />
                                    </div>
                                    {errors ? (
                                        <p className={styles.error}>
                                            {errors.billerDetail?.message}
                                        </p>
                                    ) : null}
                                    <div className={styles.billerCategory}>
                                        <label>Choose your Plan</label>
                                        <select
                                            {...register('billerPlan')}
                                            onChange={(e) => {
                                                if (
                                                    e?.target.value.length > 0
                                                ) {
                                                    setActiveBtn(true);
                                                }
                                            }}
                                            name="billerPlan"
                                        >
                                            <option>Select Plan</option>
                                        </select>
                                    </div>
                                    {errors ? (
                                        <p className={styles.error}>
                                            {errors.billerPlan?.message}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                            <div className={styles.repeat}>
                                <input type="checkbox" />
                                <p>
                                    Do you want to set this as a repeat
                                    transaction?
                                </p>
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
                )}
            </div>
            <div>
                <img
                    src="../../Assets/Images/bluemoney.png"
                    alt=""
                    className={styles.greenImg}
                />
                <img
                    src="../../Assets/Svgs/closebtn.svg"
                    alt=""
                    className={styles.closebtn}
                    onClick={closeAction}
                />
            </div>
        </div>
    );
};

export default MakePaymentFirst;
