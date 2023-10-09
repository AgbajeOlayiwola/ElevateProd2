import React from 'react';
import Cover from '../Cover';
import styles from './styles.module.css';
import SmeAppSvg from '../../../ReusableComponents/SmeLogoSvg';
import LanguageSelect from './languageSelect';

const Nav = () => {
    return (
        <Cover>
            <div className={styles.nav}>
                <SmeAppSvg />
                <div className={styles.selec}>
                    <LanguageSelect />
                </div>
            </div>
        </Cover>
    );
};

export default Nav;
