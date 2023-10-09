import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Loader from '../Loader';
import OutsideClick from '../OutsideClick';

const Countriess = ({
    countryState,
    countrys,
    displayCountry,
    selectCountry,
    error,
    setSelectCountry,
    setError,
    setCountryState,
    isLoading,
    action
}) => {
    return (
        <>
            <div className={styles.selectCont}>
                <div
                    className={styles.selectCountry}
                    onClick={() => !isLoading && displayCountry()}
                >
                    {selectCountry && !isLoading ? (
                        <div>
                            <div className={styles.flagDiv}>
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
                            {/* <div className={styles.dropdown}> */}
                            <img src="/../../Assets/Svgs/dropdownSvg.svg" />
                            {/* </div> */}
                        </div>
                    ) : null}
                    {!selectCountry && !isLoading ? (
                        <p>Choose Country</p>
                    ) : null}
                    {isLoading && <Loader />}
                </div>

                {countryState && (
                    <OutsideClick onClickOutside={action}>
                        <ul className={styles.selectOption}>
                            {countrys?.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        onClick={() => {
                                            if (item?.name) {
                                                setSelectCountry(item);
                                                setCountryState(false);
                                                localStorage.setItem(
                                                    'affiliateCode',
                                                    item?.affiliateCode
                                                );
                                                if (
                                                    localStorage.getItem(
                                                        'affiliateCode'
                                                    )
                                                ) {
                                                    localStorage.setItem(
                                                        'affiliateCode',
                                                        item?.affiliateCode
                                                    );
                                                }
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
                    </OutsideClick>
                )}
            </div>
        </>
    );
};

export default Countriess;
