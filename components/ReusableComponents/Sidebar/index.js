import React, { useState } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import { useRouter } from "next/router";
import PaymentSvg from '../PaymentSvg';
import SettingsSvg from '../SettingsSvg';
import SideBarHomeSvg from '../ShomeSvg';
import MoreSvg from '../MoreSvg';
import ElevateLogo from '../Ellevate';


const Sidebar = () => {
    const router = useRouter();

    return (
        <nav className={styles.sideNav}>
            <div className={styles.ellevate}>
                <ElevateLogo />
            </div>
            <Link href="/Dashboard">
                <div
                    className={router.pathname == "/Dashboard" ? styles.inActive : styles.parentDiv}
                >
                    <div className={styles.LinkDiv}>
                        <SideBarHomeSvg fillColor={router.pathname == "/Dashboard"} />
                        <p className={styles.link}>Dashboard</p>
                    </div>
                </div>
            </Link>
            <Link href="/Payment">
                <div
                    className={router.pathname == "/Payment" ? styles.inActive : styles.parentDiv}
                >
                    <div className={styles.LinkDiv}>
                        <PaymentSvg fillColor={router.pathname == "/Payment"} />
                        <p className={styles.link}>Payment</p>
                    </div>
                </div>
            </Link>
            <Link href="/Tools">
                <div
                    className={router.pathname == "/Tools" ? styles.inActive : styles.parentDiv}
                >
                    <div className={styles.LinkDiv}>
                        <SettingsSvg fillColor={router.pathname == "/Tools"} />
                        <p className={styles.link}>Tools</p>
                    </div>
                </div>
            </Link>
            <Link href="/More">
                <div
                    className={router.pathname == "/More" ? styles.inActive : styles.parentDiv}
                >
                    <div className={styles.LinkDiv}>
                        <MoreSvg fillColor={router.pathname == "/More"} />
                        <p className={styles.link}>More</p>
                    </div>
                </div>
            </Link>
        </nav>
    );
};

export default Sidebar;
