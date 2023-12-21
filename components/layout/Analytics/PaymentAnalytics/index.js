import React from 'react';
import { BsArrowUpRight, BsDownload } from 'react-icons/bs';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { abbreviateNumber } from '../../../../utils/abreviateNumber';
import DoughNut from '../../../ReusableComponents/Doughnut';
import DropDown from '../../../ReusableComponents/DropDown';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const PaymentAnalytics = ({ nextPage, prevPage }) => {
    const { analyticsData } = useSelector((store) => store);
    const affiliate = localStorage.getItem('affiliateCode');
    console.log(analyticsData);
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
                    <p>Sent Payment</p>
                    <div className={styles.allTime}>
                        <DropDown defaultVal="All time" />
                    </div>
                    <div className={styles.total}>
                        <div>
                            <p className={styles.totalP}>
                                Total received payment
                            </p>
                            <h1>
                                {getSymbolFromCurrency(
                                    countryToCurrency[affiliate?.substring(1)]
                                )}
                                {abbreviateNumber(analyticsData?.total_inflow)}
                            </h1>
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
                    <DoughNut
                        data1={(
                            (analyticsData?.qr /
                                analyticsData?.total_transaction_amount) *
                            100
                        ).toFixed(2)}
                        data2={(
                            (analyticsData?.ussd /
                                analyticsData?.total_transaction_amount) *
                            100
                        ).toFixed(2)}
                        data3={(
                            (analyticsData?.paylink /
                                analyticsData?.total_transaction_amount) *
                            100
                        ).toFixed(2)}
                        data4={10}
                    />
                </div>
                <div>
                    <p>Recievd Payment</p>
                    <div className={styles.allTime}>
                        <DropDown defaultVal="All time" />
                    </div>
                    <div className={styles.total}>
                        <div>
                            <p className={styles.totalP}>
                                Total received payment
                            </p>
                            <h1>
                                {getSymbolFromCurrency(
                                    countryToCurrency[affiliate?.substring(1)]
                                )}
                                {abbreviateNumber(analyticsData?.total_outflow)}
                            </h1>
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
                    <DoughNut
                        data1={(
                            (analyticsData?.bills /
                                analyticsData?.total_transaction_amount) *
                            100
                        ).toFixed(2)}
                        data2={(
                            (analyticsData?.bulk_transfer /
                                analyticsData?.total_transaction_amount) *
                            100
                        ).toFixed(2)}
                        data3={(
                            (analyticsData?.single_transfer /
                                analyticsData?.total_transaction_amount) *
                            100
                        ).toFixed(2)}
                        data4={0}
                    />
                </div>
            </div>
        </div>
    );
};

export default PaymentAnalytics;
