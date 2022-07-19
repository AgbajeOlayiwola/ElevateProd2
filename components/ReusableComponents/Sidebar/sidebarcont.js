import React, { useState } from 'react';
import Link from 'next/link';
import { SidebarData } from '../Data';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import Dropdownicon from './dropdownicon';
import Innersubnav from './innersubnav.js';

const SideBarDrop = ({ item }) => {
    const [subNav, setSubNav] = useState(false);
    const [innersubNav, setInnerSubNav] = useState(false);
    const showSubnav = ({ item }) => {
        setSubNav((prev) => !prev);
        // console.log('clicked');
    };
    return (
        <>
            <div className={styles.dropBtn}>
                {item.subNav && subNav ? (
                    <div onClick={item.subNav && showSubnav}>
                        {item.iconOpened}
                    </div>
                ) : item.subNav ? (
                    <div onClick={item.subNav && showSubnav}>
                        {item.iconClosed}
                    </div>
                ) : null}
            </div>
            <div className={styles.drops}>
                <Innersubnav item={item} subNav={subNav} />
            </div>
        </>
    );
};

export default SideBarDrop;
