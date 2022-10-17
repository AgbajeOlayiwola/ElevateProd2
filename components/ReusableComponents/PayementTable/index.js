import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionElevate } from '../../../redux/actions/actions';
import TableDetail from '../TableDetail';
import styles from './styles.module.css';

const PaymentTable = ({ title, test }) => {
    const { transactionElevate, errorMessageTransactionElevate } = useSelector(
        (state) => state.transactionElevateReducer
    );
    const [tableDetails, setTableDetails] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchType, setSearchType] = useState('transactionType');

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTransactionElevate());
    }, [test === 0]);

    useEffect(() => {
        if (transactionElevate !== null) {
            setTableDetails(transactionElevate.transactions);
            console.log(transactionElevate.transactions);
        }
    }, [transactionElevate]);
    const filterCondition = (item, searchType) => {
        switch (searchType) {
            case 'transactionType':
                return item.transactionType
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
            case 'transactionStatus':
                return item.transactionStatus
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
            default:
                item.transactionType
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
        }
    }
    return (
        <div className={styles.table}>
            <div className={styles.tableHeader}>
                <h2>{title}</h2>
                <div className={styles.tableFilter}>
                    <div>
                        <img src="../Assets/Svgs/search.svg" alt="" />
                        <input
                            type="text"
                            placeholder="Search"
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                        />
                    </div>
                    <select
                        name=""
                        id=""
                        onChange={(e) => {
                            setSearchType(e.target.value);
                        }}
                    >
                        <option value="transactionType">Type</option>
                        <option value="transactionStatus">Status</option>
                        <option value="transactionAmount">Amount</option>
                        <option value="transactionDate">Date</option>
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
            {!tableDetails.length
                ? 'No Recent transaction'
                : tableDetails
                    ?.filter((item) => {
                        if (searchValue === '') {
                            return item;
                        } else if (filterCondition(item, searchType)) {
                            return item;
                        }
                    })
                    ?.map((items, index) => {
                        return (
                            <TableDetail
                                key={index}
                                Beneficiary={items.receiversName}
                                Type={items.transactionType}
                                Amount={items.transactionAmount}
                                Bank={items.destinationBank}
                                Dates={items.transactionDate}
                                Status={items.transactionStatus}
                            />
                        );
                    })}
        </div>
    );
};

export default PaymentTable;
