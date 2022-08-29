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
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loadCountry } from '../../redux/actions/actions';
import Image from 'next/image';
import Link from 'next/link';

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
    const dispatch = useDispatch();
    const { isLoading, countries, errorMessage } = useSelector(
        (state) => state.countryReducer
    );

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
    const [activeBtn, setActiveBtn] = useState(true);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        if (selectCountry === '') {
            setError('Choose a country');
        } else {
            window.localStorage.setItem(
                'country',
                JSON.stringify(selectCountry)
            );
            router.push('./Auth/SignUp');
        }
    };
    // console.log(watch('example')); // watch input value by passing the name of it

    return (
        <div className={styles.cover}>
            <section className={styles.sectionI}>
                <img src="/Assets/Images/Overlay2.svg" alt="" />
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
                                <SpaceshipSvg />

                                <p>Start</p>
                            </div>
                            <div className={styles.gears}>
                                <Gearsvg />
                                <p>Run</p>
                            </div>
                            <div className={styles.scale}>
                                <Scalesvg />
                                <p>Grow</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.sectionII}>
                <div>
                    <div>
                        <h3 className={styles.elevatenow}>Sign up</h3>
                    </div>
                    <div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className={styles.form}
                        >
                            <Languages />
                            <div className={styles.countryWrapper}>
                                <label
                                    className={styles.label}
                                    htmlFor="country"
                                >
                                    Choose The Country Where you Run Busines
                                </label>
                                {error ? (
                                    <p className={styles.error}>{error}</p>
                                ) : null}
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
                            <div className={styles.disclaimer}>
                                <p>
                                    Get onboard and have access to unlimited
                                    possibilites with your account!
                                </p>
                            </div>{' '}
                            <ButtonComp
                                disabled={activeBtn}
                                active={activeBtn ? 'active' : 'inactive'}
                                text="Proceed"
                                type="submit"
                            />
                            <div>
                                <p className={styles.accout}>
                                    Already Registered?
                                    <Link href="../Auth/Login">
                                        <span className={styles.termss}>
                                            {' '}
                                            Sign In
                                        </span>
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeMain;
