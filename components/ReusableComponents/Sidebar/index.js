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

    const [subNav, setSubNav] = useState(false);

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

                {SidebarData.map((item, index) => {
                    return (
                        <>
                            <div
                                className={
                                    router.pathname == item.path
                                        ? styles.inActive
                                        : styles.parentDiv
                                }
                            >
                                <div className={styles.mainDiv}>
                                    <Link href={item.path} key={index}>
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
                                    {item.subNav && subNav ? (
                                        <div
                                            onClick={item.subNav && showSubnav}
                                        >
                                            {item.iconOpened}
                                        </div>
                                    ) : item.subNav ? (
                                        <div
                                            onClick={item.subNav && showSubnav}
                                        >
                                            {item.iconClosed}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            {!item.subNavTitles ? (
                                item.subNav && subNav ? (
                                    item.subNav.map((item, index) => {
                                        return (
                                            <div
                                                className={styles.subMenuLink}
                                                key={index}
                                            >
                                                <span className={styles.icon}>
                                                    {item.icon}
                                                </span>
                                                <p>{item.title}</p>
                                            </div>
                                        );
                                    })
                                ) : null
                            ) : item.subNavTitles && subNav ? (
                                <>
                                    {item.subNavTitles.map((subTitle, i) => (
                                        <div key={i}>
                                            <div className={styles.mainSubNav}>
                                                <p>{subTitle}</p>
                                                <>{item.iconOpened}</>
                                            </div>
                                            {item.subNav.map((item, index) => {
                                                return item.subNavTitle ==
                                                    subTitle ? (
                                                    <div
                                                        className={
                                                            styles.subMenuLink
                                                        }
                                                        key={index}
                                                    >
                                                        <span
                                                            className={
                                                                styles.icon
                                                            }
                                                        >
                                                            {item.icon}
                                                        </span>
                                                        <p>{item.title}</p>
                                                    </div>
                                                ) : null;
                                            })}
                                        </div>
                                    ))}
                                </>
                            ) : null}
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
