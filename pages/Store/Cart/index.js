import React, { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import Cover from '../../../components/ReusableComponents/Cover';
import EmptyCartSVg from '../../../components/ReusableComponents/EmptyCartSvg';
import CartsAndItem from '../../../components/layout/Cart/CartsAndItem';
import Checkout from '../../../components/layout/Cart/Checkout';
import styles from './styles.module.css';

const Cart = () => {
    const [isEmpty, setIsEmpty] = useState(false);
    const [page, setPage] = useState(0);
    const multi = () => {
        switch (page) {
            case 0:
                return <CartsAndItem nextStep={() => setPage(page + 1)} />;
            case 1:
                return <Checkout />;
        }
    };
    return (
        <Cover>
            <div className={styles.cover}>
                <p className={styles.backYourCart}>
                    {' '}
                    <MdArrowBack /> Your cart
                </p>
                <p className={styles.yourCart}>Your cart</p>
                {isEmpty ? (
                    <div className={styles.emptySVg}>
                        <div>
                            <EmptyCartSVg />
                            <p>You have not added any product to your cart.</p>
                            <button>Go to storefront</button>
                        </div>
                    </div>
                ) : (
                    multi()
                )}
            </div>
        </Cover>
    );
};

export default Cart;
