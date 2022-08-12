import React from 'react';
import ArrowBackSvg from '../ArrowBackSvg';
import styles from './styles.module.css';

const AccountUpgradeComponent = ({ children, title, action }) => {
    return (
        <div className={styles.accountCont}>
            <div className={styles.accountUpgradePopup}>
                <div className={styles.accountUpgradeSingle}>
                    <div className={styles.accountUpgradeSingleHeader}>
                        <ArrowBackSvg action={action} />
                        <h2>{title}</h2>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AccountUpgradeComponent;
