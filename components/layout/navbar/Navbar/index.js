import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import CartSvg from '../CartSvg';
import CrownSvg from '../CrownSvg';
import styles from './styles.module.css';

const StoreNavbar = ({ store }) => {
    const { cartItem } = useSelector((store) => store);
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
                {/* <div className={styles.settings}>
                    <SettingSvg />
                </div> */}
                <a href="/Store/Cart">
                    <div className={styles.cart}>
                        <p className={styles.num}>{cartItem?.length}</p>
                        <CartSvg />
                    </div>
                </a>
            </div>
        </div>
    );
};

export default StoreNavbar;
