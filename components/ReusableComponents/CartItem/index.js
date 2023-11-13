import Image from 'next/image';
import React from 'react';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const CartItem = () => {
    const affiliate = localStorage.getItem('affiliateCode');
    return (
        <div className={styles.cartItem}>
            <div className={styles.divImage}>
                <Image
                    src="/Assets/Images/guccishirt.png"
                    width={88}
                    height={98}
                    alt="cart image"
                />
                <div className={styles.addItemFlex}>
                    <div className={styles.gucci}>
                        <p className={styles.itmName}>Gucci Black Shirt</p>
                        <div className={styles.size}>
                            <div className={styles.attributes}>
                                <p>Size:</p>
                                <p> XL</p>
                            </div>
                            <div className={styles.attributes}>
                                <p>Size:</p>
                                <p> XL</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.addItem}>
                        <div className={styles.add}>+</div>
                        <input type="text" className={styles.inputs} />
                        <div className={styles.add}>-</div>
                    </div>
                </div>
            </div>
            <div className={styles.rem}>
                <p className={styles.price}>
                    {getSymbolFromCurrency(
                        countryToCurrency[affiliate?.substring(1)]
                    )}

                    {parseFloat(45000)
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </p>
                <p className={styles.removew}>Remove</p>
            </div>
        </div>
    );
};

export default CartItem;
