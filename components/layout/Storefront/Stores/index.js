import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from './styles.module.css';

const Stores = () => {
    const [checkStates, setCheckStates] = useState({});
    const stores = [
        {
            storeName: 'Babatunde Stores',
            orders: '21',
            link: 'Preview',
            image: '/Assets/Images/ProfileImage.png'
        },
        {
            storeName: 'Marvelous Solutions',
            orders: '21',
            link: 'Preview',
            image: '/Assets/Images/ProfileImage.png'
        },
        {
            storeName: 'Babatunde Stores',
            orders: '21',
            link: 'Preview',
            image: '/Assets/Images/ProfileImage.png'
        },
        {
            storeName: 'Babatunde Stores',
            orders: '21',
            link: 'Preview',
            image: '/Assets/Images/ProfileImage.png'
        },
        {
            storeName: 'Marvelous Solutions',
            orders: '21',
            link: 'Preview',
            image: '/Assets/Images/ProfileImage.png'
        },
        {
            storeName: 'Babatunde Stores',
            orders: '21',
            link: 'Preview',
            image: '/Assets/Images/ProfileImage.png'
        }
    ];
    const handleCheckChange = (index) => {
        setCheckStates((prevCheckStates) => ({
            ...prevCheckStates,
            [index]: !prevCheckStates[index] // Toggle the check state for the specific item
        }));
    };

    const router = useRouter();
    const cretaeStore = () => {
        router.push('/Admin/Storefront/CreateStore');
    };

    return (
        <div className={styles.storeBody}>
            <div className={styles.dtoreBodyDiv}>
                <div className={styles.storeFront}>
                    <h1>Storefront</h1>
                    <p>You have 5 storefronts.</p>
                </div>
                <div className={styles.storeButton}>
                    <button>Add an inventory</button>
                    <button
                        onClick={() => {
                            cretaeStore();
                        }}
                    >
                        Create Storefront
                    </button>
                </div>
            </div>
            <div className={styles.tableBody}>
                {stores?.map((store, index) => {
                    return (
                        <div className={styles.indexImage} key={index}>
                            <div className={styles.save}>
                                <div className={styles.saveBene}>
                                    <label
                                        className={
                                            checkStates[index]
                                                ? styles.beneChecked
                                                : styles.beneCheck
                                        }
                                    >
                                        <input
                                            type="checkbox"
                                            onChange={() =>
                                                handleCheckChange(index)
                                            }
                                            checked={checkStates[index]}
                                        />
                                        <span>
                                            <i></i>
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <Image
                                    src={store?.image}
                                    width={48}
                                    height={48}
                                    alt="image"
                                />
                                <p className={styles.storeName}>
                                    {store?.storeName}
                                </p>
                            </div>
                            <div className={styles.store}>
                                <div>
                                    <h1>{store?.orders}</h1>
                                    <p>{store?.link}</p>
                                </div>
                                <div>
                                    <h1>{store?.orders}</h1>
                                    <p>{store?.link}</p>
                                </div>
                            </div>
                            <div className={styles.onClick}>
                                <p>Click to view</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Stores;
