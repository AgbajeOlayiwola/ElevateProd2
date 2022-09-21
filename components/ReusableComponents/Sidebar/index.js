import React, { useState } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PaymentSvg from '../PaymentSvg';
import SettingsSvg from '../SettingsSvg';
import SideBarHomeSvg from '../ShomeSvg';
import MoreSvg from '../MoreSvg';
import ElevateLogo from '../Ellevate';
import LogoutSvg from '../LogoutSvg';
import { SidebarData } from '../Data';
import SideBarDrop from './sidebarcont';
import Dropdownicon from './dropdownicon';
import Innersubnav from './innersubnav';

const Sidebar = () => {
    const router = useRouter();

    const [subNav, setSubNav] = useState(false);
    const [subNavTitle, setSubNavTitle] = useState('');

    const handleLogOut = () => {
        localStorage.clear();
        if (!localStorage.getItem('user')) {
            router.replace('../Auth/Login');
        }
    };

    const showSubnav = () => {
        setSubNav((prev) => !prev);
    };

    // fillColor={router.pathname == '/Dashboard'}

    return (
        <nav className={styles.sideNav}>
            <div className={styles.top}>
                <div className={styles.ellevate}>
                    <ElevateLogo />
                </div>
                <div className={styles.track}>
                    {
                        SidebarData.map((item, index) => (
                            <div key={index}>
                                <a href={router.pathname !== item.path ? item.path : null}>
                                    {item.title}
                                    {item.subNav && item.iconClosed}
                                </a>
                            </div>
                        ))
                    }
                    {/* {SidebarData.map((item, index) => {
                        return (
                            <div
                                className={styles.cont}
                                key={index}
                                onClick={item.subNav && showSubnav}
                            >
                                {item.icon}
                                <p>{item.title}</p>
                                {item.subNav && subNav
                                    ? item.iconOpened
                                    : item.subNav
                                    ? item.iconClosed
                                    : null}
                            </div>
                        );
                    })} */}
                </div>
            </div>
            <div
                onClick={handleLogOut}
                className={styles.parentDiv}
                styles={{ marginTop: '48.64px' }}
            >
                <div className={styles.LinkDiv}>
                    <LogoutSvg />
                    <p className={styles.link}>Logout</p>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
