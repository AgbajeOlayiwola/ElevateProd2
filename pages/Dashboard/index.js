import React, { useState, useRef, useEffect } from 'react';
import DashLayout from '../../components/layout/Dashboard';
import Paylink from '../../components/ReusableComponents/PaylinkSvg';
import EcobankQRSvg from '../../components/ReusableComponents/EcobankQRSvg';
import styles from './styles.module.css';
import Visbility from '../../components/ReusableComponents/Eyeysvg';
import PhoneSvg from '../../components/ReusableComponents/PhoneSvg';
import LoansSvg from '../../components/ReusableComponents/LoansSvg';
import Invoice from '../../components/ReusableComponents/InvoiceSvg';
import MposSvg from '../../components/ReusableComponents/mPOSSvg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { useRouter } from 'next/router';
import 'slick-carousel/slick/slick-theme.css';
import Levelup from '../../components/ReusableComponents/LevelUp';
import BarChart from '../../components/ReusableComponents/Chart/BarChart';
import Chart from '../../components/ReusableComponents/Chart';
import LineChart from '../../components/ReusableComponents/Chart/LineChart';
import Piechart from '../../components/ReusableComponents/Chart/Piechart';
import { OtherAccounts } from '../../components/ReusableComponents/Data';
import MakePaymentBtn from '../../components/ReusableComponents/MakePayment';
import RecievePaymentBtn from '../../components/ReusableComponents/RecievePaymnet';
// import withAuth from '../../components/HOC/withAuth.js';
import {
    getBalanceEnquiry,
    getTransactionElevate,
    newAccountStatusData
} from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import TransactionSvg from '../../components/ReusableComponents/ReusableSvgComponents/TransactionSvg';
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: 'block',
                width: '63px',
                fontSize: '35px',
                boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.31)'
            }}
            onClick={onClick}
        />
    );
}
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'none', background: 'green' }}
            onClick={onClick}
        />
    );
}

