import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import BulkTransfer from './bulktransfer';
import ForeignTransfer from './foreigntransfer';
import BillPayment from './billpayment';
import SingleTransfer from './singletransfer';

const MakePaymentFirst = ({ firstTitle, closeAction, buttonText, action }) => {
    const myref = useRef();
    useEffect(() => {
        myref.current.scrollTo(0, 0);
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.firstDiv} ref={myref}>
            <div className={styles.firstBody}>
                {firstTitle === 'Single Transfer Payment' ? (
                    <SingleTransfer
                        action={action}
                        firstTitle="Single Transfer Payment"
                        buttonText={buttonText}
                    />
                ) : firstTitle === 'Foreign Transfer Payments' ? (
                    <ForeignTransfer
                        action={action}
                        firstTitle="Foreign Transfer Payments"
                        buttonText={buttonText}
                    />
                ) : firstTitle === 'Bulk Payments' ? (
                    <BulkTransfer
                        action={action}
                        firstTitle="Bulk Payments"
                        buttonText={buttonText}
                    />
                ) : (
                    <BillPayment
                        action={action}
                        firstTitle="Bill Payment"
                        buttonText={buttonText}
                    />
                )}
            </div>
            <div>
                <img
                    src="../../Assets/Images/bluemoney.png"
                    alt=""
                    className={styles.greenImg}
                />
                <img
                    src="../../Assets/Svgs/closebtn.svg"
                    alt=""
                    className={styles.closebtn}
                    onClick={closeAction}
                />
            </div>
        </div>
    );
};

export default MakePaymentFirst;
