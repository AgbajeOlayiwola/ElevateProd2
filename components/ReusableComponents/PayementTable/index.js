import React from 'react';
import styles from './styles.module.css';

const PaymentTable = ({ title }) => {
    return (
        <div className={styles.table}>
            <div className={styles.tableHeader}>
                <h2>{title}</h2>
                <div className={styles.tableFilter}>
                    <input type="text" placeholder="Search by Date" />
                    {/* <select name="" id="">

                    </select> */}
                    <button>Filter</button>
                </div>
            </div>
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
                        <td className={styles.bene}>Edward Ewang</td>
                        <td className={styles.transfer}>Transfer</td>
                        <td className={styles.amount}>+40,000</td>
                        <td>Wema Bank</td>
                        <td>22 Jul 2022</td>
                        <td>Completed</td>
                    </tr>
                    <tr>
                        <td className={styles.bene}>Edward Ewang</td>
                        <td className={styles.transfer}>Transfer</td>
                        <td className={styles.amount}>+40,000</td>
                        <td>Wema Bank</td>
                        <td>22 Jul 2022</td>
                        <td>Completed</td>
                    </tr>
                    <tr>
                        <td className={styles.bene}>Edward Ewang</td>
                        <td className={styles.transfer}>Transfer</td>
                        <td className={styles.amount}>+40,000</td>
                        <td>Wema Bank</td>
                        <td>22 Jul 2022</td>
                        <td>Completed</td>
                    </tr>
                    <tr>
                        <td className={styles.bene}>Edward Ewang</td>
                        <td className={styles.transfer}>Transfer</td>
                        <td className={styles.amount}>+40,000</td>
                        <td>Wema Bank</td>
                        <td>22 Jul 2022</td>
                        <td>Completed</td>
                    </tr>
                    <tr>
                        <td className={styles.bene}>Edward Ewang</td>
                        <td className={styles.transfer}>Transfer</td>
                        <td className={styles.amount}>+40,000</td>
                        <td>Wema Bank</td>
                        <td>22 Jul 2022</td>
                        <td>Completed</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PaymentTable;
