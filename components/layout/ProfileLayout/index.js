import React from 'react';
import styles from './styles.module.css';

const ProfileLayout = ({ head, children }) => {
    return (
        <div className={styles.profileLayoutCont}>
            <div className={styles.profileLayoutHead}>{head}</div>
            <div className={styles.profileLayoutBody}>{children}</div>
        </div>
    );
};

export default ProfileLayout;
