import React from 'react';
import HomeSvg from '../HomeSvg';
import styles from './styles.module.css';
import Logo from '../ReusableSvgComponents/LogoSvg';

const ProfileSetupSide = ({ text }) => {
    return (
        <div className={styles.profileSetupSide}>
            <div className={styles.green}></div>
            <div className={styles.grey}>
                <div className={styles.content}>
                    <div className={styles.contentHeader}>
                        {/* <HomeSvg />
                        <p className={styles.SMeApp}>
                            Powered by <span>Ecobank</span>
                        </p> */}
                        <Logo />
                    </div>

                    <h2>{text}</h2>
                    <div className={styles.colorDiv}>
                        <div className={styles.firstDiv}></div>
                        <div className={styles.secondDiv}></div>
                        <div className={styles.thirdDiv}></div>
                    </div>
                </div>
                <div className={styles.navImage}>
                    <img src="../Assets/Images/profileNav.png" alt="" />
                </div>
            </div>
        </div>
    );
};

export default ProfileSetupSide;
