import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItem } from '../../../../redux/slices/cartItems';
import CartItem from '../../../ReusableComponents/CartItem';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const CartsAndItem = ({ nextStep, gatNumber }) => {
    const { affiliate } = useSelector((store) => store);
    const { cartItem } = useSelector((store) => store);
    const [cartItems, setCartItems] = useState(cartItem);
    const [num, setNum] = useState(1);
    const dispatch = useDispatch();
    console.log(cartItems);
    const procced = () => {
        dispatch(setCartItem(cartItems));
        nextStep();
    };
    const liftCount = (val) => {
        setNum(val);
        gatNumber(val);
    };

    const handleAddQuantity = (index) => {
        setCartItems((prevItems) => {
            return prevItems.map((item, i) => {
                if (i === index) {
                    // Create a new object with the same properties as the original item
                    // and update the quantity property
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
        });
    };

    const handleRemoveQuantity = (index) => {
        setCartItems((prevItems) => {
            return prevItems.map((item, i) => {
                if (i === index) {
                    // Create a new object with the same properties as the original item
                    // and update the quantity property
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
        });
    };
    const removeFromCart = (index) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = [...prevCartItems];
            updatedCartItems.splice(index, 1); // Remove one item at the specified index
            return updatedCartItems;
        });
    };

    console.log(cartItems);
    return (
        <div className={styles.CartsAndItem}>
            <div className={styles.cartItems}>
                {cartItems?.map((item, index) => {
                    console.log(index);
                    return (
                        <CartItem
                            removeFromCart={removeFromCart}
                            index={index}
                            key={index}
                            items={item}
                            handleAddQuantity={handleAddQuantity}
                            handleRemoveQuantity={handleRemoveQuantity}
                            liftCount={liftCount}
                        />
                    );
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
                        {cartItems?.map((item, index) => {
                            return <p>{item?.name}</p>;
                        })}
                    </div>
                    <div>
                        <p className={styles.prod}>QTY</p>

                        <p>
                            {cartItems?.map((item, index) => {
                                return <p>{item?.quantity} pc(s)</p>;
                            })}
                        </p>
                    </div>
                </div>
                <br />
                <hr />
                <br />
                <div className={styles.products}>
                    <div className={styles.prods}>
                        {cartItems?.map((item, index) => {
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
                                cartItems?.reduce(
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
                    <button onClick={procced}>Proceed</button>
                </div>
            </div>
        </div>
    );
};

export default CartsAndItem;
