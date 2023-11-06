import React from 'react';
import styles from './styles.module.css';
import { formatter } from '../../../utils/formatter/formatter';

const LoansDetails = ({ amount, loansDetails, children }) => {
    return (
        <div className={styles.loanDetailsCont}>
            <div className={styles.loanDetailsHead}>
                <div className={styles.loanDetailsAmount}>
                    <h2>Loan Amount</h2>
                    <div>
                        <p>{formatter.format(amount)}</p>
                    </div>
                </div>
                <h2>Loan Details</h2>
                <div className={styles.loanDetailsWrapper}>
                    {loansDetails?.map((items, index) => {
                        return (
                            <div
                                className={styles.loanDetailsSingle}
                                key={index}
                            >
                                <p>{items.title}</p>
                                <h2>{items.text}</h2>
                            </div>
                        );
                    })}
                </div>
            </div>
            {children}
        </div>
    );
};

export default LoansDetails;
