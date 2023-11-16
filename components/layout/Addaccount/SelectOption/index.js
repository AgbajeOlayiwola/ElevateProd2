import React from 'react';
import styles from './styles.module.css';
const SelectOption = ({ moveToAddNew, moveToAddExisting }) => {
    return (
        <div className={styles.selectDiv}>
            <div className={styles.add}>
                <input
                    className={styles.check}
                    type="checkbox"
                    onClick={() => moveToAddNew()}
                />
                <p>Add a New Ecobank Account</p>
            </div>
            <div className={styles.add}>
                <input
                    className={styles.check}
                    type="checkbox"
                    onClick={() => moveToAddExisting()}
                />
                <p>Add an Existing Ecobank Account</p>
            </div>
        </div>
    );
};

export default SelectOption;
