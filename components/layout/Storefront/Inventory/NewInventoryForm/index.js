import React, { useState } from 'react';
import Step1 from '../AddNewInventory/Step1';
import Step2 from '../AddNewInventory/Step2';
import styles from './styles.module.css';

const AddNewInventoryForm = ({ isEdit }) => {
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
                return <Step2 ifIsEdit={isEdit} />;
        }
    };
    return (
        <div>
            <div className={styles.createStoreFlex}>
                <div className={styles.creating}>
                    <div>
                        <h1>{isEdit ? 'Edit Inventory' : 'New Inventory'}</h1>
                    </div>
                    <div className={styles.storeFrontSteps}>
                        <div>
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
                        <div>
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