const Dashboard = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBalanceEnquiry());
    }, []);

    const { balanceEnquiry, errorMessageBalanceEnquiry } = useSelector(
        (state) => state.balanceEnquiryReducer
    );
    const { transactionElevate, errorMessageTransactionElevate } = useSelector(
        (state) => state.transactionElevateReducer
    );
    const [transactionData, setTransactionData] = useState([]);
    useEffect(() => {
        dispatch(getTransactionElevate());
    }, []);

    useEffect(() => {
        if (transactionElevate !== null) {
            setTransactionData(transactionElevate);
        }
    }, [transactionElevate]);
    console.log(transactionData);
    const [nav2, setNav2] = useState();
    const slider1 = useRef();
    const [outType, setOutType] = useState();
    const [balance, setBalance] = useState('#0.00');
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const route = router.pathname;

    const types = (type) => {
        setOutType(type);
    };
    const [items, setItems] = useState([]);
    useEffect(() => {
        if (balanceEnquiry !== null) {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'NGN',
                currencyDisplay: 'narrowSymbol'
            });
            const formattedAmount = formatter.format(
                balanceEnquiry[0].availableBalance
            );
            setBalance(formattedAmount);
        }
    }, [balanceEnquiry]);

    // useEffect(() => {
    //     const items = JSON.parse(localStorage.getItem('user'));

    //     if (!items) {
    //         router.push('../Auth/Login');
    //     } else {
    //         setLoaded(true);
    //     }
    // });
    const settings = {
        className: 'center',
        centerMode: true,
        infinite: true,
        centerPadding: '40px 0px 0px 0px',
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: 'linear'
    };
    const { accountStatus, errorMessages } = useSelector(
        (state) => state.accountStatusReducer
    );

    const [acctNumber, setAcctNumber] = useState('');
    useEffect(() => {
        dispatch(newAccountStatusData());
        if (accountStatus.data) {
            setAcctNumber(accountStatus.data.accountNumber);
        } else {
            setAcctNumber('Pending');
        }
    }, []);
    // console.log(accountStatus.data.accountNumber);
    return (
        <DashLayout>
            <Levelup />
            <div className={styles.cove}>
                <section className={styles.sectionI}>
                    <div className={styles.Tpwh}>
                        <h2 className={styles.transP}>Transactions Today</h2>
                        {/* <div className={styles.payEco}>
                            <div className={styles.svgTxt}>
                                <div className={styles.svgCov}>
                                    <Paylink />
                                </div>
                                <div>
                                    <p className={styles.payp}>Paylink</p>
                                    <h5 className={styles.h5}>₦24,000,000</h5>
                                </div>
                            </div>
                            <div className={styles.svgTxt}>
                                <div className={styles.svgCov}>
                                    <EcobankQRSvg />
                                </div>
                                <div>
                                    <p className={styles.ecop}>Ecobank QR</p>
                                    <h5 className={styles.h5}>₦24,000,000</h5>
                                </div>
                            </div>
                        </div> */}
                        <p>No transactions has been made today.</p>
                    </div>

                    <div className={styles.otherTrans}>
                        <p>Other Transaction</p>
                    </div>
                    <div className={styles.divCover}>
                        <div className={styles.dinCLass}>
                            <div className={styles.svg}>
                                <PhoneSvg />
                            </div>
                            <p className={styles.name}> Airtime & Data</p>
                        </div>
                        <div className={styles.dinCLass}>
                            <div className={styles.svg}>
                                <LoansSvg />
                            </div>
                            <p className={styles.name}> Loans</p>
                        </div>
                        <div className={styles.dinCLass}>
                            <div className={styles.svg}>
                                <Invoice />
                            </div>
                            <p className={styles.name}>Send e-invoice</p>
                        </div>
                        <div className={styles.dinCLass}>
                            <div className={styles.svg}>
                                <MposSvg />
                            </div>
                            <p className={styles.name}>Logistics</p>
                        </div>
                    </div>
                    <div className={styles.btmI}>
                        <div className={styles.btmItop}>
                            <p>Cash Flow</p>
                            <select className={styles.day}>
                                <option>Last 7 Days</option>
                            </select>
                        </div>
                        <LineChart />
                    </div>
                </section>
                <section className={styles.sectionII}>
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
                                                        : balance}
                                                </h1>
                                                <Visbility
                                                    color="green"
                                                    typeSet={types}
                                                />
                                            </div>
                                            <p className={styles.avail}>
                                                Available Balance
                                            </p>
                                        </div>
                                        <div>
                                            <p
                                                className={
                                                    styles.accountDetails
                                                }
                                            >
                                                Account Number
                                            </p>
                                            <p className={styles.accountNumber}>
                                                {acctNumber
                                                    ? acctNumber
                                                    : 'Pending'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.recMak}>
                                    <RecievePaymentBtn />
                                    <MakePaymentBtn />
                                </div>
                            </div>
                            <div className={styles.bagMoney}>
                                <img src="/Assets/Images/bagmoney.png" />
                            </div>
                        </div>
                        <div className={styles.otherAccounts}>
                            <h2>Other Accounts</h2>
                            <div className={styles.otherAccountsDiv}>
                                <button>+Add New</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.btm}>
                        <div className={styles.btmII}>
                            <div className={styles.btmIIp}>
                                <p>Recent Transactions</p>
                                <p>View All</p>
                            </div>
                            {transactionData.length === 0 ? (
                                <div className={styles.transactionBody}>
                                    <div>
                                        <div className={styles.transactionSvg}>
                                            <TransactionSvg />
                                        </div>
                                        <p>
                                            No transactions has been made, click
                                            on make payment to get started.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                transactionData.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <div className={styles.transaction}>
                                                <div className={styles.names}>
                                                    <p>
                                                        {item.beneficiaryName}
                                                    </p>
                                                    <p>{item.type}</p>
                                                </div>
                                                <div className={styles.money}>
                                                    <p>{item.amount}</p>
                                                    <div
                                                        className={item.color}
                                                    ></div>
                                                </div>
                                            </div>
                                            <hr className={styles.hr} />
                                        </div>
                                    );
                                })
                            )}
                        </div>
                        {/* <div className={styles.btmIII}>
                            <p className={styles.paylink}>Other Accounts</p>
                            
                            {OtherAccounts.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={styles.othAccount}
                                    >
                                        <p>{item.ammount}</p>
                                        <p>{item.account}</p>
                                    </div>
                                );
                            })}
                        </div> */}
                    </div>
                    {/* <div className={styles.cards}>
                        <Slider
                            {...settings}
                        >
                            <div>
                                <div className={styles.cardI}>
                                    <div>
                                        <h2>
                                            Explore unlimited possibilities with
                                            Ecobank Digital
                                        </h2>
                                        <p>
                                            <i>
                                                Open your Xpress account
                                                instantly on your mobile
                                            </i>
                                        </p>
                                    </div>
                                    <img src="Assets/Images/beardedman.png" />
                                </div>
                            </div>
                            <div>
                                <div className={styles.cardII}>
                                    <img src="Assets/Images/List.png" />
                                    <div>
                                        <h2>Send an e-Invoice easily</h2>
                                        <p>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit ...
                                        </p>
                                        <p>
                                            <i>Create e-Invoice now {'>'}</i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div> */}
                </section>
            </div>
        </DashLayout>
    );
};

// export default withAuth(Dashboard);
export default Dashboard;
