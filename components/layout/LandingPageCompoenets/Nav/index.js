import Image from 'next/image';
import React from 'react';
import Cover from '../Cover';
import LanguageSelect from './languageSelect';
import styles from './styles.module.css';
import ElevateLogo from '../../../ReusableComponents/Ellevate';

const Nav = () => {
    return (
        <Cover>
            <div className={styles.nav}>
                {/* <SmeAppSvg /> */}
                <ElevateLogo />
                <div className={styles.selec}>
                    <LanguageSelect />
                </div>
            </div>
        </Cover>
    );
};

export default Nav;
