import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import BulkTransfer from './bulktransfer';
import ForeignTransfer from './foreigntransfer';
import BillPayment from './billpayment';
import SingleTransfer from './singletransfer';
import Overlay from '../Overlay';
import CloseButton from '../CloseButtonSvg';

const MakePaymentFirst = ({
    firstTitle,
    closeAction,
    buttonText,
    action,
    selfaction,
    othersaction,
    overlay,
    scheduleLater
}) => {
    const myref = useRef();
    useEffect(() => {
        myref.current.scrollTo(0, 0);
        window.scrollTo(0, 0);
    }, []);

    return (
        <Overlay overlay={overlay}>
            <div className={styles.firstDiv} ref={myref}>
                <div className={styles.firstBody}>
                    {firstTitle === 'Single Transfer Payment' ? (
                        <SingleTransfer
                            selfaction={selfaction}
                            othersaction={othersaction}
                            firstTitle="Single Transfer Payment"
                            buttonText={buttonText}
                            scheduleLater={scheduleLater}
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
                    <CloseButton
                        action={closeAction}
                        classes={styles.closebtn}
                        color="white"
                    />
                </div>
            </div>
        </Overlay>
    );
};

export default MakePaymentFirst;
