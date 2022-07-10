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

const Sidebar = () => {
    const router = useRouter();

    const [subNav, setSubNav] = useState(true);

    const showSubnav = () => {
        setSubNav(true);
    };

    // fillColor={router.pathname == '/Dashboard'}

    return (
        <nav className={styles.sideNav}>
            <div className={styles.top}>
                <div className={styles.ellevate}>
                    <ElevateLogo />
                </div>

                {SidebarData.map((item, index) => {
                    return (
                        <>
                            <Link href={item.path} key={index}>
                                <div
                                    onClick={item.subNav && showSubnav}
                                    className={
                                        router.pathname == item.path
                                            ? styles.inActive
                                            : styles.parentDiv
                                    }
                                >
                                    <div className={styles.mainDiv}>
                                        <div className={styles.LinkDiv}>
                                            {router.pathname == item.path
                                                ? item.iconActive
                                                : item.icon}
                                            <p className={styles.link}>
                                                {item.title}
                                            </p>
                                        </div>

                                        {item.subNav &&
                                        router.pathname == item.path ? (
                                            <>{item.iconOpened}</>
                                        ) : item.subNav ? (
                                            item.iconClosed
                                        ) : null}
                                    </div>
                                </div>
                            </Link>
                            {item.subNav && router.pathname == item.path ? (
                                <>
                                    {item.subNavTitles.map((subTitle, i) => (
                                        <div key={i}>
                                            <p>{subTitle}</p>
                                            {item.subNav.map((item, index) => {
                                                return item.subNavTitle ==
                                                    subTitle ? (
                                                    <div
                                                        className={
                                                            styles.subMenuLink
                                                        }
                                                        key={index}
                                                    >
                                                        {item.icon}
                                                        <p>{item.title}</p>
                                                    </div>
                                                ) : null;
                                            })}
                                        </div>
                                    ))}
                                </>
                            ) : null } 
                            {console.log(item.subNav)}
                        </>
                    );
                })}
            </div>

            <Link href="/Auth/Login">
                <div
                    className={styles.parentDiv}
                    styles={{ marginTop: '48.64px' }}
                >
                    <div className={styles.LinkDiv}>
                        <LogoutSvg />
                        <p className={styles.link}>Logout</p>
                    </div>
                </div>
            </Link>
        </nav>
    );
};

export default Sidebar;
