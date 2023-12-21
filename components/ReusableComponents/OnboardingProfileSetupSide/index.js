import Image from 'next/image';
import React from 'react';
import styles from './styles.module.css';

const OnboardingProfileSetupSide = ({ text }) => {
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
                        {/* <Logo /> */}
                        <Image
                            src="/MY_SME_LOGO_GREEN_RGB@41.png"
                            width={150}
                            height={108}
                            alt="logo"
                        />
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

export default OnboardingProfileSetupSide;
