import React, { useState } from 'react';

import Image from 'next/image';
import {
    MdContentCopy,
    MdCreditCard,
    MdOutlineSend,
    MdQrCodeScanner
} from 'react-icons/md';
import styles from './styles.module.css';
const PayNow = ({ nextStep }) => {
    const succesFullyPaid = () => {
        nextStep();
    };
    const [current, setCurrent] = useState('card');
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
        <div className={styles.overflow}>
            <div className={styles.overLayWhite}>
                <div className={styles.ammt}>
                    <p>Amount to pay</p>
                    <p>27460</p>
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
                        {current === 'card'
                            ? 'Pay now'
                            : 'I have sent the money'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PayNow;
