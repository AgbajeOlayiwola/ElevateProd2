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

const AccountsInfoCard = () => {
    const dispatch = useDispatch();
    const [acctNum, setAcctNumm] = useState('');
    const [senderDetails, setSenderDetails] = useState({});
    const [acctNummber, setAcctNumber] = useState('');
    const [outType, setOutType] = useState();
    const [balance, setBalance] = useState('₦ 0.00');
    const [userProfileData, setUserProfileData] = useState({});
    const [formData, setFormdata] = useState({ accountNum: '' });
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
    useEffect(() => {
        dispatch(bankAccountsData());
        dispatch(loadAccountPrimary());
        dispatch(loadUserProfile());
    }, []);
    useEffect(() => {
        console.log(accountPrimarys);
        if (userProfile !== null) {
            setUserProfileData(userProfile);
        }
    }, [userProfile]);
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
    return (
        <div className={styles.accountStuff}>
            <div className={styles.accoutDetails}>
                <div className={styles.visibility}>
                    <p className={styles.thousand}>
                        {outType ? '*******' : balance}
                    </p>
                    <Visbility color="green" typeSet={types} />
                </div>
                <p className={styles.avail}>Available Balance</p>

                <div className={styles.assctDrop}>
                    <select
                        className={styles.accountNumbers}
                        value={acctNum}
                        onChange={(e) => {
                            setAcctNumm(e.target.value);
                        }}
                    >
                        <option>Select Account Number</option>
                        {Object.keys(bankAccounts)?.map((accountNo, index) => {
                            return (
                                <>
                                    <option
                                        value={
                                            bankAccounts[accountNo]
                                                .accountNumber
                                        }
                                        key={index}
                                    >
                                        {bankAccounts[accountNo].accountNumber}
                                    </option>
                                </>
                            );
                        })}
                    </select>{' '}
                    <svg
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
                    </svg>
                </div>
            </div>
            <div className={styles.adsDiv}>
                <img
                    src="Assets/Images/perspective.png"
                    height={100}
                    width={100}
                />
                <div>
                    <h1>Introducing Scheduled Payments</h1>
                    <p>
                        You can now schedule your transfer for a later time or
                        date by selecting ‘Schedule for later’ when you make
                        payments.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AccountsInfoCard;
