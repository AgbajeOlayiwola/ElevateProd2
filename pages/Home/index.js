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

const HomeMain = () => {
    const router = useRouter();
    const [countrys, setCountry] = useState([]);
    const [countryState, setCountryState] = useState(false);
    const [selectCountry, setSelectCountry] = useState('');
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
                <div className={styles.Svg}>
                    <div>
                        <HomeSvg />
                        <p className={styles.SMeApp}>Ellevate</p>
                    </div>
                </div>
                <div className={styles.topLeft}></div>
                <div className={styles.topRight}></div>
                <div className={styles.bottomleft}></div>
                <div className={styles.bottomRight}></div>
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
            </section>
            <section className={styles.sectionII}>
                <div>
                    <div>
                        <h3 className={styles.elevatenow}>ellevate now...</h3>
                    </div>
                    <div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className={styles.form}
                        >
                            <Languages />
                            <div>
                                <label
                                    className={styles.label}
                                    htmlFor="country"
                                >
                                    Choose The Country Where you Run Busines
                                </label>
                                <br />
                                <Countries
                                    displayCountry={() => {
                                        setCountryState(!countryState);
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
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeMain;
