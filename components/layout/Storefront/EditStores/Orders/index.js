import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useViewOrderByStatusMutation } from '../../../../../redux/api/authApi';
import Loader from '../../../../ReusableComponents/Loader';
import styles from '../styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');

const Orders = ({ actionText }) => {
    const [orderType, setOrderType] = useState('open');
    const { storeSlice } = useSelector((store) => store);
    const affiliate = localStorage.getItem('affiliateCode');

    const [
        viewOrderByStatus,
        {
            data: viewOrderByStatusData,
            isLoading: viewOrderByStatusLoad,
            isSuccess: tviewOrderByStatusSuccess,
            isError: viewOrderByStatusFalse,
            error: viewOrderByStatusErr,
            reset: viewOrderByStatusReset
        }
    ] = useViewOrderByStatusMutation();
    useEffect(() => {
        const data = {
            storeFrontId: storeSlice?.id,
            orderStatus: orderType,
            page: 1,
            size: '5'
        };
        viewOrderByStatus(data);
    }, [orderType]);

    return (
        <>
            <h2 className={styles.actionText}>{actionText}</h2>
            <div className={styles.ordersCont}>
                <div
                    className={
                        orderType === 'open'
                            ? styles.openOrders
                            : styles.closeOrders
                    }
                    onClick={() => {
                        setOrderType('Open');
                    }}
                >
                    <h4>Open Orders</h4>
                </div>
                <div
                    className={
                        orderType === 'shipped'
                            ? styles.openOrders
                            : styles.closeOrders
                    }
                    onClick={() => {
                        setOrderType('shipped');
                    }}
                >
                    <h4>Shipped Orders</h4>
                </div>
                <div
                    className={
                        orderType === 'close'
                            ? styles.openOrders
                            : styles.closeOrders
                    }
                    onClick={() => {
                        setOrderType('close');
                    }}
                >
                    <h4>Closed Orders</h4>
                </div>
            </div>
            {orderType === 'open' ? (
                <>
                    {viewOrderByStatusLoad ? (
                        <Loader />
                    ) : viewOrderByStatusData?.data?.length === 0 ? (
                        <p>No item found</p>
                    ) : (
                        viewOrderByStatusData?.data?.map((item, index) => {
                            return (
                                <>
                                    <div className={styles.inventorySingle}>
                                        <div
                                            className={
                                                styles.inventorySingleFirst
                                            }
                                        >
                                            <div className={styles.divDets}>
                                                <img
                                                    src="/Assets/Images/guccishirt.png"
                                                    alt=""
                                                />
                                                <div className={styles.dets}>
                                                    <div
                                                        className={
                                                            styles.details
                                                        }
                                                    >
                                                        <p
                                                            className={
                                                                styles.productName
                                                            }
                                                        >
                                                            Gucci Black Shirtdkj
                                                        </p>
                                                        <div
                                                            className={
                                                                styles.ammount
                                                            }
                                                        >
                                                            <p>3Pcs</p>
                                                            <p>
                                                                Black. Brown,
                                                                Red
                                                            </p>
                                                        </div>
                                                        <h5>
                                                            Order #1234567890
                                                        </h5>
                                                    </div>
                                                    <div>
                                                        <div
                                                            className={
                                                                styles.nameLocation
                                                            }
                                                        >
                                                            <p>Issac Adyemi</p>
                                                            <p>Lagos</p>
                                                        </div>
                                                        <div
                                                            className={
                                                                styles.time
                                                            }
                                                        >
                                                            <p>23/09/2023</p>
                                                            <p>12:04pm</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.ship}>
                                            <div>SHipped</div>
                                            <p>
                                                {' '}
                                                {getSymbolFromCurrency(
                                                    countryToCurrency[
                                                        `${affiliate?.substring(
                                                            1
                                                        )}`
                                                    ]
                                                )}{' '}
                                                {parseFloat(
                                                    9999999999
                                                ).toLocaleString('en-US')}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            );
                        })
                    )}
                </>
            ) : orderType === 'close' ? (
                <>
                    {viewOrderByStatusLoad ? (
                        <Loader />
                    ) : viewOrderByStatusData?.data?.length === 0 ? (
                        <p>No item found</p>
                    ) : (
                        <div className={styles.inventorySingle}>
                            <div className={styles.inventorySingleFirst}>
                                <div className={styles.divDets}>
                                    <img
                                        src="/Assets/Images/guccishirt.png"
                                        alt=""
                                    />
                                    <div className={styles.dets}>
                                        <div className={styles.details}>
                                            <p className={styles.productName}>
                                                Gucci Black Shirtdkj
                                            </p>
                                            <div className={styles.ammount}>
                                                <p>3Pcs</p>
                                                <p>Black. Brown, Red</p>
                                            </div>
                                            <h5>Order #1234567890</h5>
                                        </div>
                                        <div>
                                            <div
                                                className={styles.nameLocation}
                                            >
                                                <p>Issac Adyemi</p>
                                                <p>Lagos</p>
                                            </div>
                                            <div className={styles.time}>
                                                <p>23/09/2023</p>
                                                <p>12:04pm</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.ship}>
                                <div>SHipped</div>
                                <p>#9,9999</p>
                            </div>
                        </div>
                    )}
                </>
            ) : orderType === 'shipped' ? (
                <>
                    {viewOrderByStatusLoad ? (
                        <Loader />
                    ) : viewOrderByStatusData?.data?.length === 0 ? (
                        <p>No item found</p>
                    ) : (
                        <div className={styles.inventorySingle}>
                            <div className={styles.inventorySingleFirst}>
                                <div className={styles.divDets}>
                                    <img
                                        src="/Assets/Images/guccishirt.png"
                                        alt=""
                                    />
                                    <div className={styles.dets}>
                                        <div className={styles.details}>
                                            <p className={styles.productName}>
                                                Gucci Black Shirtdkj
                                            </p>
                                            <div className={styles.ammount}>
                                                <p>3Pcs</p>
                                                <p>Black. Brown, Red</p>
                                            </div>
                                            <h5>Order #1234567890</h5>
                                        </div>
                                        <div>
                                            <div
                                                className={styles.nameLocation}
                                            >
                                                <p>Issac Adyemi</p>
                                                <p>Lagos</p>
                                            </div>
                                            <div className={styles.time}>
                                                <p>23/09/2023</p>
                                                <p>12:04pm</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.ship}>
                                <div>SHipped</div>
                                <p>#9,9999</p>
                            </div>
                        </div>
                    )}
                </>
            ) : null}
        </>
    );
};

export default Orders;
