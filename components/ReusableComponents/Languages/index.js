import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { set, useForm } from 'react-hook-form';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loadLanguageAsync } from '../../../redux/actions/actions';

const Langauges = () => {
    const [languages, setLanguages] = useState([]);
    const [languageState, setLanguageState] = useState(false);

    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const { isLoading, language, errorMessage } = useSelector(
        (state) => state.languages
    );

    useEffect(() => {
        dispatch(loadLanguageAsync());
    }, []);
    useEffect(() => {
        if (language !== null) {
            setLanguages(language);
        }
    }, [language]);
    console.log(language);
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
                    <img src="/../../Assets/Svgs/languageDropdown.svg" />
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
            {/* <select
                {...register('first_name', {
                    required: 'Language is required',
                    minLength: {
                        value: 2,
                        message: 'Min length is 2'
                    }
                })}
                id="languages"
                className={styles.selectI}
                name="languages"
                value={languageValue}
                onChange={(e) => {
                    if (e.target.value !== 'English') {
                        setLanguagevalue(languages[0]);
                        setError('This App is available in English currently');
                    }
                }}
            >
                {languages.map((item, index) => {
                    return (
                        <option value={item.name} key={index}>
                            {item.name}
                        </option>
                    );
                })}
            </select> */}
            {/* <div>error</div> */}
        </div>
    );
};

export default Langauges;
