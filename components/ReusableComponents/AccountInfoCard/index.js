import React, { useState } from 'react';
import styles from './styles.module.css';

import { AiFillCheckCircle } from 'react-icons/ai';
import { IoMdCopy } from 'react-icons/io';
import { useDispatch } from 'react-redux';
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

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN',
        currencyDisplay: 'narrowSymbol'
    });

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

    // const copyAccountNumber = () => {
    //     copyTextToClipboard(`Account Name - ${userProfileData.lastName}  ${userProfileData.firstName}
    //     Account No. - ${copyAcctInfo.accountNumber}
    //     Bank Name - Ecobank
    //     Swift Code - ${copyAcctInfo.accountSwiftCode}
    //     Bank Branch - ${copyAcctInfo.accountBankName} `)
    //         .then(() => {
    //             // If successful, update the isCopied state value
    //             setIsCopied(true);
    //             setTimeout(() => {
    //                 setIsCopied(false);
    //             }, 1500);
    //         })
    //         .catch((err) => {
    //             //  //console.log(err);
    //         });
    // };
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
                                    <div
                                        className={
                                            styles.setAccountNumberAsPrimary
                                        }
                                    >
                                        <p>
                                            {acctInfoNum != null
                                                ? acctInfoNum
                                                : acctNum}
                                        </p>
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
                    <div className={styles.accountsALl}>
                        <>
                            <div className={styles.accntP}>
                                <p></p>
                                <p> Account</p>
                            </div>
                            <div className={styles.success}>
                                <AiFillCheckCircle />
                            </div>
                            <hr className={styles.accountHr} />
                        </>

                        {/* <div className={styles.otherAccountsDiv}>
                        <button>+Add New</button>
                    </div> */}
                    </div>
                </>
            </div>
        </div>
    );
};

export default AccountsInfoCard;
