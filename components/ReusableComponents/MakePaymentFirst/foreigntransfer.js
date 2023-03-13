import React, { useState, useEffect } from 'react';
import ButtonComp from '../Button';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import {
    loadbank,
    loadinternationalCountry,
    getVerifyCurrency
} from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Beneficiary from '../Beneficiary';
import SourceSvg from '../ReusableSvgComponents/SourceSvg';

const ForeignTransfer = ({
    secondAction,
    firstTitle,
    buttonText,
    type,
    action,
    scheduleLater,
    bankAccounts,
    formData,
    setFormdata
}) => {
    const [countrys, setCountry] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [bank, setBank] = useState([]);
    const [currency, setCurrency] = useState([]);
    const dispatch = useDispatch();
    const { internationalCountry } = useSelector(
        (state) => state.internationalCountryReducer
    );
    const { verifyCurrency } = useSelector(
        (state) => state.verifyCurrencyReducer
    );
    const { banks } = useSelector((state) => state.banksReducer);

    useEffect(() => {
        dispatch(loadinternationalCountry());
        dispatch(loadbank('ENG'));
    }, []);
    useEffect(() => {
        dispatch(getVerifyCurrency(selectedCountry));
    }, [selectedCountry]);
    useEffect(() => {
        if (internationalCountry !== null) {
            setCountry(internationalCountry);
        }
    }, [internationalCountry]);
    useEffect(() => {
        if (banks !== null) {
            setBank(banks);
        }
    }, [banks]);
    useEffect(() => {
        if (verifyCurrency !== null) {
            //console.logverifyCurrency.currencies);
            setCurrency(verifyCurrency.currencies.currencies);
        }
    }, [verifyCurrency]);
    const [activeBtn, setActiveBtn] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    return (
        <div>
            {type === 'two' ? (
                <form onSubmit={handleSubmit(secondAction)}>
                    <h2 className={styles.firstTitle}>{firstTitle}</h2>
                    <div className={styles.narration}>
                        <label>Source Account</label>
                        <select
                            name=""
                            id=""
                            {...register('sourceAccount')}
                            onInput={(event) => {
                                setFormdata({
                                    ...formData,
                                    accountNum: event.target.value
                                });
                            }}
                            // value={formData.accountNum}
                        >
                            <option value="">Select Account To Use</option>
                            {bankAccounts?.map((accounts, index) => {
                                if (accounts.currency === 'NGN') {
                                    return (
                                        <option
                                            value={accounts.accountNumber}
                                            key={index}
                                        >
                                            {accounts.accountNumber}
                                        </option>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </select>
                    </div>
                    <div className={styles.foreignBodyTwo}>
                        <div className={styles.amountCont}>
                            <label>Amount</label>
                            <input
                                {...register('amount', {
                                    required: 'Amount is required',
                                    pattern: {
                                        value: /^[0-9]/i,
                                        message: 'Amount can only be number '
                                    }
                                })}
                                name="amount"
                                type="text"
                                placeholder="0.00"
                            />
                            <p className={styles.error}>
                                {errors?.amount?.message}
                            </p>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Select Preferred Option</label>
                            <select name="" id="">
                                <option value="">Swift Code</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Swift Code</label>
                            <input type="text" placeholder="Enter Code" />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Bank Name</label>
                            <input type="text" placeholder="Enter Bank Name" />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Account Number</label>
                            <input
                                type="text"
                                placeholder="Enter Account Number"
                            />
                        </div>
                        <button>Next</button>
                        {/* <p className={styles.schedule}>
                            Not paying now?
                            <span onClick={scheduleLater}>
                                Schedule for Later
                            </span>
                        </p> */}
                    </div>
                </form>
            ) : (
                <form onSubmit={handleSubmit(action)}>
                    <h2 className={styles.firstTitle}>{firstTitle}</h2>
                    <div className={styles.foreignBody}>
                        <div className={styles.formGroup}>
                            <label>Choose Destination Country</label>
                            <select
                                name=""
                                id=""
                                onChange={(e) => {
                                    setSelectedCountry(e.target.value);
                                }}
                            >
                                <option value="">Select Country</option>
                                {countrys?.map((country, index) => {
                                    return (
                                        <option
                                            value={country.countryCode}
                                            key={index}
                                        >
                                            {country.countryName}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Choose Transfer Currency</label>
                            <select name="" id="">
                                <option value="">Select Currency</option>
                                {currency?.map((country, index) => {
                                    return (
                                        <option
                                            value={country.currencyCode}
                                            key={index}
                                        >
                                            {country.currencyName}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <button>Next</button>
                        <p className={styles.schedule}>
                            Not paying now?
                            <span onClick={scheduleLater}>
                                Schedule for Later
                            </span>
                        </p>
                    </div>
                    {/* <div>
                    <label>Destination Country</label>
                    <select
                        {...register('destinationCountry', {
                            required: 'Destination Country is Required'
                        })}
                        name="destinationCountry"
                    >
                        <option value="">Destination Country</option>
                        {countrys?.map((item) => {
                            return (
                                <option value={item.name} key={item.id}>
                                    {item.name}
                                </option>
                            );
                        })}
                    </select>
                    <p className={styles.error}>
                        {errors?.destinationCountry?.message}
                    </p>
                </div>
                <div className={styles.destinationCountry}></div>
                <div>
                    <label>Transfer Type</label>
                    <select
                        {...register('transferType', {
                            required: 'Transfer Type is required'
                        })}
                        name="transferType"
                    >
                        <option value="">others </option>
                        <option value="Bank Transfer">Bank Transfer </option>
                    </select>
                    <p className={styles.error}>
                        {errors?.transferType?.message}
                    </p>
                </div>
                <div className={styles.accountDetails}>
                    <label>Enter Destinaton Account Details</label>
                    <div className={styles.accountDetailsBody}>
                        <label>Beneficiaries</label>
                        <input
                            {...register('beneficiaries', {
                                required: 'Beneficiary is required',
                                pattern: {
                                    value: /^[A-Za-z ]+$/i,
                                    message: 'Only Alphabelts allowed'
                                }
                            })}
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
                                    {...register('accountNumber', {
                                        required: 'Account Nmber is required',
                                        pattern: {
                                            value: /^[0-9]/i,
                                            message:
                                                'Account Number can only be number '
                                        }
                                    })}
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
                                    {...register('bankName', {
                                        required: 'Bank Name is required'
                                    })}
                                    name="bankName"
                                >
                                    <option value="">Select Bank</option>
                                    {bank?.map((bank, index) => {
                                        return (
                                            <option
                                                value={bank.institutionName}
                                                key={index}
                                            >
                                                {bank.institutionName}
                                            </option>
                                        );
                                    })}
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
                            {...register('amount', {
                                required: 'Amount is required',
                                pattern: {
                                    value: /^[0-9]/i,
                                    message: 'Amount can only be number '
                                }
                            })}
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
                            {...register('accountDebit', {
                                required: 'Account to Debit is required'
                            })}
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
                        {...register('narration', {
                            required: 'Please enter your Narration',
                            pattern: {
                                value: /^[A-Za-z ]+$/i,
                                message: 'Only Alphabelts allowed'
                            }
                        })}
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
                </div> */}
                    {/* <ButtonComp
                    disabled={activeBtn}
                    active={activeBtn ? 'active' : 'inactive'}
                    text={buttonText}
                    type="submit"
                /> */}
                    {/* <p className={styles.schedule}>
                    Not paying now?<span>Schedule for Later</span>
                </p> */}
                </form>
            )}
        </div>
    );
};

export default ForeignTransfer;
