import React from 'react';
import TableDetail from '../TableDetail';
import styles from './styles.module.css';

const PaymentTable = ({ title }) => {
    const tableDetails = [
        {
            beneficiary: 'Edward Ewang',
            type: 'Transfer',
            amount: '+40,000',
            bank: 'Wema Bank',
            date: '22 Jul 2022',
            status: 'Completed'
        },
        {
            beneficiary: 'Edward Ewang',
            type: 'Transfer',
            amount: '+40,000',
            bank: 'Wema Bank',
            date: '22 Jul 2022',
            status: 'Completed'
        },
        {
            beneficiary: 'Edward Ewang',
            type: 'Transfer',
            amount: '+40,000',
            bank: 'Wema Bank',
            date: '22 Jul 2022',
            status: 'Completed'
        },
        {
            beneficiary: 'Edward Ewang',
            type: 'Transfer',
            amount: '+40,000',
            bank: 'Wema Bank',
            date: '22 Jul 2022',
            status: 'Completed'
        }
    ];
    return (
        <div className={styles.table}>
            <div className={styles.tableHeader}>
                <h2>{title}</h2>
                <div className={styles.tableFilter}>
                    <div>
                        <img src="../Assets/Svgs/search.svg" alt="" />
                        <input type="text" placeholder="Search by Date" />
                    </div>
                    <select name="" id="">
                        <option value="" defaultValue="Filter">
                            Filter
                        </option>
                        <option
                            value="Bvn"
                            onClick={(e) => {
                                alert(e.target.value);
                            }}
                        >
                            Bvn
                        </option>
                    </select>
                    {/* <button>
                        Filter
                        <span>
                            <img src="../Assets/Svgs/Vector 26.svg" alt="" />
                        </span>
                    </button> */}
                </div>
            </div>
            <div className={styles.TableDetailHeader}>
                <p className={styles.beneficiary}>Beneficiary </p>
                <p className={styles.type}>Type</p>
                <p className={styles.amount}>Amount</p>
                <p className={styles.bank}>Bank</p>
                <p className={styles.date}>Date</p>
                <p className={styles.status}>Status</p>
            </div>
            {tableDetails.map((item, index) => {
                return (
                    <TableDetail
                        key={index}
                        Beneficiary={item.beneficiary}
                        Type={item.type}
                        Amount={item.amount}
                        Bank={item.bank}
                        Dates={item.date}
                        Status={item.status}
                    />
                );
            })}
        </div>
    );
};

export default PaymentTable;
