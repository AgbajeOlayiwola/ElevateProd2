import React, { useRef, useEffect, useState } from 'react';
import Popup from '../../layout/Popup';
import ButtonComp from '../Button';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';

const ManageBene2 = ({ title, overlay, action, formAction }) => {
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
    } = useForm();
    return (
        <Popup title={title} overlay={overlay} action={action}>
            <div ref={myref} className={styles.beneBody}>
                <form onSubmit={handleSubmit(formAction)}>
                    <div className={styles.formGroup}>
                        <label>Choose Category</label>
                        <select
                            {...register('category', {
                                required: 'Category is required'
                            })}
                            name="category"
                        >
                            <option value="">Choose Category</option>
                            <option value="Transfer">Transfer</option>
                            <option value="Bills">Bills</option>
                            <option value="Others">Others</option>
                        </select>
                        <p className={styles.error}>
                            {errors?.category?.message}
                        </p>
                    </div>
                    <div className={styles.formBody}>
                        <div className={styles.formGroup}>
                            <label>Account Name</label>
                            <input
                                type="text"
                                placeholder="Enter account name here"
                                {...register('accountName', {
                                    required: 'Account Name is required',
                                    pattern: {
                                        value: /^[A-Za-z ]+$/i,
                                        message: 'Only Alphabelts allowed'
                                    }
                                })}
                                name="accountName"
                            />
                            <p className={styles.error}>
                                {errors?.accountName?.message}
                            </p>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Account Number</label>
                            <input
                                type="text"
                                placeholder="Enter account number here"
                                {...register('accountNumber', {
                                    required: 'Account Number  is required',
                                    maxLength: {
                                        value: 10,
                                        message:
                                            'Account Number cannot be more than 6 digits'
                                    },
                                    minLength: {
                                        value: 10,
                                        message:
                                            'Account Number cannot be less than 6 digits'
                                    },
                                    pattern: {
                                        value: /^[0-9]/i,
                                        message:
                                            'Account Number can only be number '
                                    }
                                })}
                                name="accountNumber"
                                onChange={(e) => {
                                    if (e?.target.value.length === 0) {
                                        setActiveBtn(false);
                                    } else if (e?.target.value.length > 0) {
                                        setActiveBtn(true);
                                    }
                                }}
                            />
                            <p className={styles.error}>
                                {errors?.accountNumber?.message}
                            </p>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Bank</label>
                            <select
                                {...register('bank', {
                                    required: 'Bank is required'
                                })}
                                name="bank"
                            >
                                <option value="">Choose Bank</option>
                                <option value="GTB">GTB</option>
                            </select>
                            <p className={styles.error}>
                                {errors?.bank?.message}
                            </p>
                        </div>
                    </div>
                    <ButtonComp
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        text="Create Beneficiary"
                        type="submit"
                    />
                </form>
            </div>
        </Popup>
    );
};

export default ManageBene2;
