import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import {
    Gearsvg,
    HomeSvg,
    Languages,
    Scalesvg,
    SpaceshipSvg
} from '../../../components';
import ElevateLogo from '../../../components/ReusableComponents/Ellevate';
import ExistingProfileSetup from '../../../components/ReusableComponents/ExistingUserSignup';
import NewUser from '../../../components/ReusableComponents/NewUser';
import Logo from '../../../components/ReusableComponents/ReusableSvgComponents/LogoSvg';
import SignupDefault from '../../../components/ReusableComponents/SignUpDefault';
import LanguageSelect from '../../../components/layout/LandingPageCompoenets/Nav/languageSelect';
import styles from './styles.module.css';

// Modal.setAppElement('#yourAppElement');
const SignUp = () => {
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
    const [selectedOption, setSelectedOption] = useState();
    const [change, setChange] = useState('Yes');

    // Callback function to update the selected option in the parent component
    const handleSelectChange = (newOption) => {
        setSelectedOption(newOption);
    };
    const conditionalComponent = () => {
        switch (selectedOption) {
            case 'No':
                return (
                    <NewUser
                        selectCountry={selectCountry}
                        selectedOption={selectedOption}
                        onSelectChange={handleSelectChange}
                        // onclicked={() => {// console.log('test')}
                        onclicked={() => {
                            // console.log(selectedOption);
                            setSelectedOption('No');
                        }}
                    />
                );
            case 'Yes':
                return (
                    <ExistingProfileSetup
                        page={page}
                        selectCountry={selectCountry}
                        selectedOption={selectedOption}
                        onSelectChange={handleSelectChange}
                        // onclicked={() => {// console.log('test')}
                        onclicked={() => {
                            // console.log(selectedOption);
                            setSelectedOption('No');
                        }}
                    />
                );
            default:
                return (
                    <SignupDefault
                        selectedOption={selectedOption}
                        onSelectChange={handleSelectChange}
                        // onclicked={() => {// console.log('test')}
                        onclicked={() => {
                            // console.log(selectedOption);
                            setSelectedOption('No');
                        }}
                    />
                );
        }
    };
    return (
        <div className={styles.homeContainer}>
            <div className={styles.homeBody}>
                <section className={styles.firstSection}>
                    <div className={styles.banner}>
                        <div className={styles.green}></div>
                        <div className={styles.grey}>
                            <div className={styles.contentWrapper}>
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
                    <div className={styles.secondSide}>
                        <div className={styles.logoAndLanguage}>
                            <ElevateLogo />
                            <div className={styles.lang}>
                                <LanguageSelect />
                            </div>
                        </div>
                        <div className={styles.secondSectionHeader}>
                            <div className={styles.secondSectionHeaderText}>
                                <h2>Sign Up</h2>
                                {/* <p>Do you have an Ecobank Account?</p> */}
                            </div>
                        </div>

                        {conditionalComponent()}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SignUp;
