import React from 'react';
import HomeSvg from '../HomeSvg';
import styles from './styles.module.css';

const ProfileSetupSide = () => {
    return (
        <div className={styles.profileSetupSide}>
            <div className={styles.green}></div>
            <div className={styles.grey}>
                <div className={styles.content}>
                    <HomeSvg />
                    <p className={styles.SMeApp}>
                        Powered by <span>Ecobank</span>
                    </p>

                    <h2>The world is your Canvas Explore</h2>
                    <img src="../Assets/Svgs/navDesign.svg" alt="" />
                </div>
                <div className={styles.navImage}>
                    <img src="../Assets/Images/profileNav.png" alt="" />
                </div>
            </div>
        </div>
    );
};

export default ProfileSetupSide;
