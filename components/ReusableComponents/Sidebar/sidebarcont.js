import React, { useState } from 'react';
import OutsideClick from '../OutsideClick';
import Innersubnav from './innersubnav.js';
import styles from './styles.module.css';

const SideBarDrop = ({ item }) => {
    const [subNav, setSubNav] = useState(false);
    const [innersubNav, setInnerSubNav] = useState(false);
    const showSubnav = () => {
        setSubNav((prev) => !prev);
        // //// console.log('clicked');
    };
    return (
        <>
            <div
                className={styles.contWrapper}
                onClick={item.subNav && showSubnav}
            >
                <span className={styles.titleIcon}>{item.icon}</span>
                <div>
                    <a className={styles.title}>{item.title}</a>
                </div>
                <span className={styles.dropdown}>
                    {item.subNav && subNav
                        ? item.iconOpened
                        : item.subNav
                        ? item.iconClosed
                        : null}
                </span>
            </div>
            <OutsideClick onClickOutside={item.subNav && showSubnav}>
                {!subNav ? null : (
                    <div className={styles.drops}>
                        <Innersubnav item={item} subNav={subNav} />
                    </div>
                )}
            </OutsideClick>
        </>
    );
};

export default SideBarDrop;
