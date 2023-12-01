import React from 'react';
import styles from './styles.module.css';
import SearchSvg from '../ReusableSvgComponents/SearchSvg';
import { loansTransactions } from '../Data';
import { formatter } from '../../../utils/formatter/formatter';

const LoansTable = ({ loads, data }) => {
    return (
        <div className={styles.loansTable}>
            <div className={styles.loansAction}>
                <h2>Loan log history</h2>
                <div>
                    <SearchSvg color="#868FA0" />
                    <input
                        type="text"
                        placeholder="Search by title, amount or date"
                    />
                </div>
            </div>
            <div className={styles.loansHeader}>
                <p>S/N</p>
                <p>DATE</p>
                <p>TITLE</p>
                <p>AMOUNT</p>
                <p>TRANSACTION TYPE</p>
                <p>TRANSACTION ID</p>
                <p>STATUS</p>
            </div>
            {loansTransactions?.map((items, index) => {
                return (
                    <div className={styles.loansSingle} key={index}>
                        <p>{index + 1}</p>
                        <p>{items.date}</p>
                        <p>{items.title}</p>
                        <p
                            className={
                                items.action === 'debit'
                                    ? styles.debit
                                    : styles.credit
                            }
                        >
                            {items.action === 'debit' ? '-' : '+'}
                            {formatter.format(items.amount)}
                        </p>
                        <p>{items.type}</p>
                        <p>{items.id}</p>
                        <div
                            className={
                                items.status === 'Pending'
                                    ? styles.pending
                                    : items.status === 'Failed'
                                    ? styles.failed
                                    : styles.success
                            }
                        >
                            <span></span>
                            <p>{items.status}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default LoansTable;
