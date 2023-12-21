import React, { useState } from 'react';
import Step1 from '../AddNewInventory/Step1';
import Step2 from '../AddNewInventory/Step2';
import styles from './styles.module.css';
import { IoArrowBack } from 'react-icons/io5';
import Specifications from '../AddNewInventory/Specifications';

const AddNewInventoryForm = ({ isEdit, backToInventories }) => {
    const [page, setPage] = useState(0);
    const multi = () => {
        switch (page) {
            case 0:
                return (
                    <Step1
                        saveANdContinue={() => setPage(page + 1)}
                        ifIsEdit={isEdit}
                    />
                );
            case 1:
                return (
                    <Specifications
                        ifIsEdit={isEdit}
                        saveANdContinue={() => setPage(page + 1)}
                        backToInventories={backToInventories}
                    />
                );
            case 2:
                return (
                    <Step2
                        ifIsEdit={isEdit}
                        backToInventories={backToInventories}
                    />
                );
        }
    };
    return (
        <div>
            <p onClick={() => backToInventories()} className={styles.Name}>
                {' '}
                <IoArrowBack />
                Back
            </p>
            <div className={styles.createStoreFlex}>
                <div className={styles.creating}>
                    <div>
                        <h1>{isEdit ? 'Edit Inventory' : 'New Inventory'}</h1>
                    </div>
                    <div className={styles.storeFrontSteps}>
                        <div onClick={() => setPage(0)}>
                            <div
                                className={
                                    page === 0
                                        ? styles.detBrand
                                        : styles.detBrandInactive
                                }
                            >
                                1
                            </div>
                            <p
                                className={
                                    page === 0 ? styles.active : styles.inactive
                                }
                            >
                                Inventory details
                            </p>
                        </div>
                        <hr className={styles.hr} />
                        <div onClick={() => setPage(1)}>
                            <div
                                className={
                                    page === 1
                                        ? styles.detBrand
                                        : styles.detBrandInactive
                                }
                            >
                                2
                            </div>
                            <p
                                className={
                                    page === 1 ? styles.active : styles.inactive
                                }
                            >
                                Specifications
                            </p>
                        </div>
                        <hr className={styles.hr} />
                        <div onClick={() => setPage(2)}>
                            <div
                                className={
                                    page === 2
                                        ? styles.detBrand
                                        : styles.detBrandInactive
                                }
                            >
                                3
                            </div>
                            <p
                                className={
                                    page === 1 ? styles.active : styles.inactive
                                }
                            >
                                Pictures
                            </p>
                        </div>
                    </div>
                    <hr className={styles.serperator} />
                    <div>{multi()}</div>
                </div>
            </div>
        </div>
    );
};

export default AddNewInventoryForm;
