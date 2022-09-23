import React, { useState } from 'react';
import Overlay from '../Overlay';
import styles from './styles.module.css';

const StorePopup = ({ children }) => {
    const [overlay, setOverlay] = useState(true);
    return (
        <Overlay overlay={overlay}>
            <div className={styles.storefrontPopup}>
                <div className={styles.innerDiv}>{children}</div>
            </div>
        </Overlay>
    );
};

export default StorePopup;
