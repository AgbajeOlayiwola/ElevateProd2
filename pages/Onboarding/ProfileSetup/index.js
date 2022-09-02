import React, { useState } from 'react';
import styles from './styles.module.css';
import ProfileSetups from '../../../components/layout/NotRegisteredForms';
// import withAuth from '../../../components/HOC/withAuth';

const ProfileSetup = () => {
    return (
        <>
            <ProfileSetups />
        </>
    );
};

// export default withAuth(ProfileSetup);
export default ProfileSetup;
