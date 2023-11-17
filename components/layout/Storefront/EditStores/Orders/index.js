import React, { useState } from 'react';
import styles from '../styles.module.css';

const Orders = ({ actionText }) => {
    const [orderType, setOrderType] = useState('Open');
    return (
        <>
            <h2 className={styles.actionText}>{actionText}</h2>
            <div className={styles.ordersCont}>
                <div
                    className={
                        orderType === 'Open'
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
                        orderType === 'Shipped'
                            ? styles.openOrders
                            : styles.closeOrders
                    }
                    onClick={() => {
                        setOrderType('Shipped');
                    }}
                >
                    <h4>Shipped Orders</h4>
                </div>
                <div
                    className={
                        orderType === 'Close'
                            ? styles.openOrders
                            : styles.closeOrders
                    }
                    onClick={() => {
                        setOrderType('Close');
                    }}
                >
                    <h4>Closed Orders</h4>
                </div>
            </div>
            {orderType === 'Open' ? (
                <>
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
                                        <div className={styles.nameLocation}>
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
                </>
            ) : orderType === 'Close' ? (
                <>
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
                                        <div className={styles.nameLocation}>
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
                </>
            ) : orderType === 'Shipped' ? (
                <>
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
                                        <div className={styles.nameLocation}>
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
                </>
            ) : null}
        </>
    );
};

export default Orders;
