import React from 'react';
import ButttonComponet from '../button';
import styles from './styles.module.css';
import Cover from '../Cover';
import Image from 'next/image';
import Link from 'next/link';
import lang from '../../../../utils/language';
import { useSelector } from 'react-redux';
const HeroSection = () => {
    const { language } = useSelector((state) => state);
    return (
        <Cover>
            <div className={styles.hero}>
                <div className={styles.sideOne}>
                    <div>
                        <h1>{lang(language)?.heroTitle}</h1>
                        <p className={styles.heroP}>
                            A solid platform tailored to your business needs for
                            enhanced experience, improved productivity,
                            sustainable growth and financial empowerment.
                        </p>
                        <div className={styles.buttons}>
                            <a href="/Auth/Signup">
                                <ButttonComponet
                                    text="Get Started"
                                    border={true}
                                />
                            </a>
                            <a href="/Auth/Login">
                                <ButttonComponet text="Login" bordr={false} />
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <Image
                        src="/Assets/Images/Rectangle.png"
                        width="530"
                        height="640"
                    />
                    <div className={styles.dotsFlex}>
                        <div className={styles.activeDots}>
                            <div className={styles.active}></div>
                            <div className={styles.inactive}></div>
                            <div className={styles.inactive}></div>
                        </div>
                    </div>
                </div>
            </div>
        </Cover>
    );
};

export default HeroSection;
