import React, { useEffect, useState } from 'react';
import { Layout } from '../../../components';
import DashLayout from '../../../components/layout/Dashboard';
import styles from './styles.module.css';
import { BsChevronDown } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import ReportsData from '../../../components/ReusableComponents/ReportsData';
import { BiFilter } from 'react-icons/bi';
import {
    // getTransactionElevate,
    getTransactionHistory,
    getMiniStatementGen,
    // loadAccountPrimary,
    loadbankStatement
} from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import StorePopup from '../../../components/ReusableComponents/StorePopup';
import CloseButton from '../../../components/ReusableComponents/CloseButtonSvg';
import Loader from '../../../components/ReusableComponents/Loader';
import PaymentSuccess from '../../../components/ReusableComponents/PaymentSuccess';
import TableDetail from '../../../components/ReusableComponents/TableDetail';
import ReactPaginate from 'react-paginate';
import PaymentTable from '../../../components/ReusableComponents/PayementTable';
import withAuth from '../../../components/HOC/withAuth';

const Report = () => {
    // const dispatch = useDispatch();
    // const [filterPara, setFilterPara] = useState('');
    // const [filterType, setFilterType] = useState('All');
    const [overlay, setOverlay] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [error, setError] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // const usersPerPage = 10;
    // const pagesVisited = pageNumber * usersPerPage;
    // const pageCount = Math.ceil(tableDetails.length / usersPerPage);

    // const [dateState, setDateState] = useState(false);
    // const [time, setTime] = useState();
    // const [tableDetails, setTableDetails] = useState([]);
    // const { transactionElevate, errorMessageTransactionElevate } = useSelector(
    //     (state) => state.transactionElevateReducer
    // );
    // const { transactionHistory, errorMessageTransactionHistory } = useSelector(
    //     (state) => state.transactionHistoryReducer
    // );
    // const { getMiniStatementSuccess, getMiniStatementerrorMessage } =
    //     useSelector((state) => state.getMiniStatementReducer);

    // const { bankStatement, errorMessagebankStatement } = useSelector(
    //     (state) => state.bankStatementReducer
    // );

    // const { accountPrimarys, accountPrimaryError } = useSelector(
    //     (state) => state.accountPrimaryReducer
    // );

    // const formatter = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'NGN',
    //     currencyDisplay: 'narrowSymbol'
    // });
    // const getCurrentDate = () => {
    //     let newDate = new Date();
    //     let date = newDate.getDate();
    //     let month = newDate.getMonth() + 1;
    //     let year = newDate.getFullYear();
    //     setTime(
    //         `${year}-${month < 10 ? `0${month}` : `${month}`}-${
    //             date < 10 ? `0${date}` : `${date}`
    //         }`
    //     );
    // };
    // useEffect(() => {
    // if (transactionElevate !== null) {
    //     setTableDetails(transactionElevate.transactions);
    //     console.log(transactionElevate.transactions);
    //     tableDetails?.filter((item) => {
    //         const newDate = item.transactionDate.split('T');
    //         console.log(newDate[0], time);
    //         if (newDate[0] !== time) {
    //             setDateState(true);
    //         } else {
    //             setDateState(false);
    //         }
    //     });

    //     // tableDetails.data?.map((item) => {
    //     //     //console.log(item.transactionDate);
    //     // });
    // } else
    // if (transactionHistory !== null) {
    // setTableDetails(transactionHistory.transactions);
    // tableDetails?.filter((item) => {
    //     const newDate = item.transactionDate.split('T');
    //     if (newDate[0] !== time) {
    //         setDateState(true);
    //     } else {
    //         setDateState(false);
    //     }
    // });
    // }
    // console.log(transactionElevate);
    // }, [transactionHistory]);
    // useEffect(() => {
    //     if (accountPrimarys !== null) {
    //         const data = {
    //             accountId: accountPrimarys.accountId
    //         };
    //         dispatch(getMiniStatementGen(data));
    //     }
    // }, [accountPrimarys]);
    // useEffect(() => {
    //     if (getMiniStatementSuccess !== null) {
    //         // dispatch(getMiniStatementGen(accountPrimarys.accountId));
    //         setTableDetails(getMiniStatementSuccess.transactionList);
    //     }
    // }, [getMiniStatementSuccess]);
    // useEffect(() => {
    //     if (bankStatement !== null) {
    //         setLoading(false);
    //         console.log(bankStatement);
    //     } else if (errorMessagebankStatement !== null) {
    //         setLoading(false);
    //         setSuccess(true);
    //         setError('error');
    //     }
    // }, [bankStatement, errorMessagebankStatement]);
    return (
        <>
            {/* <div className={styles.collctionh1}>
                <h1>Report</h1>
            </div> */}

            <div className={styles.collectionsTable}>
                <div className={styles.filter}>
                    {/* <h2 className={styles.allTrans}>All Transactions</h2> */}
                    {/* {filterPara === 'Outflow' ? (
                        <div className={styles.filterFlex}>
                            <div
                                className={
                                    filterType === 'All' ? styles.active : ''
                                }
                                onClick={() => {
                                    setFilterType('All');
                                }}
                            >
                                <p>All</p>
                            </div>
                            <div
                                className={
                                    filterType === 'Pay' ? styles.active : ''
                                }
                                onClick={() => {
                                    setFilterType('Pay');
                                    setTransactionType('PAYMENT_LINK');
                                }}
                            >
                                <p>Pay Link</p>
                            </div>
                            <div
                                className={
                                    filterType === 'Cards' ? styles.active : ''
                                }
                                onClick={() => {
                                    setFilterType('Cards');
                                    setTransactionType('USSD');
                                }}
                            >
                                <p>Cards</p>
                            </div>
                            <div
                                className={
                                    filterType === 'QR' ? styles.active : ''
                                }
                                onClick={() => {
                                    setFilterType('QR');
                                    setTransactionType('QR_PAYMENT');
                                }}
                            >
                                <p>EcoBank QR</p>
                            </div>
                        </div>
                    ) : filterPara === 'Inflow' ? (
                        <div className={styles.filterFlex}>
                            <div
                                className={
                                    filterType === 'All' ? styles.active : ''
                                }
                                onClick={() => {
                                    setFilterType('All');
                                }}
                            >
                                <p>All</p>
                            </div>
                            <div
                                className={
                                    filterType === 'Pay' ? styles.active : ''
                                }
                                onClick={() => {
                                    setFilterType('Pay');
                                }}
                            >
                                <p>Pay Link</p>
                            </div>
                            <div
                                className={
                                    filterType === 'Cards' ? styles.active : ''
                                }
                                onClick={() => {
                                    setFilterType('Cards');
                                }}
                            >
                                <p>Cards</p>
                            </div>
                            <div
                                className={
                                    filterType === 'QR' ? styles.active : ''
                                }
                                onClick={() => {
                                    setFilterType('QR');
                                }}
                            >
                                <p>EcoBank QR</p>
                            </div>
                        </div>
                    ) : null} */}

                    {/* <div className={styles.generate}>
                        <div className={styles.down}>
                            <p>Download</p>
                        </div>
                        <div
                            className={styles.gene}
                            onClick={() => {
                                setOverlay(true);
                            }}
                        >
                            <p>Generate Full Statement</p>
                        </div>
                    </div> */}
                </div>
                {/* <div className={styles.searches}>
                    <div className={styles.searchInp}>
                        <AiOutlineSearch className={styles.sarchIcon} />
                        <input
                            type="text"
                            className={styles.srch}
                            placeholder="Search"
                        />
                    </div>

                    <select
                        name=""
                        id=""
                        onChange={(e) => {
                            setFilterPara(e.target.value);
                        }}
                    >
                        <option value="">Filter</option>
                        <option value="Inflow">Inflow</option>
                        <option value="Outflow">Outflow</option>
                    </select>
                    <div className={styles.filterDiv}>
                        <p>Filter</p>
                        <BsChevronDown />
                    </div>
                </div> */}
                <PaymentTable
                    title="Reports"
                    // test={count}
                    page="Reports"
                />
            </div>
        </>
    );
};

export default withAuth(Report);
