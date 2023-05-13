import React from 'react';
import styles from './styles.module.css';

const TransactionStatus = ({ success, pending, failed }) => {
    return (
        <div className={styles.transactionStatus}>
            <div className={styles.success}>
                <div></div>
                <p>Success :{success}</p>
            </div>
            <div className={styles.pending}>
                <div></div>
                <p>Pending : {pending}</p>
            </div>
            <div className={styles.error}>
                <div></div>
                <p>Failed : {failed}</p>
            </div>
        </div>
    );
};

export default TransactionStatus;
