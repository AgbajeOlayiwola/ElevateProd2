import React from 'react';
import styles from './styles.module.css';
import MoreAction from '../MoreAction';

const TableDetail = ({
    Beneficiary,
    Type,
    Amount,
    Bank,
    Dates,
    Status,
    keys,
    accountNumber,
    network,
    title,
    disputes
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
                    {title}
                    {newBeneficiary === ''
                        ? ''
                        : newBeneficiary[1] === undefined
                        ? newBeneficiary[0]
                        : `${newBeneficiary[0]} ${newBeneficiary[1]}`}
                </p>
                <p className={styles.transfer}>{Type}</p>
                <p className={styles.amount}>{Amount}</p>
                {/* <p className={styles.bank}>
                    {Bank === null ? network : `${Bank} - ${accountNumber}`}
                </p> */}
                <p className={styles.date}>{newDate[0]}</p>
                <p
                    className={
                        Status === 'PENDING'
                            ? styles.pending
                            : Status === 'SUCCESS'
                            ? styles.success
                            : styles.status
                    }
                >
                    {Status}
                </p>
                <div className={styles.more}>
                    <MoreAction
                        disputes={disputes}
                        transactionAmount={Amount}
                        transactionStatus={Status}
                        transactionTitle={Type}
                    />
                </div>
            </div>
        </>
    );
};

export default TableDetail;
