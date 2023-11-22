import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Cover from '../../components/ReusableComponents/Cover';
import ProductTile from '../../components/ReusableComponents/ProductTile';
import StoreNavbar from '../../components/layout/navbar/Navbar';
import { useStorelinkGetStoreMutation } from '../../redux/api/authApi';
import { setCart } from '../../redux/slices/cart';
import styles from './styles.module.css';

const Store = ({ children }) => {
    const dispatch = useDispatch();
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
    const [count, setCount] = useState(0);
    const call = () => {
        setCount(count + 1);
        dispatch(setCart(count));
    };
    return (
        <Cover>
            <StoreNavbar store={storelinkGetStoreData?.data} />

            <div className={styles.shopBanner}>
                <h1>Discount Special Sales</h1>
                <div className={styles.shopNow}>Shop Now</div>
            </div>
            <br />
            <br />
            {/* <div className={styles.top}>
                <p>Top Friday Sales</p>
            </div> */}
            <div className={styles.showProd}>
                <div className={styles.addCart}>
                    {storelinkGetStoreSuccess ? (
                        storelinkGetStoreData?.data?.inventories?.data.map(
                            (item, index) => {
                                return <ProductTile data={item} call={call} />;
                            }
                        )
                    ) : (
                        <h1>ERROR RETRIEVING ITEMS</h1>
                    )}
                </div>
            </div>
        </Cover>
    );
};

export default Store;
