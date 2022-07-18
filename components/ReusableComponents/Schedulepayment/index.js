import React from 'react';
import Overlay from '../Overlay';
import styles from './styles.module.css';

const SchedulePayment = ({ overlay }) => {
    return (
        <Overlay overlay={overlay}>
            <div className={styles.schedulepayment}></div>
        </Overlay>
    );
};

export default SchedulePayment;
