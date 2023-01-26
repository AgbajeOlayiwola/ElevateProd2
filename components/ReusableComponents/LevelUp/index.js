import React from 'react';
import DounutComp from '../Chart/Dougnut';
import styles from './styles.module.css';
import Link from 'next/link';

const Levelup = ({ account }) => {
    return (
        <div className={styles.cove}>
            <div className={styles.coveBody}>
                <div className={styles.left}>
                    {/* <DounutComp /> */}
                    {/* <img src="../../Assets/Svgs/chart.svg" alt="" /> */}
                </div>
                <div className={styles.level}>
                    <p className={styles.Levelup}>LEVEL UP CHAMP</p>

                    <p className={styles.YourBus}>
                        Your business account is not fully up. Complete account
                        upgrade to access unlimited benefits.
                    </p>
                </div>
            </div>
            <Link href="./AccountUpgrade">
                <button>
                    {account.customerCategory === 'INDIVIDUAL'
                        ? 'Upgrade Account'
                        : account.createdFromEcobankCred === true &&
                          account.customerCategory === 'COMMERCIAL'
                        ? 'Update Documents'
                        : 'Update Documents'}{' '}
                </button>
            </Link>
        </div>
    );
};

export default Levelup;
