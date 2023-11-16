import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import CartSvg from '../CartSvg';
import CrownSvg from '../CrownSvg';
import SettingSvg from '../SettingSvg';
import styles from './styles.module.css';

const StoreNavbar = ({ store }) => {
    const { cartSlice } = useSelector((store) => store);
    return (
        <div className={styles.nav}>
            <div className={styles.storesNamme}>
                <div className={styles.crown}>
                    <CrownSvg />
                    {store?.storeFrontName}
                </div>
                <p className={styles.storeiD}>{store?.storeFrontName}</p>
            </div>
            <div className={styles.search}>
                <div className={styles.searchDiv}>
                    <BsSearch />
                    <input
                        className={styles.earch}
                        type="text"
                        placeholder="Search Products"
                    />
                </div>
                <div className={styles.settings}>
                    <SettingSvg />
                </div>
                <div className={styles.cart}>
                    <p className={styles.num}>{cartSlice}</p>
                    <CartSvg />
                </div>
            </div>
        </div>
    );
};

export default StoreNavbar;
