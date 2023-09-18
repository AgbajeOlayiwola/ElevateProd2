import React, { useState } from 'react';
import PaylinkSuccess from './Sucess';
import SuccessCallBack from './SuccessCallBack';
import FailedPayment from './FailedPayment';
import BillingAddress from './BillingAddress';
import { TbCreditCard } from 'react-icons/tb';
import styles from './styles.module.css';
import CardDetails from './CardDtails';
import Paylink from './PaylinkInput';
import USSDInput from './Ussd';
import QrInput from './Qr';
import Transfer from './Transfer';

const ReacievePaymntComponent = ({ action, newPage, data, type }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    const [page, setPage] = useState(newPage);
    const [selcted, setSelected] = useState('card');
    const PaylinkComponenet = () => {
        switch (selcted) {
            case 'card':
                switch (page) {
                    case 1:
                        return <CardDetails />;
                }
            case 'transfer':
                switch (page) {
                    case 1:
                        return <Transfer />;
                }
            case 'Ussd':
                switch (page) {
                    case 1:
                        return <USSDInput />;
                }
            case 'qr':
                switch (page) {
                    case 1:
                        return <QrInput type={type} data={data} />;
                }
        }
    };
    return (
        <div className={styles.recievePaymentBox}>
            <div className={styles.cardDets}>
                {' '}
                <div className={styles.cardDetsCard}>
                    <p>Choose Channel</p>
                    <div
                        className={styles.marvel}
                        onClick={() => setSelected('card')}
                    >
                        <TbCreditCard />
                        <p>Card</p>
                    </div>
                    <div
                        className={styles.marvel}
                        onClick={() => setSelected('transfer')}
                    >
                        <TbCreditCard />
                        <p>Transfer</p>
                    </div>
                    <div
                        className={styles.marvel}
                        onClick={() => setSelected('Ussd')}
                    >
                        <TbCreditCard />
                        <p>USSD</p>
                    </div>
                    <div
                        className={styles.marvel}
                        onClick={() => setSelected('qr')}
                    >
                        <TbCreditCard />
                        <p>QR</p>
                    </div>
                </div>
                <div className={styles.cardDtsInputs}>
                    {PaylinkComponenet()}
                </div>
            </div>
        </div>
    );
};

export default ReacievePaymntComponent;
