import React from 'react';
import AddNewSvg from '../../../../ReusableComponents/AddNewSvg';
import styles from './styles.module.css';

const AddNewInventory = ({ nextPage }) => {
    const nextStep = () => {
        nextPage();
    };

    return (
        <div className={styles.addNew}>
            <h1>Inventory</h1>
            <hr />
            <div className={styles.addNewInveenotry}>
                <AddNewSvg />
                <div className={styles.addNewInveenotryP}>
                    <p>
                        You are yet to add an inventory. Your inventories will
                        appear here when you add them
                    </p>
                    <button onClick={nextStep}>Add inventory</button>
                </div>
            </div>
        </div>
    );
};

export default AddNewInventory;
