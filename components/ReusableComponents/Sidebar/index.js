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

const Sidebar = () => {
    const router = useRouter();

    const [subNav, setSubNav] = useState(false);

    const handleLogOut = () => {
        localStorage.clear();
        if (!localStorage.getItem('user')) {
            router.replace('../Auth/Login');
        }
    };

    const showSubnav = () => {
        setSubNav((prev) => !prev);
        console.log('clicked');
    };

    // fillColor={router.pathname == '/Dashboard'}

    return (
        <nav className={styles.sideNav}>
            <div className={styles.top}>
                <div className={styles.ellevate}>
                    <ElevateLogo />
                </div>
                <div className={styles.track}>
                    {' '}
                    {SidebarData.map((item, index) => {
                        return (
                            <div key={index}>
                                <div
                                    className={
                                        router.pathname == item.path
                                            ? styles.inActive
                                            : styles.parentDiv
                                    }
                                >
                                    <div className={styles.mainDiv}>
                                        <Link
                                            href={item.path}
                                            key={index}
                                            scroll={false}
                                        >
                                            <div
                                                className={styles.LinkDiv}
                                                onClick={showSubnav}
                                            >
                                                {router.pathname == item.path
                                                    ? item.iconActive
                                                    : item.icon}
                                                <p className={styles.link}>
                                                    {item.title}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <SideBarDrop item={item} />
                            </div>
                        );
                    })}
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
