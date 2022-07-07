import React, { useState } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import PaymentSvg from '../PaymentSvg';
import SettingsSvg from '../SettingsSvg';
import SideBarHomeSvg from '../ShomeSvg';
import MoreSvg from '../MoreSvg';
import ElevateLogo from '../Ellevate';

const Sidebar = () => {
    const [activeh, setActiveH] = useState(true);
    const [activep, setActiveP] = useState(false);
    const [activet, setActiveT] = useState(false);
    const [activem, setActiveM] = useState(false);

    const setActiveHome = () => {
        setActiveH(true);
        setActiveP(false);
        setActiveT(false);
        setActiveM(false);
    };
    const setActivePayment = () => {
        setActiveH(false);
        setActiveP(true);
        setActiveT(false);
        setActiveM(false);
    };
    const setActiveTools = () => {
        setActiveH(false);
        setActiveP(false);
        setActiveT(true);
        setActiveM(false);
    };
    const setActiveMore = () => {
        setActiveH(false);
        setActiveP(false);
        setActiveT(false);
        setActiveM(true);
    };
    return (
        <nav className={styles.sideNav}>
            <div className={styles.ellevate}>
                <ElevateLogo />
            </div>
            <Link href="#">
                <div
                    onClick={setActiveHome}
                    className={activeh ? styles.inActive : styles.parentDiv}
                >
                    <div className={styles.LinkDiv}>
                        <SideBarHomeSvg fillColor={activeh} />
                        <p className={styles.link}>Dashboard</p>
                    </div>
                </div>
            </Link>
            <Link href="#">
                <div
                    onClick={setActivePayment}
                    className={activep ? styles.inActive : styles.parentDiv}
                >
                    <div className={styles.LinkDiv}>
                        <PaymentSvg fillColor={activep} />
                        <p className={styles.link}>Payment</p>
                    </div>
                </div>
            </Link>
            <Link href="#">
                <div
                    onClick={setActiveTools}
                    className={activet ? styles.inActive : styles.parentDiv}
                >
                    <div className={styles.LinkDiv}>
                        <SettingsSvg fillColor={activet} />
                        <p className={styles.link}>Tools</p>
                    </div>
                </div>
            </Link>
            <Link href="#">
                <div
                    onClick={setActiveMore}
                    className={activem ? styles.inActive : styles.parentDiv}
                >
                    <div className={styles.LinkDiv}>
                        <MoreSvg fillColor={activem} />
                        <p className={styles.link}>More</p>
                    </div>
                </div>
            </Link>
        </nav>
    );
};

export default Sidebar;
