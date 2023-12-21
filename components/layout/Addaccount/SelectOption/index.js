import React from 'react';
import styles from './styles.module.css';
const SelectOption = ({ moveToAddNew, moveToAddExisting }) => {
    return (
        <div className={styles.selectDiv}>
            <button className={styles.check} onClick={() => moveToAddNew()}>
                Add a New Ecobank Account
            </button>

            <button
                className={styles.check}
                onClick={() => moveToAddExisting()}
            >
                Add an Existing Ecobank Account
            </button>
        </div>
    );
};

export default SelectOption;
