import React from 'react';
import styles from './styles.module.css';

const Overlay = ({ overlay, children }) => {
    return (
        <div className={overlay ? styles.mainOverlay : styles.noshow}>
            {children}
        </div>
    );
};

export default Overlay;
