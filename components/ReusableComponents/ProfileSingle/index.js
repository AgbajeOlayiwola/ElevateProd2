import React from 'react';
import LeftArrowSvg from '../LeftArrowSvg';
import styles from './styles.module.css';

const ProfileSingle = ({ profileText, icon, action, index }) => {
    return (
        <div
            className={styles.profileSingle}
            onClick={(e) => {
                action(e);
            }}
            key={index}
        >
            <div className={styles.profileIcon}>{icon}</div>
            <div className={styles.profileText}>
                <p>{profileText}</p>
            </div>
            <div className={styles.profileArrow}>
                <LeftArrowSvg />
            </div>
        </div>
    );
};

export default ProfileSingle;
