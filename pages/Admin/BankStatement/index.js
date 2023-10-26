import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import DashLayout from '../../../components/layout/Dashboard';
import StorePopup from '../../../components/ReusableComponents/StorePopup';
import CloseButton from '../../../components/ReusableComponents/CloseButtonSvg';
import ReactPaginate from 'react-paginate';

import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/ReusableComponents/Loader';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import MoreAction from '../../../components/ReusableComponents/MoreAction';
import PaymentSuccess from '../../../components/ReusableComponents/PaymentSuccess';
import socialdata from '../../../components/ReusableComponents/Lotties/loading.json';
import Lottie from 'react-lottie';
import { FaDownload } from 'react-icons/fa';
import withAuth from '../../../components/HOC/withAuth';
import { bankAccountsData } from '../../../redux/actions/bankAccountsDetailsAction';
import { loadAccountPrimary } from '../../../redux/actions/getPrimaryAccountAction';
import { getDisputCategOryTypeGen } from '../../../redux/actions/getDisputeCategoryTypeAction';
import { loadbankStatement } from '../../../redux/actions/bankStatementAction';
import { getBalanceEnquiry } from '../../../redux/actions/balanceEnquieryAction';
import { getFullStatementGen } from '../../../redux/actions/getFullStatementAction';

const BankStatments = () => {
    const dispatch = useDispatch();
    const printRef = useRef();
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN',
        currencyDisplay: 'narrowSymbol'
    });
    const usersPerPage = 15;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(tableDetails?.length / usersPerPage);

    const [date, setDate] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [overlay, setOverlay] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tableDetails, setTableDetails] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const [bankAccount, setBankAccount] = useState([]);
    const [account, setAccount] = useState('');
    const [id, setId] = useState('');
    const [searchType, setSearchType] = useState('Amount');
    const format = formatter.format(0);
    const [balance, setBalance] = useState(format);
    const [inflow, setInflow] = useState(format);
    const [outflow, setOutflow] = useState(format);
    const [disputes, setDisputes] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const filterCondition = (item, searchType) => {
        switch (searchType) {
            case 'amount':
                return item.amount
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());

            case 'account':
                return item.accountNo
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            case 'type':
                return item.channel
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            default:
                item.amount.toLowerCase().includes(searchValue.toLowerCase());
        }
    };

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
        <div className={styles.statementCover}>
            <div className={styles.chooseDate}>
                <select
                    className={styles.accountNumbers}
                    onChange={(e) => {
                        setAccount(e.target.value);
                    }}
                >
                    {Object.keys(bankAccounts)?.map((accountNo, index) => {
                        return (
                            <option key={index}>
                                {bankAccounts[accountNo].accountNumber}
                            </option>
                        );
                    })}
                </select>
                <div
                    onClick={() => {
                        setDate(true);
                        setOverlay(true);
                    }}
                >
                    <p>Request Full Statement</p>
                </div>
            </div>
            {success ? (
                <PaymentSuccess
                    overlay={overlay}
                    type="profile"
                    statusbar={error}
                    heading="Statement Generated Successfully"
                    body="Statement generated has been sent to your email"
                    action={() => {
                        setOverlay(false);
                        setEndDate('');
                        setStartDate('');
                        setSuccess(false);
                    }}
                    error={getFullStatementerrorMessage.response.data.message}
                />
            ) : null}
            {date ? (
                <StorePopup overlay={overlay}>
                    <div className={styles.generateCover}>
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
                                    <option value="">
                                        Select Bank Account
                                    </option>
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
                                            startRange: startDate,
                                            endRange: endDate,
                                            accountId: id
                                        };
                                        dispatch(getFullStatementGen(data));
                                    }}
                                >
                                    Generate
                                </button>
                            )}
                        </div>
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
                    <div>
                        <i className={styles.italisize}>
                            * The Table Contains 50 Transactions
                        </i>
                        <FaDownload
                            onClick={async () => {
                                const element = printRef.current;

                                const pdf = new jsPDF({
                                    unit: 'px',
                                    format: 'letter',
                                    userUnit: 'px'
                                });

                                const pdfWidth =
                                    pdf.internal.pageSize.getWidth();
                                pdf.html(element, {
                                    html2canvas: {
                                        scale: 0.57,
                                        width: pdfWidth
                                    }
                                }).then(() => {
                                    pdf.save('Account Statement.pdf');
                                });
                            }}
                        />
                    </div>
                    {/* <div className={styles.tableFilter}>
                            <div>
                                <img src="../Assets/Svgs/search.svg" alt="" />
                                <input
                                    type="text"
                                    placeholder={`Filter by ${searchType}`}
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
                                <option value="amount">Amount</option>
                                <option value="account">Account</option>
                                <option value="type">Type</option>
                            </select>
                            <button>
                        Filter
                        <span>
                            <img src="../Assets/Svgs/Vector 26.svg" alt="" />
                        </span>
                    </button>
                        </div> */}
                </div>
                <div className={styles.tableFilters}>
                    {/* <h2
                            
                        >
                            Download
                        </h2> */}
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
                        {tableDetails
                            // ?.filter((item) => {
                            //     if (search === '') {
                            //         return item;
                            //     } else if (
                            //         item.name
                            //             .toLowerCase()
                            //             .includes(search.toLowerCase())
                            //     ) {
                            //         return item;
                            //     } else if (
                            //         item.mail
                            //             .toLowerCase()
                            //             .includes(search.toLowerCase())
                            //     ) {
                            //         return item;
                            //     } else {
                            //         return null;
                            //     }
                            // })
                            ?.map((items, index) => {
                                return (
                                    <tr key={index}>
                                        <td
                                            data-label="Date"
                                            className={styles.date}
                                        >
                                            {/* {newDate[0]} */}
                                        </td>
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
                            })}
                    </tbody>
                </table>
                <div className={styles.tableMain} ref={printRef}>
                    <div className={styles.TableDetailHeader}>
                        <p className={styles.date}>Date</p>
                        <p className={styles.bank}>Account</p>
                        <p className={styles.beneficiary}>Beneficiary </p>
                        <p className={styles.amount}>Amount</p>
                        <p className={styles.type}>Type</p>
                        {/* <div className={styles.more}></div> */}
                    </div>
                    <div className={styles.tableDivs}>
                        {isLoading ? (
                            <Lottie
                                options={socialOptions}
                                height={200}
                                width={200}
                            />
                        ) : !tableDetails.length ? (
                            'No Recent transaction'
                        ) : (
                            tableDetails
                                ?.sort((x, y) => {
                                    let a = new Date(x.transactionDate),
                                        b = new Date(y.transactionDate);
                                    return b - a;
                                })
                                ?.filter((item) => {
                                    if (searchValue === '') {
                                        return item;
                                    } else if (
                                        filterCondition(item, searchType)
                                    ) {
                                        return item;
                                    }
                                })
                                ?.slice(
                                    pagesVisited,
                                    pagesVisited + usersPerPage
                                )
                                ?.map((items, index) => {
                                    const newDate =
                                        items?.transactionTime?.split(' ');
                                    return (
                                        <>
                                            {width > 950 ? (
                                                <div
                                                    className={
                                                        styles.TableDetailBody
                                                    }
                                                    key={index}
                                                >
                                                    <p className={styles.date}>
                                                        {newDate[0]}
                                                    </p>
                                                    <p className={styles.bank}>
                                                        {items.accountNo}
                                                    </p>
                                                    <div
                                                        className={styles.benes}
                                                    >
                                                        <p
                                                            className={
                                                                styles.beneNar
                                                            }
                                                        >
                                                            {items.narration}
                                                        </p>
                                                    </div>
                                                    <p
                                                        className={
                                                            styles.amount
                                                        }
                                                    >
                                                        {formatter.format(
                                                            items.amount
                                                        )}
                                                    </p>
                                                    <p
                                                        className={
                                                            styles.transfer
                                                        }
                                                    >
                                                        {items.channel}
                                                    </p>
                                                    {/* <div className={styles.more}>
                                                <MoreAction
                                                    type={items.channel}
                                                    transactionAmount={formatter.format(
                                                        items.amount
                                                    )}
                                                    disputes={disputes}
                                                />
                                            </div> */}
                                                </div>
                                            ) : (
                                                <>
                                                    <div
                                                        className={
                                                            styles.beneficiariesMobile
                                                        }
                                                    >
                                                        <div>
                                                            <p
                                                                className={
                                                                    styles.amount
                                                                }
                                                            >
                                                                {formatter.format(
                                                                    items.amount
                                                                )}
                                                            </p>
                                                            <p
                                                                className={
                                                                    styles.date
                                                                }
                                                            >
                                                                {newDate[0]}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <div
                                                                className={
                                                                    styles.benes
                                                                }
                                                            >
                                                                <p
                                                                    className={
                                                                        styles.beneNar
                                                                    }
                                                                >
                                                                    {
                                                                        items.narration
                                                                    }
                                                                </p>
                                                            </div>
                                                            <p
                                                                className={
                                                                    styles.transfer
                                                                }
                                                            >
                                                                {items.channel}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </>
                                            )}
                                        </>
                                    );
                                })
                        )}
                    </div>
                </div>
                {!tableDetails.length ? null : (
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
        </div>
    );
};

export default withAuth(BankStatments);
