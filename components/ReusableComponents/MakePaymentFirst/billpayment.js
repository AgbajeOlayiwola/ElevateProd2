import React, { useState, useEffect } from 'react';
import ButtonComp from '../Button';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import { loadbillerCategoryAsync } from '../../../redux/reducers/billerCategory/billerCategory.thunks';
import { useDispatch, useSelector } from 'react-redux';

const BillPayment = ({ action, firstTitle, buttonText }) => {
    const [activeBtn, setActiveBtn] = useState(false);
    const [billerCategories, setBillerCategories] = useState([]);
    const dispatch = useDispatch();
    const { billerCategory } = useSelector(
        (state) => state.billerCategoryReducer
    );
    useEffect(() => {
        dispatch(loadbillerCategoryAsync());
        if (billerCategory !== null) {
            setBillerCategories(billerCategory);
        }
    }, [billerCategory]);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    return (
        <div>
            <form onSubmit={handleSubmit(action)}>
                <h2>{firstTitle}</h2>
                <div className={styles.destinationCountry}>
                    <div>
                        <label>Payment Type</label>
                        <select
                            {...register('paymentType', {
                                required: 'Payment type is required'
                            })}
                            name="paymentType"
                        >
                            <option value="">Single Transfer</option>
                            <option value="Bulk Transfer">Bulk Transfer</option>
                        </select>
                        <p className={styles.error}>
                            {errors?.paymentType?.message}
                        </p>
                    </div>
                    <div>
                        <label>Account to Debit</label>
                        <select
                            {...register('accountDebit', {
                                required: 'Account to debit is required'
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
                <div className={styles.accountDetails}>
                    <label>Please choose Biller Details</label>
                    <div className={styles.accountDetailsBody}>
                        <div className={styles.billerType}>
                            <label>Choose Biller Type</label>
                            <select
                                {...register('billerType', {
                                    required: 'Biller type is required'
                                })}
                                name="billerType"
                            >
                                <option value="">Select Biller</option>
                                {billerCategories?.map((item) => {
                                    return (
                                        <option value={item.categoryName}>
                                            {item.categoryName}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <p className={styles.error}>
                            {errors?.billerType?.message}
                        </p>
                        <div className={styles.billerCategory}>
                            <label>Choose Category</label>
                            <select
                                {...register('billerCategory', {
                                    required: 'Biller Category is required'
                                })}
                                name="billerCategory"
                            >
                                <option value="">Select Category</option>
                                <option value="Biller Category">
                                    Select Category
                                </option>
                            </select>
                        </div>
                        <p className={styles.error}>
                            {errors?.billerCategory?.message}
                        </p>
                    </div>
                </div>
                <div className={styles.accountDetails}>
                    <label>Please choose Biller Details</label>
                    <div className={styles.accountDetailsBody}>
                        <div className={styles.billerType}>
                            <label>
                                Ref. number (i.e. smartcard no, meter no, etc)
                            </label>
                            <input
                                {...register('billerDetail', {
                                    required: 'Biller Detail is required',
                                    pattern: {
                                        value: /^[0-9]/i,
                                        message:
                                            'Biller Detail can only be number '
                                    }
                                })}
                                name="billerDetail"
                                type="number"
                                placeholder="Enter account number here"
                            />
                        </div>
                        <p className={styles.error}>
                            {errors?.billerDetail?.message}
                        </p>
                        <div className={styles.billerCategory}>
                            <label>Choose your Plan</label>
                            <select
                                {...register('billerPlan', {
                                    required: 'Biller plan is required'
                                })}
                                onChange={(e) => {
                                    if (e?.target.value.length === 0) {
                                        setActiveBtn(false);
                                    } else if (e?.target.value.length > 0) {
                                        setActiveBtn(true);
                                    }
                                }}
                                name="billerPlan"
                            >
                                <option value="">Select Plan</option>
                                <option value="Biller Plan">Biller Plan</option>
                            </select>
                        </div>
                        <p className={styles.error}>
                            {errors?.billerPlan?.message}
                        </p>
                    </div>
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

export default BillPayment;
