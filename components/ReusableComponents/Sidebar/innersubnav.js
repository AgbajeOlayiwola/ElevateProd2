import React, { useState } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';

const Innersubnav = ({ item, subNav }) => {
    const [innersubNav, setInnerSubNav] = useState(false);

    const showInnerSubnav = ({ item }) => {
        setInnerSubNav((prev) => !prev);
        //console.log'clicked');
    };
    return (
        <>
            {!item.subNavTitles
                ? item.subNav && subNav
                    ? item.subNav.map((item, index) => {
                          return (
                              <div className={styles.subMenuLink} key={index}>
                                  <Link href={item.path}>
                                      <a>{item.title}</a>
                                  </Link>
                              </div>
                          );
                      })
                    : null
                : null}
        </>
    );
};

export default Innersubnav;
