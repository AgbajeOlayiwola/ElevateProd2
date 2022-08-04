import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionElevate } from '../../../redux/actions/actions';
import TableDetail from '../TableDetail';
import styles from './styles.module.css';

const PaymentTable = ({ title }) => {
    const { transactionElevate, errorMessageTransactionElevate } = useSelector(
        (state) => state.transactionElevateReducer
    );
    const [tableDetails, setTableDetails] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTransactionElevate());
    }, []);

    useEffect(() => {
        if (transactionElevate !== null) {
            setTableDetails(transactionElevate);
        }
    }, [transactionElevate]);
    return (
        <div className={styles.table}>
            <div className={styles.tableHeader}>
                <h2>{title}</h2>
                <div className={styles.tableFilter}>
                    <div>
                        <img src="../Assets/Svgs/search.svg" alt="" />
                        <input
                            type="text"
                            placeholder="Search by Type"
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                        />
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
            {tableDetails === null
                ? 'No transaction available'
                : tableDetails
                      ?.filter((item) => {
                          if (searchValue === '') {
                              return item;
                          } else if (
                              item.type
                                  .toLowerCase()
                                  .includes(searchValue.toLowerCase())
                          ) {
                              return item;
                          }
                      })
                      ?.map((items, index) => {
                          return (
                              <TableDetail
                                  key={index}
                                  Beneficiary={items.beneficiaryName}
                                  Type={items.type}
                                  Amount={items.amount}
                                  Bank={items.destinationBank}
                                  Dates={items.tranDate}
                                  Status="Completed"
                              />
                          );
                      })}
        </div>
    );
};

export default PaymentTable;
