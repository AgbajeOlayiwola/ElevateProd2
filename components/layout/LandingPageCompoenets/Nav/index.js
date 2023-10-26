import Image from 'next/image';
import React from 'react';
import Cover from '../Cover';
import LanguageSelect from './languageSelect';
import styles from './styles.module.css';

const Nav = () => {
    return (
        <Cover>
            <div className={styles.nav}>
                {/* <SmeAppSvg /> */}
                <Image
                    src="/MY_SME_LOGO_GREEN_RGB@41.png"
                    width={150}
                    height={108}
                    alt="logo"
                />
                <div className={styles.selec}>
                    <LanguageSelect />
                </div>
            </div>
        </Cover>
    );
};

export default Nav;
