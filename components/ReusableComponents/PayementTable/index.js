import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getTransactionElevate,
    getTransactionHistory,
    getDisputCategOryTypeGen
} from '../../../redux/actions/actions';
import TableDetail from '../TableDetail';
import styles from './styles.module.css';
import ReactPaginate from 'react-paginate';
import TransactionStatus from '../TransactionStatus';
import Lottie from 'react-lottie';
import socialdata from '../../ReusableComponents/Lotties/loading.json';
const PaymentTable = ({ title, test, page }) => {
    const { transactionElevate, errorMessageTransactionElevate } = useSelector(
        (state) => state.transactionElevateReducer
    );
    const { transactionHistory, errorMessageTransactionHistory } = useSelector(
        (state) => state.transactionHistoryReducer
    );
    const {
        getDisputCategOryTypeSuccess,
        getDisputCategOryTypeErrorMessage
    } = useSelector((state) => state.getDisputeTypeReducer);
    const [pageSrchIndex, setPageSrchIndex] = useState(0);
    const [numOfRecords, setNumOfRecords] = useState(1000);
    const [tableDetails, setTableDetails] = useState([]);
    const [newTableDetails, setNewTableDetails] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [displayType, setDisplayType] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const [searchType, setSearchType] = useState('transactionType');
    const [disputes, setDisputes] = useState();
    const [isLoading, setIsLoading] = useState(true);
    let pending = 0;
    let success = 0;
    let failed = 0;
    useEffect(() => {
        setDisputes(getDisputCategOryTypeSuccess);
    }, [getDisputCategOryTypeSuccess]);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN',
        currencyDisplay: 'narrowSymbol'
    });

    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;
    const socialOptions = {
        loop: true,
        autoplay: true,
        animationData: socialdata,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    useEffect(() => {
        if (page === 'Collections') {
            tableDetails.filter((item, index) => {
                if (item.paymentDirection === 'CREDIT') {
                    setNewTableDetails((arr) => [...arr, item]);
                }
            });
        } else if (page === 'Payments') {
            tableDetails.filter((item) => {
                if (item.paymentDirection === 'DEBIT') {
                    setNewTableDetails((arr) => [...arr, item]);
                }
            });
        }
    }, [tableDetails]);
    const pageCount = Math.ceil(newTableDetails.length / usersPerPage);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTransactionHistory(pageSrchIndex, numOfRecords));
    }, [test === 0]);

    useEffect(() => {
        dispatch(getDisputCategOryTypeGen());
    }, []);

    useEffect(() => {
        if (transactionHistory !== null) {
            setTableDetails(transactionHistory.transactions);
            //console.logtransactionElevate.transactions);
            if (transactionHistory !== null) {
                setIsLoading(false);
            }
        }
    }, [transactionHistory]);
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
            {newTableDetails?.map((item) => {
                if (item.transactionStatus === 'SUCCESS') {
                    success += 1;
                } else if (item.transactionStatus === 'PENDING') {
                    pending = pending + 1;
                } else if (item.transactionStatus === 'FAILED') {
                    failed += 1;
                }
            })}
            <TransactionStatus
                success={success}
                failed={failed}
                pending={pending}
            />
            <div className={styles.TableDetailHeader}>
                <p className={styles.beneficiary}>Beneficiary </p>
                <p className={styles.type}>Type</p>
                <p className={styles.amount}>Amount</p>
                {/* <p className={styles.bank}>Bank/Network</p> */}
                <p className={styles.date}>Date</p>
                <p className={styles.status}>Status</p>
                <div className={styles.more}></div>
            </div>
            {isLoading ? (
                <Lottie options={socialOptions} height={200} width={200} />
            ) : !newTableDetails.length ? (
                <p className={styles.noRecent}>No Recent transaction</p>
            ) : (
                newTableDetails
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
                                title={items.transactionTitle}
                                Beneficiary={items.receiver}
                                Type={items.transactionType.replace('_', ' ')}
                                Amount={formatter.format(
                                    items.transactionAmount
                                )}
                                Bank={items.destinationBank}
                                Dates={items.transactionDate}
                                Status={items.transactionStatus}
                                accountNumber={items.destinationAccountNumber}
                                network={items.billerCode}
                                disputes={disputes}
                                //   phoneNumber={}
                            />
                        );
                    })
            )}
            {newTableDetails.length === 0 ? null : (
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
            )}
        </div>
    );
};

export default PaymentTable;
