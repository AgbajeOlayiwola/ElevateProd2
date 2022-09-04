import Image from 'next/image';
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
                <div className={styles.repeatHeader}>
                    <Image
                        src="/Assets/Images/repeatClock.png"
                        width="100%"
                        height="100%"
                    />
                    <div>
                        <h2>Repeat Payment</h2>
                        <p>
                            Please select when the payment should be completed
                            later.
                        </p>
                    </div>
                </div>
                <div className={styles.repeatBody}>
                    <div className={styles.formGroup}>
                        <label>Choose Transfer Type</label>
                        <select name="" id="">
                            <option value="">Single Transfer</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Set Time</label>
                        <div>
                            <input type="time" />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Set Date</label>
                        <input type="date" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Set Frequency</label>
                        <select>
                            <option value="">Select Frequency</option>
                        </select>
                    </div>
                    <button>Save</button>
                </div>
            </div>
        </Overlay>
    );
};

export default PaymentRepeat;
