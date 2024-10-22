import { useRouter } from 'next/router';
import React, { useState } from 'react';
import EditStores from '../../../components/layout/Storefront/EditStores';
import ViewProduct from '../../../components/layout/Storefront/EditStores/ViewProduct';
import AddNewInventoryForm from '../../../components/layout/Storefront/Inventory/NewInventoryForm';
import OrderDetails from '../../../components/layout/Storefront/OrderDetails';
import Stores from '../../../components/layout/Storefront/Stores';
import styles from './styles.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const [editStore, setEditStore] = useState();
    const multi = () => {
        switch (page) {
            case 0:
                return (
                    <Stores
                        nextStep={() => setPage(page + 1)}
                        nextInaventory={() => setPage(3)}
                    />
                );
            case 1:
                return (
                    <EditStores
                        goBackward={() => setPage(0)}
                        viewOrderDetails={() => setPage(4)}
                        showProduct={showProduct}
                        inventory={inventory}
                        nextPage={nextPage}
                    />
                );
            case 2:
                return (
                    <ViewProduct
                        retrunBack={retrunBack}
                        editInventory={() => {
                            setPage(3), setEditStore('edit');
                        }}
                    />
                );
            case 3:
                return (
                    <AddNewInventoryForm
                        isEdit={editStore}
                        backToInventories={() => setPage(1)}
                    />
                );
            case 4:
                return <OrderDetails back={() => setPage(1)} />;
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
