import Image from 'next/image';
import React from 'react';
import DashLayout from '../../components/layout/Dashboard';
import ProductBox from '../../components/ReusableComponents/products';
import styles from './store.module.css';

const Store = () => {
    return (
        <DashLayout>
            <div>
                <div className={styles.topBanner}>
                    <div className={styles.topBannerContentDiscount}>
                        <p> Discount Special Sales</p>
                    </div>
                    <div className={styles.topBannerShopNow}>
                        <p>Shop Now</p>
                    </div>
                    {/* src="/Assets/Images/Baanner.png" */}
                </div>
                <div className={styles.prrodCategory}>
                    <div className={styles.proucCategoryActive}>
                        <div className={styles.active}>
                            <p>All Products</p>
                        </div>
                        <div className={styles.inActive}>
                            <p>Top Sales</p>
                        </div>
                        <div className={styles.inActive}>
                            <p>Recommended</p>
                        </div>
                        <div className={styles.inActive}>
                            <p>Clearance Sales</p>
                        </div>
                    </div>

                    <div></div>
                </div>
                <div className={styles.produc}>
                    <ProductBox title="watch" />
                    <ProductBox />
                    <ProductBox />
                    <ProductBox />
                </div>
            </div>
        </DashLayout>
    );
};

export default Store;
