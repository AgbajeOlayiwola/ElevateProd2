import React from 'react';
import { BsArrowUpRight, BsDownload } from 'react-icons/bs';
import { IoIosArrowRoundBack } from 'react-icons/io';
import DoughNut from '../../../ReusableComponents/Doughnut';
import DropDown from '../../../ReusableComponents/DropDown';
import styles from './styles.module.css';
const PaymentAnalytics = ({ nextPage, prevPage }) => {
    return (
        <div>
            <div>
                <p
                    className={styles.paymentAnalytics}
                    onClick={() => prevPage()}
                >
                    <IoIosArrowRoundBack /> Payment analytics
                </p>
            </div>
            <br />
            <div className={styles.analytics}>
                <div>
                    <p>Recieve Payment</p>
                    <div className={styles.allTime}>
                        <DropDown defaultVal="All time" />
                    </div>
                    <div className={styles.total}>
                        <div>
                            <p className={styles.totalP}>
                                Total received payment
                            </p>
                            <h1>₦567.6k</h1>
                            <p className={styles.row}>
                                <BsArrowUpRight /> 5%
                            </p>
                        </div>
                        <div className={styles.export}>
                            <BsDownload /> Export
                        </div>
                    </div>

                    <hr />
                    <p className={styles.chann}>Channels</p>
                    <DoughNut />
                </div>
                <div>
                    <p>Sent Payment</p>
                    <div className={styles.allTime}>
                        <DropDown defaultVal="All time" />
                    </div>
                    <div className={styles.total}>
                        <div>
                            <p className={styles.totalP}>
                                Total received payment
                            </p>
                            <h1>₦567.6k</h1>
                            <p className={styles.row}>
                                <BsArrowUpRight /> 5%
                            </p>
                        </div>
                        <div className={styles.export}>
                            <BsDownload /> Export
                        </div>
                    </div>

                    <hr />
                    <p className={styles.chann}>Channels</p>
                    <DoughNut />
                </div>
            </div>
        </div>
    );
};

export default PaymentAnalytics;
