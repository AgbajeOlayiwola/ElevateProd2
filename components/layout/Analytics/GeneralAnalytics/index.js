import React from 'react';
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs';
import AnalyticsData from '../../../ReusableComponents/AnalyticsData';
import DropDown from '../../../ReusableComponents/DropDown';
import styles from './styles.module.css';

const GeneralAnalytics = ({ nextPage, nextStore }) => {
    return (
        <div>
            <div className={styles.analytics}>
                <h1>Analytics</h1>
                <p>
                    See a list of logistics integration enabled for your
                    storefront deliveries
                </p>
            </div>
            <div className={styles.anlFlex}>
                <div className={styles.analPaymentZCov}>
                    <div className={styles.analPaymentZCovDiv}>
                        <p className={styles.payment}>Payment</p>
                        <div className={styles.paySelect}>
                            <DropDown defaultVal="Channel" />
                            <DropDown defaultVal="All Time" />
                        </div>
                    </div>
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
                    <div className={styles.pays}>
                        <div className={styles.paysDiv}>
                            <div className={styles.rcPayment}>
                                <h4 className={styles.recH4}>
                                    Received payments
                                </h4>
                                <p className={styles.row}>
                                    <BsArrowUpRight /> 5%
                                </p>
                            </div>
                            <div className={styles.analDiv}>
                                <div className={styles.div1}></div>
                                <div className={styles.div2}></div>
                                <div className={styles.div3}></div>
                                <div className={styles.div4}></div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.paysDiv}>
                                <div className={styles.rcPayment}>
                                    <h4>Received payments</h4>
                                    <p className={styles.row}>
                                        <BsArrowUpRight /> 5%
                                    </p>
                                </div>
                                <div className={styles.analDiv}>
                                    <div className={styles.div1}></div>
                                    <div className={styles.div2}></div>
                                    <div className={styles.div3}></div>
                                    <div className={styles.div4}></div>
                                </div>
                            </div>
                            <br />
                            <div
                                className={styles.viewMor}
                                onClick={() => nextPage()}
                            >
                                <div>
                                    <p>View more</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.analyticsDiv}>
                    <div className={styles.divAnalytics}>
                        <div className={styles.store}>
                            <div className={styles.rcPayment}>
                                <h4 className={styles.recH4}>Storefront</h4>
                            </div>
                            <div className={styles.dropDiv}>
                                <DropDown defaultVal="All Stores" />
                                <DropDown defaultVal="All Time" />
                            </div>
                        </div>
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
                        <br />
                        <br />
                        <div
                            className={styles.viewMor}
                            onClick={() => nextStore()}
                        >
                            <div>
                                <p>View more</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.divAnalytics}>
                            <div className={styles.store}>
                                <div className={styles.rcPayment}>
                                    <h4>Transaction Analytics</h4>
                                </div>
                                <div className={styles.dropDivs}>
                                    <DropDown defaultVal="Past 7 days" />
                                </div>
                            </div>
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
                            <br />
                            <div className={styles.viewMor}>
                                <div>
                                    <p>View more</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneralAnalytics;
