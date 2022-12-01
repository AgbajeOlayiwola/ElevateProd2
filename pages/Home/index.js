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
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
    loadCountry,
    omniliteDataa,
    accountNumberData,
    ecobankOnlineData,
    cardLoginData,
    loadLanguageAsync
} from '../../redux/actions/actions';
import Image from 'next/image';
import Link from 'next/link';
import Loader from '../../components/ReusableComponents/Loader';
import Visbility from '../../components/ReusableComponents/Eyeysvg';
import NewUser from './NewUser';
import OmniliteSvg from '../../components/ReusableComponents/ReusableSvgComponents/OmniliteSvg';
import AccountNumberSvg from '../../components/ReusableComponents/ReusableSvgComponents/AccountNumberSvg';
import CardSvg from '../../components/ReusableComponents/ReusableSvgComponents/CardSvg';
import Slider from 'react-slick';
import Modal from 'react-modal';
import 'slick-carousel/slick/slick.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        height: '70vh',
        width: '40vw',
        color: '#3e3e3e',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

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
    const [omnilit, setOmnilite] = useState(true);
    const [ecobank, setEcobank] = useState(false);
    const [acct, setAcct] = useState(false);
    const [card, setCard] = useState(false);
    const [outType, setOutType] = useState();
    const [loading, setLoading] = useState(false);
    const [activeBtn, setActiveBtn] = useState(false);
    const dispatch = useDispatch();
    const [ecoonlineUserName, setEconlineUsername] = useState();
    const [ecoonlinePassword, setEcoonlinePassword] = useState();
    const [accountNo, setAccountNo] = useState();
    const [languages, setLanguages] = useState([]);
    const [languageState, setLanguageState] = useState(false);

    const [cardPan, setCardPanMatch] = useState('');
    const [cardExp, setCardExp] = useState('');
    const [cvv, setCVV] = useState('');
    const displayLanguage = () => {
        setLanguageState(!languageState);
        setError('');
    };
    const [selectLanguage, setSelectLanguage] = useState('Eng');
    const { countries, errorData } = useSelector(
        (state) => state.countryReducer
    );
    const { isLoading, omniliteData, errorMessage } = useSelector(
        (state) => state.omniliteReducer
    );
    const { accountNumbers, errorMessages } = useSelector(
        (state) => state.accountNumberReducer
    );
    const { ecobankOnline, ecoOnlineErrorMessage } = useSelector(
        (state) => state.ecobankOnlineReducer
    );
    const { cardLogin, cardLoginerrorMessages } = useSelector(
        (state) => state.cardLoginReducer
    );
    //console.logomniliteData);
    const { language } = useSelector((state) => state.languages);

    useEffect(() => {
        dispatch(loadLanguageAsync());
    }, []);
    useEffect(() => {
        if (language !== null) {
            setLanguages(language);
        }
    }, [language]);

    useEffect(() => {
        dispatch(loadCountry());
        if (countries !== null) {
            setCountry(countries);
        }
    }, []);
    useEffect(() => {
        if (countries !== null) {
            setCountry(countries);
        }
    }, [countries]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const conditionalComponent = () => {
        switch (page) {
            case 0:
                return (
                    <div className={styles.existingForm}>
                        <div>
                            <label>Enter Your Omnilite Username</label>
                            <input
                                placeholder="Omnilite Username"
                                type="text"
                                className={styles.idInput}
                                {...register('omniliteUsername', {
                                    required: 'Omnilite Username is Required'
                                })}
                                name="omniliteUsername"
                            />
                            <p className={styles.error}>
                                {errors?.omniliteUsername?.message}
                            </p>
                        </div>
                        <div>
                            <label>Enter Your Omnilite Password</label>
                            <div className={styles.divs}>
                                <input
                                    placeholder="Omnilite Password"
                                    className={styles.idInput}
                                    {...register('omnilitePassword', {
                                        required:
                                            'Omnilite Password is Required'
                                    })}
                                    name="omnilitePassword"
                                    type={outType ? 'text' : 'password'}
                                />
                                <Visbility typeSet={types} />
                            </div>
                            <p className={styles.error}>
                                {errors?.omnilitePassword?.message}
                            </p>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className={styles.existingForm}>
                        <div>
                            <label>Enter your Ecobank Online Username</label>
                            <input
                                placeholder="Ecobank Online Username"
                                type="text"
                                className={styles.idInput}
                                {...register('onlineUsername', {
                                    required:
                                        'Ecobank Online Username is Required'
                                })}
                                name="onlineUsername"
                                value={ecoonlineUserName}
                                onInput={(e) =>
                                    setEconlineUsername(e.target.value)
                                }
                            />
                            <p className={styles.error}>
                                {errors?.onlineUsername?.message}
                            </p>
                        </div>
                        <div>
                            <label>Enter Your Ecobank Online Password</label>
                            <div className={styles.divs}>
                                <input
                                    placeholder="Ecobank Online Password"
                                    className={styles.idInput}
                                    {...register('onlinePassword', {
                                        required:
                                            'Ecobank Online Password is Required'
                                    })}
                                    name="onlinePassword"
                                    type={outType ? 'text' : 'password'}
                                    value={ecoonlinePassword}
                                    onInput={(e) =>
                                        setEcoonlinePassword(e.target.value)
                                    }
                                />
                                <Visbility typeSet={types} />
                            </div>
                            <p className={styles.error}>
                                {errors?.onlinePassword?.message}
                            </p>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className={styles.existingForm}>
                        <div>
                            <label>Enter Your Ecobank Account Number</label>
                            <input
                                placeholder="123*******62"
                                type="text"
                                className={styles.idInput}
                                {...register('accountNumber', {
                                    required: 'Account Number is Required'
                                })}
                                value={accountNo}
                                onInput={(e) => {
                                    setAccountNo(e.target.value);
                                }}
                                name="accountNumber"
                            />
                            <p className={styles.error}>
                                {errors?.accountNumber?.message}
                            </p>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className={styles.existingForm}>
                        <div>
                            <label>Ecobank Card number</label>
                            <input
                                placeholder="Ecobank Card number"
                                className={styles.idInput}
                                type="number"
                                {...register('cardNumber', {
                                    required: 'Card Number is Required'
                                })}
                                value={cardPan}
                                onInput={(e) => setCardPanMatch(e.target.value)}
                                name="cardNumber"
                            />
                            <p className={styles.error}>
                                {errors?.cardNumber?.message}
                            </p>
                        </div>
                        <div className={styles.expCvv}>
                            <div className={styles.exp}>
                                <div className={styles.shows}>
                                    <label>Expiry Date</label>
                                    <input
                                        placeholder="MM/YY"
                                        className={styles.passwordInput}
                                        type="text"
                                        {...register('expiryDate', {
                                            required: 'Expiry Date is Required'
                                        })}
                                        name="expiryDate"
                                        onInput={(e) => {
                                            if (e.target.value.length === 2) {
                                                e.target.value += '/';
                                            }
                                            setCardExp(e.target.value);
                                        }}
                                        value={cardExp}
                                        maxLength="5"
                                    />
                                    <p className={styles.error}>
                                        {errors?.expiryDate?.message}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.cvvCode}>
                                <div className={styles.shows}>
                                    <label>CVV</label>
                                    <input
                                        placeholder="CVV"
                                        className={styles.passwordInput}
                                        maxLength="3"
                                        type="password"
                                        // {...register('cvv', {
                                        //     required: 'CVV is Required'
                                        // })}
                                        onInput={(e) => setCVV(e.target.value)}
                                        value={cvv}
                                        name="cvv"
                                    />
                                    <p className={styles.error}>
                                        {errors?.cvv?.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
        }
    };
    const onSubmit = (data) => {
        //console.logdata);
        if (selectCountry === '') {
            setError('Choose a country');
        } else {
            window.localStorage.setItem(
                'country',
                JSON.stringify(selectCountry)
            );
        }

        if (page === 0) {
            if (error) {
                setError('');
            }
            setLoading(true);
            const postData = {
                username: data.omniliteUsername,
                password: data.omnilitePassword
            };
            dispatch(omniliteDataa(postData));
            //console.log'new');
        } else if (page === 1) {
            setLoading(true);
            const postData = {
                username: ecoonlineUserName,
                password: ecoonlinePassword
            };
            //console.log'ecoOnlineData', ecoonlinePassword, ecoonlineUserName);
            //console.logecobankOnline);
            dispatch(ecobankOnlineData(postData));
            //console.logecobankOnline);

            //ecoBank Online Login End

            if (omniliteData.message === 'success') {
                const data = {
                    email: omniliteData.data.user.email,
                    // accountNumber: omniliteData.data.user.profile.firstName,
                    fullName: omniliteData.data.user.profile.lastName,
                    phoneNumber: omniliteData.data.user.phoneNumber
                };
                window.localStorage.setItem(
                    'displayAccount',
                    JSON.stringify(data)
                );
                window.localStorage.setItem(
                    'account',
                    JSON.stringify(omniliteData.data.user)
                );
                router.push('/Onboarding/ExistingProfileSetup');
            }
            //omnilite login end
        } else if (page === 2) {
            // setLoading(true);
            setLoading(true);

            const postData = {
                accountNo: data.accountNumber
            };

            dispatch(accountNumberData(postData));
        } else if (page === 3) {
            // setLoading(true);
            setLoading(true);

            const postData = {
                pan: cardPan,
                affiliateCode: 'ENG',
                expiry: cardExp.split('/').toString().replaceAll(',', ''),
                cvv: cvv
            };

            dispatch(cardLoginData(postData));
        }
        //console.logaccountNumbers);
    };
    const OmniliteTest = () => {
        //console.logomniliteData);
        //console.logerrorMessage);
        if (errorMessage) {
            setError(errorMessage);
            setLoading(false);
        } else if (omniliteData.message === 'success') {
            const data = {
                email: omniliteData.data.user.email,
                firstName: omniliteData.data.user.profile.firstName,
                lastName: omniliteData.data.user.profile.lastName,
                phoneNumber: omniliteData.data.user.phoneNumber
            };
            window.localStorage.setItem('displayAccount', JSON.stringify(data));
            window.localStorage.setItem(
                'account',
                JSON.stringify(omniliteData.data.user)
            );
            router.push('/Onboarding/ExistingProfileSetup');
        }
    };
    useEffect(() => {
        OmniliteTest();
    }, [omniliteData, errorMessage]);

    const acctTest = () => {
        //console.logaccountNumbers);
        // setLoading(true);
        if (errorMessages === 'Account already exists with the phone') {
            router.push('/Auth/Login');
        } else if (errorMessages) {
            setError(errorMessages);
            setLoading(false);
        } else if (accountNumbers.message === 'success') {
            router.push('/Onboarding/ExistingProfileSetup');
            const data = {
                email: accountNumbers.data.email,
                accountNumber: accountNumbers.data.accountNumber,
                fullName: accountNumbers.data.fullName,
                phoneNumber: accountNumbers.data.phoneNumber
            };

            window.localStorage.setItem('displayAccount', JSON.stringify(data));
            window.localStorage.setItem('LoginWith', 'AccountNumber');
            if (accountNumbers.data.email === null) {
                accountNumbers.data = {
                    ...accountNumbers.data,
                    email: 'topeakinfe@gmail.com'
                };
            }

            window.localStorage.setItem(
                'account',
                JSON.stringify(accountNumbers.data)
            );
        }
    };
    useEffect(() => {
        acctTest();
    }, [accountNumbers, errorMessages]);
    const ecoOnlineTest = () => {
        if (ecobankOnline !== null) {
            const data = {
                email: ecobankOnline.data.user.email,
                firstName: ecobankOnline.data.user.profile.firstName,
                lastName: ecobankOnline.data.user.profile.lastName,
                phoneNumber: ecobankOnline.data.user.phoneNumber
            };
            window.localStorage.setItem('displayAccount', JSON.stringify(data));
            window.localStorage.setItem(
                'account',
                JSON.stringify(ecobankOnline.data.user)
            );
            router.push('/Onboarding/ExistingProfileSetup');
        } else if (ecoOnlineErrorMessage !== null) {
            setError(ecoOnlineErrorMessage);
            setLoading(false);
        }
    };

    const cardTest = () => {
        if (cardLogin.message === 'success') {
            console.log(cardLogin);
            const data = {
                email: omniliteData.data.user.email,
                // accountNumber: omniliteData.data.user.profile.firstName,
                fullName: omniliteData.data.user.profile.lastName,
                phoneNumber: omniliteData.data.user.phoneNumber
            };
            window.localStorage.setItem('displayAccount', JSON.stringify(data));
            window.localStorage.setItem(
                'account',
                JSON.stringify(omniliteData.data.user)
            );

            router.push('/Onboarding/ExistingProfileSetup');
        } else if (cardLoginerrorMessages) {
            setLoading(false);
            setError(cardLoginerrorMessages);
        }
    };
    useEffect(() => {
        cardTest();
    }, [cardLogin, cardLoginerrorMessages]);
    useEffect(() => {
        //console.log(ecobankOnline, ecoOnlineErrorMessage);
        ecoOnlineTest();
    }, [ecobankOnline, ecoOnlineErrorMessage]);
    const types = (type) => {
        setOutType(type);
    };
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
        <div className={styles.homeBody}>
            <section className={styles.firstSection}>
                <div className={styles.banner}>
                    <div className={styles.green}></div>
                    <div className={styles.grey}>
                        <div className={styles.contentWrapper}>
                            <Slider {...settings}>
                                <img src="./Assets/Images/tailor.png" alt="" />
                                <img src="Assets/Images/tailor2.png" />
                            </Slider>

                            <div className={styles.content}>
                                <div className={styles.Svg}>
                                    <div>
                                        <HomeSvg />
                                        <p className={styles.SMeApp}>
                                            Powered by <span>Ecobank</span>
                                        </p>
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
                                Input your BVN and open a Business Account in 3
                                minutes.
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
                                    <p>{selectLanguage}</p>
                                    <img src="/../../Assets/Svgs/dropdownSvg.svg" />
                                </div>
                                {languageState && (
                                    <ul className={styles.selectLanguageSingle}>
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
                                                        {item.name.slice(0, 3)}
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
                            countrys={countrys}
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
                                } else if (e.target.value === 'Yes') {
                                    setEcobankAccount('Yes');
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
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={styles.form}
                    >
                        <div className={styles.existingUser}>
                            <div className={styles.existingUserHeader}>
                                <p className={styles.choose}>
                                    Choose Preferred Login Option
                                </p>
                                <div className={styles.omnisets}>
                                    <div className={styles.cov}>
                                        <div
                                            className={
                                                omnilit
                                                    ? styles.active
                                                    : styles.notActive
                                            }
                                            onClick={() => {
                                                setPage(0);
                                                setError('');
                                                setOmnilite(true);
                                                setEcobank(false);
                                                setCard(false);
                                                setAcct(false);
                                            }}
                                        >
                                            <OmniliteSvg id="image0_8209_39687" />
                                        </div>
                                        <p
                                            className={
                                                omnilit
                                                    ? styles.activeName
                                                    : styles.name
                                            }
                                        >
                                            Omnilite Details
                                        </p>
                                    </div>
                                    <div className={styles.cov}>
                                        {' '}
                                        <div
                                            className={
                                                ecobank
                                                    ? styles.active
                                                    : styles.notActive
                                            }
                                            onClick={() => {
                                                setPage(1);
                                                setError('');
                                                setOmnilite(false);
                                                setEcobank(true);
                                                setCard(false);
                                                setAcct(false);
                                                setEconlineUsername('');
                                                setEcoonlinePassword('');
                                            }}
                                        >
                                            <Image
                                                src="/Assets/Svgs/ecobankMobile.svg"
                                                width={45}
                                                height={45}
                                                alt="Details"
                                            />
                                            {/* <EcobankMobileSvg /> */}
                                        </div>
                                        <p
                                            className={
                                                ecobank
                                                    ? styles.activeName
                                                    : styles.name
                                            }
                                        >
                                            Ecobank Online
                                        </p>
                                    </div>

                                    <div className={styles.cov}>
                                        <div
                                            className={
                                                acct
                                                    ? styles.active
                                                    : styles.notActive
                                            }
                                            onClick={() => {
                                                setPage(2);
                                                setError('');
                                                setOmnilite(false);
                                                setEcobank(false);
                                                setCard(false);
                                                setAcct(true);
                                                setAccountNo('');
                                            }}
                                        >
                                            <AccountNumberSvg />
                                        </div>
                                        <p
                                            className={
                                                acct
                                                    ? styles.activeName
                                                    : styles.name
                                            }
                                        >
                                            Account Number
                                        </p>
                                    </div>
                                    {/* <div className={styles.cov}>
                                        <div
                                            className={
                                                card
                                                    ? styles.active
                                                    : styles.notActive
                                            }
                                            onClick={() => {
                                                setPage(3);
                                                setError('');
                                                setOmnilite(false);
                                                setEcobank(false);
                                                setCard(true);
                                                setAcct(false);
                                                setCVV('');
                                            }}
                                        >
                                            <CardSvg />
                                        </div>
                                        <p
                                            className={
                                                card
                                                    ? styles.activeName
                                                    : styles.name
                                            }
                                        >
                                            Bank Card Details
                                        </p>
                                    </div> */}
                                </div>
                            </div>
                            <div className={styles.existingUserBody}>
                                {conditionalComponent()}
                            </div>
                        </div>

                        <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                                Terms And Condition
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Aenean ac lacus posuere,
                                imperdiet metus vitae, ultricies ipsum. Integer
                                interdum sit amet massa nec egestas. Donec
                                fermentum massa et leo molestie malesuada. Sed
                                at vestibulum mauris. Praesent et fermentum mi.
                                Morbi sed augue sit amet sapien fringilla
                                varius. Quisque sed tempus tellus. Curabitur
                                ullamcorper quam eget sagittis facilisis.
                                Phasellus rhoncus rutrum blandit. In venenatis
                                convallis purus non malesuada. Maecenas vehicula
                                dolor eget purus ullamcorper, id luctus justo
                                aliquet. Quisque vel ante at enim cursus laoreet
                                scelerisque quis mauris. Nullam tortor tellus,
                                tincidunt nec erat vel, consequat bibendum dui.
                                In vehicula sit amet nisi sed tristique. Morbi
                                sit amet tempor tellus. Maecenas dictum commodo
                                sapien, sit amet venenatis dolor porttitor
                                condimentum. Proin vitae felis eros. Mauris
                                imperdiet ipsum ac euismod pretium. Sed eget
                                dignissim arcu. Fusce sed urna justo. Aliquam
                                erat volutpat. Pellentesque non dictum tellus.
                                Nullam congue efficitur scelerisque. Duis
                                lacinia, dui ac ultricies luctus, tellus erat
                                finibus libero, sit amet iaculis arcu massa at
                                est. Vestibulum ante ipsum primis in faucibus
                                orci luctus et ultrices posuere cubilia curae;
                                Aenean iaculis magna vitae massa dignissim, eget
                                sagittis urna ullamcorper. Suspendisse et lorem
                                non odio imperdiet auctor sit amet eget mi.
                                Vivamus in sem porttitor, efficitur augue nec,
                                pellentesque odio. Quisque at cursus nunc,
                                pellentesque consequat ex. Cras sed justo
                                vehicula, aliquet tellus id, dapibus velit.
                                Aliquam erat volutpat. Suspendisse vel sapien
                                mattis, vulputate justo vitae, aliquam magna.
                                Pellentesque porta erat nec libero interdum,
                                imperdiet sodales erat tempor. In pharetra dui
                                id quam vulputate, vitae porttitor ex aliquam.
                                Vivamus sollicitudin sed magna eget sodales.
                                Vivamus et orci vitae neque bibendum accumsan.
                                Aliquam ex tellus, scelerisque eget enim et,
                                fermentum mollis risus. Nullam vitae facilisis
                                nibh. Sed sodales fringilla euismod. Duis sed
                                tempor turpis. Quisque odio lacus, malesuada sed
                                auctor quis, rutrum quis felis. Curabitur non
                                massa dapibus, porta purus vitae, egestas odio.
                                Nullam et elit mi. Pellentesque vel risus eu
                                sapien suscipit efficitur. Sed mattis diam non
                                diam gravida aliquam. Duis vestibulum nulla
                                nulla, et cursus metus euismod eget. Nulla
                                mollis metus elit, non ultricies quam ultrices
                                ut. Cras vitae purus nisl. In condimentum nisl
                                quam, vitae elementum urna commodo pharetra.
                                Duis sollicitudin sapien eu nibh bibendum, id
                                bibendum augue blandit. Interdum et malesuada
                                fames ac ante ipsum primis in faucibus. Ut purus
                                augue, cursus ac velit ut, convallis maximus
                                sapien. Fusce vehicula sodales cursus. Fusce
                                pretium accumsan augue, ac condimentum lectus
                                luctus quis. Vestibulum vel ex luctus, faucibus
                                lacus et, sodales enim. Curabitur accumsan
                                sapien lacus, sed maximus lectus venenatis ut.
                                Sed pretium elit ut enim gravida, quis dictum
                                lorem accumsan. Fusce ultrices sed nisl vel
                                lacinia. Nam tristique elit quis laoreet
                                porttitor. Quisque porttitor suscipit nisl, vel
                                hendrerit nibh pulvinar aliquam. Proin tempus,
                                quam vel aliquet euismod, turpis massa varius
                                quam, vel iaculis felis leo eu metus. Nulla quam
                                odio, suscipit vel est et, semper faucibus ex.
                                Orci varius natoque penatibus et magnis dis
                                parturient montes, nascetur ridiculus mus. Nulla
                                pellentesque nisl eu metus accumsan feugiat.
                                Phasellus commodo a nibh at blandit. Nam nisi
                                nibh, consectetur a lectus nec, fringilla mollis
                                orci. Nam elementum, ante vitae mattis
                                venenatis, metus elit faucibus odio, eget
                                hendrerit massa risus et neque. Nam facilisis
                                sapien sit amet sapien dictum dictum. Ut in
                                ipsum maximus, finibus ligula ac, finibus neque.
                                Integer suscipit vulputate interdum. Aliquam
                                volutpat lorem quis magna commodo, vel fringilla
                                tellus faucibus. Sed dignissim urna in lacus
                                pharetra, nec eleifend ante scelerisque. Nam
                                mollis metus velit, vel porta metus elementum
                                lobortis. Maecenas et lacus rhoncus, semper ante
                                ac, egestas leo. Maecenas aliquet feugiat
                                sapien, in condimentum eros sollicitudin
                                efficitur. Ut egestas metus semper nibh dictum
                                consectetur. Donec at convallis ex. Curabitur
                                suscipit ornare scelerisque. Maecenas sed
                                accumsan diam. Duis facilisis dolor ut nisl
                                rhoncus scelerisque. Interdum et malesuada fames
                                ac ante ipsum primis in faucibus. Maecenas in
                                varius neque, eu bibendum tortor. Donec vel
                                tempus odio, tincidunt rutrum magna. Fusce
                                pharetra eu eros et ultricies. Nunc quam ex,
                                tempus at lorem ut, scelerisque vulputate lorem.
                                Nam suscipit nisi eros. Maecenas ut sodales
                                arcu. Nulla facilisi. Aliquam turpis erat,
                                rhoncus quis suscipit sed, molestie sed ante.
                                Morbi elit magna, convallis sit amet maximus
                                eget, elementum eu ipsum. Etiam varius sapien
                                velit, ut sagittis lacus dapibus sollicitudin.
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Pellentesque a diam auctor,
                                lobortis lorem sit amet, sagittis odio. Mauris
                                malesuada tincidunt magna, tristique convallis
                                lacus volutpat quis. Cras vel dignissim augue.
                                Integer porta nulla nisi. In pellentesque
                                fermentum malesuada. Sed laoreet, nulla a
                                fringilla scelerisque, nisl mauris maximus
                                lectus, eu porta turpis ex facilisis ante. In
                                nibh orci, pharetra vel erat at, malesuada
                                feugiat arcu. Aenean elementum urna non elit
                                fringilla fringilla. Mauris magna augue,
                                volutpat vitae sodales nec, dapibus quis nisl.
                                Etiam pulvinar diam vitae cursus condimentum.
                                Fusce ut purus blandit, cursus quam in, aliquet
                                quam. Aenean quis enim vitae est pulvinar
                                rutrum. Morbi varius elit in ultrices tempor. Ut
                                vel aliquam dui. Cras ac fringilla lorem, quis
                                posuere leo. Nullam dapibus rutrum tellus eget
                                vestibulum. Quisque dignissim auctor sodales. Ut
                                tincidunt dictum tellus, quis dapibus eros
                                auctor id. Etiam mattis tortor bibendum enim
                                blandit, et condimentum erat aliquam. In vel
                                auctor ante, eget luctus ligula. Quisque eget
                                tellus enim. In ac quam tristique, tincidunt
                                massa et, euismod metus. Curabitur feugiat
                                porttitor augue sed elementum. Pellentesque at
                                nulla urna. Curabitur diam eros, convallis vel
                                faucibus non, pulvinar eu metus. Quisque feugiat
                                condimentum faucibus. Pellentesque euismod
                                tincidunt pellentesque. Donec consequat lacus
                                aliquet sapien laoreet aliquet. Nullam nibh
                                neque, ornare non pulvinar eget, interdum sit
                                amet diam. Fusce ultrices felis ac massa
                                egestas, sed placerat metus ultricies. Aliquam
                                nec massa condimentum, sollicitudin nunc in,
                                tempor leo. Curabitur non metus vel nibh
                                efficitur suscipit. Aenean gravida eu ex nec
                                semper. Maecenas blandit neque nibh, vel tempus
                                purus posuere rutrum. Curabitur non magna sed
                                leo dignissim tempus at sed lacus. Fusce rhoncus
                                malesuada ipsum in eleifend. Mauris imperdiet
                                elit augue, fringilla volutpat risus facilisis
                                eu. Duis mattis mi viverra mauris aliquet, quis
                                finibus dolor mollis. In sodales felis non
                                sodales vehicula. Interdum et malesuada fames ac
                                ante ipsum primis in faucibus. Phasellus
                                imperdiet felis sed erat egestas mollis.
                                Suspendisse id enim vel lorem sollicitudin
                                blandit. In hac habitasse platea dictumst. Ut
                                libero est, porta et est mattis, ornare posuere
                                dui. Mauris accumsan eleifend dui, vel iaculis
                                justo congue at. Vivamus ac ornare arcu.
                                Suspendisse accumsan volutpat accumsan. Nulla
                                urna tellus, rutrum varius ornare et, hendrerit
                                vel nisi. Sed gravida pellentesque purus, ut
                                faucibus ipsum varius id. Mauris mattis
                                efficitur tristique. Praesent mollis pulvinar
                                dui, ac pulvinar purus tristique ut. Nunc
                                efficitur massa non sapien dapibus auctor. Nunc
                                eget lectus in urna accumsan consectetur non
                                eleifend ipsum. Suspendisse potenti. Donec
                                porttitor, neque vitae vehicula cursus, augue
                                lectus scelerisque ipsum, nec tristique odio
                                odio et est. Nunc egestas mollis eros, sit amet
                                viverra neque pulvinar vitae. Nulla eu nisl dui.
                                In bibendum facilisis diam, vel molestie nisi
                                fermentum nec. Nullam enim ex, semper ac
                                vehicula a, pharetra nec arcu. Nulla fringilla
                                auctor ex vel bibendum. Duis non lacus sit amet
                                ex feugiat convallis. Duis rutrum nulla eros, in
                                laoreet augue pulvinar vel. Proin id fringilla
                                metus, ut commodo nibh. Aenean ut elit in metus
                                efficitur vestibulum. Interdum et malesuada
                                fames ac ante ipsum primis in faucibus. Nunc
                                eros erat, ornare ut luctus vitae, pulvinar eget
                                ex. Fusce quam enim, hendrerit ut consequat et,
                                dictum sed lectus. Sed et purus eu sem posuere
                                sodales. Proin cursus velit ut porta varius. Sed
                                sed posuere lacus. Fusce mauris justo, faucibus
                                a magna sed, suscipit tristique libero. Fusce
                                sit amet suscipit sem. Nullam elit lacus, dictum
                                a ex varius, elementum imperdiet leo. Curabitur
                                accumsan turpis ut hendrerit lacinia. Praesent
                                rhoncus egestas magna ut efficitur. Suspendisse
                                non hendrerit eros. Mauris fringilla semper
                                arcu, at posuere diam posuere eu. Vestibulum at
                                dui ut dolor cursus hendrerit sit amet mattis
                                magna. Proin tempor sollicitudin tincidunt.
                                Suspendisse et lacinia nulla. Proin et diam quis
                                purus rhoncus posuere. Praesent a porta tortor.
                                Quisque porttitor, lacus et porta consequat,
                                lorem massa condimentum purus, sit amet
                                facilisis libero dui sit amet risus. Mauris
                                vitae erat eget metus feugiat convallis id quis
                                quam. Vestibulum ante ipsum primis in faucibus
                                orci luctus et ultrices posuere cubilia curae;
                                Fusce ac odio vel dui porta dictum in at augue.
                                Interdum et malesuada fames ac ante ipsum primis
                                in faucibus. Donec lorem quam, venenatis in
                                dolor in, blandit condimentum mauris. Proin at
                                interdum sem, a porta dui. Sed id augue
                                dignissim, tincidunt risus a, commodo mi. Nulla
                                condimentum lacinia enim nec pharetra. Sed ut
                                augue dolor. Nam pulvinar augue velit, vitae
                                congue tortor dictum vitae. Aliquam porttitor
                                ante quam. Morbi at metus efficitur, sodales
                                elit ac, faucibus justo. Nunc pharetra dolor id
                                diam dignissim, et convallis nulla congue.
                                Nullam iaculis faucibus tortor, eget dapibus
                                ante tempus vel. Aliquam sodales, enim et
                                vestibulum tempus, felis dolor malesuada massa,
                                id ultricies ipsum dui non ligula. Cras pharetra
                                massa in nunc fermentum, eu pharetra risus
                                rhoncus. Maecenas ornare commodo est sed
                                ultrices. In ac commodo tellus. Orci varius
                                natoque penatibus et magnis dis parturient
                                montes, nascetur ridiculus mus. Nunc scelerisque
                                tellus vel risus hendrerit, a congue est
                                viverra. Morbi hendrerit faucibus ante quis
                                lobortis. Maecenas condimentum urna sollicitudin
                                nisi venenatis, malesuada pharetra erat
                                pellentesque. Morbi iaculis aliquet mi, ut
                                mollis turpis molestie et. Nullam a felis
                                euismod, facilisis lacus in, sagittis metus.
                                Duis id purus dui. Maecenas eget enim et elit
                                ornare semper id ac nisi. Aenean lacinia risus
                                non elit condimentum facilisis. Praesent a
                                dapibus metus. Integer fermentum ligula quis
                                ante mollis, at pretium enim porttitor. Duis nec
                                quam rhoncus, rutrum sapien a, ullamcorper
                                ipsum. Maecenas pulvinar efficitur arcu sed
                                scelerisque. Aenean malesuada velit est. Aliquam
                                laoreet vel dolor non auctor. Curabitur
                                tristique tincidunt laoreet. Nam pharetra, magna
                                non facilisis tempor, sem lacus egestas dui, ac
                                semper elit metus ut augue. Vestibulum cursus
                                arcu metus, ut tempus leo vehicula et. Praesent
                                auctor orci elit. Quisque pharetra eros augue, a
                                ultrices ligula vestibulum in. Nunc finibus
                                finibus nulla, in facilisis orci sodales eget.
                                Ut venenatis interdum mi, id finibus felis
                                pellentesque id. Vestibulum facilisis erat elit,
                                ut varius felis eleifend ac. Vivamus quis risus
                                bibendum risus commodo elementum vel at nibh.
                                Pellentesque vehicula, quam ut porta auctor,
                                ipsum ex tempus dolor, non congue nisl mi eget
                                purus. Integer accumsan mattis varius. Class
                                aptent taciti sociosqu ad litora torquent per
                                conubia nostra, per inceptos himenaeos. Donec id
                                malesuada ante, vel hendrerit neque. Donec
                                malesuada ligula arcu, eu rutrum mi lacinia eu.
                                Sed pulvinar metus tellus, ut porta nunc
                                tincidunt vel. Mauris dignissim egestas mauris,
                                ut fermentum nisl molestie ac. Vestibulum
                                ullamcorper lorem in purus maximus, at vulputate
                                metus commodo. Donec vel mattis tortor. Nullam
                                non tincidunt ex. Cras congue mauris ut nisl
                                fermentum tincidunt. Donec a suscipit ipsum, vel
                                blandit nisi. Fusce faucibus magna nisi, nec
                                rutrum quam mattis vitae
                            </p>
                        </Modal>
                        <div className={styles.secondSectionMidCountry}>
                            <p className={styles.alreadyTC}>
                                <input
                                    type="radio"
                                    onChange={() => setActiveBtn(true)}
                                    className={styles.termms}
                                />
                                I agree with ellevate app{' '}
                                <span
                                    className={styles.termsBtn}
                                    onClick={openModal}
                                >
                                    <span>Terms and Conditions</span>
                                </span>
                            </p>
                            <ButtonComp
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
                                text="Create account"
                                type="submit"
                                loads={loading}
                                err={ecoOnlineErrorMessage}
                            />

                            <p className={styles.already}>
                                Already have an account?{' '}
                                <Link href="../Auth/Login">
                                    <span>Sign in</span>
                                </Link>
                            </p>
                        </div>
                    </form>
                )}
            </section>
        </div>
    );
};

export default HomeMain;
