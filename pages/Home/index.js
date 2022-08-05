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
        window.localStorage.setItem('country', JSON.stringify(selectCountry));
        router.push('./Auth/SignUp');
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
                                <div className={styles.selectCont}>
                                    <div
                                        className={styles.selectCountry}
                                        onClick={() => {
                                            setCountryState(!countryState);
                                        }}
                                    >
                                        {selectCountry ? (
                                            <div>
                                                <div className={styles.flags}>
                                                    <img
                                                        src={
                                                            selectCountry.flags ===
                                                            undefined
                                                                ? null
                                                                : selectCountry
                                                                      .flags.svg
                                                        }
                                                        alt=""
                                                    />
                                                </div>

                                                <p>{selectCountry.name}</p>
                                            </div>
                                        ) : (
                                            <>
                                                <p>Choose Country</p>
                                                <Image
                                                    src="/../../Assets/Svgs/arrow-down.svg"
                                                    width="50%"
                                                    height="10%"
                                                />
                                            </>
                                        )}
                                    </div>
                                    {countryState && (
                                        <ul className={styles.selectOption}>
                                            {countrys.map((item, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        onClick={(e) => {
                                                            setSelectCountry(
                                                                item
                                                            );
                                                            setCountryState(
                                                                false
                                                            );
                                                        }}
                                                    >
                                                        <img
                                                            src={
                                                                item.flags ===
                                                                undefined
                                                                    ? null
                                                                    : item.flags
                                                                          .svg
                                                            }
                                                            alt=""
                                                        />
                                                        <p>{item.name}</p>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>

                                {/* <select
                                    className={styles.select}
                                    {...register('countriess', {
                                        required:
                                            'Destination Country is Required'
                                    })}
                                    name="countriess"
                                >
                                    <option value="">Choose Country</option>
                                    {countrys.map((item, index) => {
                                        console.log(item.nme);
                                        return (
                                        <StyledOption
                                            key={index}
                                            value={item.name}
                                        >
                                            <span>
                                                <img
                                                    src="../../Assets/Images/bluemoney.png"
                                                    alt=""
                                                />
                                            </span>{' '}
                                            {item.name}
                                        </StyledOption>
                                        );
                                    })}
                                </select>

                                <p className={styles.error}>
                                    {errors?.countriess?.message}
                                </p> */}
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
