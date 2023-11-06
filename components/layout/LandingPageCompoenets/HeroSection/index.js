import Image from 'next/image';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import lang from '../../../../utils/language';
import Cover from '../Cover';
import ButttonComponet from '../button';
import styles from './styles.module.css';
const HeroSection = () => {
    const { language } = useSelector((state) => state);
    const settings = {
        dots: false,
        infinite: true,
        arrow: false,
        fade: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };
    const [display, setDisplay] = useState(true);
    const [width, setWidth] = useState(530);
    return (
        <Cover>
            <div data-aos="fade-up">
                <div className={styles.hero}>
                    <div className={styles.sideOne}>
                        <div>
                            <h1>{lang(language)?.heroTitle}</h1>
                            <p className={styles.heroP}>
                                A solid platform tailored to your business needs
                                for enhanced experience, improved productivity,
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
                                    <ButttonComponet
                                        text="Login"
                                        bordr={false}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            width: width + 'px',
                            display: display ? 'block' : 'none'
                        }}
                    >
                        <Slider {...settings}>
                            <Image
                                src="/Assets/Images/Rectangle.png"
                                width="530"
                                height="640"
                                alt="MYSMEAPP"
                            />
                            <Image
                                src="/Assets/Images/Rectangle.png"
                                width="530"
                                height="640"
                                alt="MYSMEAPP"
                            />
                            <Image
                                src="/Assets/Images/Rectangle.png"
                                width="530"
                                height="640"
                                alt="MYSMEAPP"
                            />
                        </Slider>
                        <div className={styles.dotsFlex}>
                            <div className={styles.activeDots}>
                                <div className={styles.active}></div>
                                <div className={styles.inactive}></div>
                                <div className={styles.inactive}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Cover>
    );
};

export default HeroSection;
