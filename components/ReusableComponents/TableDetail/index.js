import React from 'react';
import styles from './styles.module.css';

const TableDetail = ({
    Beneficiary,
    Type,
    Amount,
    Bank,
    Dates,
    Status,
    keys,
    accountNumber,
    network
}) => {
    let newBeneficiary;
    if (Beneficiary === null) {
        newBeneficiary = '';
    } else if (Beneficiary === undefined) {
        newBeneficiary = '';
    } else {
        newBeneficiary = Beneficiary?.split(' ');
    }
    const newDate = Dates?.split('T');
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
                <p className={styles.bank}>
                    {Bank === null ? network : `${Bank} - ${accountNumber}`}
                </p>
                <p className={styles.date}>{newDate[0]}</p>
                <p className={styles.status}>{Status}</p>
            </div>
        </>
    );
};

export default TableDetail;
