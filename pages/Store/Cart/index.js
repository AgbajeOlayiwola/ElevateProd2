import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { useSelector } from 'react-redux';
import Cover from '../../../components/ReusableComponents/Cover';
import EmptyCartSVg from '../../../components/ReusableComponents/EmptyCartSvg';
import CartsAndItem from '../../../components/layout/Cart/CartsAndItem';
import Checkout from '../../../components/layout/Cart/Checkout';
import styles from './styles.module.css';

const Cart = () => {
    const [isEmpty, setIsEmpty] = useState(false);
    const { cartItem } = useSelector((store) => store);
    const { allInventories } = useSelector((store) => store);
    const router = useRouter();
    const [page, setPage] = useState(0);
    const [number, setNumber] = useState(1);
    const gatNumber = (val) => {
        setNumber(val);
    };
    const nextStep = () => {
        // console.log('clicked');
        setPage(1);
    };
    const multi = () => {
        switch (page) {
            case 0:
                return (
                    <CartsAndItem nextStep={nextStep} gatNumber={gatNumber} />
                );
            case 1:
                return (
                    <Checkout
                        items={cartItem}
                        num={number}
                        upgradeOrder={() => setPage(0)}
                    />
                );
        }
    };
    return (
        <Cover>
            <div className={styles.cover}>
                <p className={styles.backYourCart}>
                    {' '}
                    <MdArrowBack
                        onClick={() => {
                            if (page === 0) {
                                router.push(`/Store?id=${allInventories?.id}`);
                            } else {
                                setPage(0);
                            }
                        }}
                    />{' '}
                    Your cart
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
