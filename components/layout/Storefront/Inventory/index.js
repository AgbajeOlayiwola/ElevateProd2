import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useGetAllInventoriesByIdMutation } from '../../../../redux/api/authApi';
import { setViewInventory } from '../../../../redux/slices/viewInventorySlice';
import { abbreviateNumber } from '../../../../utils/abreviateNumber';
import InputWithSvg from '../../../ReusableComponents/InputWithSvg';
import Loader from '../../../ReusableComponents/Loader';
import AddNewInventory from './AddNewInventory';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const Inventory = ({ actionText, showProduct, nextPage, storeSlice }) => {
    const affiliate = localStorage.getItem('affiliateCode');
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const data = [
        {
            name: 'Louis Vuiton Round Neck',
            category: 'SHorts',
            amount: '10000',
            qty: 1,
            Image: '/Assets/Images/Rectangle59.png'
        },
        {
            name: 'Louis Vuiton Round Neck',
            category: 'SHorts',
            amount: '10000',
            qty: 1,
            Image: '/Assets/Images/Rectangle59.png'
        },
        {
            name: 'Louis Vuiton Round Neck',
            category: 'SHorts',
            amount: '10000',
            qty: 1,
            Image: '/Assets/Images/Rectangle59.png'
        },
        {
            name: 'Louis Vuiton Round Neck',
            category: 'SHorts',
            amount: '10000',
            qty: 1,
            Image: '/Assets/Images/Rectangle59.png'
        },
        {
            name: 'Louis Vuiton Round Neck',
            category: 'SHorts',
            amount: '10000',
            qty: 1,
            Image: '/Assets/Images/Rectangle59.png'
        },

        {
            name: 'Louis Vuiton Round Neck',
            category: 'SHorts',
            amount: '10000',
            qty: 1,
            Image: '/Assets/Images/Rectangle59.png'
        },
        {
            name: 'Louis Vuiton Round Neck',
            category: 'SHorts',
            amount: '10000',
            qty: 1,
            Image: '/Assets/Images/Rectangle59.png'
        },

        {
            name: 'Louis Vuiton Round Neck',
            category: 'SHorts',
            amount: '10000',
            qty: 1,
            Image: '/Assets/Images/Rectangle59.png'
        },
        {
            name: 'Louis Vuiton Round Neck',
            category: 'SHorts',
            amount: '10000',
            qty: 1,
            Image: '/Assets/Images/Rectangle59.png'
        }
    ];
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
    useEffect(() => {
        getAllInventoriesById({
            storeFrontId: storeSlice?.id,
            page: 1,
            size: 5
        });
    }, []);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = getAllInventoriesByIdData?.data.filter((item) =>
        item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const conditionalComponent = () => {
        switch (page) {
            case 0:
                return <AddNewInventory nextPage={nextPage} />;

            case 1:
                return (
                    <>
                        <div className={styles.addNw}>
                            <div className={styles.actionText}>
                                <h2 className={styles.actionText}>
                                    {actionText}
                                </h2>
                                <p>23 Items</p>
                            </div>
                            <button
                                onClick={() => {
                                    setPage(0);
                                }}
                            >
                                + Add New
                            </button>
                        </div>
                        <div className={styles.inventoryBody}>
                            <div className={styles.inventoryHead}>
                                <div>
                                    <InputWithSvg
                                        svg={<BiSearch />}
                                        placeholder="...Search for an inventory"
                                        type="text"
                                        label=""
                                        name="Search"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                    />
                                </div>
                            </div>
                            <br />
                            {/* <div className={styles.dropDOwn}>
                                <DropDown defaultVal="All Time" />
                                <DropDown defaultVal="All Time" />
                            </div> */}
                            {/* <br /> */}
                            <div className={styles.inventoryWrapper}></div>
                        </div>
                        {getAllInventoriesByIdLoad ? (
                            <Loader />
                        ) : getAllInventoriesByIdData?.message ===
                          'No Inventory found' ? (
                            <p>No Inventory found</p>
                        ) : (
                            <>
                                <div className={styles.allInventory}>
                                    {filteredData?.map((item, index) => {
                                        return (
                                            <div
                                                className={styles.inventroeyItm}
                                                key={index}
                                                onClick={() => {
                                                    dispatch(
                                                        setViewInventory(item)
                                                    ),
                                                        showProduct();
                                                }}
                                            >
                                                <Image
                                                    height={188}
                                                    width={172}
                                                    src={
                                                        item?.image[0] ||
                                                        '/Assets/Images/Rectangle59.png'
                                                    }
                                                    alt="store front image"
                                                />
                                                <p className={styles.category}>
                                                    {item?.category?.name}
                                                </p>
                                                <p className={styles.name}>
                                                    {item?.name}
                                                </p>
                                                <div className={styles.currncy}>
                                                    <p>
                                                        {getSymbolFromCurrency(
                                                            countryToCurrency[
                                                                affiliate?.substring(
                                                                    1
                                                                )
                                                            ]
                                                        )}
                                                        {abbreviateNumber(
                                                            item?.price
                                                        )}
                                                    </p>
                                                    <p>Qty: {item?.quantity}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </>
                );
        }
    };
    return <>{conditionalComponent()}</>;
};

export default Inventory;
