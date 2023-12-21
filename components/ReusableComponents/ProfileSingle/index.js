import React from 'react';
import LeftArrowSvg from '../LeftArrowSvg';
import styles from './styles.module.css';

const ProfileSingle = ({
    profileText,
    icon,
    action,
    index,
    color,
    activeText
}) => {
    return (
        <div
            className={
                profileText === 'Delete Account'
                    ? styles.profileSingleDelete
                    : activeText === profileText
                    ? styles.profileSingleActive
                    : styles.profileSingle
            }
            onClick={action}
            key={index}
        >
            <div className={styles.profileIcon}>{icon}</div>
            <div className={styles.profileText}>
                <p>{profileText}</p>
            </div>
            <div className={styles.profileArrow}>
                <LeftArrowSvg color={color} />
            </div>
        </div>
    );
};

export default ProfileSingle;
