import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import { useTransactionHistoryMutation } from '../../../redux/api/authApi';
import socialdata from '../../ReusableComponents/Lotties/loading.json';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const PaymentTable = ({ title, page }) => {
    const [pageSrchIndex, setPageSrchIndex] = useState(0);
    const [numOfRecords, setNumOfRecords] = useState(1000);
    const [tableDetails, setTableDetails] = useState([]);
    const [newTableDetails, setNewTableDetails] = useState([]);
    const [newestTableDetails, setNewestTableDetails] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [displayType, setDisplayType] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const [searchType, setSearchType] = useState('');
    const [disputes, setDisputes] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const affiliate = localStorage.getItem('affiliateCode');
    let pending = 0;
    let success = 0;
    let failed = 0;
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
    useEffect(() => {
        transactionHistory({
            limit: 12,
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
            setNewestTableDetails([]);
            tableDetails.filter((item, index) => {
                if (item.paymentDirection === 'CREDIT') {
                    setNewestTableDetails([]);
                    setNewTableDetails((arr) => [...arr, item]);
                }
            });
        } else if (page === 'Payments') {
            setNewestTableDetails([]);
            tableDetails.filter((item) => {
                if (item.paymentDirection === 'DEBIT') {
                    setNewestTableDetails([]);
                    setNewTableDetails((arr) => [...arr, item]);
                }
            });
        } else if (page === 'Reports') {
            setNewestTableDetails([]);
            setNewTableDetails(tableDetails);
        }
    }, [tableDetails]);
    useEffect(() => {
        setNewestTableDetails([]);
        newTableDetails?.filter((item) => {
            if (searchValue === '') {
                setNewestTableDetails((arr) => [...arr, item]);
            } else if (filterCondition(item, searchType)) {
                setNewestTableDetails((arr) => [...arr, item]);
            }
        });
    }, [searchValue, newTableDetails]);
    const pageCount = Math.ceil(newestTableDetails.length / usersPerPage);
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
            case 'inflow':
                return item.transactionType
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            case 'outflow':
                return item.transactionType
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            default:
                item.transactionType
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
        }
    };
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
                                <option value="QR_Payment">QR Payment</option>
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
                                <option value="Success">Success</option>
                                <option value="Pending">Pending</option>
                                <option value="Failed">Failed</option>
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
                                <option value="Success">Success</option>
                                <option value="Pending">Pending</option>
                                <option value="Failed">Failed</option>
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
                                <option value="QR_Payment">QR Payment</option>
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
                    <p className={styles.beneficiary}>Beneficiary </p>
                    <p className={styles.type}>Type</p>
                    <p className={styles.amount}>Amount</p>
                    {/* <p className={styles.bank}>Bank/Network</p> */}
                    <p className={styles.date}>Date</p>
                    <p className={styles.status}>Status</p>
                    <div className={styles.more}></div>
                </div>
                <div className={styles.tableDetails}>
                    {transactionHistoryErr ? (
                        <p className={styles.notrans}>
                            No Transaction Available
                        </p>
                    ) : (
                        transactionHistoryData?.data.map((item, index) => {
                            return (
                                <div className={styles.TableDetailHeaders}>
                                    <p className={styles.beneficiary}>
                                        {item?.beneficiary}
                                    </p>
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
                                                ? styles.pending
                                                : styles.success
                                        }
                                    >
                                        {item?.transactionStatus}
                                    </p>
                                    <div className={styles.more}></div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            <ReactPaginate
                previousLabel={<AiOutlineLeft />}
                nextLabel={<AiOutlineRight />}
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
