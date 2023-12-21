import { jsPDF } from 'jspdf';
import React, { useEffect, useRef, useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseButton from '../../../components/ReusableComponents/CloseButtonSvg';
import Loader from '../../../components/ReusableComponents/Loader';
import StorePopup from '../../../components/ReusableComponents/StorePopup';
import {
    useAccountFullStatementMutation,
    useAccountMiniStatementMutation
} from '../../../redux/api/authApi';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');

const BankStatments = () => {
    const affiliate = localStorage.getItem('affiliateCode');
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
    const { allAccountInfo } = useSelector((store) => store);
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
    const [acctNum, setAcctNum] = useState(allAccountInfo[0]?.accountNo);

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
    const [selectAcc, setSelectAcct] = useState();

    const [
        accountMiniStatement,
        {
            data: accountMiniStatementData,
            isLoading: accountMiniStatementLoad,
            isSuccess: accountMiniStatementSuccess,
            isError: accountMiniStatementFalse,
            error: accountMiniStatementErr,
            reset: accountMiniStatementReset
        }
    ] = useAccountMiniStatementMutation();
    const [
        accountFullStatement,
        {
            data: accountFullStatementData,
            isLoading: accountFullStatementLoad,
            isSuccess: accountFullStatementSuccess,
            isError: accountFullStatementFalse,
            error: accountFullStatementErr,
            reset: accountFullStatementReset
        }
    ] = useAccountFullStatementMutation();
    const showErrorSucToastMessage = () => {
        toast.success('Your Request Has Been Submitted For Processing', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
        // closeAction();
    };
    useEffect(() => {
        if (accountFullStatementSuccess) {
            setOverlay(false);
            showErrorSucToastMessage();
        }
    }, [accountFullStatementSuccess]);
    const showErrorPassToastMessage = () => {
        toast.error(accountFullStatementErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
        // closeAction();
    };
    useEffect(() => {
        if (accountFullStatementErr) {
            showErrorPassToastMessage();
        }
    }, [accountFullStatementErr]);
    useEffect(() => {
        accountMiniStatement({ accountNumber: acctNum });
    }, []);
    useEffect(() => {
        accountMiniStatement({ accountNumber: acctNum });
    }, [acctNum]);
    const [acctNummber, setAcctNumber] = useState('');
    useEffect(() => {
        setAcctNumber(
            allAccountInfo
                .filter((account) => account?.isPrimaryAccount === 'Y') // Filter by primary flag
                .map((account) => account.accountNo)
                .filter(Boolean)
        );
        setBalance(
            allAccountInfo
                .filter((account) => account?.isPrimaryAccount === 'Y') // Filter by primary flag
                .map((account) => account?.availableBal)
                .filter(Boolean)
        );
    }, []);
    useEffect(() => {
        if (accountMiniStatementData) {
            const outflowValue = accountMiniStatementData.data
                .filter((item) => item.crDr === 'D')
                .reduce((total, item) => total + item.amount, 0);

            const inflowValue = accountMiniStatementData.data
                .filter((item) => item.crDr === 'C')
                .reduce((total, item) => total + item.amount, 0);

            setOutflow(outflowValue);
            setInflow(inflowValue);
        }
    }, [accountMiniStatementData]);
    const showErrorToastMessage = () => {
        toast.error(accountMiniStatementErr?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message'
        });
    };
    useEffect(() => {
        if (accountMiniStatementErr) {
            showErrorToastMessage();
        }
    }, [accountMiniStatementErr]);

    return (
        <div className={styles.statementCover}>
            <ToastContainer />
            <div className={styles.chooseDate}>
                <select
                    name="ecoSourceAccount"
                    onChange={(e) => {
                        const selectedAccount = allAccountInfo.find(
                            (account) => account?.accountNo === e.target.value
                        );
                        if (selectedAccount) {
                            setAcctNum(selectedAccount?.accountNo);
                        }
                    }}
                >
                    {allAccountInfo.length > 0
                        ? allAccountInfo
                              .filter((account) => account.accountNo)
                              .map((account) => {
                                  return (
                                      <>
                                          <option
                                              className={styles.accntP}
                                              value={account?.accountNo}
                                          >
                                              <p>{account?.accountNo}</p>
                                          </option>
                                      </>
                                  );
                              })
                        : null}
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
                            <select
                                name="ecoSourceAccount"
                                onChange={(e) => {
                                    const selectedAccount = allAccountInfo.find(
                                        (account) =>
                                            account?.accountNo ===
                                            e.target.value
                                    );
                                    if (selectedAccount) {
                                        console.log(selectedAccount);
                                        setSelectAcct(
                                            selectedAccount?.accountNo
                                        );
                                    }
                                }}
                            >
                                <option value="">Select Account To Use</option>
                                {allAccountInfo
                                    .filter((account) => account.accountNo)
                                    .map((account) => {
                                        return (
                                            <>
                                                <option
                                                    className={styles.accntP}
                                                    value={account?.accountNo}
                                                >
                                                    <p>{account?.accountNo}</p>
                                                </option>
                                            </>
                                        );
                                    })}
                            </select>
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
                            <br />
                            <br />
                            <br />
                            {accountFullStatementLoad ? (
                                <Loader />
                            ) : (
                                <button
                                    onClick={() => {
                                        setLoading(true);
                                        const data = {
                                            startRange: startDate,
                                            endRange: endDate,
                                            accountId: selectAcc
                                        };
                                        accountFullStatement(data);
                                    }}
                                >
                                    Generate
                                </button>
                            )}
                        </div>
                    </div>
                </StorePopup>
            ) : accountFullStatementSuccess ? (
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
                    error={accountFullStatementErr?.data?.message}
                />
            ) : null}
            <div className={styles.balanceStatement}>
                <div>
                    <p>Balance</p>
                    <h2>
                        {getSymbolFromCurrency(
                            countryToCurrency[`${affiliate?.substring(1)}`]
                        )}
                        {parseFloat(balance)
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </h2>
                </div>
                <div>
                    <p>Total Inflow</p>
                    {accountMiniStatementLoad ? (
                        <p>Loading...</p>
                    ) : accountMiniStatementSuccess ? (
                        <h2>
                            {' '}
                            {getSymbolFromCurrency(
                                countryToCurrency[`${affiliate?.substring(1)}`]
                            )}
                            {parseFloat(inflow)
                                .toFixed(2)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </h2>
                    ) : (
                        <h2>
                            {' '}
                            {getSymbolFromCurrency(
                                countryToCurrency[`${affiliate?.substring(1)}`]
                            )}
                            {parseFloat(0)
                                .toFixed(2)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </h2>
                    )}
                </div>

                <div>
                    <p>Total Outflow</p>
                    {accountMiniStatementLoad ? (
                        <p>Loading...</p>
                    ) : accountMiniStatementSuccess ? (
                        <h2>
                            {' '}
                            {getSymbolFromCurrency(
                                countryToCurrency[`${affiliate?.substring(1)}`]
                            )}
                            {parseFloat(outflow)
                                .toFixed(2)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </h2>
                    ) : (
                        <h2>
                            {' '}
                            {getSymbolFromCurrency(
                                countryToCurrency[`${affiliate?.substring(1)}`]
                            )}
                            {parseFloat(0)
                                .toFixed(2)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </h2>
                    )}
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
                        <p className={styles.date}>Transaction Ref</p>
                        <p className={styles.bank}>Type</p>
                        <p className={styles.beneficiary}>Narration </p>
                        <p className={styles.amount}>Amount</p>
                        {/* <p className={styles.type}>Naration</p> */}
                        {/* <div className={styles.more}></div> */}
                    </div>
                    <div className={styles.tableDivs}>
                        {accountMiniStatementLoad ? (
                            <Loader />
                        ) : accountMiniStatementErr ? (
                            <p className={styles.errorP}>
                                {accountMiniStatementErr?.data?.message}
                            </p>
                        ) : (
                            // ?.sort((x, y) => {
                            //     let a = new Date(x.transactionDate),
                            //         b = new Date(y.transactionDate);
                            //     return b - a;
                            // })
                            // ?.filter((item) => {
                            //     if (searchValue === '') {
                            //         return item;
                            //     } else if (
                            //         filterCondition(item, searchType)
                            //     ) {
                            //         return item;
                            //     }
                            // })
                            // ?.slice(
                            //     pagesVisited,
                            //     pagesVisited + usersPerPage
                            // )
                            accountMiniStatementData?.data?.map(
                                (items, index) => {
                                    console.log(items);
                                    // const newDate =
                                    //     items?.transactionTime?.split(' ');
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
                                                        {items?.tranRefNo}
                                                    </p>
                                                    <p
                                                        className={
                                                            items?.crDr == 'D'
                                                                ? styles.error
                                                                : styles.bank
                                                        }
                                                    >
                                                        {items?.crDr == 'D'
                                                            ? 'Debit'
                                                            : 'Credit'}
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
                                                        {getSymbolFromCurrency(
                                                            countryToCurrency[
                                                                `${affiliate?.substring(
                                                                    1
                                                                )}`
                                                            ]
                                                        )}
                                                        {parseFloat(
                                                            items.amount
                                                        )
                                                            .toFixed(2)
                                                            .replace(
                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                ','
                                                            )}
                                                    </p>
                                                    {/* <p
                                                        className={
                                                            styles.transfer
                                                        }
                                                    >
                                                        {items.narration}
                                                    </p> */}
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
                                                                {items?.amount}
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
                                }
                            )
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

export default BankStatments;
