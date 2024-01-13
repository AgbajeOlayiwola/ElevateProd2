import React from 'react';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const LoansDetails = ({ amount, loansDetails, children }) => {
    const affiliate = localStorage.getItem('affiliateCode');
    // // console.log(amount);
    return (
        <div className={styles.loanDetailsCont}>
            <div className={styles.loanDetailsHead}>
                <div className={styles.loanDetailsAmount}>
                    <h2>Loan Amount</h2>
                    <div>
                        <p>
                            {countryToCurrency[affiliate?.substring(1)] +
                                parseFloat(amount)}
                        </p>
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
                                <h2>{items.value}</h2>
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
