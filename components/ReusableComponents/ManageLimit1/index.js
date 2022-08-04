import React, { useRef, useEffect } from 'react';
import Popup from '../../layout/Popup';
import ThreeDotsSvg from '../ThreeDotSvg';
import styles from './styles.module.css';

const ManageLimit = ({ overlay, title, action, btnAction }) => {
    const signData = [
        {
            name: 'Ayomide James',
            email: 'ayomide0007@gmail.com'
        },
        {
            name: 'Ayomide James',
            email: 'ayomide0007@gmail.com'
        },
        {
            name: 'Ayomide James',
            email: 'ayomide0007@gmail.com'
        }
    ];
    const myref = useRef();
    useEffect(() => {
        myref.current.scrollTo(0, 0);
        window.scrollTo(0, 0);
    }, []);
    return (
        <Popup overlay={overlay} action={action} title={title}>
            {title === 'Manage Signatories' ? (
                <div className={styles.signCont} ref={myref}>
                    <p>Please see below signatories to the account</p>
                    <div className={styles.signWrapper}>
                        {signData.map((item, index) => {
                            return (
                                <SignSingle
                                    key={index}
                                    mail={item.email}
                                    fname={item.name}
                                />
                            );
                        })}
                    </div>
                    <button onClick={btnAction}>+ Add New</button>
                </div>
            ) : (
                <div className={styles.signCont} ref={myref}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Eget egestas nunc, blandit sed. A iaculis imperdiet nunc
                        ante.
                    </p>
                    <div className={styles.limitCont}>
                        <div className={styles.limitTitle}>
                            <p>Transfer</p>
                            <p>Airtime/Data</p>
                            <p>Bill Payment</p>
                        </div>
                        <div className={styles.limitBody}>
                            <p>N2,000,000.00</p>
                            <p>N10,000.00</p>
                            <p>N10,000.00</p>
                        </div>
                    </div>
                    <button onClick={btnAction}>Edit Limit</button>
                </div>
            )}
        </Popup>
    );
};

export default ManageLimit;

const SignSingle = ({ mail, fname }) => {
    return (
        <div className={styles.signSingle}>
            <div className={styles.name}>
                <h2>{fname}</h2>
                <p>{mail}</p>
            </div>
            <div className={styles.action}>
                <div className={styles.status}></div>
                <p>Signed</p>
                <ThreeDotsSvg />
            </div>
        </div>
    );
};
