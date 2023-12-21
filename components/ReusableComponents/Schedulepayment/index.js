import Image from 'next/image';
import React from 'react';
import ArrowBackSvg from '../ArrowBackSvg';
import CloseButton from '../CloseButtonSvg';
import Overlay from '../Overlay';
import styles from './styles.module.css';

const SchedulePayment = ({ overlay, closeAction, action }) => {
    return (
        <Overlay overlay={overlay}>
            <div className={styles.schedulepayment}>
                <div className={styles.schedulepaymentCont}>
                    <div className={styles.heading}>
                        <ArrowBackSvg action={action} color="#102572" />
                        <h2>Schedule Payment</h2>
                    </div>

                    <div className={styles.scheduleBody}>
                        <div className={styles.scheduleHeader}>
                            <img
                                src="/../../Assets/Images/repeatClock.png"
                                width="74px"
                                height="74px"
                            />
                            <p>
                                Please select when the payment should be
                                completed later.
                            </p>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Set Time</label>
                            <input type="time" />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Set Date</label>
                            <input type="date" />
                        </div>
                        <div className={styles.transactiondetails}>
                            <div className={styles.transactionsingles}>
                                <p className={styles.transactionTitle}>
                                    Amount
                                </p>
                                <h3 className={styles.amount}>N5,000,000.00</h3>
                            </div>
                            <div className={styles.transactionsingle}>
                                <p className={styles.transactionTitle}>To</p>
                                <h3>Babatunde James</h3>
                            </div>
                            <div className={styles.transactionsingle}>
                                <p className={styles.transactionTitle}>
                                    Beneficiary Bank
                                </p>
                                <h3>
                                    <span></span> Ecobank Plc
                                </h3>
                            </div>
                            {/* <div className={styles.transactionsingle}>
                                <p className={styles.transactionTitle}>
                                    Charges
                                </p>
                                <h3>N50.50</h3>
                            </div> */}
                            <div className={styles.transactionsingle}>
                                <p className={styles.transactionTitle}>From</p>
                                <h3>Marvelous Limited</h3>
                            </div>
                            <button>Next</button>
                        </div>
                    </div>
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

export default SchedulePayment;
