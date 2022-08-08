import React from 'react';
import withAuth from '../../../components/HOC/withAuth';
import ExistingMultiStep from '../../../components/layout/RegisteredForm';
import styles from './styles.module.css';
const ExistingProfileSetup = () => {
    return (
        <div className={styles.Cover}>
            <ExistingMultiStep />
        </div>
    );
};

export default ExistingProfileSetup;
