import React from 'react';
import DashLayout from '../../components/layout/Dashboard';
import PaymentTable from '../../components/ReusableComponents/PayementTable';
import styles from './styles.module.css';

const Payment = () => {
    return (
        <DashLayout>
            <div className={styles.cov}>
                <div className={styles.whiteboard}>
                    <div>
                        <p className={styles.thousand}> #22,049.94</p>
                        <p className={styles.avail}>Available Balance</p>
                        <div className={styles.btn}>
                            <div>
                                <p>Receive Payment</p>
                            </div>
                            <div>
                                <p>Make Payment</p>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <img src="../Assets/Images/bagmoney.png" alt="Money" />
                    </div>
                </div>
                <div className={styles.greencard}>
                    <h3>Introducing Scheduled Payments</h3>
                    <div className={styles.greencardDetails}>
                        <div>
                            <img src="../Assets/Images/clock.png" alt="Clock" />
                        </div>
                        <p>
                            You can now schedule your transfer for a later time
                            or date by selecting
                            <span> ‘Schedule for later’ </span> when you make
                            payments.
                        </p>
                    </div>
                </div>
            </div>
            <PaymentTable title="All Transactions" />
        </DashLayout>
    );
};

export default Payment;
