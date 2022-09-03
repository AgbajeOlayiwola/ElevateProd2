import React, { useEffect, useState, useRef } from 'react';
import ButtonComp from '../Button';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Overlay from '../Overlay';
import CloseButton from '../CloseButtonSvg';
// import axios from 'axios';

const ReceivePaymentFirst = ({
    firstTitle,
    buttonText,
    closeAction,
    action,
    overlay
}) => {
    const [activeBtn, setActiveBtn] = useState(false);
    const [description, setDescription] = useState('');
    // const [amount, setAmount] = useState('');

    const myref = useRef();
    useEffect(() => {
        myref.current.scrollTo(0, 0);
        window.scrollTo(0, 0);
        // const fetchCountryApi =  () => {
        //     const countriesApi = await axios(
        //         'https://ellevate-app.herokuapp.com/countries'
        //     );
        //     const countriesData = await countriesApi.json();
        //     setAmount(countriesData);
        //     console.log(countriesData);
        //     fetchCountryApi();
        // };
    }, []);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    // console.log(amount);

    return (
        <Overlay overlay={overlay}>
            <div className={styles.firstDiv} ref={myref}>
                <div className={styles.firstBody}>
                    <div>
                        <h2>{firstTitle}</h2>
                        {firstTitle === 'Create Payment Link' ? (
                            <p className={styles.accept}>
                                (Accepts Card Payment without POS)
                            </p>
                        ) : null}
                        <form onSubmit={handleSubmit(action)}>
                            <div className={styles.formGroup}>
                                <label>Account to Credit</label>
                                <input
                                    {...register('accountName', {
                                        required:
                                            'Please enter your Acount Name',
                                        pattern: {
                                            value: /^[A-Za-z ]+$/i,
                                            message: 'Only Alphabelts allowed'
                                        }
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
                                        required: 'Please enter Amount',
                                        pattern: {
                                            value: /^[0-9]/i,
                                            message:
                                                'Amount can only be number '
                                        }
                                    })}
                                    // value={amount}
                                    type="number("
                                    name="amount"
                                    placeholder="# 5,000,000,000.00"
                                    // onChange={(e) => {
                                    //     setAmount(
                                    //         Intl.NumberFormat('en', {
                                    //             style: 'currency',
                                    //             currency: 'NGN'
                                    //         }).format(e.target.value)
                                    //     );
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
                                        required: "Please enter Payer's name",
                                        pattern: {
                                            value: /^[A-Za-z ]+$/i,
                                            message: 'Only Alphabelts allowed'
                                        }
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
                                        required: 'Please enter Description',
                                        pattern: {
                                            value: /^[A-Za-z ]+$/i,
                                            message: 'Only Alphabelts allowed'
                                        }
                                    })}
                                    name="description"
                                    id=""
                                    placeholder="Enter note to be displayed to customer."
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                        if (e.target.value.length === 0) {
                                            setActiveBtn(false);
                                        } else if (e.target.value.length > 0) {
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
                    {/* <Image
                        src="/Assets/Images/Group 33664.png"
                        width="100%"
                        height="100%"
                    /> */}
                    <img
                        src="../../Assets/Images/greenmoney.png"
                        alt=""
                        className={styles.greenImg}
                    />
                    <CloseButton
                        action={closeAction}
                        classes={styles.closebtn}
                        color="white"
                    />
                </div>
            </div>
        </Overlay>
    );
};

export default ReceivePaymentFirst;
