import React from 'react';
import DashLayout from '../../components/layout/Dashboard';
import styles from './styles.module.css';

const Payment = () => {
    return (
        <DashLayout>
            <div className={styles.cover}>
            <div className={styles.cov}>
                <div className={styles.whiteboard}>
                    <div>
                        <p className={styles.thousand}> #22,049.94</p>
                        <p classNavme={styles.avail}>Available Balance</p>
                        <div className={styles.btn}>
                            <div>Receive Payment </div>
                            <div> Make Payment</div>
                        </div>
                    </div>
                    <div className={styles.image}></div>
                </div>

                <div className={styles.greencard}>
                    <h3>Introducing Scheduled Payments</h3>
                    <div>clock-svg</div>
                    <p>
                        You can now Schedule your transfer for a later time or
                        date
                    </p>
                </div>

                
            </div>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr className={styles.tableHead}>
                            <th>Beneficiary </th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Bank</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Edward Ewang</td>
                            <td>Transfer</td>
                            <td>+40,000</td>
                            <td>Wema Bank</td>
                            <td>22 jul 2022</td>
                            <td>Completed</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </DashLayout>
    );
};

export default Payment;
