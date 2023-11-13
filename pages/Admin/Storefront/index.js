import { useRouter } from 'next/router';
import React, { useState } from 'react';
import EditStores from '../../../components/layout/Storefront/EditStores';
import ViewProduct from '../../../components/layout/Storefront/EditStores/ViewProduct';
import AddNewInventoryForm from '../../../components/layout/Storefront/Inventory/NewInventoryForm';
import Stores from '../../../components/layout/Storefront/Stores';
import styles from './styles.module.css';

const Storefront = () => {
    const [page, setPage] = useState(0);

    const router = useRouter();
    const showProduct = () => {
        setPage(2);
    };
    const nextPage = () => {
        setPage(3);
    };
    const [inventory, setInventory] = useState();
    const retrunBack = () => {
        //take user bback to the inventory page
        setPage(1);
        setInventory(0);
    };
    const multi = () => {
        switch (page) {
            case 0:
                return <Stores nextStep={() => setPage(page + 1)} />;
            case 1:
                return (
                    <EditStores
                        showProduct={showProduct}
                        inventory={inventory}
                        nextPage={nextPage}
                    />
                );
            case 2:
                return <ViewProduct retrunBack={retrunBack} />;
            case 3:
                return <AddNewInventoryForm />;
        }
    };
    return <>{multi()}</>;
};

export default Storefront;

const TableDetail = ({ header, storeName, orders, link, action }) => {
    return (
        <>
            {header === 'Header' ? (
                <div className={styles.TableDetailHead} key="1">
                    <p className={styles.name}>Name</p>
                    <p className={styles.orders}>Orders</p>
                    <p className={styles.link}>Link</p>
                    <p className={styles.status}>Status</p>
                </div>
            ) : (
                <div className={styles.TableDetailBody} key="1">
                    <p className={styles.bodyName} onClick={action}>
                        {storeName}
                    </p>
                    <p className={styles.orders}>{orders}</p>
                    <p className={styles.link}>{link}</p>
                    <div className={styles.statusBody}>
                        <label className={styles.beneCheck}>
                            <input type="checkbox" />
                            <span>
                                <i></i>
                            </span>
                        </label>
                    </div>
                </div>
            )}
        </>
    );
};
