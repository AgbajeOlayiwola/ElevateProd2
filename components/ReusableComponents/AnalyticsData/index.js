import React from 'react';
import { abbreviateNumber } from '../../../utils/abreviateNumber';
import Loader from '../Loader';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const AnalyticsData = ({
    symbol,
    percentage,
    inflowOrOutflow,
    amount,
    upOrDown,
    isMoney,
    loads
}) => {
    const affiliate = localStorage.getItem('affiliateCode');

    return (
        <div className={styles.inflowOutFlow}>
            <p>{inflowOrOutflow}</p>
            <h1>
                {loads ? (
                    <Loader />
                ) : isMoney ? (
                    getSymbolFromCurrency(
                        countryToCurrency[affiliate?.substring(1)]
                    )
                ) : null}

                {loads ? (
                    <Loader />
                ) : isMoney ? (
                    abbreviateNumber(amount)
                ) : (
                    amount
                )}
            </h1>
            <p className={upOrDown === 'up' ? styles.row : styles.rows}>
                {symbol} {percentage}
            </p>
        </div>
    );
};

export default AnalyticsData;
