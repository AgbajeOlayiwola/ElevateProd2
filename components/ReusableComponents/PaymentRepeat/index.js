import Image from 'next/image';
import React from 'react';
import CloseButton from '../CloseButtonSvg';
import Overlay from '../Overlay';
import styles from './styles.module.css';

const PaymentRepeat = ({ overlay, closeAction, type }) => {
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
                    <img
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
                        <label> Transfer Type</label>
                        <input type="text" value={type} />
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
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Bi-Weekly">Bi-Weekly</option>
                            <option value="Monthly">Monthly</option>
                        </select>
                    </div>
                    <button>Save</button>
                </div>
            </div>
        </Overlay>
    );
};

export default PaymentRepeat;
