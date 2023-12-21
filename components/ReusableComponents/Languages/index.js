import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { set, useForm } from 'react-hook-form';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const Langauges = () => {
    const [languages, setLanguages] = useState([]);
    const [languageState, setLanguageState] = useState(false);

    const [error, setError] = useState('');

    const dispatch = useDispatch();

    // //console.log(language);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const displayLanguage = () => {
        setLanguageState(!languageState);
        setError('');
    };
    const [selectLanguage, setSelectLanguage] = useState('Eng');
    return (
        <div className={styles.select2}>
            {error ? <p className={styles.error}>{error}</p> : null}
            <div className={styles.selectCont}>
                <div className={styles.selectCountry} onClick={displayLanguage}>
                    <p>{selectLanguage}</p>
                    <img src="/../../Assets/Svgs/dropdownSvg.svg" />
                </div>
                {languageState && (
                    <ul className={styles.selectOption}>
                        {languages.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => {
                                        if (item.name !== 'English') {
                                            setError(
                                                'This App is available in English currently'
                                            );
                                            setLanguageState(false);
                                        } else {
                                            setLanguageState(false);
                                        }
                                    }}
                                >
                                    <p>{item.name.slice(0, 3)}</p>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Langauges;
