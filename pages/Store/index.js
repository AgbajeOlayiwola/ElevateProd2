import React from 'react';
import Cover from '../../components/ReusableComponents/Cover';
import ProductTile from '../../components/ReusableComponents/ProductTile';
import StoreNavbar from '../../components/layout/navbar/Navbar';
import styles from './styles.module.css';

const Store = ({ children }) => {
    return (
        <Cover>
            <StoreNavbar />

            <div className={styles.shopBanner}>
                <h1>Discount Special Sales</h1>
                <div className={styles.shopNow}>Shop Now</div>
            </div>
            <div className={styles.top}>
                <p>Top Friday Sales</p>
            </div>
            <div>
                <a href={'/Store/ViewProduct'}>
                    <ProductTile />
                </a>
            </div>
        </Cover>
    );
};

export default Store;
