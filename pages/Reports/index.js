import React, { useEffect, useState } from 'react';
import { Layout } from '../../components';
import DashLayout from '../../components/layout/Dashboard';
import styles from './styles.module.css';
import { BsChevronDown } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import ReportsData from '../../components/ReusableComponents/ReportsData';
import { BiFilter } from 'react-icons/bi';
import {
    // getTransactionElevate,
    // getTransactionHistory,
    getMiniStatementGen,
    loadAccountPrimary
} from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

const Report = () => {
    const dispatch = useDispatch();
    const [filterPara, setFilterPara] = useState('');
    const [filterType, setFilterType] = useState('All');
    // const [dateState, setDateState] = useState(false);
    // const [time, setTime] = useState();
    const [tableDetails, setTableDetails] = useState([]);
    // const { transactionElevate, errorMessageTransactionElevate } = useSelector(
    //     (state) => state.transactionElevateReducer
    // );
    // const { transactionHistory, errorMessageTransactionHistory } = useSelector(
    //     (state) => state.transactionHistoryReducer
    // );
    const { getMiniStatementSuccess, getMiniStatementerrorMessage } =
        useSelector((state) => state.getMiniStatementReducer);

    const { accountPrimarys, accountPrimaryError } = useSelector(
        (state) => state.accountPrimaryReducer
    );
    // const [pageSrchIndex, setPageSrchIndex] = useState(0);
    // const [numOfRecords, setNumOfRecords] = useState(10);
    const [transactionType, setTransactionType] = useState('');
    useEffect(() => {
        dispatch(loadAccountPrimary());
        // if (filterType === 'All') {
        //     dispatch(getTransactionHistory(pageSrchIndex, numOfRecords));
        // } else {
        //     dispatch(
        //         getTransactionElevate(
        //             pageSrchIndex,
        //             numOfRecords,
        //             transactionType
        //         )
        //     );
        // }
        // getCurrentDate();
    }, []);
    useEffect(() => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
            currencyDisplay: 'narrowSymbol'
        });
    }, []);
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
    //     if (transactionElevate !== null) {
    //         setTableDetails(transactionElevate.transactions);
    //         console.log(transactionElevate.transactions);
    //         tableDetails?.filter((item) => {
    //             const newDate = item.transactionDate.split('T');
    //             console.log(newDate[0], time);
    //             if (newDate[0] !== time) {
    //                 setDateState(true);
    //             } else {
    //                 setDateState(false);
    //             }
    //         });

    //         // tableDetails.data?.map((item) => {
    //         //     //console.log(item.transactionDate);
    //         // });
    //     } else if (transactionHistory !== null) {
    //         setTableDetails(transactionHistory.transactions);
    //         console.log(transactionHistory.transactions);
    //         tableDetails?.filter((item) => {
    //             const newDate = item.transactionDate.split('T');
    //             if (newDate[0] !== time) {
    //                 setDateState(true);
    //             } else {
    //                 setDateState(false);
    //             }
    //         });
    //     }
    //     // console.log(transactionElevate);
    // }, [transactionElevate, transactionHistory]);
    useEffect(() => {
        if (accountPrimarys !== null) {
            const data = {
                accountId: accountPrimarys.accountId
            };
            dispatch(getMiniStatementGen(data));
        }
    }, [accountPrimarys]);
    useEffect(() => {
        if (getMiniStatementSuccess !== null) {
            // dispatch(getMiniStatementGen(accountPrimarys.accountId));
            setTableDetails(getMiniStatementSuccess.transactionList);
        }
    }, [getMiniStatementSuccess]);
    return (
        <DashLayout>
            <div className={styles.collctionh1}>
                <h1>Collection Report</h1>
            </div>
            <div>
                <p>Inflow per Channel</p>
                <div className={styles.collectionChart}>
                    <div className={styles.collectionCHartDiv}>
                        <div className={styles.collectionChartTop}>
                            <h1 className={styles.chartH1}>23%</h1>
                            <p>increase in successful collections today. </p>
                        </div>
                        <div>
                            <div className={styles.charts}>
                                <div className={styles.greenIdiv}>
                                    <div className={styles.green}></div>
                                    <h1>
                                        <span>QR</span> <br />
                                        N23,566 (10%)
                                    </h1>
                                </div>
                                <div className={styles.greenIIdiv}>
                                    <div className={styles.greenI}></div>
                                    <h1>
                                        <span>Paylink</span>
                                        <br /> N23,355 (35%)
                                    </h1>
                                </div>
                                <div className={styles.greenIIIdiv}>
                                    <div className={styles.greenII}></div>
                                    <h1>
                                        <span>USSD</span>
                                        <br /> N23,456 (25%)
                                    </h1>
                                </div>
                                <div className={styles.greenIVdiv}>
                                    <div className={styles.greenIII}></div>
                                    <h1>
                                        <span>Cards</span>
                                        <br /> N34,876 (30%)
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.collectionsTable}>
                <h2 className={styles.allTrans}>All Transactions</h2>
                <div className={styles.filter}>
                    {filterPara === 'Outflow' ? (
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
                            {/* <div
                                className={
                                    filterType === 'All' ? styles.active : ''
                                }
                                
                            >
                                <p>Cards</p>
                            </div> */}
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
                            {/* <div
                                className={
                                    filterType === 'All' ? styles.active : ''
                                }
                            >
                                <p>Cards</p>
                            </div> */}
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
                    ) : null}

                    <div className={styles.generate}>
                        <div className={styles.down}>
                            <p>Download</p>
                        </div>
                        <div className={styles.gene}>
                            <p>Generate Full Statement</p>
                        </div>
                    </div>
                </div>
                <div className={styles.searches}>
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
                    {/* <div className={styles.filterDiv}>
                        <p>Filter</p>
                        <BsChevronDown />
                    </div> */}
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.theadTop}>
                                <div>
                                    <p>Beneficairy</p>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <p>Type</p>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <p> Amount</p>
                                </div>
                            </th>
                            {/* <th>
                                <div>
                                    <p>Email</p>
                                </div>
                            </th> */}
                            {/* <th>
                                <div>
                                    <p>Bank</p>
                                </div>
                            </th> */}
                            <th>
                                <div>
                                    <p>Date</p>
                                </div>
                            </th>
                            {/* <th>
                                <div>
                                    <p>Check out Type</p>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <p>Status</p>
                                </div>
                            </th>
                            <th className={styles.theadBtm}>
                                <div>
                                    <p></p>
                                </div>
                            </th> */}
                        </tr>
                    </thead>
                    {tableDetails.length === 0 ? (
                        <div className={styles.transactionBody}>
                            <div>
                                <p>No Transactions Have Benn Generated yet</p>
                            </div>
                        </div>
                    ) : (
                        tableDetails
                            // ?.filter((item) => {
                            //     console.log(item);
                            //     const newDate = item.transactionDate.split('T');
                            //     return item;
                            // })
                            ?.map((item, index) => {
                                const formatter = new Intl.NumberFormat(
                                    'en-US',
                                    {
                                        style: 'currency',
                                        currency: 'NGN',
                                        currencyDisplay: 'narrowSymbol'
                                    }
                                );
                                const formattedAmount = formatter.format(
                                    item.amount
                                );
                                return (
                                    <ReportsData
                                        key={index}
                                        bank={
                                            item.isEcobankToEcobankTransaction
                                        }
                                        date={new Date(item.tranDate)
                                            .toISOString()
                                            .split('T')}
                                        type={item.crDr}
                                        ammount={formattedAmount}
                                        bene={item.narration}
                                    />
                                );
                            })
                    )}
                </table>
            </div>
        </DashLayout>
    );
};

export default Report;
