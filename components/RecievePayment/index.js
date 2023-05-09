import React, { useState } from 'react';
import PaylinkSuccess from './Sucess';
import SuccessCallBack from './SuccessCallBack';
import FailedPayment from './FailedPayment';
import BillingAddress from './BillingAddress';
import { TbCreditCard } from 'react-icons/tb';
import styles from './styles.module.css';
import CardDetails from './CardDtails';

const ReacievePaymntComponent = ({ action, newPage }) => {
    const [activeBtn, setActiveBtn] = useState(true);
    const [page, setPage] = useState(newPage);
    const [selcted, setSelected] = useState('card');
    const PaylinkComponenet = () => {
        switch (selcted) {
            case 'card':
                switch (page) {
                    case 1:
                        return (
                            <CardDetails
                                action={() => setPage((prev) => prev + 1)}
                            />
                        );
                    case 2:
                        return (
                            <BillingAddress
                                action={() => setPage((prev) => prev + 1)}
                            />
                        );
                    case 3:
                        return (
                            <PaylinkSuccess
                                action={() => setPage((prev) => prev + 1)}
                            />
                        );

                    case 4:
                        return (
                            <SuccessCallBack
                                action={() => setPage((prev) => prev + 1)}
                            />
                        );
                    case 5:
                        return <FailedPayment action={() => setPage(1)} />;
                }
            case 'transfer':
                switch (page) {
                    case 1:
                        return (
                            <CardDetails
                                action={() => setPage((prev) => prev + 1)}
                            />
                        );
                    case 2:
                        return (
                            <BillingAddress
                                action={() => setPage((prev) => prev + 1)}
                            />
                        );
                    case 3:
                        return (
                            <PaylinkSuccess
                                action={() => setPage((prev) => prev + 1)}
                            />
                        );

                    case 4:
                        return (
                            <SuccessCallBack
                                action={() => setPage((prev) => prev + 1)}
                            />
                        );
                    case 5:
                        return <FailedPayment action={() => setPage(1)} />;
                }
            case 'Ussd':
                switch (page) {
                    case 1:
                        return (
                            <CardDetails
                                action={() => setPage((prev) => prev + 1)}
                            />
                        );
                    case 2:
                        return (
                            <BillingAddress
                                action={() => setPage((prev) => prev + 1)}
                            />
                        );
                    case 3:
                        return (
                            <PaylinkSuccess
                                action={() => setPage((prev) => prev + 1)}
                            />
                        );

                    case 4:
                        return (
                            <SuccessCallBack
                                action={() => setPage((prev) => prev + 1)}
                            />
                        );
                    case 5:
                        return <FailedPayment action={() => setPage(1)} />;
                }
            case 'qr':
                switch (page) {
                    case 1:
                        return (
                            <CardDetails
                                action={() => setPage((prev) => prev + 1)}
                            />
                        );
                    case 2:
                        return (
                            <BillingAddress
                                action={() => setPage((prev) => prev + 1)}
                            />
                        );
                    case 3:
                        return (
                            <PaylinkSuccess
                                action={() => setPage((prev) => prev + 1)}
                            />
                        );

                    case 4:
                        return (
                            <SuccessCallBack
                                action={() => setPage((prev) => prev + 1)}
                            />
                        );
                    case 5:
                        return <FailedPayment action={() => setPage(1)} />;
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
