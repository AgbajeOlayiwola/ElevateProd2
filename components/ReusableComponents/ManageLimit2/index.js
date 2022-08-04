import React, { useEffect, useRef, useState } from 'react';
import Popup from '../../layout/Popup';
import ButtonComp from '../Button';
import CheckedSvg from '../CheckedSvg';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';

const ManageLimit2 = ({ title, action, overlay, btnAction, formAction }) => {
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
            {title === 'Update Limit' ? (
                <form ref={myref} onSubmit={handleSubmit(formAction)}>
                    <div className={styles.limitSingle}>
                        <p>
                            Transfer Limits{' '}
                            <span>N1,000,000 – N10,000,000</span>
                        </p>
                        <div>
                            <div>
                                <label>Select One Time Limit</label>
                                <select
                                    {...register('oneTimeLimit', {
                                        required: 'One Time Limit is required'
                                    })}
                                    name="oneTimeLimit"
                                >
                                    <option value="">10,000,000</option>
                                    <option value="10,000,000">
                                        10,000,000
                                    </option>
                                </select>
                                <p className={styles.error}>
                                    {errors?.oneTimeLimit?.message}
                                </p>
                            </div>
                            <div>
                                <label>Select Daily Limit</label>
                                <select
                                    {...register('dailyLimit', {
                                        required: 'Daily limit is required'
                                    })}
                                    name="dailyLimit"
                                >
                                    <option value="">5,000,000</option>
                                    <option value="5,000,000">5,000,000</option>
                                </select>
                                <p className={styles.error}>
                                    {errors?.dailyLimit?.message}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.limitSingle}>
                        <p>
                            Airtime/Data Limits <span>NN10,000 – N200,000</span>
                        </p>
                        <div>
                            <div>
                                <label>Change Limit</label>
                                <select
                                    {...register('changeLimit', {
                                        required: 'Change Limit is required'
                                    })}
                                    name="changeLimit"
                                >
                                    <option value="">10,000</option>
                                    <option value="10,000">10,000</option>
                                </select>
                                <p className={styles.error}>
                                    {errors?.changeLimit?.message}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.limitSingle}>
                        <p>
                            Bill Payments <span>NN10,000 – N200,000</span>
                        </p>
                        <div>
                            <div>
                                <label>Select One Time Limit</label>
                                <select
                                    {...register('billPayment', {
                                        required: 'Bill Payment is required'
                                    })}
                                    name="billPayment"
                                >
                                    <option value="">10,000</option>
                                    <option value="10,000">10,000</option>
                                </select>
                                <p className={styles.error}>
                                    {errors?.billPayment?.message}
                                </p>
                            </div>
                        </div>
                    </div>
                    <label>Enter Transaction PIN</label>
                    <input
                        type="text"
                        {...register('transactionPin', {
                            required: 'Transaction Pin  is required',
                            maxLength: {
                                value: 6,
                                message:
                                    'Transaction Pin cannot be more than 6 digits'
                            },
                            minLength: {
                                value: 6,
                                message:
                                    'Transaction Pin cannot be less than 6 digits'
                            },
                            pattern: {
                                value: /^[0-9]/i,
                                message: 'Transaction Pin can only be number '
                            }
                        })}
                        className={styles.transactionInput}
                        name="transactionPin"
                        placeholder="* * * * * *"
                        onChange={(e) => {
                            if (e?.target.value.length === 0) {
                                setActiveBtn(false);
                            } else if (e?.target.value.length > 0) {
                                setActiveBtn(true);
                            }
                        }}
                    />
                    <p className={styles.error}>
                        {errors?.transactionPin?.message}
                    </p>
                    <ButtonComp
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        text="Update Limit"
                        type="submit"
                    />
                </form>
            ) : (
                <form ref={myref} onSubmit={handleSubmit(btnAction)}>
                    <p className={styles.title}>Signatory Details</p>
                    <div className={styles.details}>
                        <div className={styles.formGroup}>
                            <label>Enter Email</label>
                            <input
                                type="text"
                                placeholder="Enter email here"
                                {...register('mail', {
                                    required: 'Email   is required',
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Invalid email address'
                                    }
                                })}
                                name="mail"
                            />
                            <p className={styles.error}>
                                {errors?.mail?.message}
                            </p>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Enter Phone Number</label>
                            <input
                                type="text"
                                placeholder="Enter Phone Number here"
                                {...register('phoneNumber', {
                                    required: 'Phone Number   is required',
                                    maxLength: {
                                        value: 15,
                                        message:
                                            'Phone Number cannot be more than 15 digits'
                                    },
                                    minLength: {
                                        value: 11,
                                        message:
                                            'Phone Number cannot be less than 11 digits'
                                    },
                                    pattern: {
                                        value: /^[0-9]/i,
                                        message:
                                            'Phone Number an only be number '
                                    }
                                })}
                                name="phoneNumber"
                            />
                            <p className={styles.error}>
                                {errors?.phoneNumber?.message}
                            </p>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Enter BVN</label>
                            <input
                                type="text"
                                placeholder="Enter BVN here"
                                {...register('bvn', {
                                    required: 'BVN   is required',
                                    maxLength: {
                                        value: 10,
                                        message:
                                            'BVN cannot be more than 10 digits'
                                    },
                                    minLength: {
                                        value: 10,
                                        message:
                                            'BVN cannot be less than 10 digits'
                                    },
                                    pattern: {
                                        value: /^[0-9]/i,
                                        message: 'BVN Pin an only be number '
                                    }
                                })}
                                name="bvn"
                                onChange={(e) => {
                                    if (e?.target.value.length === 0) {
                                        setActiveBtn(false);
                                    } else if (e?.target.value.length > 0) {
                                        setActiveBtn(true);
                                    }
                                }}
                            />
                            <p className={styles.error}>
                                {errors?.bvn?.message}
                            </p>
                        </div>
                    </div>
                    <p className={styles.title}>Signing Mandate</p>
                    <div className={styles.mandate}>
                        <select
                            {...register('mandate', {
                                required: 'Mandate is required'
                            })}
                            name="mandate"
                        >
                            <option value="">Choose mandate</option>
                            <option value="Select Signing Mandate">
                                Select Signing Mandate
                            </option>
                        </select>
                        <p className={styles.error}>
                            {errors?.mandate?.message}
                        </p>
                    </div>
                    <p className={styles.title}>Signatory Right</p>
                    <div className={styles.right}>
                        <p>
                            Select signing rights to be assigned to the new
                            user:
                        </p>
                        <div>
                            <input
                                type="checkbox"
                                name="viewBalances"
                                {...register('checkbox')}
                                value="View Balances"
                            />
                            <span>
                                <CheckedSvg />
                            </span>
                            <p>View Balances</p>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                name="Transacting"
                                {...register('checkbox')}
                                value="Transacting"
                            />
                            <span>
                                <CheckedSvg />
                            </span>
                            <p>Transacting (Able to move monies)</p>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                name="manageAccount"
                                {...register('checkbox')}
                                value="Manage Account"
                            />
                            <span>
                                <CheckedSvg />
                            </span>
                            <p>Manage Account.</p>
                        </div>
                    </div>
                    <ButtonComp
                        disabled={activeBtn}
                        active={activeBtn ? 'active' : 'inactive'}
                        text="Update Signatories"
                        type="submit"
                    />
                </form>
            )}
        </Popup>
    );
};

export default ManageLimit2;
