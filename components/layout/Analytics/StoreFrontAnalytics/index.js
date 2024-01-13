import React from 'react';
import { BsArrowDownRight, BsArrowUpRight, BsDownload } from 'react-icons/bs';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { abbreviateNumber } from '../../../../utils/abreviateNumber';
import AnalyticsData from '../../../ReusableComponents/AnalyticsData';
import DropDown from '../../../ReusableComponents/DropDown';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const StoreFrontAnalytics = ({ nextPage, prevPage }) => {
    const affiliate = localStorage.getItem('affiliateCode');
    const { storeFrontAnalytics } = useSelector((store) => store);

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
                                <h1>
                                    {getSymbolFromCurrency(
                                        countryToCurrency[
                                            affiliate?.substring(1)
                                        ]
                                    )}{' '}
                                    {abbreviateNumber(
                                        storeFrontAnalytics?.total_funds_from_store
                                    )}
                                </h1>
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
                                amount={
                                    storeFrontAnalytics?.total_transaction_amount
                                }
                                isMoney={true}
                            />
                            <AnalyticsData
                                symbol={<BsArrowDownRight />}
                                upOrDown="down"
                                percentage="5%"
                                inflowOrOutflow="Total Store Funds"
                                amount={
                                    storeFrontAnalytics?.total_funds_from_store
                                }
                                isMoney={true}
                            />
                        </div>
                        <br />
                        {/* <div className={styles.inflowOutflowDiv}>
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
                        </div> */}
                    </div>
                </div>
                <div className={styles.sentPayment}>
                    <p className={styles.topSelling}>Top selling Area</p>
                    <div>
                        {storeFrontAnalytics?.top_selling_location.map(
                            (item, index) => {
                                return (
                                    <div className={styles.areaFlex}>
                                        <p className={styles.area}>
                                            {item?.title}
                                        </p>
                                        <p className={styles.area}>
                                            {item?.value}
                                        </p>
                                    </div>
                                );
                            }
                        )}
                        <br />
                        <hr />
                    </div>

                    <p className={styles.topSelling}>Top selling Products</p>
                    <div>
                        {storeFrontAnalytics?.top_selling_products.map(
                            (item, index) => {
                                return (
                                    <div className={styles.areaFlex}>
                                        <p className={styles.area}>
                                            {item?.title}
                                        </p>
                                        <p className={styles.area}>
                                            {item?.value}
                                        </p>
                                    </div>
                                );
                            }
                        )}
                        <br />
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default StoreFrontAnalytics;
