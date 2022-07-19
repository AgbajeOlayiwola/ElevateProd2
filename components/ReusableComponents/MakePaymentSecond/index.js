import React, { useState } from 'react';
import ButtonComp from '../Button';
import styles from './styles.module.css';
import OtpInput from '../Otpinput';
import Overlay from '../Overlay';

const MakePaymentSecond = ({ overlay }) => {
    const [activeBtn, setActiveBtn] = useState(false);
    return (
        <Overlay overlay={overlay}>
            <div className={styles.PaymentSecond}>
                <div className={styles.PaymentSecondCont}>
                    <h2>Confirm Transaction</h2>
                    <p>Enter your transaction pin to continue.</p>
                    <div className={styles.transactionamount}>
                        <p>Amount</p>
                        <h3>N5,000,000.00</h3>
                    </div>
                    <div className={styles.transactiondetails}>
                        <div className={styles.transactionsingles}>
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
                        <div className={styles.transactionsingle}>
                            <p className={styles.transactionTitle}>From</p>
                            <h3>Marvelous Limited</h3>
                        </div>
                        <div className={styles.transactionsingle}>
                            <p className={styles.transactionTitle}>Charges</p>
                            <h3>N50.50</h3>
                        </div>
                    </div>
                    <h4>Enter Transaction Pin</h4>
                    <form>
                        <OtpInput />
                        <div className={styles.resendFlex}>
                            <p style={{ color: '#005B82', cursor: 'pointer' }}>
                                Resend OTP
                            </p>
                            <button
                                style={{ cursor: 'pointer' }}
                                className={styles.clr}
                                type="reset"
                            >
                                Clear
                            </button>
                        </div>
                        <ButtonComp
                            disabled={activeBtn}
                            active={activeBtn ? 'active' : 'inactive'}
                            text="Make Transfer"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        </Overlay>
    );
};

export default MakePaymentSecond;
