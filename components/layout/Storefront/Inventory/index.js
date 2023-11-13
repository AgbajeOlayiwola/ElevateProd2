import Image from 'next/image';
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { abbreviateNumber } from '../../../../utils/abreviateNumber';
import DropDown from '../../../ReusableComponents/DropDown';
import InputWithSvg from '../../../ReusableComponents/InputWithSvg';
import AddNewInventory from './AddNewInventory';
import styles from './styles.module.css';
const getSymbolFromCurrency = require('currency-symbol-map');
const countryToCurrency = require('country-to-currency');
const Inventory = ({ actionText, showProduct, nextPage }) => {
    const affiliate = localStorage.getItem('affiliateCode');
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
                                    />
                                </div>
                            </div>
                            <br />
                            <div className={styles.dropDOwn}>
                                <DropDown defaultVal="All Time" />
                                <DropDown defaultVal="All Time" />
                            </div>
                            <br />
                            <div className={styles.inventoryWrapper}></div>
                        </div>
                        <div className={styles.allInventory}>
                            {data?.map((item, index) => {
                                return (
                                    <div
                                        className={styles.inventroeyItm}
                                        onClick={showProduct}
                                    >
                                        <Image
                                            height={188}
                                            width={172}
                                            src={item?.Image}
                                            alt="store front image"
                                        />
                                        <p className={styles.category}>
                                            {item?.category}
                                        </p>
                                        <p className={styles.name}>
                                            {item?.name}
                                        </p>
                                        <div className={styles.currncy}>
                                            <p>
                                                {getSymbolFromCurrency(
                                                    countryToCurrency[
                                                        affiliate?.substring(1)
                                                    ]
                                                )}
                                                {abbreviateNumber(item?.amount)}
                                            </p>
                                            <p>Qty: {item?.qty}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                );
        }
    };
    return <>{conditionalComponent()}</>;
};

export default Inventory;
