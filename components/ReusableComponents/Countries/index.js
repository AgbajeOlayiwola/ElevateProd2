import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const Countriess = ({
    countryState,
    countrys,
    displayCountry,
    selectCountry,
    error,
    setSelectCountry,
    setError,
    setCountryState
}) => {
    return (
        <>
            <div className={styles.selectCont}>
                <div className={styles.selectCountry} onClick={displayCountry}>
                    {selectCountry ? (
                        <div>
                            <div className={styles.flags}>
                                <img
                                    src={
                                        selectCountry.flags === undefined
                                            ? null
                                            : selectCountry.flags.svg
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
                                    onClick={() => {
                                        setSelectCountry(item);
                                        setCountryState(false);
                                        if (error !== '') {
                                            setError('');
                                        }
                                    }}
                                >
                                    <img
                                        src={
                                            item.flags === undefined
                                                ? null
                                                : item.flags.svg
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

                                */}
            {error ? <p className={styles.error}>{error}</p> : null}
        </>
    );
};

export default Countriess;
