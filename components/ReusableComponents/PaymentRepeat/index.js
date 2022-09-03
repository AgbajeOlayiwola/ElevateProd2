import React from 'react';
import CloseButton from '../CloseButtonSvg';
import Overlay from '../Overlay';
import styles from './styles.module.css';

const PaymentRepeat = ({ overlay, closeAction }) => {
    return (
        <Overlay overlay={overlay}>
            <div className={styles.repeatCont}>
                <div className={styles.closeCont}>
                    <CloseButton
                        color="#A5A5A5"
                        classes={styles.closeBtn}
                        action={closeAction}
                    />
                </div>
                <h2>Hello</h2>
            </div>
        </Overlay>
    );
};

export default PaymentRepeat;
