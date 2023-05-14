import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import {
    bankAccountsData,
    getBalanceEnquiry,
    loadAccountPrimary,
    loadUserProfile
} from '../../../redux/actions/actions';
import Visbility from '../Eyeysvg';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdCopy } from 'react-icons/io';

const AccountsInfoCard = () => {
    const dispatch = useDispatch();

    const [senderDetails, setSenderDetails] = useState({});
    const [acctNummber, setAcctNumber] = useState('');
    const [outType, setOutType] = useState();
    const [balance, setBalance] = useState('₦ 0.00');
    const [userProfileData, setUserProfileData] = useState({});
    const [formData, setFormdata] = useState({ accountNum: '' });
    const [isCopied, setIsCopied] = useState(false);
    const { userProfile } = useSelector((state) => state.userProfileReducer);
    const { accountPrimarys, accountPrimaryError } = useSelector(
        (state) => state.accountPrimaryReducer
    );
    const { bankAccounts, bankAccountErrorMessages } = useSelector(
        (state) => state.bankAccountsReducer
    );
    const { balanceEnquiry, errorMessageBalanceEnquiry } = useSelector(
        (state) => state.balanceEnquiryReducer
    );
    const [acctNum, setAcctNumm] = useState('');
    useEffect(() => {
        dispatch(bankAccountsData());
        dispatch(loadAccountPrimary());
        dispatch(loadUserProfile());
    }, []);
    useEffect(() => {
        console.log(accountPrimarys);
        setAcctNumm(accountPrimarys?.accountNumber);
        const balanceData = {
            accountId: accountPrimarys?.accountId
        };
        dispatch(getBalanceEnquiry(balanceData));
        Object.keys(bankAccounts)?.map((accountNo) => {
            if (bankAccounts[accountNo].accountNumber === acctNum) {
                setAcctNumber(accountPrimarys);
                let balanceData;
                balanceData = {
                    accountId: bankAccounts[accountNo].accountId
                };
                dispatch(getBalanceEnquiry(balanceData));
            } else {
                setAcctNumber('Pending');
            }
        });
        if (userProfile !== null) {
            setUserProfileData(userProfile);
        }
    }, [userProfile, acctNum]);
    useEffect(() => {
        if (balanceEnquiry !== null) {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'NGN',
                currencyDisplay: 'narrowSymbol'
            });
            const formattedAmount = formatter.format(
                balanceEnquiry.availableBalance
            );
            setBalance(formattedAmount);
        }
    }, [balanceEnquiry]);
    useEffect(() => {
        console.log(accountPrimarys);
        console.log(bankAccounts);
        console.log(formData.accountNum);
        setSenderDetails(accountPrimarys);
        console.log(senderDetails);
        Object.keys(bankAccounts)?.map((accountNo) => {
            if (bankAccounts[accountNo].accountNumber == formData.accountNum) {
                // setAcctNumber(accountPrimarys);
                let balanceData;
                balanceData = {
                    accountId: bankAccounts[accountNo].accountId
                };
                setSenderDetails(accountPrimarys.accountId);
                // console.log(senderDetails.accountId);
                dispatch(getBalanceEnquiry(balanceData));
            } else {
                setAcctNumber('Pending');
            }
        });
    }, [formData.accountNum]);
    useEffect(() => {
        Object.keys(bankAccounts)?.map((accountNo) => {
            if (bankAccounts[accountNo].accountNumber === acctNum) {
                setAcctNumber(accountPrimarys);
                let balanceData;
                balanceData = {
                    accountId: bankAccounts[accountNo].accountId
                };
                dispatch(getBalanceEnquiry(balanceData));
            } else {
                setAcctNumber('Pending');
            }
        });
    }, [acctNum]);
    const types = (type) => {
        setOutType(type);
    };
    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }
    const copyAccountNumber = () => {
        copyTextToClipboard(acctNum)
            .then(() => {
                // If successful, update the isCopied state value
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className={styles.moneyCont}>
            <div className={styles.card}>
                <div className={styles.cardRight}>
                    <div className={styles.moneyBody}>
                        <div className={styles.moneybodyDiv}>
                            <div>
                                <div className={styles.cardMone}>
                                    <h1>{outType ? '*******' : balance}</h1>
                                    <Visbility color="green" typeSet={types} />
                                </div>
                                <p className={styles.avail}>
                                    Available Balance
                                </p>
                            </div>
                            <div>
                                <p className={styles.accountDetails}>
                                    Account Number
                                </p>
                                <div className={styles.assctDrop}>
                                    <p>{acctNum}</p>
                                    {/* <select
                                        className={styles.accountNumbers}
                                        value={acctNum}
                                        onChange={(e) => {
                                            (e.target.value);
                                        }}
                                    >
                                        <option>Select Account Number</option>
                                        {Object.keys(bankAccounts)?.map(
                                            (accountNo, index) => {
                                                return (
                                                    <>
                                                        <option
                                                            value={
                                                                bankAccounts[
                                                                    accountNo
                                                                ].accountNumber
                                                            }
                                                            key={index}
                                                        >
                                                            {
                                                                bankAccounts[
                                                                    accountNo
                                                                ].accountNumber
                                                            }
                                                        </option>
                                                    </>
                                                );
                                            }
                                        )}
                                    </select>{' '} */}
                                    {/* <svg
                                        width="10"
                                        height="7"
                                        viewBox="0 0 8 5"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1 1L4 4L7 1"
                                            stroke="white"
                                            strokeWidth="1.66667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg> */}
                                    <div>{isCopied ? 'Copied!' : null}</div>
                                    <IoMdCopy onClick={copyAccountNumber} />
                                </div>
                                {/* <p className={styles.accountNumber}>
                            {acctNumber.accountNumber}
                        </p> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.bagMoney}>
                    <img src="/Assets/Images/perspective.png" />
                </div>
            </div>
            <div className={styles.otherAccounts}>
                <h2>Other Accounts</h2>
                <div className={styles.accountsALl}>
                    {Object.keys(bankAccounts)?.map((accountNo, index) => {
                        return (
                            <>
                                <div key={index} className={styles.accntP}>
                                    <p
                                        onClick={(e) => {
                                            setAcctNumm(
                                                bankAccounts[accountNo]
                                                    .accountNumber
                                            );
                                        }}
                                    >
                                        {bankAccounts[accountNo].accountNumber}
                                    </p>
                                    <p>
                                        {bankAccounts[accountNo].customerType}{' '}
                                        Account
                                    </p>
                                </div>
                                <hr className={styles.accountHr} />
                            </>
                        );
                    })}
                    <div className={styles.otherAccountsDiv}>
                        <button>+Add New</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountsInfoCard;
