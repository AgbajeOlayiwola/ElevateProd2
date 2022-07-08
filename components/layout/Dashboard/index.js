import React from 'react';
import { Navbar, Sidebar } from '../../index';
import styles from './styles.module.css';

const DashLayout = ({ children }) => {
    return (
        <div className={styles.dash}>
            <Sidebar />
            <div className={styles.main}>
                <Navbar />
                {children}
            </div>
        </div>
    );
};

export default DashLayout;
