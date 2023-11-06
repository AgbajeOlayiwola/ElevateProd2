import React from 'react';
import styles from './styles.module.css';

const AnalyticsData = ({
    symbol,
    percentage,
    inflowOrOutflow,
    amount,
    upOrDown
}) => {
    return (
        <div className={styles.inflowOutFlow}>
            <p>{inflowOrOutflow}</p>
            <h1>{amount}</h1>
            <p className={upOrDown === 'up' ? styles.row : styles.rows}>
                {symbol} {percentage}
            </p>
        </div>
    );
};

export default AnalyticsData;
