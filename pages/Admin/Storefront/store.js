import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import Cover from '../../../components/ReusableComponents/Cover';
import Loader from '../../../components/ReusableComponents/Loader';
import ProductTile from '../../../components/ReusableComponents/ProductTile';
import StoreNavbar from '../../../components/layout/navbar/Navbar';
import { useGetAllInventoriesByIdMutation } from '../../../redux/api/authApi';
import styles from './store.module.css';

const Store = () => {
    const router = useRouter();
    const { storeSlice } = useSelector((store) => store);

    const [
        getAllInventoriesById,
        {
            data: getAllInventoriesByIdData,
            isLoading: getAllInventoriesByIdLoad,
            isSuccess: getAllInventoriesByIdSuccess,
            isError: getAllInventoriesByIdFalse,
            error: getAllInventoriesByIdErr,
            reset: getAllInventoriesByIdReset
        }
    ] = useGetAllInventoriesByIdMutation();

    const [page, setPage] = useState();
    useEffect(() => {
        // Get the current URL
        const currentUrl = new URL(window.location.href);

        // Get the "id" parameter from the URL
        const idParam = currentUrl.searchParams.get('id');

        if (idParam) {
            // Do something with the idParam
            // console.log('ID parameter found:', idParam);

            // You can also convert the ID to a number if needed
            const id = parseInt(idParam, 10);

            getAllInventoriesById({
                storeFrontId: idParam,
                page: 1,
                size: 5
            });
            // Perform additional actions based on the ID
            // For example, fetch data from an API using the ID
            // or update the component state based on the ID
        } else {
            // console.log('No ID parameter found in the URL');
        }
    }, []);

    return (
        <Cover>
            <p
                className={styles.return}
                onClick={() => router.push('/Admin/Storefront')}
            >
                {' '}
                <FaArrowLeftLong /> Return to Store front
            </p>
            <StoreNavbar store={storeSlice} />

            <div className={styles.shopBanner}>
                <h1>Discount Special Sales</h1>
                <div className={styles.shopNow}>Shop Now</div>
            </div>
            <div className={styles.top}>
                <p>Top Friday Sales</p>
            </div>
            <div className={styles.getALlFlex}>
                {getAllInventoriesByIdLoad ? (
                    <Loader />
                ) : (
                    getAllInventoriesByIdData?.data?.map((item, index) => {
                        return (
                            <>
                                <div>
                                    <a href={'/Store/ViewProduct'}>
                                        <ProductTile data={item} />
                                    </a>
                                </div>
                            </>
                        );
                    })
                )}
            </div>
        </Cover>
    );
};

export default Store;
