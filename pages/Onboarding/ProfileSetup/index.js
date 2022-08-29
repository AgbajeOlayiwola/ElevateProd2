import React, { useState } from 'react';
import styles from './styles.module.css';
import ProfileSetups from '../../../components/layout/NotRegisteredForms';
// import withAuth from '../../../components/HOC/withAuth';

const ProfileSetup = () => {
    return (
        <div className={styles.Cover}>
            <ProfileSetups />
        </div>
    );
};

// export default withAuth(ProfileSetup);
export default ProfileSetup;
