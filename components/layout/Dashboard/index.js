import React from 'react';
import { Navbar, Sidebar } from '../../index';
import styles from './styles.module.css';

const DashLayout = ({ children }) => {
    return (
        <div className={styles.dash}>
            <Navbar />
            <div className={styles.main}>{children}</div>
            <Sidebar />
        </div>
    );
};

export default DashLayout;
