import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import DashLayout from '../../components/layout/Dashboard';
import StorePopup from '../../components/ReusableComponents/StorePopup';
import CloseButton from '../../components/ReusableComponents/CloseButtonSvg';
import ReactPaginate from 'react-paginate';
import {
    bankAccountsData,
    getBalanceEnquiry,
    loadAccountPrimary,
    loadbankStatement
} from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/ReusableComponents/Loader';

const BankStatments = () => {
    const dispatch = useDispatch();

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN',
        currencyDisplay: 'narrowSymbol'
    });

    const [date, setDate] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tableDetails, setTableDetails] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const [bankAccount, setBankAccount] = useState([]);
    const [account, setAccount] = useState('');
    const [searchType, setSearchType] = useState('transactionType');
    const format = formatter.format(0);
    const [balance, setBalance] = useState(format);
    const [inflow, setInflow] = useState(format);
    const [outflow, setOutflow] = useState(format);

    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(tableDetails.length / usersPerPage);

    const { bankStatement, errorMessagebankStatement } = useSelector(
        (state) => state.bankStatementReducer
    );

    const { bankAccounts, bankAccountErrorMessages } = useSelector(
        (state) => state.bankAccountsReducer
    );

    const { balanceEnquiry, errorMessageBalanceEnquiry } = useSelector(
        (state) => state.balanceEnquiryReducer
    );

    const { accountPrimarys, accountPrimaryError } = useSelector(
        (state) => state.accountPrimaryReducer
    );

    useEffect(() => {
        dispatch(bankAccountsData());
        dispatch(loadAccountPrimary());
        const todaysDate = new Date().toISOString();
        const getDateXDaysAgo = (numOfDays, date = new Date()) => {
            const daysAgo = new Date();
            return new Date(
                daysAgo.setDate(date.getDate() - numOfDays)
            ).toISOString();
        };
        const data = {
            startDate: getDateXDaysAgo(365),
            endDate: todaysDate
        };
        dispatch(loadbankStatement(data));
    }, []);

    useEffect(() => {
        if (accountPrimarys !== null) {
            const data = {
                accountId: accountPrimarys.accountId
            };
            dispatch(getBalanceEnquiry(data));
        }
    }, [accountPrimarys]);

    useEffect(() => {
        if (bankAccount !== null) {
            setBankAccount(bankAccounts);
        }
    }, [bankAccounts]);

    useEffect(() => {
        let balanceData;
        bankAccount?.filter((item) => {
            if (item.accountNumber === account) {
                return (balanceData = {
                    accountId: item.accountId
                });
            }
        });

        dispatch(getBalanceEnquiry(balanceData));
    }, [account]);

    useEffect(() => {
        if (balanceEnquiry !== null) {
            const formattedAmount = formatter.format(
                balanceEnquiry.availableBalance
            );
            setBalance(formattedAmount);
        }
    }, [balanceEnquiry]);
    useEffect(() => {
        if (bankStatement !== null) {
            setLoading(false);
            setTableDetails(bankStatement);
            setOverlay(false);
            bankStatement
                .filter((item) => {
                    if (item.tranType === 'Inflow') {
                        return item;
                    }
                })
                .reduce((a, b) => {
                    setInflow(formatter.format(a));
                    return a + +b.amount;
                }, 0);
            bankStatement
                .filter((item) => {
                    if (item.tranType === 'Outflow') {
                        return item;
                    }
                })
                .reduce((a, b) => {
                    setOutflow(formatter.format(a));
                    return a + +b.amount;
                }, 0);
        } else if (errorMessagebankStatement !== null) {
            setLoading(false);
        }
    }, [bankStatement, errorMessagebankStatement]);
    useEffect(() => {}, [inflow, outflow, tableDetails]);
    // console.log(inflow);

    // const filterCondition = (item, searchType) => {
    //     switch (searchType) {
    //         case 'transactionType':
    //             return item.transactionType
    //                 .toLowerCase()
    //                 .includes(searchValue.toLowerCase());
    //         case 'transactionStatus':
    //             return item.transactionStatus
    //                 .toLowerCase()
    //                 .includes(searchValue.toLowerCase());
    //         case 'transactionAmount':
    //             return item.transactionAmount
    //                 .toLowerCase()
    //                 .includes(searchValue.toLowerCase());
    //         case 'transactionDate':
    //             return item.transactionDate
    //                 .toLowerCase()
    //                 .includes(searchValue.toLowerCase());
    //         default:
    //             item.transactionType
    //                 .toLowerCase()
    //                 .includes(searchValue.toLowerCase());
    //     }
    // };
    return (
        <DashLayout page="Bank Statement">
            <div className={styles.chooseDate}>
                <div
                    onClick={() => {
                        setDate(true);
                        setOverlay(true);
                    }}
                >
                    <p>Request Statement</p>
                </div>
            </div>
            {date ? (
                <StorePopup overlay={overlay}>
                    <div className={styles.generateHead}>
                        <CloseButton
                            color="red"
                            action={() => {
                                setOverlay(false);
                            }}
                        />
                    </div>
                    <div className={styles.generateForm}>
                        <div className={styles.formGroup}>
                            <label>Choose Account</label>
                            <select
                                name=""
                                id=""
                                onChange={(e) => {
                                    setAccount(e.target.value);
                                }}
                            >
                                <option value="">Select Bank Account</option>
                                {bankAccount?.map((item, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={item.accountNumber}
                                        >
                                            {item.accountNumber}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Start Date</label>
                            <input
                                type="date"
                                onChange={(e) => {
                                    setStartDate(e.target.value);
                                }}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Stop Date </label>
                            <input
                                type="date"
                                onChange={(e) => {
                                    setEndDate(e.target.value);
                                }}
                            />
                        </div>
                        {loading ? (
                            <Loader />
                        ) : (
                            <button
                                onClick={() => {
                                    setLoading(true);
                                    const data = {
                                        startDate: new Date(
                                            startDate
                                        ).toISOString(),
                                        endDate: new Date(endDate).toISOString()
                                    };
                                    dispatch(loadbankStatement(data));
                                }}
                            >
                                Generate
                            </button>
                        )}
                    </div>
                </StorePopup>
            ) : null}
            <div className={styles.balanceStatement}>
                <div>
                    <p>Balance</p>
                    <h2>{balance}</h2>
                </div>
                <div>
                    <p>Total Inflow</p>
                    <h2>{inflow}</h2>
                </div>
                <div>
                    <p>Total Outflow</p>
                    <h2>{outflow}</h2>
                </div>
            </div>
            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    <h2>Transactions History</h2>
                    <div className={styles.tableFilter}>
                        <div>
                            {/* <img src="../Assets/Svgs/search.svg" alt="" /> */}
                            {/* <input
                                type="text"
                                placeholder={`Filter by ${displayType}`}
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                            /> */}
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
                <table className={styles.tables}>
                    <thead className={styles.TableDetailHeader}>
                        <tr>
                            <td className={styles.beneficiary}>Beneficiary </td>
                            <td className={styles.type}>Type</td>
                            <td className={styles.amount}>Amount</td>
                            <td className={styles.bank}>Bank/Network</td>
                            <td className={styles.date}>Date</td>
                            <td className={styles.status}>Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {tableDetails
                            ?.filter((item) => {
                                if (search === '') {
                                    return item;
                                } else if (
                                    item.name
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                                ) {
                                    return item;
                                } else if (
                                    item.mail
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                                ) {
                                    return item;
                                } else {
                                    return null;
                                }
                            })
                            ?.map((items, index) => {
                                return (
                                    <tr key={index}>
                                        <td data-label="Name">{items.name}</td>
                                        <td data-label="Amount">
                                            {items.amount}
                                        </td>
                                        <td data-label="Date">{items.date}</td>
                                        <td data-label="Type">{items.type}</td>
                                        <td
                                            data-label="Status"
                                            className={
                                                items.status === 'Successful'
                                                    ? 'wallet-success'
                                                    : 'wallet-failure'
                                            }
                                        >
                                            <span>{items.status}</span>
                                        </td>
                                        <td data-label="Reference No.">
                                            {items.ref}
                                        </td>
                                    </tr>
                                );
                            })} */}
                    </tbody>
                </table>
                <div className={styles.TableDetailHeader}>
                    <p className={styles.date}>Date</p>
                    <p className={styles.bank}>Account</p>
                    <p className={styles.beneficiary}>Beneficiary </p>
                    <p className={styles.amount}>Amount</p>
                    <p className={styles.type}>Type</p>
                </div>
                {!tableDetails.length
                    ? 'No Recent transaction'
                    : tableDetails
                          ?.sort((x, y) => {
                              let a = new Date(x.transactionDate),
                                  b = new Date(y.transactionDate);
                              return b - a;
                          })
                          //   ?.filter((item) => {
                          //       if (searchValue === '') {
                          //           return item;
                          //       } else if (filterCondition(item, searchType)) {
                          //           return item;
                          //       }
                          //   })
                          ?.slice(pagesVisited, pagesVisited + usersPerPage)
                          ?.map((items, index) => {
                              const newDate =
                                  items?.transactionTime?.split(' ');
                              return (
                                  <div
                                      className={styles.TableDetailBody}
                                      key={index}
                                  >
                                      <p className={styles.date}>
                                          {newDate[0]}
                                      </p>
                                      <p className={styles.bank}>
                                          {items.accountNo}
                                      </p>
                                      <p className={styles.bene}>
                                          {items.narration}
                                      </p>
                                      <p className={styles.amount}>
                                          {formatter.format(items.amount)}
                                      </p>
                                      <p className={styles.transfer}>
                                          {items.channel}
                                      </p>
                                  </div>
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
        </DashLayout>
    );
};

export default BankStatments;
