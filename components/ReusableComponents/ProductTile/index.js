import Image from 'next/image';
import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import styles from './styles.module.css';

const ProductTile = ({ data }) => {
    console.log(data);
    return (
        <div className={styles.items}>
            <Image src={data?.image[0]} width={307} height={220} alt="hi" />
            <div className={styles.roundDiv}>
                <p className={styles.round}>{data?.name}</p>
                <div className={styles.proce}>
                    {' '}
                    <h1>{data?.price}</h1>
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
