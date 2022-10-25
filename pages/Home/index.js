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
import 'slick-carousel/slick/slick.css';

const HomeMain = () => {
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
    const [activeBtn, setActiveBtn] = useState(true);
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
            const postData = {
                username: ecoonlineUserName,
                password: ecoonlinePassword
            };
            // //console.log'ecoOnlineData', ecoonlinePassword, ecoonlineUserName);
            // //console.logecobankOnline);
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

            const postData = {
                accountNo: data.accountNumber
            };

            dispatch(accountNumberData(postData));
        } else if (page === 3) {
            // setLoading(true);

            const postData = {
                pan: cardPan,
                affiliateCode: 'ENG',
                expiry: cardExp,
                cvv: cvv
            };

            dispatch(cardLoginData(postData));

            if (cardLogin.message === 'success') {
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
            setError(cardLoginerrorMessages);
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
        if (ecobankOnline.message === 'success') {
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
        } else if (ecoOnlineErrorMessage) {
            setError(ecoOnlineErrorMessage);
            setLoading(false);
        }
    };
    useEffect(() => {
        // //console.logecobankOnline, ecoOnlineErrorMessage);
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
                            {/* {error ? <p className={styles.error}>{error}</p> : null} */}
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
                                    <div className={styles.cov}>
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
                                    </div>
                                </div>
                            </div>
                            <div className={styles.existingUserBody}>
                                {conditionalComponent()}
                            </div>
                        </div>
                        <div className={styles.secondSectionMidCountry}>
                            {loading ? (
                                <Loader />
                            ) : (
                                <ButtonComp
                                    disabled={activeBtn}
                                    active={activeBtn ? 'active' : 'inactive'}
                                    text="Create account"
                                    type="submit"
                                />
                            )}

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
