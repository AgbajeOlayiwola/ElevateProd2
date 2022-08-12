import React from 'react';
import styles from './styles.module.css';
import ArrowBackSvg from '../../components/ReusableComponents/ArrowBackSvg';
import DounutComp from '../../components/ReusableComponents/Chart/Dougnut';
import AccountUpgradeSingle from '../../components/ReusableComponents/AccountUpgradeSingle';

const AccountUpgrade = () => {
    return (
        <div className={styles.accountCont}>
            <div className={styles.accountUpgradePopup}>
                <div className={styles.accountUpgradeSingle}>
                    <div className={styles.accountUpgradeSingleHeader}>
                        <ArrowBackSvg
                            action={() => {
                                alert('Hello');
                            }}
                        />
                        <h2>Individual Account Upgrade</h2>
                    </div>
                    <div className={styles.currentLevel}>
                        <div className={styles.currentLevelDonut}>
                            <DounutComp />
                        </div>
                        <div className={styles.currentLeveltext}>
                            <h2>You’re currently at Level xxx</h2>
                            <div>
                                <p>Account Limit: N1,000,000 </p> .
                                <p>Loan Limit: xxxxxx</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.verifyText}>
                        <p>
                            We need to verity your information, please submit
                            the documents below to process your account upgrade.
                        </p>
                    </div>
                    <AccountUpgradeSingle />
                </div>
            </div>
        </div>
    );
};

export default AccountUpgrade;
