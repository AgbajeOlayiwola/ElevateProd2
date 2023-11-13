import React from 'react';
import CartItem from '../../../ReusableComponents/CartItem';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const CartsAndItem = ({ nextStep }) => {
    const affiliate = localStorage.getItem('affiliateCode');
    const procced = () => {
        nextStep();
    };
    return (
        <div className={styles.CartsAndItem}>
            <div className={styles.cartItems}>
                <CartItem />
                <CartItem />
                <CartItem />
            </div>
            <div className={styles.itemDetails}>
                <p>Order #SME661012</p>
                <p className={styles.order}>See order details</p>
                <br />
                <hr />
                <br />
                <div className={styles.products}>
                    <div>
                        <p className={styles.prod}>PRODUCT</p>
                        <p>Gucci Black Shirt</p>
                        <p>Gucci Black Shirt</p>
                    </div>
                    <div>
                        <p className={styles.prod}>QTY</p>
                        <p>6pcs</p>
                        <p>4pcs</p>
                    </div>
                </div>
                <br />
                <hr />
                <br />
                <div className={styles.products}>
                    <div className={styles.prods}>
                        <p className={styles.products}>
                            <span>6pcs</span> of Gucci black shirt
                        </p>
                        <p className={styles.pcs}>
                            {getSymbolFromCurrency(
                                countryToCurrency[affiliate?.substring(1)]
                            )}{' '}
                            {parseFloat(1230)
                                .toFixed(2)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            /pcs
                        </p>
                    </div>
                    <p className={styles.ammt}>
                        {' '}
                        {getSymbolFromCurrency(
                            countryToCurrency[affiliate?.substring(1)]
                        )}{' '}
                        {parseFloat(70000)
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </p>
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
                            {parseFloat(1230)
                                .toFixed(2)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </p>
                    </div>
                </div>
                <div className={styles.proceef}>
                    <button onClick={procced}>Proceed</button>
                </div>
            </div>
        </div>
    );
};

export default CartsAndItem;
