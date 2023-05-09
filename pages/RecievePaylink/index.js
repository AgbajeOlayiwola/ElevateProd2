import React, { useState } from 'react';
import styles from './styles.module.css';
import PaymentItem from '../../components/RecievePayment/PaymentItem';
import PaymentDetails from '../../components/RecievePayment/PaymentDetails';
import CardDetails from '../../components/RecievePayment/CardDtails';
import BillingAddress from '../../components/RecievePayment/BillingAddress';
import PaylinkSuccess from '../../components/RecievePayment/Sucess';
import SuccessCallBack from '../../components/RecievePayment/SuccessCallBack';
import FailedPayment from '../../components/RecievePayment/FailedPayment';
import ReacievePaymntComponent from '../../components/RecievePayment';

const RecievePaylink = () => {
    const [page, setPage] = useState('PaymentItem');
    const recievePaylinkComponenet = () => {
        switch (page) {
            case 'PaymentItem':
                return <PaymentItem action={() => setPage('PaymentDetails')} />;
            case 'PaymentDetails':
                return (
                    <PaymentDetails
                        action={() => setPage('CardDetails')}
                        back={() => setPage('PaymentItem')}
                    />
                );
            case 'CardDetails':
                return (
                    <ReacievePaymntComponent
                        newPage={1}
                        action={() => setPage('BillingAddress')}
                    />
                );
        }
    };
    return (
        <div className={styles.recievePaylink}>
            {recievePaylinkComponenet()}
        </div>
    );
};

export default RecievePaylink;
