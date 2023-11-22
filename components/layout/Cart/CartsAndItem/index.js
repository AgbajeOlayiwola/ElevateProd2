import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../../../ReusableComponents/CartItem';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const CartsAndItem = ({ nextStep, gatNumber }) => {
    const affiliate = localStorage.getItem('affiliateCode');
    const { cartItem } = useSelector((store) => store);
    const [num, setNum] = useState(1);

    const procced = () => {
        nextStep();
    };
    const liftCount = (val) => {
        setNum(val);
        gatNumber(val);
    };
    return (
        <div className={styles.CartsAndItem}>
            <div className={styles.cartItems}>
                {cartItem?.map((item, index) => {
                    return <CartItem items={item} liftCount={liftCount} />;
                })}
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
                        <p>{cartItem?.name}</p>
                    </div>
                    <div>
                        <p className={styles.prod}>QTY</p>

                        <p>{num} pcs</p>
                    </div>
                </div>
                <br />
                <hr />
                <br />
                <div className={styles.products}>
                    <div className={styles.prods}>
                        <p className={styles.products}>
                            <span>6pcs</span> of {cartItem?.name}
                        </p>
                        <p className={styles.pcs}>
                            {getSymbolFromCurrency(
                                countryToCurrency[affiliate?.substring(1)]
                            )}{' '}
                            {parseFloat(cartItem?.price)
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
                        {parseFloat(Number(num) * cartItem?.price)
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
                            {parseFloat(Number(num) * cartItem?.price)
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
