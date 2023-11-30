import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { setviewProductSliceData } from '../../../redux/slices/viewProductSlice';
import styles from './styles.module.css';

const ProductTile = ({ data, call, addToCart }) => {
    const dispatch = useDispatch();
    const [cartData, setCartData] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    const router = useRouter();
    const viewProduct = (val) => {
        dispatch(setviewProductSliceData(val));
        router.push('/Store/ViewProduct');
    };

    return (
        <div className={styles.items}>
            <div style={{ cursor: 'pointer' }}>
                <Image
                    onClick={() => viewProduct(data)}
                    src={data?.image[0]}
                    width={307}
                    height={220}
                    alt="hi"
                />

                <div className={styles.roundDiv}>
                    <p className={styles.round}>{data?.name}</p>
                    <div className={styles.proce}>
                        {' '}
                        <h1>{data?.price}</h1>
                        <p>N1.00</p>
                    </div>
                </div>
                <div
                    className={styles.addtoCrta}
                    onClick={() => addToCart(data)}
                >
                    <MdAddShoppingCart /> Add to cart
                </div>
            </div>
        </div>
    );
};

export default ProductTile;
