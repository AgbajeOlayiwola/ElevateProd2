import React, { useEffect, useState } from 'react';
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import {
    useStorefrontAnalyticsSummaryMutation,
    useTransactionsSummaryMutation
} from '../../../../redux/api/authApi';
import { setanalyticsData } from '../../../../redux/slices/analyticsData';
import { abbreviateNumber } from '../../../../utils/abreviateNumber';
import AnalyticsData from '../../../ReusableComponents/AnalyticsData';
import DropDown from '../../../ReusableComponents/DropDown';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const GeneralAnalytics = ({ nextPage, nextStore }) => {
    const dispatch = useDispatch();
    const [filterData, setFilterData] = useState();
    const [secFilterData, setSecFilterData] = useState();
    const affiliate = localStorage.getItem('affiliateCode');
    const [
        transactionsSummary,
        {
            data: transactionsSummaryData,
            isLoading: transactionsSummaryLoad,
            isSuccess: transactionsSummarySuccess,
            isError: transactionsSummaryFalse,
            error: transactionsSummaryErr,
            reset: transactionsSummaryReset
        }
    ] = useTransactionsSummaryMutation();
    const [
        storefrontAnalyticsSummary,
        {
            data: storefrontAnalyticsSummaryData,
            isLoading: storefrontAnalyticsSummaryLoad,
            isSuccess: storefrontAnalyticsSummarySuccess,
            isError: storefrontAnalyticsSummaryFalse,
            error: storefrontAnalyticsSummaryErr,
            reset: storefrontAnalyticsSummaryReset
        }
    ] = useStorefrontAnalyticsSummaryMutation();

    useEffect(() => {
        transactionsSummary(null);
        storefrontAnalyticsSummary(null);
    }, []);
    useEffect(() => {
        if (transactionsSummarySuccess) {
            dispatch(setanalyticsData(transactionsSummaryData.data));
            // filteredData();
            const selectedProperties = [
                'single_transfer',
                'bulk_transfer',
                'bills'
            ];
            const selectCollection = ['qr', 'ussd', 'paylink'];

            setFilterData(
                selectedProperties.map((property) => {
                    const value = transactionsSummaryData.data[property];
                    const totalTransactionAmount =
                        transactionsSummaryData.data.total_transaction_amount ||
                        0;
                    const percentage = (
                        (value / totalTransactionAmount) *
                        100
                    ).toFixed(2);
                    return {
                        [property]: value,
                        percentage: percentage
                    };
                })
            );
            setSecFilterData(
                selectCollection.map((property) => {
                    const value = transactionsSummaryData.data[property];
                    const totalTransactionAmount =
                        transactionsSummaryData.data.total_transaction_amount ||
                        0;
                    const percentage = (
                        (value / totalTransactionAmount) *
                        100
                    ).toFixed(2);
                    return {
                        [property]: value,
                        percentage: percentage
                    };
                })
            );
        }
    }, [transactionsSummarySuccess]);
    const colors = ['#3A5207', '#69940D', '#6CCF00', '#C4D344'];

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
                            loads={transactionsSummaryLoad}
                            upOrDown="up"
                            percentage="5%"
                            inflowOrOutflow="Total Inflow"
                            isMoney={true}
                            amount={transactionsSummaryData?.data?.total_inflow}
                        />

                        <AnalyticsData
                            symbol={<BsArrowDownRight />}
                            loads={transactionsSummaryLoad}
                            upOrDown="down"
                            percentage="5%"
                            inflowOrOutflow="Total Outflow"
                            isMoney={true}
                            amount={
                                transactionsSummaryData?.data?.total_outflow
                            }
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
                                {filterData?.map((item, index) => {
                                    console.log(item);
                                    return (
                                        <div
                                            key={index}
                                            // className={styles.div1}
                                            style={{
                                                width: `${item?.percentage}%`,
                                                height: '15px',
                                                backgroundColor:
                                                    colors[
                                                        index % colors.length
                                                    ],
                                                borderTopRightRadius: '20px',
                                                borderBottomRightRadius: '20px'
                                            }}
                                        ></div>
                                    );
                                })}
                            </div>
                            <div className={styles.analDiv}>
                                {filterData?.map((item, index) => {
                                    if (item?.percentage > 0) {
                                        return (
                                            <div
                                                key={index}
                                                // className={styles.div1}
                                                style={{
                                                    width: `${item?.percentage}%`,
                                                    height: '15px',
                                                    color: colors[
                                                        index % colors.length
                                                    ],
                                                    display: 'flex',
                                                    gap: '7px',
                                                    flexDirection: 'column',
                                                    width: '100%'
                                                }}
                                            >
                                                <p className={styles.index}>
                                                    {Object.keys(
                                                        item
                                                    )[0].replace('_', ' ')}
                                                </p>
                                                <p className={styles.index}>
                                                    {getSymbolFromCurrency(
                                                        countryToCurrency[
                                                            affiliate?.substring(
                                                                1
                                                            )
                                                        ]
                                                    )}{' '}
                                                    {abbreviateNumber(
                                                        Object.values(item)[0]
                                                    )}
                                                </p>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                        <div>
                            {/* <div className={styles.paysDiv}>
                                <div className={styles.rcPayment}>
                                    <h4>Sent payments</h4>
                                    <p className={styles.row}>
                                        <BsArrowUpRight /> 5%
                                    </p>
                                </div>
                                <div className={styles.analDiv}>
                                    {secFilterData?.map((item, index) => {
                                        console.log(item);
                                        return (
                                            <div
                                                key={index}
                                                // className={styles.div1}
                                                style={{
                                                    width: `${item?.percentage}%`,
                                                    height: '15px',
                                                    backgroundColor:
                                                        colors[
                                                            index %
                                                                colors.length
                                                        ],
                                                    borderTopRightRadius:
                                                        '20px',
                                                    borderBottomRightRadius:
                                                        '20px'
                                                }}
                                            ></div>
                                        );
                                    })}
                                </div>
                                <div className={styles.analDiv}>
                                    {secFilterData?.map((item, index) => {
                                        if (item?.percentage > 0) {
                                            return (
                                                <div
                                                    key={index}
                                                    // className={styles.div1}
                                                    style={{
                                                        width: `${item?.percentage}%`,
                                                        height: '15px',
                                                        color: colors[
                                                            index %
                                                                colors.length
                                                        ],
                                                        display: 'flex',
                                                        gap: '7px',
                                                        flexDirection: 'column',
                                                        width: '100%'
                                                    }}
                                                >
                                                    <p className={styles.index}>
                                                        {Object.keys(
                                                            item
                                                        )[0].replace('_', ' ')}
                                                    </p>
                                                    <p className={styles.index}>
                                                        {getSymbolFromCurrency(
                                                            countryToCurrency[
                                                                affiliate?.substring(
                                                                    1
                                                                )
                                                            ]
                                                        )}{' '}
                                                        {abbreviateNumber(
                                                            Object.values(
                                                                item
                                                            )[0]
                                                        )}
                                                    </p>
                                                </div>
                                            );
                                        }
                                    })}
                                </div> */}
                            {/* </div> */}
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
                                loads={transactionsSummaryLoad}
                                upOrDown="up"
                                percentage="5%"
                                isMoney={false}
                                inflowOrOutflow="Storefront Visits"
                                amount={
                                    storefrontAnalyticsSummaryData?.data
                                        ?.store_front_visits
                                }
                            />
                            <AnalyticsData
                                symbol={<BsArrowDownRight />}
                                loads={transactionsSummaryLoad}
                                upOrDown="down"
                                percentage="5%"
                                inflowOrOutflow="Inventories Added"
                                isMoney={false}
                                amount={
                                    storefrontAnalyticsSummaryData?.data
                                        ?.inventories_added
                                }
                            />
                        </div>
                        <br />
                        <div className={styles.inflowOutflowDiv}>
                            <AnalyticsData
                                symbol={<BsArrowUpRight />}
                                loads={transactionsSummaryLoad}
                                upOrDown="up"
                                percentage="5%"
                                isMoney={false}
                                inflowOrOutflow="Total Orders"
                                amount={
                                    storefrontAnalyticsSummaryData?.data
                                        ?.total_orders
                                }
                            />
                            <AnalyticsData
                                symbol={<BsArrowDownRight />}
                                loads={transactionsSummaryLoad}
                                upOrDown="down"
                                isMoney={false}
                                percentage="5%"
                                inflowOrOutflow="Completed Orders"
                                amount={
                                    storefrontAnalyticsSummaryData?.data
                                        ?.completed_orders
                                }
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
                                    loads={transactionsSummaryLoad}
                                    upOrDown="up"
                                    percentage="5%"
                                    isMoney={false}
                                    inflowOrOutflow="Total Transaction"
                                    amount={
                                        transactionsSummaryData?.data
                                            ?.total_transaction
                                    }
                                />
                                <AnalyticsData
                                    symbol={<BsArrowDownRight />}
                                    loads={transactionsSummaryLoad}
                                    upOrDown="down"
                                    percentage="5%"
                                    isMoney={true}
                                    inflowOrOutflow="Total Outflow"
                                    amount={
                                        transactionsSummaryData?.data
                                            ?.total_transaction_amount
                                    }
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
