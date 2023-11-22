import React, { useState } from 'react';
import { MdOutlineInfo } from 'react-icons/md';
import { useSelector } from 'react-redux';
import PayNow from '../PayNow';
import PaymmentSuccess from '../PaymmentSuccess';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const Checkout = ({ num, items, upgradeOrder }) => {
    const affiliate = localStorage.getItem('affiliateCode');
    const [page, setPage] = useState(0);
    const [isSucces, setIsSuccess] = useState(false);
    const close = () => {
        setIsSuccess(false);
    };
    const { cartItem } = useSelector((store) => store);
    const multi = () => {
        switch (page) {
            case 0:
                return (
                    <PayNow nextStep={() => setPage(page + 1)} close={close} />
                );
            case 1:
                return <PaymmentSuccess close={close} />;
        }
    };
    return (
        <div className={styles.Checkout}>
            <div className={styles.itemDetails}>
                <p>Order #SME661012</p>
                <p className={styles.order}>See order details</p>
                <br />
                <hr />
                <br />
                <div className={styles.products}>
                    <div>
                        <p className={styles.prod}>PRODUCT</p>
                        {cartItem?.map((item, index) => {
                            return <p key={{ index }}>{item?.name}</p>;
                        })}
                    </div>
                    <div>
                        <p className={styles.prod}>QTY</p>
                        <p>
                            {' '}
                            {cartItem?.map((item, index) => {
                                return (
                                    <p key={{ index }}>{item?.quantity} pcs</p>
                                );
                            })}
                        </p>
                    </div>
                </div>
                <br />
                <hr />
                <br />
                <div className={styles.products}>
                    <div className={styles.prods}>
                        {cartItem?.map((item, index) => {
                            return (
                                <div className={styles.pricePCsFlex}>
                                    {' '}
                                    <p className={styles.products}>
                                        <span>{item?.quantity} pcs </span> of{' '}
                                        {item?.name}
                                    </p>
                                    <pdiv className={styles.ammt}>
                                        {' '}
                                        {getSymbolFromCurrency(
                                            countryToCurrency[
                                                affiliate?.substring(1)
                                            ]
                                        )}{' '}
                                        {parseFloat(item?.price * item.quantity)
                                            .toFixed(2)
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )}
                                    </pdiv>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <hr />
                <div className={styles.products}>
                    <div>
                        <p className={styles.total}>Total PRice</p>
                    </div>
                    <div>
                        <p className={styles.totalPrice}>
                            {getSymbolFromCurrency(
                                countryToCurrency[affiliate?.substring(1)]
                            )}
                            {parseFloat(
                                cartItem?.reduce(
                                    (total, item) =>
                                        total + item.price * item.quantity,
                                    0
                                )
                            )
                                .toFixed(2)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </p>
                    </div>
                </div>
                <div className={styles.proceef}>
                    <button onClick={upgradeOrder}>Update your order</button>
                </div>
            </div>
            <div className={styles.checkoutInfo}>
                <div className={styles.isGift}>
                    <input type="checkbox" />
                    <p>Is this a gift?</p>
                </div>
                <h1 className={styles.dets}>Recipient details</h1>
                <div className={styles.names}>
                    <div className={styles.inputDiv}>
                        <label>Recipient first name</label>
                        <input type="text" placeholder="first name" />
                    </div>
                    <div className={styles.inputDiv}>
                        <label>Recipient last name</label>
                        <input type="text" placeholder="first name" />
                    </div>
                </div>
                <div className={styles.names}>
                    <div className={styles.inputDiv}>
                        <label>Recipient’s email address (optional)</label>
                        <input type="text" placeholder="first name" />
                    </div>
                    <div className={styles.inputDiv}>
                        <label>Recipient phone number</label>
                        <input type="number" placeholder="first name" />
                    </div>
                </div>
                <div className={styles.isGift}>
                    <input type="checkbox" />
                    <p>Inform recipient via email</p>
                </div>
                <br />
                <hr />
                <br />
                <div className={styles.inputDivs}>
                    <label>Your phone number</label>
                    <input type="number" placeholder="first name" />
                </div>
                <br />
                <hr />
                <br />
                <h1 className={styles.dets}>Recipient details</h1>
                <div className={styles.inputDivs}>
                    <label>Your address (Number and street name)</label>
                    <input type="text" placeholder="first name" />
                </div>
                <div className={styles.names}>
                    <div className={styles.inputDiv}>
                        <label>Recipient’s email address (optional)</label>
                        <select>
                            <option>Choose</option>
                        </select>
                    </div>
                    <div className={styles.inputDiv}>
                        <label>Recipient’s email address (optional)</label>
                        <select>
                            <option>Choose</option>
                        </select>
                    </div>
                </div>
                <br />
                <hr />
                <br />
                <div>
                    <label>Recipient’s email address (optional)</label>
                    <select>
                        <option>Choose</option>
                    </select>
                </div>
                <div className={styles.del}>
                    <MdOutlineInfo /> <p>Delivery time affects price range.</p>
                </div>
                <div className={styles.proceed}>
                    <button onClick={() => setIsSuccess(true)}>
                        Proceed to payment
                    </button>
                </div>
            </div>
            {isSucces ? multi() : null}
        </div>
    );
};

export default Checkout;
