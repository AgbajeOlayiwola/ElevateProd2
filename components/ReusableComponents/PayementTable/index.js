import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionElevate } from '../../../redux/actions/actions';
import TableDetail from '../TableDetail';
import styles from './styles.module.css';
import ReactPaginate from 'react-paginate';

const PaymentTable = ({ title, test }) => {
    const { transactionElevate, errorMessageTransactionElevate } = useSelector(
        (state) => state.transactionElevateReducer
    );
    const [tableDetails, setTableDetails] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [displayType, setDisplayType] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const [searchType, setSearchType] = useState('transactionType');

    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(tableDetails.length / usersPerPage);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTransactionElevate());
    }, [test === 0]);

    useEffect(() => {
        if (transactionElevate !== null) {
            setTableDetails(transactionElevate.transactions);
            //console.logtransactionElevate.transactions);
        }
    }, [transactionElevate]);
    useEffect(() => {
        if (searchType === 'transactionType') {
            setDisplayType('Type');
        } else if (searchType === 'transactionStatus') {
            setDisplayType('Status');
        } else if (searchType === 'transactionAmount') {
            setDisplayType('Amount');
        } else if (searchType === 'transactionDate') {
            setDisplayType('Date');
        }
    }, [searchType]);
    const filterCondition = (item, searchType) => {
        switch (searchType) {
            case 'transactionType':
                return item.transactionType
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            case 'transactionStatus':
                return item.transactionStatus
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            case 'transactionAmount':
                return item.transactionAmount
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            case 'transactionDate':
                return item.transactionDate
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            default:
                item.transactionType
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
        }
    };
    return (
        <div className={styles.table}>
            <div className={styles.tableHeader}>
                <h2>{title}</h2>
                <div className={styles.tableFilter}>
                    <div>
                        {/* <img src="../Assets/Svgs/search.svg" alt="" /> */}
                        <input
                            type="text"
                            placeholder={`Filter by ${displayType}`}
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
                <p className={styles.bank}>Bank/Network</p>
                <p className={styles.date}>Date</p>
                <p className={styles.status}>Status</p>
            </div>
            {!tableDetails.length
                ? 'No Recent transaction'
                : tableDetails
                      ?.sort((x, y) => {
                          let a = new Date(x.transactionDate),
                              b = new Date(y.transactionDate);
                          return b - a;
                      })
                      ?.filter((item) => {
                          if (searchValue === '') {
                              return item;
                          } else if (filterCondition(item, searchType)) {
                              return item;
                          }
                      })
                      ?.slice(pagesVisited, pagesVisited + usersPerPage)
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
                                  accountNumber={items.destinationAccountNumber}
                                  network={items.billerCode}
                                  //   phoneNumber={}
                              />
                          );
                      })}
            <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                pageCount={pageCount}
                onPageChange={({ selected }) => {
                    setPageNumber(selected);
                }}
                containerClassName={styles.paginationBtns}
                previousClassName={styles.previousBtns}
                nextLinkClassName={styles.nextBtns}
                activeClassName={styles.paginationActive}
            />
        </div>
    );
};

export default PaymentTable;
