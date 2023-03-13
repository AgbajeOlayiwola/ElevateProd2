import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './styles.module.css';

const ProductBox = ({ title }) => {
    return (
        <Link href={`/viewproducts/${title}`}>
            <div className={styles.products}>
                <img src="/Assets/Images/Rectangle65.png" alt="store banner" />
                <div className={styles.prodNamePrice}>
                    <p>Round Neck T-Shirt</p>
                    <p>N10,000.00</p>
                </div>
            </div>
        </Link>
    );
};

export default ProductBox;
