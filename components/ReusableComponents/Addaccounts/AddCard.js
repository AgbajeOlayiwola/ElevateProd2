import React from 'react';
import styles from './styles.module.css';

const AddCard = () => {
    return (
        <>
            <label>Pan</label>
            <input type="text" />
            <br />
            <br />
            <span className={styles.date}>
                <span>
                    <label>Expiry</label>
                    <input type="text" />
                </span>
                <span>
                    <label>CVV</label>
                    <input type="text" />
                </span>
            </span>
            <br />
            <br />
            <label>Affiliate Code</label>
            <input type="text" />
            <br />
            <br />
            <button>Submit</button>
        </>
    );
};

export default AddCard;
