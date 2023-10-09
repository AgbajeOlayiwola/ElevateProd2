import React from 'react';
import Cover from '../Cover';
import EcobankQRSvg from '../../../ReusableComponents/EcobankQRSvg';
import EcobankSvg from '../../../ReusableComponents/EcobankLogoSvg';
import YoutubeSvg from '../../../ReusableComponents/YoutubeSvg';
import FacebookSvg from '../../../ReusableComponents/FacebookSvg';
import TwitterSvg from '../../../ReusableComponents/TwitterSvg';
import LinkedInSvg from '../../../ReusableComponents/LinkedInSvg';
import Image from 'next/image';
import styles from './styles.module.css';
const Footer = () => {
    return (
        <Cover>
            <div className={styles.smeApp}>
                <div className={styles.smeAppPow}>
                    <p>My SME App is powered by </p>
                    <EcobankSvg />
                </div>
                <div className={styles.logos}>
                    <YoutubeSvg />
                    <FacebookSvg />
                    <TwitterSvg />
                    <Image
                        src="/Assets/Images/instagramlogo.png"
                        width="36.759px"
                        height="36.759"
                    />
                    <LinkedInSvg />
                </div>
            </div>
        </Cover>
    );
};

export default Footer;
