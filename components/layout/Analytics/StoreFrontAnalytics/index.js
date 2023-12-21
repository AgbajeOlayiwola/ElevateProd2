import React from 'react';
import { BsArrowDownRight, BsArrowUpRight, BsDownload } from 'react-icons/bs';
import { IoIosArrowRoundBack } from 'react-icons/io';
import AnalyticsData from '../../../ReusableComponents/AnalyticsData';
import DropDown from '../../../ReusableComponents/DropDown';
import styles from './styles.module.css';
const StoreFrontAnalytics = ({ nextPage, prevPage }) => {
    return (
        <div>
            <div>
                <p
                    className={styles.paymentAnalytics}
                    onClick={() => prevPage()}
                >
                    <IoIosArrowRoundBack /> Storefront analytics
                </p>
            </div>
            <br />
            <div className={styles.analytics}>
                <div className={styles.lytics}>
                    <div className={styles.analyticsDicv}>
                        <div className={styles.allTime}>
                            <DropDown defaultVal="All Stores" />
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
                    </div>
                    <div className={styles.analyticsDicv}>
                        <div className={styles.inflowOutflowDiv}>
                            <AnalyticsData
                                symbol={<BsArrowUpRight />}
                                upOrDown="up"
                                percentage="5%"
                                inflowOrOutflow="Total Inflow"
                                amount="#567k"
                            />
                            <AnalyticsData
                                symbol={<BsArrowDownRight />}
                                upOrDown="down"
                                percentage="5%"
                                inflowOrOutflow="Total Outflow"
                                amount="#567k"
                            />
                        </div>
                        <br />
                        <div className={styles.inflowOutflowDiv}>
                            <AnalyticsData
                                symbol={<BsArrowUpRight />}
                                upOrDown="up"
                                percentage="5%"
                                inflowOrOutflow="Total Inflow"
                                amount="#567k"
                            />
                            <AnalyticsData
                                symbol={<BsArrowDownRight />}
                                upOrDown="down"
                                percentage="5%"
                                inflowOrOutflow="Total Outflow"
                                amount="#567k"
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.sentPayment}>
                    <p className={styles.topSelling}>Top selling Area</p>
                    <div>
                        <div className={styles.areaFlex}>
                            <p className={styles.area}>Mushin, Lagos</p>
                            <p className={styles.area}>35.75%</p>
                        </div>
                        <div className={styles.underDiv}>
                            <div className={styles.topDiv}></div>
                        </div>
                        <div className={styles.areaFlex}>
                            <p className={styles.area}>Mushin, Lagos</p>
                            <p className={styles.area}>35.75%</p>
                        </div>
                        <div className={styles.underDiv}>
                            <div className={styles.topDiv}></div>
                        </div>
                        <div className={styles.areaFlex}>
                            <p className={styles.area}>Mushin, Lagos</p>
                            <p className={styles.area}>35.75%</p>
                        </div>
                        <div className={styles.underDiv}>
                            <div className={styles.topDiv}></div>
                        </div>
                        <div className={styles.areaFlex}>
                            <p className={styles.area}>Mushin, Lagos</p>
                            <p className={styles.area}>35.75%</p>
                        </div>
                        <div className={styles.underDiv}>
                            <div className={styles.topDiv}></div>
                        </div>
                        <br />
                        <hr />
                    </div>

                    <p className={styles.topSelling}>Top selling Products</p>
                    <div>
                        <div className={styles.areaFlex}>
                            <p className={styles.area}>Mushin, Lagos</p>
                            <p className={styles.area}>35.75%</p>
                        </div>
                        <div className={styles.underDiv}>
                            <div className={styles.topDiv}></div>
                        </div>
                        <div className={styles.areaFlex}>
                            <p className={styles.area}>Mushin, Lagos</p>
                            <p className={styles.area}>35.75%</p>
                        </div>
                        <div className={styles.underDiv}>
                            <div className={styles.topDiv}></div>
                        </div>
                        <div className={styles.areaFlex}>
                            <p className={styles.area}>Mushin, Lagos</p>
                            <p className={styles.area}>35.75%</p>
                        </div>
                        <div className={styles.underDiv}>
                            <div className={styles.topDiv}></div>
                        </div>
                        <div className={styles.areaFlex}>
                            <p className={styles.area}>Mushin, Lagos</p>
                            <p className={styles.area}>35.75%</p>
                        </div>
                        <div className={styles.underDiv}>
                            <div className={styles.topDiv}></div>
                        </div>
                        <br />
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default StoreFrontAnalytics;
