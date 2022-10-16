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
    let newBeneficiary;
    if (Beneficiary === null) {
        newBeneficiary = '';
    } else {
        newBeneficiary = Beneficiary.split(' ');
    }
    const newDate = Dates.split('T');
    return (
        <>
            <div className={styles.TableDetailBody} key={keys}>
                <p className={styles.bene}>
                    {newBeneficiary === ''
                        ? ''
                        : `${newBeneficiary[0]} ${newBeneficiary[1]}`}
                </p>
                <p className={styles.transfer}>{Type}</p>
                <p className={styles.amount}>{Amount}</p>
                <p className={styles.bank}>{Bank === null ? 'Null' : Bank}</p>
                <p className={styles.date}>{newDate[0]}</p>
                <p className={styles.status}>{Status}</p>
            </div>
        </>
    );
};

export default TableDetail;
