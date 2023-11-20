import React from 'react';
import styles from './styles.module.css';

const Cover = ({ children }) => {
    return (
        <div className={styles.oute}>
            <div className={styles.inner}>{children}</div>
        </div>
    );
};

export default Cover;