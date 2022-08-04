import React from 'react';
import styles from './styles.module.css';

const TableDetail = ({
    Beneficiary,
    Type,
    Amount,
    Bank,
    Dates,
    Status,
    keys
}) => {
    return (
        <>
            <div className={styles.TableDetailBody} key={keys}>
                <p className={styles.bene}>{Beneficiary} </p>
                <p className={styles.transfer}>{Type}</p>
                <p className={styles.amount}>{Amount}</p>
                <p className={styles.bank}>{Bank === null ? 'Null' : Bank}</p>
                <p className={styles.date}>{Dates}</p>
                <p className={styles.status}>{Status}</p>
            </div>
        </>
    );
};

export default TableDetail;
