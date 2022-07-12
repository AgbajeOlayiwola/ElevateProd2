import React, { useEffect, useState, useRef } from 'react';
import ButtonComp from '../Button';
import styles from './styles.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const schema = yup.object().shape({
    accountName: yup.string().required(),
    amount: yup.number().positive().required(),
    payer: yup.string().required(),
    description: yup.string().required()
});

const ReceivePaymentFirst = ({
    firstTitle,
    buttonText,
    closeAction,
    action
}) => {
    const [activeBtn, setActiveBtn] = useState(false);
    // const [name, setName] = useState('');
    // const [amount, setAmount] = useState('');
    // const [payer, setPayer] = useState('');
    const [description, setDescription] = useState('');

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
                <div>
                    <h2>{firstTitle}</h2>
                    {firstTitle === 'Create Payment Link' ? (
                        <p>(Accepts Card Payment without POS)</p>
                    ) : null}
                    <form onSubmit={handleSubmit(action)}>
                        <div className={styles.formGroup}>
                            <label>Account to Credit</label>
                            <input
                                {...register('accountName')}
                                type="text"
                                name="accountName"
                                placeholder="Marvelous Solutions "
                                // ref={register}
                                // value={name}
                                // onClick={(e) => {
                                //     setName(e?.target.value);
                                // }}
                            />
                            {errors ? (
                                <p className={styles.error}>
                                    {errors.accountName?.message}
                                </p>
                            ) : null}
                        </div>
                        <div className={styles.formGroup}>
                            <label>Enter Amount</label>
                            <input
                                {...register('amount')}
                                type="number("
                                name="amount"
                                placeholder="# 5,000,000,000.00"
                                // value={amount}
                                // ref={register}
                            />
                            {errors ? (
                                <p className={styles.error}>
                                    {errors.amount?.message}
                                </p>
                            ) : null}
                        </div>
                        <div className={styles.formGroup}>
                            <label>Name of Payment</label>
                            <input
                                {...register('payer')}
                                type="text"
                                name="payer"
                                placeholder="Name of Payment"
                                // value={payer}
                                // ref={register}
                            />
                            {errors ? (
                                <p className={styles.error}>
                                    {errors.payer?.message}
                                </p>
                            ) : null}
                        </div>
                        <div className={styles.formGroup}>
                            <label>Description</label>
                            <textarea
                                {...register('description')}
                                name="description"
                                id=""
                                placeholder="Enter note to be displayed to customer."
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    if (e?.target.value.length > 0) {
                                        setActiveBtn(true);
                                    }
                                }}
                                // ref={register}
                            ></textarea>
                            {errors ? (
                                <p className={styles.error}>
                                    {errors.description?.message}
                                </p>
                            ) : null}
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
