import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import { useTransactionHistoryMutation } from '../../../redux/api/authApi';
import Loader from '../Loader';
import MoreAction from '../MoreAction';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const PaymentTable = ({ title, page }) => {
    const [tableDetails, setTableDetails] = useState([]);
    const [newTableDetails, setNewTableDetails] = useState([]);
    const [newestTableDetails, setNewestTableDetails] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [displayType, setDisplayType] = useState('');
    const [searchType, setSearchType] = useState('');

    const affiliate = localStorage.getItem('affiliateCode');

    const [
        transactionHistory,
        {
            data: transactionHistoryData,
            isLoading: transactionHistoryLoad,
            isSuccess: transactionHistorySuccess,
            isError: transactionHistoryFalse,
            error: transactionHistoryErr,
            reset: transactionHistoryReset
        }
    ] = useTransactionHistoryMutation();
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        transactionHistory({
            limit: 1000,
            fromDate: '',
            toDate: '',
            order: 'DESC',
            filter: {
                type: '',
                field: '',
                value: ''
            }
        });
    }, []);
    var billPayments = [
        'BILLPAYMENT',
        'SINGLE_TRANSFER',
        'BULK_TRANSFER',
        'AIRTIME_TOPUP'
    ];
    console.log(billPayments);

    useEffect(() => {
        if (page === 'Collections') {
            if (transactionHistoryData?.data) {
                const filteredTransactions =
                    transactionHistoryData?.data?.filter((item) => {
                        const excludedTypes = [
                            'BILLPAYMENT',
                            'SINGLE_TRANSFER',
                            'BULK_TRANSFER',
                            'AIRTIME_TOPUP'
                        ];
                        console.log('Transaction Type:', item?.transactionType);
                        return !excludedTypes.includes(item?.transactionType);
                    });

                setTransactions(filteredTransactions);
            }
        } else if (page === 'Payments') {
            if (transactionHistoryData?.data) {
                const filteredTransactions =
                    transactionHistoryData?.data?.filter((item) => {
                        const includedTypes = [
                            'BILLPAYMENT',
                            'SINGLE_TRANSFER',
                            'BULK_TRANSFER',
                            'AIRTIME_TOPUP'
                        ];
                        return includedTypes.includes(item?.transactionType);
                    });

                console.log('Filtered Transactions:', filteredTransactions);

                setTransactions(filteredTransactions);
            }
        } else if (page === 'Reports') {
            console.log('Setting Reports');
            setNewestTableDetails([]);
            setNewTableDetails(tableDetails);
        }
    }, [tableDetails, transactionHistorySuccess, page]);
    useEffect(() => {
        setNewestTableDetails([]);
        transactionHistory?.data?.filter((item) => {
            if (searchValue === '') {
                setTransactions(item);
            } else if (filterCondition(item, searchType)) {
                setTransactions(item);
            }
        });
    }, [searchValue]);
    const dispatch = useDispatch();

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
    console.log(searchType);
    const filterCondition = (searchType) => {
        switch (searchType) {
            case 'transactionType':
                return 'USSD'.toLowerCase().includes(searchValue.toLowerCase());
            case 'transactionStatus':
                return item?.transactionStatus
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            case 'transactionAmount':
                return item?.transactionAmount
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            case 'inflow':
                return item?.transactionType
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            case 'outflow':
                return item?.transactionType
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            default:
                'USSD'.toLowerCase().includes(searchValue.toLowerCase());
        }
    };
    console.log(filterCondition());
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        console.log(width);
    };

    useEffect(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        // component is mounted and window is available
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        // unsubscribe from the event on component unmount
        return () => window.removeEventListener('resize', handleWindowResize);
    }, [width]);
    const [pageNumber, setPageNumber] = useState(0);
    const transactionsPerPage = 10;

    const handlePageChange = ({ selected }) => {
        setPageNumber(selected);
    };

    const currentTransactions = transactions
        ?.filter((item) => {
            // Add a check to skip the filter if the value is an empty string
            if (searchValue === '') {
                return true; // Skip the filter
            } else if (
                item.transactionType === searchValue &&
                searchType === 'transactionType'
            ) {
                return true;
            } else if (
                item.transactionStatus === searchValue &&
                searchType === 'transactionStatus'
            ) {
                return true;
            } else if (
                searchType === 'transactionAmount' &&
                parseFloat(item.transactionAmount) === parseFloat(searchValue)
            ) {
                return true;
            }
            return false;
        })
        ?.slice(
            pageNumber * transactionsPerPage,
            (pageNumber + 1) * transactionsPerPage
        );
    console.log(transactions);

    return (
        <div className={styles.table}>
            <div className={styles.tableHeader}>
                <h2>{title}</h2>
                <div className={styles.tableFilter}>
                    {page === 'Reports' ? (
                        <select
                            name=""
                            id=""
                            onChange={(e) => {
                                setSearchType(e.target.value);
                                setSearchValue('');
                            }}
                        >
                            <option value="">Filter</option>
                            <option value="inflow">Inflow</option>
                            <option value="outflow">Outflow</option>
                        </select>
                    ) : (
                        <select
                            name=""
                            id=""
                            onChange={(e) => {
                                setSearchType(e.target.value);
                                setSearchValue('');
                            }}
                        >
                            <option value="">Filter</option>
                            <option value="transactionType">Type</option>
                            <option value="transactionStatus">Status</option>
                            <option value="transactionAmount">Amount</option>
                        </select>
                    )}

                    {page === 'Collections' ? (
                        searchType === 'transactionType' ? (
                            <select
                                name=""
                                id=""
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                            >
                                <option value="">All</option>
                                <option value="Paylink">Paylink</option>
                                <option value="QR">QR Payment</option>
                                <option value="USSD">USSD</option>
                            </select>
                        ) : searchType === 'transactionStatus' ? (
                            <select
                                name=""
                                id=""
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                            >
                                <option value="">All</option>
                                <option value="SUCCESS">Success</option>
                                <option value="PENDING">Pending</option>
                                <option value="FAILED">Failed</option>
                            </select>
                        ) : searchType === 'transactionAmount' ? (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Filter by Amount"
                                    onChange={(e) => {
                                        setSearchValue(e.target.value);
                                    }}
                                />
                            </div>
                        ) : null
                    ) : page === 'Payments' ? (
                        searchType === 'transactionType' ? (
                            <select
                                name=""
                                id=""
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                            >
                                <option value="">All</option>
                                <option value="SINGLE_TRANSFER">
                                    Single Transfer
                                </option>
                                <option value="BULK_TRANSFER">
                                    Bulk Transfer
                                </option>
                                <option value="BILL_PAYMENT">
                                    Bills Payment
                                </option>
                                <option value="AIRTIME_TOPUP">
                                    Airtime Topup
                                </option>
                            </select>
                        ) : searchType === 'transactionStatus' ? (
                            <select
                                name=""
                                id=""
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                            >
                                <option value="">All</option>
                                <option value="SUCCESS">Success</option>
                                <option value="PENDING">Pending</option>
                                <option value="FAILED">Failed</option>
                            </select>
                        ) : searchType === 'transactionAmount' ? (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Filter by Amount"
                                    onChange={(e) => {
                                        setSearchValue(e.target.value);
                                    }}
                                />
                            </div>
                        ) : null
                    ) : page === 'Reports' ? (
                        searchType === 'outflow' ? (
                            <select
                                name=""
                                id=""
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                            >
                                <option value="">All</option>
                                <option value="Single Transfer">
                                    Single Transfer
                                </option>
                                <option value="Bulk Transfer">
                                    Bulk Transfer
                                </option>
                                <option value="Bills Payment">
                                    Bills Payment
                                </option>
                            </select>
                        ) : searchType === 'inflow' ? (
                            <select
                                name=""
                                id=""
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                            >
                                <option value="">All</option>
                                <option value="Paylink">Paylink</option>
                                <option value="QR">QR Payment</option>
                                <option value="USSD">USSD</option>
                            </select>
                        ) : null
                    ) : null}
                    {/* <button>
                        Filter
                        <span>
                            <img src="../Assets/Svgs/Vector 26.svg" alt="" />
                        </span>
                    </button> */}
                </div>
            </div>
            {/* {newestTableDetails?.map((item) => {
                if (item.transactionStatus === 'SUCCESS') {
                    success += 1;
                } else if (item.transactionStatus === 'PENDING') {
                    pending = pending + 1;
                } else if (item.transactionStatus === 'FAILED') {
                    failed += 1;
                }
            })} */}
            {/* <TransactionStatus
                success={success}
                failed={failed}
                pending={pending}
            /> */}
            <div className={styles.tableMain}>
                <div className={styles.TableDetailHeader}>
                    {page === 'Collections' ? null : (
                        <p className={styles.beneficiary}>Beneficiary </p>
                    )}
                    <p className={styles.type}>Type</p>
                    <p className={styles.amount}>Amount</p>
                    {/* <p className={styles.bank}>Bank/Network</p> */}
                    <p className={styles.date}>Date</p>
                    <p
                        className={
                            page === 'Collections'
                                ? styles.statuss
                                : styles.status
                        }
                    >
                        Status
                    </p>
                    <div className={styles.more}></div>
                </div>
                <div className={styles.tableDetails}>
                    {transactionHistoryLoad ? (
                        <Loader />
                    ) : transactionHistoryErr ? (
                        <p className={styles.notrans}>
                            No Transaction Available
                        </p>
                    ) : (
                        currentTransactions?.map((item, index) => {
                            return (
                                <div className={styles.TableDetailHeaders}>
                                    {page === 'Collections' ? null : (
                                        <p className={styles.beneficiary}>
                                            {item?.beneficiaryName
                                                ? item?.beneficiaryName
                                                : item?.beneficiaryAccountNumber}
                                        </p>
                                    )}
                                    <p className={styles.type}>
                                        {item?.transactionType.replace(
                                            '_',
                                            ' '
                                        )}
                                    </p>
                                    <p className={styles.amount}>
                                        {getSymbolFromCurrency(
                                            countryToCurrency[
                                                `${affiliate?.substring(1)}`
                                            ]
                                        )}{' '}
                                        {parseFloat(
                                            item.transactionAmount
                                        ).toLocaleString('en-US')}
                                    </p>
                                    {/* <p className={styles.bank}>Bank/Network</p> */}
                                    <p className={styles.date}>
                                        {item?.transactionDate}
                                    </p>
                                    <p
                                        className={
                                            item?.transactionStatus === 'FAILED'
                                                ? styles.failed
                                                : item?.transactionStatus ===
                                                  'PENDING'
                                                ? page === 'Collections'
                                                    ? styles.pendings
                                                    : styles.pending
                                                : page === 'Collections'
                                                ? styles.successes
                                                : styles.success
                                        }
                                    >
                                        {item?.transactionStatus}
                                    </p>
                                    <div className={styles.more}>
                                        <MoreAction
                                            transactionStatus={
                                                item?.transactionStatus
                                            }
                                            narr={item?.Narration}
                                            bene={item?.beneficiaryName}
                                            transactionTitle={item?.transactionType.replace(
                                                '_',
                                                ' '
                                            )}
                                            transactionDate={
                                                item?.transactionDate
                                            }
                                            destinationBank={
                                                item?.destinationBankName
                                            }
                                            sender={item?.sourceAccount}
                                            transactionAmount={parseFloat(
                                                item?.transactionAmount
                                            ).toLocaleString('en-US')}
                                        />
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            <ReactPaginate
                previousLabel={<AiOutlineLeft />}
                nextLabel={<AiOutlineRight />}
                pageCount={Math.ceil(
                    transactions?.length / transactionsPerPage
                )}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                onPageChange={handlePageChange}
                containerClassName={styles.paginationBtns}
                previousClassName={styles.previousBtns}
                nextLinkClassName={styles.nextBtns}
                activeClassName={styles.paginationActive}
            />
        </div>
    );
};

export default PaymentTable;
