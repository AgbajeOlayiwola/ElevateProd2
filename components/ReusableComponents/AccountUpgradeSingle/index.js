import React from 'react';
import AccountChecked from '../ReusableSvgComponents/AccountCheckedSvg';
import InfoSvg from '../ReusableSvgComponents/InfoSvg';
import styles from './styles.module.css';

const AccountUpgradeSingle = ({ icon, text, index, action }) => {
    return (
        <div
            key={index}
            className={styles.accountUpgradeSingle}
            onClick={action}
        >
            <div className={styles.accountUpgradeSingleIcon}>{icon}</div>
            <div className={styles.accountUpgradeSingleText}>
                <h2>{text}</h2>
                <div>
                    <p>More Info</p>
                    <InfoSvg />
                </div>
            </div>
            <div className={styles.accountUpgradeSngleChecked}>
                <AccountChecked />
            </div>
        </div>
    );
};

export default AccountUpgradeSingle;
