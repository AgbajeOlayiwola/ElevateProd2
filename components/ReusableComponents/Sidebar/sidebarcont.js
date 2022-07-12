import React, { useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';
import SideBarHomeSvg from '../ShomeSvg';

const SideBarCont = ({ name, link }) => {
    const [activeh, setActiveH] = useState(false);

    return (
        <Link href={link}>
            <div
                onClick={() => setActiveH((prev) => !prev)}
                className={activeh ? styles.inActive : styles.parentDiv}
            >
                <div className={styles.LinkDiv}>
                    <SideBarHomeSvg />
                    <p className={styles.link}>{name}</p>
                </div>
                <div
                    className={
                        activeh ? styles.showGreen : styles.DontSHowgreen
                    }
                ></div>
            </div>
        </Link>
    );
};

export default SideBarCont;
