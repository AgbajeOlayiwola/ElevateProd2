import React, { useEffect } from 'react';
import Cover from '../../components/ReusableComponents/Cover';
import ProductTile from '../../components/ReusableComponents/ProductTile';
import StoreNavbar from '../../components/layout/navbar/Navbar';
import { useStorelinkGetStoreMutation } from '../../redux/api/authApi';
import styles from './styles.module.css';

const Store = ({ children }) => {
    const [
        storelinkGetStore,
        {
            data: storelinkGetStoreData,
            isLoading: storelinkGetStoreLoad,
            isSuccess: storelinkGetStoreSuccess,
            isError: storelinkGetStoreFalse,
            error: storelinkGetStoreErr,
            reset: storelinkGetStoreReset
        }
    ] = useStorelinkGetStoreMutation();
    useEffect(() => {
        // Get the current URL
        const currentUrl = new URL(window.location.href);

        // Get the "id" parameter from the URL
        const idParam = currentUrl.searchParams.get('id');

        if (idParam) {
            // Do something with the idParam
            console.log('ID parameter found:', idParam);

            // You can also convert the ID to a number if needed
            const id = parseInt(idParam, 10);

            storelinkGetStore({ storeLink: idParam });
            // Perform additional actions based on the ID
            // For example, fetch data from an API using the ID
            // or update the component state based on the ID
        } else {
            console.log('No ID parameter found in the URL');
        }
    }, []);

    return (
        <Cover>
            <StoreNavbar store={storelinkGetStoreData?.data} />

            <div className={styles.shopBanner}>
                <h1>Discount Special Sales</h1>
                <div className={styles.shopNow}>Shop Now</div>
            </div>
            <div className={styles.top}>
                <p>Top Friday Sales</p>
            </div>
            <div className={styles.showProd}>
                <a href={'/Store/ViewProduct'}>
                    {storelinkGetStoreData?.data?.inventories?.data.map(
                        (item, index) => {
                            return <ProductTile data={item} />;
                        }
                    )}
                </a>
            </div>
        </Cover>
    );
};

export default Store;
