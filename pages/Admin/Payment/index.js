import React from 'react';
import PaymentTable from '../../../components/ReusableComponents/PayementTable';
import styles from './styles.module.css';
import PaymentTypes from './type';

const Payment = () => {
    return (
        <div className={styles.statementCover}>
            <PaymentTypes />
            <PaymentTable title="Payment History" page="Payments" />
        </div>
    );
};

export default Payment;
