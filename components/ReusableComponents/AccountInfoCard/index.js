import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

import { AiFillCheckCircle } from 'react-icons/ai';
import { IoMdCopy } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import Visbility from '../Eyeysvg';

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 9000,
    autoplaySpeed: 2000,
    cssEase: 'linear'
};
const AccountsInfoCard = ({ userProfileData }) => {
    const dispatch = useDispatch();

    const [senderDetails, setSenderDetails] = useState({});
    const [acctNummber, setAcctNumber] = useState('');
    const [outType, setOutType] = useState();
    const [balance, setBalance] = useState('.....');
    const [formData, setFormdata] = useState({ accountNum: '' });
    const [isCopied, setIsCopied] = useState(false);
    const [accountNumberTest, setAccountNumberTest] = useState();
    const [accountBalanceTest, setAccountBalanceTest] = useState();
    const [setPrimaryAccount, setSetPrimaryAccount] = useState();

    const [acctNum, setAcctNumm] = useState('account number');
    const [acctInfoNum, setAcctInfoNum] = useState();
    const [copyAcctInfo, setCopyAcctInfo] = useState();

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
    const [newAccuntId, setNewAccountId] = useState();
    const { allAccountInfo } = useSelector((store) => store);
    console.log(allAccountInfo);
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
    return (
        <div className={styles.moneyCont}>
            <div className={styles.card}>
                <div className={styles.cardRight}>
                    <div className={styles.moneyBody}>
                        <div className={styles.moneybodyDiv}>
                            <div>
                                <div className={styles.cardMone}>
                                    <h1></h1>
                                    <Visbility color="green" typeSet={types} />
                                </div>
                                <p className={styles.avail}>{balance}</p>
                            </div>
                            <div>
                                <p className={styles.accountDetails}>
                                    Account Number
                                </p>
                                <div className={styles.assctDrop}>
                                    <div
                                        className={
                                            styles.setAccountNumberAsPrimary
                                        }
                                    >
                                        <p>{acctNummber}</p>
                                    </div>

                                    <div>
                                        {isCopied ? (
                                            <div className={styles.coppied}>
                                                Copied!
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className={styles.mdCopy}>
                                        <IoMdCopy
                                        // onClick={copyAccountNumber}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.bagMoney}>
                    <img src="/Assets/Images/perspective.png" />
                </div>
            </div>
            <div className={styles.otherAccounts}>
                {/* {bankAccounts.length === 1 ? (
                    <div className={styles.sliderImage}>
                        <img
                            src="/Assets/Images/2.png"
                            width={380}
                            height={150}
                        />
                    </div>
                ) : ( */}
                <>
                    <h2>Other Accounts</h2>
                    <div className={styles.otherAccounts}>
                        {allAccountInfo?.map((account) => {
                            return (
                                <div>
                                    <div className={styles.accntP}>
                                        <p
                                            onClick={(e) => {
                                                setCopyAcctInfo(
                                                    account?.accountNo
                                                );
                                            }}
                                        >
                                            {account?.accountNo}
                                        </p>
                                        <p>
                                            {account?.availableBal.toLocaleString()}
                                        </p>
                                    </div>
                                    <div
                                        className={
                                            account?.isPrimaryAccount === 'Y'
                                                ? styles.success
                                                : styles.nothing
                                        }
                                    >
                                        <AiFillCheckCircle />
                                    </div>
                                    <hr className={styles.accountHr} />
                                </div>
                            );
                        })}
                    </div>
                </>
            </div>
        </div>
    );
};

export default AccountsInfoCard;
