import React, { useState } from 'react';
import { RecievePayment } from '../Data';
import styles from './styles.module.css';
import Link from 'next/link';
import OutsideClick from '../OutsideClick';
const RecievePaymentBtn = () => {
    const [showDrop, setShowDrop] = useState(false);
    return (
        <div className={styles.body}>
            <button
                className={styles.rec}
                onClick={() => setShowDrop(!showDrop)}
            >
                Receive Payment
            </button>
            <OutsideClick
                onClickOutside={() => {
                    setShowDrop(false);
                }}
            >
                <div className={showDrop ? styles.dat : styles.dontshow}>
                    {RecievePayment.map((item, index) => {
                        return (
                            <div className={styles.comp} key={index}>
                                <p>{item.icon}</p>
                                <Link
                                    href={{
                                        pathname: '/Admin/Collections',
                                        query: { id: item.path }
                                    }}
                                >
                                    {item.title}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </OutsideClick>
        </div>
    );
};

export default RecievePaymentBtn;
