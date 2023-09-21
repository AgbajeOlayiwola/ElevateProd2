import React, { useState, useEffect } from 'react';
import {
    ButtonComp,
    Gearsvg,
    HomeSvg,
    Scalesvg,
    SpaceshipSvg,
    Languages,
    Countries
} from '../../components';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import Logo from '../../components/ReusableComponents/ReusableSvgComponents/LogoSvg';
import { loadCountry } from '../../redux/actions/getCountriesAction';
import ExistingProfileSetup from '../../components/ReusableComponents/ExistingUserSignup';
import NewUser from '../../components/ReusableComponents/NewUser';
import { affiliateCountries } from '../../components/ReusableComponents/Data';

// Modal.setAppElement('#yourAppElement');
const HomeMain = () => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const router = useRouter();
    const [countrys, setCountry] = useState([]);
    const [countryState, setCountryState] = useState(false);
    const [selectCountry, setSelectCountry] = useState({
        affiliateCode: 'ENG',
        baseCurrency: 'NGN',
        countryCode: '234',
        flags: {
            svg: 'https://flagcdn.com/ng.svg',
            png: 'https://flagcdn.com/w320/ng.png'
        },
        name: 'Nigeria'
    });
    const [error, setError] = useState('');
    const [ecobankAccount, setEcobankAccount] = useState('No');
    const [page, setPage] = useState(0);

    const [activeBtn, setActiveBtn] = useState(false);
    const dispatch = useDispatch();

    const [languages, setLanguages] = useState([]);
    const [languageState, setLanguageState] = useState(false);

    const displayLanguage = () => {
        setLanguageState(!languageState);
        setError('');
    };
    useEffect(() => {
        localStorage.setItem('affiliateCode', selectCountry?.affiliateCode);
    }, []);
    const settings = {
        className: 'center',
        // centerMode: true,
        infinite: true,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 500,
        dots: false,
        cssEase: 'linear',
        arrows: false
    };
    return (
        <div className={styles.homeContainer}>
            <div className={styles.homeBody}>
                <section className={styles.firstSection}>
                    <div className={styles.banner}>
                        <div className={styles.green}></div>
                        <div className={styles.grey}>
                            <div className={styles.contentWrapper}>
                                <Slider {...settings}>
                                    <Image
                                        width={400}
                                        height={800}
                                        src="/Assets/Images/tailor.png"
                                        alt=""
                                    />
                                    <Image
                                        width={400}
                                        height={800}
                                        src="/Assets/Images/tailor2.png"
                                    />
                                </Slider>

                                <div className={styles.content}>
                                    <div className={styles.Svg}>
                                        <div>
                                            <Logo />
                                        </div>
                                    </div>
                                    <div className={styles.Center}>
                                        <div className={styles.sectionBottom}>
                                            <div className={styles.space}>
                                                <div>
                                                    <SpaceshipSvg />
                                                </div>
                                                <p>Start</p>
                                            </div>
                                            <div className={styles.gears}>
                                                <div>
                                                    <Gearsvg />
                                                </div>
                                                <p>Run</p>
                                            </div>
                                            <div className={styles.scale}>
                                                <div>
                                                    <Scalesvg />
                                                </div>
                                                <p>Grow</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mobileBanner}>
                        <div className={styles.mobileBannerCont}>
                            <div className={styles.language}>
                                <div className={styles.languageCont}>
                                    <Languages />
                                </div>
                            </div>
                            <div className={styles.svg}>
                                <div>
                                    <HomeSvg />
                                    <p className={styles.SMeApp}>
                                        Powered by <span>Ecobank</span>
                                    </p>
                                </div>
                                <h2>
                                    Input your BVN and open a Business Account
                                    in 3 minutes.
                                </h2>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.secondSection}>
                    {error && <p className={styles.error}>{error}</p>}
                    <div className={styles.secondSectionHeader}>
                        <div className={styles.secondSectionHeaderText}>
                            <h2>Create an Account</h2>
                            <p>
                                Get onboard and have access to unlimited
                                possibilites.
                            </p>
                        </div>
                        <div className={styles.languages}>
                            <div className={styles.select2}>
                                <div className={styles.selectLanguage}>
                                    <div
                                        className={styles.selectLanguageBody}
                                        onClick={displayLanguage}
                                    >
                                        <p>selectLanguage</p>
                                        <img src="/../../Assets/Svgs/dropdownSvg.svg" />
                                    </div>
                                    {languageState && (
                                        <ul
                                            className={
                                                styles.selectLanguageSingle
                                            }
                                        >
                                            {languages.map((item, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        onClick={() => {
                                                            if (
                                                                item.name !==
                                                                'English'
                                                            ) {
                                                                setError(
                                                                    'This App is available in English currently'
                                                                );
                                                                setLanguageState(
                                                                    false
                                                                );
                                                            } else {
                                                                setLanguageState(
                                                                    false
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <p>
                                                            {item.name.slice(
                                                                0,
                                                                3
                                                            )}
                                                        </p>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.secondSectionMid}>
                        <div className={styles.secondSectionMidCountry}>
                            <label>Choose your Business Location</label>
                            <Countries
                                displayCountry={() => {
                                    setCountryState(!countryState);
                                    setError('');
                                }}
                                selectCountry={selectCountry}
                                countryState={countryState}
                                countrys={affiliateCountries}
                                setCountryState={setCountryState}
                                setError={setError}
                                setSelectCountry={setSelectCountry}
                                error={error}
                            />
                        </div>
                        <div className={styles.secondSectionMidYes}>
                            <label htmlFor="">
                                Do you have an Ecobank Account?
                            </label>
                            <select
                                onInput={(e) => {
                                    if (e.target.value === 'No') {
                                        setEcobankAccount('No');
                                        setError('');
                                    } else if (e.target.value === 'Yes') {
                                        setEcobankAccount('Yes');
                                        setError('');
                                    }
                                }}
                            >
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>
                    </div>
                    {ecobankAccount === 'No' ? (
                        <NewUser selectCountry={selectCountry} />
                    ) : (
                        <ExistingProfileSetup page={page} />
                    )}
                </section>
            </div>
        </div>
    );
};

export default HomeMain;
