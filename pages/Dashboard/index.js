import React from 'react';
import { Navbar, Sidebar } from '../../components';
import styles from './styles.module.css';

const Dashboard = () => {
    return (
        <div className={styles.dash}>
            <Navbar />
            <Sidebar />
        </div>
    );
};

export default Dashboard;
