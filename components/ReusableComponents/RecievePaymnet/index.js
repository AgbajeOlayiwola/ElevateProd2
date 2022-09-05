import React, { useState } from 'react';
import { RecievePayment } from '../Data';
import styles from './styles.module.css';
import Link from 'next/link';
const RecievePaymentBtn = () => {
    const [showDrop, setShowDrop] = useState(false);
    return (
        <div className={styles.body}>
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
                            <Link
                                href={{
                                    pathname: './Payment',
                                    query: { id: item.path }
                                }}
                            >
                                {item.title}
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecievePaymentBtn;
