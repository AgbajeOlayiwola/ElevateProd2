import React from 'react';
import styles from './styles.module.css';

const ProfileSingle = ({ profileText, icon }) => {
    return (
        <div className={styles.profileSingle}>
            <div className={styles.profileIcon}>{icon}</div>
            <div className={styles.profileText}>
                <p>{profileText}</p>
            </div>
            <div className={styles.profileArrow}>
                <img src="../../Assets/Svgs/leftarrow.svg" alt="" />
            </div>
        </div>
    );
};

export default ProfileSingle;
