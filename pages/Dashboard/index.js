import React, { useState, useRef } from 'react';
import { Navbar, Sidebar } from '../../components';
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
import { transactionData } from '../../components/ReusableComponents/Data';
function SampleNextArrow(props) {
    const router = useRouter();
    const route = router.pathname;

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
    const [nav2, setNav2] = useState();
    const slider1 = useRef();
    const [outType, setOutType] = useState();
    const [balance] = useState('22,000');
    const types = (type) => {
        setOutType(type);
    };

    const settings = {
        className: 'center',
        centerMode: true,
        infinite: true,
        centerPadding: '40px 0px 0px 0px',
        slidesToShow: 1,
        speed: 500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <DashLayout>
            <Levelup />
            <div className={styles.cove}>
                <section className={styles.sectionI}>
                    <div className={styles.Tpwh}>
                        <p className={styles.transP}>Transaction Today</p>
                        <div className={styles.payEco}>
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
                        </div>
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
                            <p className={styles.name}>mPOS</p>
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
                    <div>
                        <div className={styles.card}>
                            <div className={styles.cardRight}>
                                <div className={styles.cardMone}>
                                    <h1>
                                        {outType ? '*******' : '₦' + balance}
                                    </h1>
                                    <Visbility color="green" typeSet={types} />
                                </div>
                                <p className={styles.avail}>
                                    Available Balance
                                </p>

                                <div className={styles.recMak}>
                                    <div className={styles.rec}>
                                        Receive Payment
                                    </div>
                                    <div className={styles.make}>
                                        Make Payment
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img src="/Assets/Images/bagmoney.png" />
                            </div>
                        </div>
                    </div>

                    <div className={styles.cards}>
                        <Slider
                            {...settings}
                            // className="mainSlider"
                            // asNavFor={nav2}
                            // ref={(slider1) => setNav2(slider1)}
                            // slidesToShow={1}
                            // swipeToSlide={true}
                            // focusOnSelect={true}
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
                    </div>
                    {/* bottom  */}
                    <div className={styles.btm}>
                        <div className={styles.btmII}>
                            <div className={styles.btmIIp}>
                                <p>Recent Transactions</p>
                                <p>View All</p>
                            </div>
                            <p className={styles.select}>
                                (Select transaction to vie more)
                            </p>

                            {transactionData.map((item, index) => {
                                return (
                                    <>
                                        <div className={styles.transaction}>
                                            <div className={styles.names}>
                                                <p>{item.name}</p>
                                                <p>{item.transfer}</p>
                                            </div>
                                            <div className={styles.money}>
                                                <p>{item.ammount}</p>
                                                <div
                                                    className={item.color}
                                                ></div>
                                            </div>
                                        </div>
                                        <hr className={styles.hr} />
                                    </>
                                );
                            })}
                        </div>
                        <div className={styles.btmIII}>
                            <p className={styles.paylink}>Paylink Vs Others</p>
                            <select className={styles.dayPie}>
                                <option>Apr 4th-11th, 2022</option>
                            </select>
                            <Piechart />
                        </div>
                    </div>
                </section>
            </div>
        </DashLayout>
    );
};

export default Dashboard;
