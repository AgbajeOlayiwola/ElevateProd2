import React, { useState } from 'react';
import styles from './styles.module.css';
import { MakePayment } from '../Data';

const MakePaymentBtn = () => {
    const [showDrop, setShowDrop] = useState(false);
    return (
        <>
            <button
                className={styles.make}
                onClick={() => setShowDrop(!showDrop)}
            >
                Make Payment
            </button>
            <div className={showDrop ? styles.dat : styles.dontshow}>
                {MakePayment.map((item, index) => {
                    return (
                        <div className={styles.comp}>
                            <p>{item.icon}</p>
                            <p>{item.title}</p>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
export default MakePaymentBtn;
