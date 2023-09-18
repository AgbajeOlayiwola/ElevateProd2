import React from 'react';
import styles from './styles.module.css';
import PaymentTable from '../../../components/ReusableComponents/PayementTable';
import withAuth from '../../../components/HOC/withAuth';
import PaymentTypes from './type';

const Payment = () => {
    return (
        <div className={styles.statementCover}>
            <PaymentTypes />
            <PaymentTable title="Payment History" page="Payments" />
        </div>
    );
};

export default withAuth(Payment);
