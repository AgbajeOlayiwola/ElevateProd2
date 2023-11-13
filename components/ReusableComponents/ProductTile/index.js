import Image from 'next/image';
import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import styles from './styles.module.css';

const ProductTile = () => {
    return (
        <div className={styles.items}>
            <Image
                src="/Assets/Images/Rectangle59.png"
                width={307}
                height={220}
                alt="hi"
            />
            <div className={styles.roundDiv}>
                <p className={styles.round}>Round Neck T-Shirt</p>
                <div className={styles.proce}>
                    {' '}
                    <h1>N10,000.00</h1>
                    <p>N1.00</p>
                </div>
            </div>
            <div className={styles.addtoCrta}>
                <MdAddShoppingCart /> Add to cart
            </div>
        </div>
    );
};

export default ProductTile;
