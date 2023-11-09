import React, { useState } from 'react';
import Overlay from '../Overlay';
import styles from './styles.module.css';

const StorePopup = ({ children, overlay, type }) => {
    return (
        <Overlay overlay={overlay}>
            {type ? (
                <div className={styles.storefrontPopups}>
                    <div className={styles.innerDivs}>{children}</div>
                </div>
            ) : (
                <div className={styles.storefrontPopup}>
                    <div className={styles.innerDiv}>{children}</div>
                </div>
            )}
        </Overlay>
    );
};

export default StorePopup;
