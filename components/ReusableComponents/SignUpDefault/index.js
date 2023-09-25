import React, { useState, useEffect } from 'react';
import { ButtonComp, Countries } from '../..';
import { affiliateCountries } from '../Data';
import styles from './styles.module.css';
const SignupDefault = ({ selectedOption, onSelectChange, onclicked }) => {
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
    const [countryState, setCountryState] = useState(false);

    useEffect(() => {
        localStorage.setItem('affiliateCode', selectCountry?.affiliateCode);
    }, []);

    const handleChange = (event) => {
        const newOption = event.target.value;
        onSelectChange(newOption); // Call the callback function in the parent component
    };
    return (
        <div className={styles.newSIgnUpDefault}>
            <div>
                <p>Choose your country where you run business</p>
                <Countries
                    displayCountry={() => {
                        setCountryState(!countryState);
                    }}
                    selectCountry={selectCountry}
                    countryState={countryState}
                    countrys={affiliateCountries}
                    setCountryState={setCountryState}
                    setSelectCountry={setSelectCountry}
                />
            </div>
            <div className={styles.secondSectionMidYes}>
                <label htmlFor="">Do you have an Ecobank Account?</label>
                <select onChange={handleChange} value={selectedOption}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>
            <span
                onClick={onclicked}
                className={styles.secondSectionMidCountry}
            >
                <button>Proceed</button>
            </span>
        </div>
    );
};

export default SignupDefault;
