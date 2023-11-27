import Image from 'next/image';
import React, { useState } from 'react';
import {
    MdContentCopy,
    MdCreditCard,
    MdOutlineSend,
    MdQrCodeScanner
} from 'react-icons/md';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const StepFive = ({ succesFullyPaid }) => {
    const [current, setCurrent] = useState('card');
    const affiliate = localStorage.getItem('affiliateCode');
    const multi = () => {
        switch (current) {
            case 'card':
                return (
                    <>
                        <br />
                        <div className={styles.inputDiv}>
                            <div className={styles.cardNo}>
                                <label>Debit’s card number (16-digit)</label>
                                <input
                                    type="number"
                                    placeholder="0000-0000-0000-0000"
                                />
                            </div>
                            <div className={styles.moreCardInfo}>
                                <div>
                                    <label>Debit’s card expiry date</label>
                                    <input type="text" />
                                </div>
                                <div>
                                    <label>Debit card’s CVV</label>
                                    <input type="text" />
                                </div>
                            </div>
                        </div>
                    </>
                );
            case 'bank':
                return (
                    <>
                        <br />
                        <div className={styles.inputDivs}>
                            <div className={styles.trsfData}>
                                <p>Amount </p>
                                <p>Amount </p>
                            </div>
                            <hr />
                            <div className={styles.trsfData}>
                                <p>Amount </p>
                                <p>Amount </p>
                            </div>
                            <hr />
                            <div className={styles.trsfData}>
                                <p>Amount </p>
                                <p>
                                    Amount{' '}
                                    <span>
                                        <MdContentCopy /> Copy
                                    </span>
                                </p>
                            </div>
                            <hr />
                            <div className={styles.trsfData}>
                                <p>Amount </p>
                                <p>Amount </p>
                            </div>
                        </div>
                    </>
                );
            case 'qr':
                return (
                    <>
                        <br />
                        <div className={styles.inputQrs}>
                            <Image
                                src="/Assets/Images/Vector(2).png"
                                width={105}
                                height={105}
                                alt="qr"
                            />
                        </div>
                    </>
                );
        }
    };
    return (
        <div className={styles.overLayWhite}>
            <div className={styles.ammt}>
                <p>Amount to pay</p>
                <p>
                    {' '}
                    {getSymbolFromCurrency(
                        countryToCurrency[affiliate?.substring(1)]
                    )}
                    {parseFloat(0)
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </p>
            </div>
            <br />
            <hr />
            <br />
            <p>Select payment method</p>
            <div className={styles.payment}>
                <div onClick={() => setCurrent('card')}>
                    <MdCreditCard /> Card
                </div>
                <div onClick={() => setCurrent('bank')}>
                    <MdOutlineSend /> Bank Transfer
                </div>
                <div onClick={() => setCurrent('qr')}>
                    <MdQrCodeScanner /> QR
                </div>
            </div>
            {multi()}
            <div className={styles.paidBtn}>
                <button onClick={succesFullyPaid}>
                    {current === 'card' ? 'Pay now' : 'I have sent the money'}
                </button>
            </div>
        </div>
    );
};

export default StepFive;
