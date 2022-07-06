import React from 'react';
import { Navbar, Sidebar } from '../../components';
import DashLayout from '../../components/layout/Dashboard';
import Paylink from '../../components/ReusableComponents/PaylinkSvg';
import EcobankQRSvg from '../../components/ReusableComponents/EcobankQRSvg';
import styles from './styles.module.css';
import Visbility from '../../components/ReusableComponents/Eyeysvg';

const Dashboard = () => {
    return (
        <DashLayout>
            <div className={styles.Top}>
                <div className={styles.Tpwh}>
                    <p className={styles.transP}>Transaction Today</p>
                    <div className={styles.payEco}>
                        <div className={styles.svgTxt}>
                            <div className={styles.svgCov}>
                                <Paylink />
                            </div>
                            <div>
                                <p className={styles.payp}>Paylink</p>
                                <h5 className={styles.h5}>24,000,000</h5>
                            </div>
                        </div>
                        <div className={styles.svgTxt}>
                            <div className={styles.svgCov}>
                                <EcobankQRSvg />
                            </div>
                            <div>
                                <p className={styles.ecop}>Ecobank QR</p>
                                <h5 className={styles.h5}>24,000,000</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardRight}>
                        <div className={styles.cardMone}>
                            <h1>#22,000</h1>
                            <Visbility />
                        </div>
                        <p className={styles.avail}>Available Balance</p>

                        <div className={styles.recMak}>
                            <div className={styles.rec}>Receive Payment</div>
                            <div className={styles.make}>Make Payment</div>
                        </div>
                    </div>
                    <div>
                        <img src="/Assets/Images/bagmoney.png" />
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <div>Airtime & Data</div>
                    <div>Loans</div>
                    <div>Send e-invoice</div>
                    <div>mPOS</div>
                </div>
                <div>
                    <div>Card 1</div>
                    <div>Card 2</div>
                </div>
            </div>
        </DashLayout>
    );
};

export default Dashboard;
