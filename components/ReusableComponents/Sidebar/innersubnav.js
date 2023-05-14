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
                              <Link key={index} href={item.path}>
                                  <div className={styles.subMenuLink}>
                                      <a>{item.title}</a>
                                  </div>
                              </Link>
                          );
                      })
                    : null
                : null}
        </>
    );
};

export default Innersubnav;
