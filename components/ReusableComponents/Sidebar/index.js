import React, { useState } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import PaymentSvg from '../PaymentSvg';
import SettingsSvg from '../SettingsSvg';
import SideBarHomeSvg from '../ShomeSvg';
import MoreSvg from '../MoreSvg';

const Sidebar = () => {
    const [activeh, setActiveH] = useState(false);
    const [activep, setActiveP] = useState(false);
    const [activet, setActiveT] = useState(false);
    const [activem, setActiveM] = useState(false);
    return (
        <nav className={styles.sideNav}>
            <div className={styles.ellevate}>
                <h1>Ellevate</h1>
            </div>
            <Link href="#">
                <div
                    onClick={() => setActiveH(true)}
                    className={activeh ? styles.inActive : styles.parentDiv}
                >
                    <div className={styles.LinkDiv}>
                        <SideBarHomeSvg fillColor={activeh} />
                        <p className={styles.link}>Home</p>
                    </div>
                    <div
                        className={
                            activeh ? styles.showGreen : styles.DontSHowgreen
                        }
                    ></div>
                </div>
            </Link>
            <Link href="#">
                <div
                    onClick={() => setActiveP(true)}
                    className={activep ? styles.inActive : styles.parentDiv}
                >
                    <div className={styles.LinkDiv}>
                        <PaymentSvg fillColor={activep} />
                        <p className={styles.link}>Payment</p>
                    </div>
                    <div className={styles.green}></div>
                </div>
            </Link>
            <Link href="#">
                <div
                    onClick={() => setActiveT(true)}
                    className={activet ? styles.inActive : styles.parentDiv}
                >
                    <div className={styles.LinkDiv}>
                        <SettingsSvg fillColor={activet} />
                        <p className={styles.link}>Tools</p>
                    </div>
                    <div className={styles.green}></div>
                </div>
            </Link>
            <Link href="#">
                <div
                    onClick={() => setActiveM(true)}
                    className={activem ? styles.inActive : styles.parentDiv}
                >
                    <div className={styles.LinkDiv}>
                        <MoreSvg fillColor={activeh} />
                        <p className={styles.link}>More</p>
                    </div>
                    <div className={styles.green}></div>
                </div>
            </Link>
        </nav>
    );
};

export default Sidebar;
