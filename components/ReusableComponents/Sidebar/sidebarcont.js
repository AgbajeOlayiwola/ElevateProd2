import React, { useState } from 'react';
import Link from 'next/link';
import { SidebarData } from '../Data';
import styles from './styles.module.css';
import { useRouter } from 'next/router';

const SideBarDrop = () => {
    const [subNav, setSubNav] = useState(true);

    const showSubnav = ({ item }) => {
        setSubNav((prev) => !prev);
        console.log('clicked');
    };
    return (
        <>
            {SidebarData.map((item, index) => {
                {
                    item.subNav && subNav ? (
                        <div onClick={item.subNav && showSubnav}>
                            {item.iconOpened}
                        </div>
                    ) : item.subNav ? (
                        <div onClick={item.subNav && showSubnav}>
                            {item.iconClosed}
                        </div>
                    ) : null;
                }
                {
                    !item.subNavTitles ? (
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
                                        return item.subNavTitle == subTitle ? (
                                            <div
                                                className={styles.subMenuLink}
                                                key={index}
                                            >
                                                <span className={styles.icon}>
                                                    {item.icon}
                                                </span>
                                                <p>{item.title}</p>
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                            ))}
                        </>
                    ) : null;
                }
            })}
        </>
    );
};

export default SideBarDrop;
