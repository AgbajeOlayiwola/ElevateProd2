import React, { useState } from 'react';
import { RecievePayment } from '../Data';
import styles from './styles.module.css';

const RecievePaymentBtn = () => {
    const [showDrop, setShowDrop] = useState(false);
    return (
        <>
            <button
                className={styles.rec}
                onClick={() => setShowDrop(!showDrop)}
            >
                Recieve Payment
            </button>
            <div className={showDrop ? styles.dat : styles.dontshow}>
                {RecievePayment.map((item, index) => {
                    return (
                        <div className={styles.comp} key={index}>
                            <p>{item.icon}</p>
                            <p>{item.title}</p>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default RecievePaymentBtn;
