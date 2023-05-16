import React, { useState, useEffect } from 'react';
import ButtonComp from '../Button';
import styles from './styles.module.css';
import OtpInput from '../Otpinput';
import Overlay from '../Overlay';
import Loader from '../Loader';
import ConfirmLockSvg from '../ReusableSvgComponents/ConfirmLockSvg';
import CloseButton from '../CloseButtonSvg';
import { useForm } from 'react-hook-form';
import ArrowBackSvg from '../ArrowBackSvg';
const MakePaymentSecond = ({
    overlay,
    transferAction,
    amount,
    sender,
    recieverName,
    recieverBank,
    title,
    refNuber,
    number,
    isLoading,
    closeAction,
    backAction,
    charges,
    formData,
    setFormdata
}) => {
    const numOfFields = 6;
    const [activeBtn, setActiveBtn] = useState(false);
    const [newAmount, setNewAmount] = useState('');
    const [beneActive, setBeneActive] = useState(false);
    const [ssnValues, setValue] = useState({
        ssn1: '',
        ssn2: '',
        ssn3: '',
        ssn4: '',
        ssn5: '',
        ssn6: ''
    });

    useEffect(() => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
            currencyDisplay: 'narrowSymbol'
        });

        const formattedAmount = formatter.format(amount);

        setNewAmount(formattedAmount);
    }, []);

    const handleChange = (e) => {
        const { maxLength, value, name } = e.target;
        const [fieldName, fieldIndex] = name.split('-');

        // Check if they hit the max character length
        if (value.length >= maxLength) {
            // Check if it's not the last input field
            if (parseInt(fieldIndex, 10) < 6) {
                // Get the next input field
                const nextSibling = document.querySelector(
                    `input[name=ssn-${parseInt(fieldIndex, 10) + 1}]`
                );
                // If found, focus the next field
                if (nextSibling !== null) {
                    nextSibling.focus();
                } else {
                    setActiveBtn(true);
                }
            } else {
                setActiveBtn(true);
            }
        }

        setValue({
            ...value,
            [`ssn${fieldIndex}`]: value
        });
    };
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    return (
        <Overlay overlay={overlay}>
            <div>
                <div className={styles.PaymentSecond}>
                    <div className={styles.icons}>
                        <div className={styles.backIcon}>
                            <ArrowBackSvg color="#102572" action={backAction} />
                        </div>
                        <div className={styles.closeCont}>
                            <CloseButton
                                color="#A5A5A5"
                                classes={styles.closeBtn}
                                action={closeAction}
                            />
                        </div>
                    </div>
                    <div className={styles.PaymentSecondCont}>
                        <div className={styles.svgLock}>
                            <div>
                                <ConfirmLockSvg />
                            </div>
                        </div>
                        <h2>Confirm Transaction</h2>
                        {amount === 'sum' ? null : (
                            <div className={styles.transactionamount}>
                                <p>Amount</p>
                                <h3>{newAmount}</h3>
                            </div>
                        )}
                        {title === 'Bills Payment' ? (
                            <div className={styles.transactiondetails}>
                                <div className={styles.transactionsingles}>
                                    <p className={styles.transactionTitle}>
                                        To
                                    </p>
                                    <h3>{recieverName}</h3>
                                </div>
                                <div className={styles.transactionsingle}>
                                    <p className={styles.transactionTitle}>
                                        Platform
                                    </p>
                                    <h3>
                                        <span></span> {recieverBank}
                                    </h3>
                                </div>
                                <div className={styles.transactionsingle}>
                                    <p className={styles.transactionTitle}>
                                        Charges
                                    </p>
                                    <h3>{charges}</h3>
                                </div>
                                <div className={styles.transactionsingle}>
                                    <p className={styles.transactionTitle}>
                                        From
                                    </p>
                                    <h3>{sender}</h3>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.transactiondetails}>
                                <div className={styles.transactionsingles}>
                                    <p className={styles.transactionTitle}>
                                        To
                                    </p>
                                    <h3>
                                        {title === 'Bulk Payments'
                                            ? `${number} Recipient`
                                            : recieverName}
                                    </h3>
                                </div>
                                <div className={styles.transactionsingle}>
                                    <p className={styles.transactionTitle}>
                                        Beneficiary Bank
                                    </p>
                                    <h3>
                                        <span></span>{' '}
                                        {title === 'Bulk Payments'
                                            ? `${number} banks`
                                            : recieverBank}
                                    </h3>
                                </div>

                                {title === 'Single Transfer' ? (
                                    recieverBank === 'ECOBANK' ? null : (
                                        <div
                                            className={styles.transactionsingle}
                                        >
                                            <p
                                                className={
                                                    styles.transactionTitle
                                                }
                                            >
                                                Charges
                                            </p>
                                            <h3>{charges}</h3>
                                        </div>
                                    )
                                ) : null}

                                <div className={styles.transactionsingle}>
                                    <p className={styles.transactionTitle}>
                                        From
                                    </p>
                                    <h3>{sender}</h3>
                                </div>
                            </div>
                        )}
                        <form onSubmit={handleSubmit(transferAction)}>
                            {title === 'Single Transfer' ? (
                                beneActive ? null : (
                                    <div className={styles.saveBene}>
                                        <label className={styles.beneCheck}>
                                            <input
                                                type="checkbox"
                                                name="beneficiary"
                                                {...register('beneficiary')}
                                            />
                                            <span>
                                                <i></i>
                                            </span>
                                        </label>
                                        <p>Save Beneficiary</p>
                                    </div>
                                )
                            ) : null}
                            <h4>Enter Transaction Pin</h4>
                            <div className={styles.otpInps}>
                                <input
                                    type="password"
                                    name="ssn-1"
                                    {...register('ssn-1')}
                                    maxLength={1}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="ssn-2"
                                    {...register('ssn-2')}
                                    maxLength={1}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="ssn-3"
                                    {...register('ssn-3')}
                                    maxLength={1}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="ssn-4"
                                    {...register('ssn-4')}
                                    maxLength={1}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="ssn-5"
                                    {...register('ssn-5')}
                                    maxLength={1}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="ssn-6"
                                    {...register('ssn-6')}
                                    maxLength={1}
                                    onChange={handleChange}
                                />
                            </div>
                            <ButtonComp
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
                                text="Confirm"
                                type="submit"
                                loads={isLoading}
                                // err={isLoading}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </Overlay>
    );
};

export default MakePaymentSecond;
