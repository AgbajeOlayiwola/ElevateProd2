import React from 'react';
import CartSvg from '../CartSvg';
import CrownSvg from '../CrownSvg';
import SettingSvg from '../SettingSvg';
import styles from './styles.module.css';
import { BsSearch } from 'react-icons/bs';

const StoreNavbar = () => {
    return (
        <div className={styles.nav}>
            <div className={styles.storesNamme}>
                <div className={styles.crown}>
                    <CrownSvg />
                    Isaac Stores
                </div>
                <p className={styles.storeiD}>Isaac Stores</p>
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
                    <p className={styles.num}>1</p>
                    <CartSvg />
                </div>
            </div>
        </div>
    );
};

export default StoreNavbar;
