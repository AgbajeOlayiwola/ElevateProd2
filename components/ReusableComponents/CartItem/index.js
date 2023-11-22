import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const CartItem = ({
    index,
    items,
    liftCount,
    handleAddQuantity,
    handleRemoveQuantity,
    removeFromCart
}) => {
    const affiliate = localStorage.getItem('affiliateCode');
    const { cartItem } = useSelector((store) => store);
    const [count, setCount] = useState(1);
    const dispatch = useDispatch();

    return (
        <div className={styles.cartItem}>
            <div className={styles.divImage}>
                <Image
                    src={
                        items?.image &&
                        items?.image.startsWith('data:image/png;base64,')
                            ? items?.image
                            : `data:image/png;base64,${items?.image}`
                    }
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
                                <p> {items?.size}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.addItem}>
                        <div
                            className={styles.add}
                            onClick={() => {
                                handleAddQuantity(index), setCount(count + 1);
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
                                handleRemoveQuantity(index),
                                    setCount(count - 1);
                                if (count <= 0) {
                                    alert('camnt be less than 0');
                                }
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
                <p
                    className={styles.removew}
                    onClick={() => removeFromCart(index)}
                >
                    Remove
                </p>
            </div>
        </div>
    );
};

export default CartItem;
