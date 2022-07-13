import React, { useEffect, useState, useRef } from 'react';
import ButtonComp from '../Button';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';

const ReceivePaymentFirst = ({
    firstTitle,
    buttonText,
    closeAction,
    action
}) => {
    const [activeBtn, setActiveBtn] = useState(false);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

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
        <div className={styles.firstDiv} ref={myref}>
            <div className={styles.firstBody}>
                <div>
                    <h2>{firstTitle}</h2>
                    {firstTitle === 'Create Payment Link' ? (
                        <p>(Accepts Card Payment without POS)</p>
                    ) : null}
                    <form onSubmit={handleSubmit(action)}>
                        <div className={styles.formGroup}>
                            <label>Account to Credit</label>
                            <input
                                {...register('accountName', {
                                    required: 'Please enter your Acount Name',
                                    pattern: /^[A-Za-z]+$/i
                                })}
                                type="text"
                                placeholder="Marvelous Solutions"
                            />
                            <p className={styles.error}>
                                {errors?.accountName?.message}
                            </p>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Enter Amount</label>
                            <input
                                {...register('amount', {
                                    required: 'Please enter Amount'
                                })}
                                type="number("
                                name="amount"
                                // value={amount}
                                placeholder="# 5,000,000,000.00"
                                // onChange={(e)=>{

                                //     setAmount(Intl.NumberFormat().format(e.target.value))
                                // }}
                            />
                            <p className={styles.error}>
                                {errors?.amount?.message}
                            </p>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Name of Payment</label>
                            <input
                                {...register('payer', {
                                    required: "Please enter Payer's name"
                                })}
                                type="text"
                                name="payer"
                                placeholder="Name of Payment"
                            />
                            <p className={styles.error}>
                                {errors?.payer?.message}
                            </p>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Description</label>
                            <textarea
                                {...register('description', {
                                    required: 'Please enter Description'
                                })}
                                name="description"
                                id=""
                                placeholder="Enter note to be displayed to customer."
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    if (e?.target.value.length === 0) {
                                        setActiveBtn(true);
                                    } else if (e?.target.value.length > 0) {
                                        setActiveBtn(true);
                                    }
                                }}
                            ></textarea>
                            <p className={styles.error}>
                                {errors?.description?.message}
                            </p>
                        </div>
                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            text={buttonText}
                            type="submit"
                        />
                    </form>
                    <p className={styles.later}>
                        Not paying now? <span>Schedule for Later</span>
                    </p>
                </div>
            </div>
            <div>
                <img
                    src="../../Assets/Images/Group 33664.png"
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

export default ReceivePaymentFirst;
