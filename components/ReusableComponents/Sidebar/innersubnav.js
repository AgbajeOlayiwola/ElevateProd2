import React, { useState } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Innersubnav = ({ item, subNav }) => {
    const [innersubNav, setInnerSubNav] = useState(false);

    const showInnerSubnav = ({ item }) => {
        setInnerSubNav((prev) => !prev);
        console.log('clicked');
    };
    const router = useRouter();
    const { pid } = router.query;
    return (
        <>
            {!item.subNavTitles ? (
                item.subNav && subNav ? (
                    item.subNav.map((item, index) => {
                        return (
                            <div className={styles.subMenuLink} key={index}>
                                <span className={styles.icon}>{item.icon}</span>
                                <Link href={{ pid: item.path }}>
                                    <p>{item.title}</p>
                                </Link>
                            </div>
                        );
                    })
                ) : null
            ) : item.subNavTitles && subNav ? (
                <>
                    {item.subNavTitles.map((subTitle, index) => (
                        <div key={index}>
                            <div className={styles.mainSubNav}>
                                <p>{subTitle}</p>
                                <div>
                                    {item.subNav && innersubNav ? (
                                        <div
                                            onClick={
                                                item.subNav && showInnerSubnav
                                            }
                                        >
                                            {item.iconOpened}
                                        </div>
                                    ) : item.subNav ? (
                                        <div
                                            onClick={
                                                item.subNav && showInnerSubnav
                                            }
                                        >
                                            {item.iconClosed}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            {item.subNav.map((item, index) => {
                                return item.subNavTitle == subTitle &&
                                    innersubNav ? (
                                    <div
                                        className={styles.subMenuLink}
                                        key={index}
                                    >
                                        <span className={styles.icon}>
                                            {item.icon}
                                        </span>
                                        <Link
                                            href={{
                                                pathname: './Payment',
                                                query: { id: item.path }
                                            }}
                                        >
                                            <p>{item.title}</p>
                                        </Link>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    ))}
                </>
            ) : null}
        </>
    );
};

export default Innersubnav;
