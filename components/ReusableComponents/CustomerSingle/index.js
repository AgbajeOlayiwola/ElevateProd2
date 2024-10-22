import React from 'react';
import LeftArrowSvg from '../LeftArrowSvg';
import styles from './styles.module.css';

const CustomerSingle = ({
    profileText,
    icon,
    action,
    index,
    color,
    active
}) => {
    return (
        <div
            className={active ? styles.active : styles.profileSingle}
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

export default CustomerSingle;
