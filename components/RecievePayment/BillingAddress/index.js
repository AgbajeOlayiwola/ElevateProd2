import React, { useState } from 'react';
import styles from './styles.module.css';
import { TbCreditCard } from 'react-icons/tb';
import ButtonComp from '../../ReusableComponents/Button';
import PaylinkSuccess from '../Sucess';
import SuccessCallBack from '../SuccessCallBack';
import FailedPayment from '../FailedPayment';

const BillingAddress = ({ action, newPage }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    const [page, setPage] = useState(newPage);
    const PaylinkComponenet = () => {
        switch (page) {
            case 1:
                return (
                    <PaylinkSuccess
                        action={() => setPage((prev) => prev + 1)}
                    />
                );
            case 2:
                return (
                    <PaylinkSuccess
                        action={() => setPage((prev) => prev + 1)}
                    />
                );
            case 3:
                return (
                    <SuccessCallBack
                        action={() => setPage((prev) => prev + 1)}
                    />
                );
            case 4:
                return (
                    <FailedPayment action={() => setPage((prev) => prev + 1)} />
                );
        }
    };
    return (
        <div className={styles.recievePaymentBox}>
            <div className={styles.cardDets}>
                {' '}
                <div className={styles.cardDetsCard}>
                    <p>Choose Channel</p>
                    <div className={styles.marvel}>
                        <TbCreditCard />
                        <p>Card</p>
                    </div>
                    <div className={styles.marvel}>
                        <TbCreditCard />
                        <p>Paylink</p>
                    </div>
                    <div className={styles.marvel}>
                        <TbCreditCard />
                        <p>USSD</p>
                    </div>
                </div>
                <div className={styles.cardDtsInputs}>
                    <div>{PaylinkComponenet()}</div>
                </div>
            </div>
        </div>
    );
};

export default BillingAddress;
