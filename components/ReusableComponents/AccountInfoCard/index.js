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
    const [balance, setBalance] = useState('.....');
    const [userProfileData, setUserProfileData] = useState({});
    const [formData, setFormdata] = useState({ accountNum: '' });
    const [isCopied, setIsCopied] = useState(false);
    const [accountNumberTest, setAccountNumberTest] = useState();
    const [accountBalanceTest, setAccountBalanceTest] = useState();
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
    const [acctNum, setAcctNumm] = useState(accountPrimarys?.accountNumber);
    const [acctInfoNum, setAcctInfoNum] = useState();
    useEffect(() => {
        dispatch(bankAccountsData());
        dispatch(loadAccountPrimary());
        dispatch(loadUserProfile());
    }, []);
    useEffect(() => {
        if (userProfile !== null) {
            setUserProfileData(userProfile);
        }
    }, [userProfile]);
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN',
        currencyDisplay: 'narrowSymbol'
    });
    useEffect(() => {
        if (balanceEnquiry !== null) {
            const formattedAmount = formatter.format(
                balanceEnquiry.availableBalance
            );
            setBalance(formattedAmount);
        }
    }, [balanceEnquiry]);
    useEffect(() => {
        setAcctInfoNum(accountPrimarys?.accountNumber);
        let balanceData;
        balanceData = {
            accountId: accountPrimarys?.accountId
        };
        dispatch(getBalanceEnquiry(balanceData));
        if (balanceEnquiry) {
            setAccountBalanceTest(
                formatter.format(balanceEnquiry?.availableBalance)
            );
        }
    }, [accountPrimarys]);
    useEffect(() => {
        setAcctNumm(accountPrimarys?.accountNumber);
    }, [accountPrimarys]);

    useEffect(() => {
        Object.keys(bankAccounts)?.map((accountNo) => {
            // if (bankAccounts[accountNo].isPrimaryAccount === true) {
            //     setAccountBalanceTest(bankAccounts[accountNo].accountBalance);
            // }

            if (bankAccounts[accountNo].accountNumber == formData.accountNum) {
                // setAcctNumber(accountPrimarys);
                let balanceData;
                balanceData = {
                    accountId: bankAccounts[accountNo].accountId
                };
                // setAccountBalanceTest(bankAccounts[accountNo].accountBalance);
                // setSenderDetails(bankAccounts[accountNo].accountBalance);
                dispatch(getBalanceEnquiry(balanceData));
            } else {
                setAcctNumber('Pending');
            }
        });
    }, [acctInfoNum]);
    useEffect(() => {
        // setSenderDetails(accountPrimarys);
        console.log(senderDetails);
        Object.keys(bankAccounts)?.map((accountNo) => {
            if (bankAccounts[accountNo].accountNumber == formData.accountNum) {
                // setAcctNumber(accountPrimarys);
                let balanceData;
                balanceData = {
                    accountId: bankAccounts[accountNo].accountId
                };
                // setSenderDetails(accountPrimarys.accountId);
                if (bankAccounts[accountNo]) setAcctInfo(accountNo);
                // console.log(senderDetails.accountId);
                dispatch(getBalanceEnquiry(balanceData));
            } else {
                setAcctNumber('Pending');
            }
        });
    }, [formData.accountNum]);
    useEffect(() => {
        // console.log(accountPrimarys);
        // setAcctNumm(accountPrimarys?.accountNumber);
        // const balanceData = {
        //     accountId: accountPrimarys?.accountId
        // };
        // dispatch(getBalanceEnquiry(balanceData));
        Object.keys(bankAccounts)?.map((accountNo) => {
            if (bankAccounts[accountNo].accountNumber === acctNum) {
                // setAcctNumber(accountPrimarys);
                let balanceData;
                balanceData = {
                    accountId: bankAccounts[accountNo].accountId
                };
                dispatch(getBalanceEnquiry(balanceData));
            } else {
                setAcctNumber('Pending');
            }
        });
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
                                    <h1>
                                        {outType
                                            ? '*******'
                                            : accountBalanceTest
                                            ? accountBalanceTest
                                            : balance}
                                    </h1>
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
                                    <p>
                                        {acctInfoNum != null
                                            ? acctInfoNum
                                            : acctNum}
                                    </p>
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
                                    <div>
                                        {isCopied ? (
                                            <div className={styles.coppied}>
                                                Copied!
                                            </div>
                                        ) : null}
                                    </div>

                                    <IoMdCopy
                                        className={styles.mdCopy}
                                        onClick={copyAccountNumber}
                                    />
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
                    {bankAccounts?.map((accountNo, index) => {
                        if (acctInfoNum === accountNo.accountNumber)
                            return null;
                        else if (acctNum === accountNo.accountNumber) {
                            return null;
                        } else {
                            return (
                                <>
                                    <div key={index} className={styles.accntP}>
                                        <p
                                            onClick={(e) => {
                                                setAccountBalanceTest(null),
                                                    setAcctInfoNum(null),
                                                    setAcctNumm(
                                                        accountNo.accountNumber
                                                    );
                                            }}
                                        >
                                            {accountNo.accountNumber}
                                        </p>
                                        <p>{accountNo.customerType} Account</p>
                                    </div>
                                    <hr className={styles.accountHr} />
                                </>
                            );
                        }
                    })}
                    {/* <div className={styles.otherAccountsDiv}>
                        <button>+Add New</button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default AccountsInfoCard;
