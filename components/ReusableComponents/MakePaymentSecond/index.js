import React, { useState } from 'react';
import ButtonComp from '../Button';
import styles from './styles.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
const schema = yup.object().shape({
    otp1: yup.number().positive().required(),
    otp2: yup.number().positive().required(),
    otp3: yup.number().positive().required(),
    otp4: yup.number().positive().required()
});

const MakePaymentSecond = ({ transferaction, overlay }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });
    const [activeBtn, setActiveBtn] = useState(false);
    return (
        <div className={overlay ? styles.mainOverlay : styles.noshow}>
            <div className={styles.PaymentSecond}>
                <div className={styles.PaymentSecondCont}>
                    <h2>Confirm Transaction</h2>
                    <p>Enter your transaction pin to continue.</p>
                    <div className={styles.transactionamount}>
                        <p>Amount</p>
                        <h3>N5,000,000.00</h3>
                    </div>
                    <div className={styles.transactiondetails}>
                        <div className={styles.transactionsingles}>
                            <p className={styles.transactionTitle}>To</p>
                            <h3>Babatunde James</h3>
                        </div>
                        <div className={styles.transactionsingle}>
                            <p className={styles.transactionTitle}>
                                Beneficiary Bank
                            </p>
                            <h3>
                                <span></span> Ecobank Plc
                            </h3>
                        </div>
                        <div className={styles.transactionsingle}>
                            <p className={styles.transactionTitle}>From</p>
                            <h3>Marvelous Limited</h3>
                        </div>
                        <div className={styles.transactionsingle}>
                            <p className={styles.transactionTitle}>Charges</p>
                            <h3>N50.50</h3>
                        </div>
                    </div>
                    <h4>Enter Transaction Pin</h4>
                    <form onSubmit={handleSubmit(transferaction)}>
                        <div className={styles.transactionpin}>
                            <input
                                type="number"
                                inputMode="numeric"
                                maxlength="1"
                                autoComplete="one-time-code"
                                name="otp1"
                                {...register('otp1')}
                            />
                            <input
                                type="number"
                                inputMode="numeric"
                                maxlength="1"
                                autoComplete="one-time-code"
                                name="otp2"
                                {...register('otp2')}
                            />
                            <input
                                type="number"
                                inputMode="numeric"
                                maxlength="1"
                                autoComplete="one-time-code"
                                name="otp3"
                                {...register('otp3')}
                            />
                            <input
                                type="number"
                                inputMode="numeric"
                                maxlength="1"
                                autoComplete="one-time-code"
                                name="otp4"
                                {...register('otp4')}
                                onChange={(e) => {
                                    if (e?.target.value.length === 0) {
                                        setActiveBtn(false);
                                    } else if (e?.target.value.length > 0) {
                                        setActiveBtn(true);
                                    }
                                }}
                            />
                        </div>
                        {errors ? (
                            <p className={styles.error}>
                                {errors.otp1?.message}
                            </p>
                        ) : null}
                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            text="Make Transfer"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MakePaymentSecond;
