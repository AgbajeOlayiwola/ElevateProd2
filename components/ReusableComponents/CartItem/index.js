import Image from 'next/image';
import React, { useState } from 'react';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const CartItem = ({ items, liftCount }) => {
    const affiliate = localStorage.getItem('affiliateCode');
    const [count, setCount] = useState(1);

    return (
        <div className={styles.cartItem}>
            <div className={styles.divImage}>
                <Image
                    src={items?.image[0]}
                    width={88}
                    height={98}
                    alt="cart image"
                />
                <div className={styles.addItemFlex}>
                    <div className={styles.gucci}>
                        <p className={styles.itmName}>{items?.name}</p>
                        <div className={styles.size}>
                            <div className={styles.attributes}>
                                <p>Size:</p>
                                {items?.size.map((item, index) => {
                                    return <p> {item}</p>;
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={styles.addItem}>
                        <div
                            className={styles.add}
                            onClick={() => {
                                setCount(count + 1), liftCount(count);
                            }}
                        >
                            +
                        </div>
                        <input
                            type="text"
                            className={styles.inputs}
                            value={count}
                        />
                        <div
                            className={styles.add}
                            onClick={() => {
                                setCount(count - 1), liftCount(count);
                            }}
                        >
                            -
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.rem}>
                <p className={styles.price}>
                    {getSymbolFromCurrency(
                        countryToCurrency[affiliate?.substring(1)]
                    )}

                    {parseFloat(items?.price)
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </p>
                <p className={styles.removew}>Remove</p>
            </div>
        </div>
    );
};

export default CartItem;
